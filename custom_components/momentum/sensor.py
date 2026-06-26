from __future__ import annotations

import datetime
from typing import Any

from dateutil.relativedelta import relativedelta
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change

from .const import DOMAIN


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    sensor = MomentoSensor(entry)
    async_add_entities([sensor], True)


class MomentoSensor(SensorEntity):
    _attr_has_entity_name = True
    _attr_name = "Elapsed time"

    def __init__(self, entry: ConfigEntry) -> None:
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_elapsed"
        self._moment_date = datetime.date.fromisoformat(entry.data["date"])
        self._unsub_timer: Any = None

    @property
    def device_info(self) -> dict[str, Any]:
        return {
            "identifiers": {(DOMAIN, self._entry.entry_id)},
            "name": self._entry.data["name"],
            "manufacturer": "Momentum",
        }

    def _compute(self, today: datetime.date | None = None) -> None:
        if today is None:
            today = datetime.date.today()
        delta = relativedelta(today, self._moment_date)
        total_days = (today - self._moment_date).days

        parts: list[str] = []
        if delta.years:
            parts.append(f"{delta.years} year{'s' if delta.years != 1 else ''}")
        if delta.months:
            parts.append(f"{delta.months} month{'s' if delta.months != 1 else ''}")
        if delta.days or not parts:
            parts.append(f"{delta.days} day{'s' if delta.days != 1 else ''}")

        self._attr_native_value = " ".join(parts)
        self._attr_extra_state_attributes = {
            "years": delta.years,
            "months": delta.months,
            "days": delta.days,
            "total_days": total_days,
            "name": self._entry.data["name"],
            "image_url": self._image_url(),
        }

    def _image_url(self) -> str:
        data = self._entry.data
        if data.get("image_source") == "manual":
            return data.get("image_url", "")
        return data.get("image_local_url", "")

    async def async_update(self) -> None:
        self._compute()

    async def async_added_to_hass(self) -> None:
        self._compute()
        # Recalculate at midnight every day
        self._unsub_timer = async_track_time_change(
            self.hass, self._handle_midnight, hour=0, minute=0, second=0
        )

    async def _handle_midnight(self, _now: datetime.datetime) -> None:
        self._compute()
        self.async_write_ha_state()

    async def async_will_remove_from_hass(self) -> None:
        if self._unsub_timer:
            self._unsub_timer()
