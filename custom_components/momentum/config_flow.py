from __future__ import annotations

import re
from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN
from .image import ImageFetchError, fetch_and_save_image

_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
_TIME_RE = re.compile(r"^\d{2}:\d{2}$")

STEP1_SCHEMA = vol.Schema(
    {
        vol.Required("name"): str,
        vol.Required("date"): str,
        vol.Required("time"): str,
    }
)

STEP2_SCHEMA = vol.Schema(
    {
        vol.Required("server_url", default="https://api.celeste.crubio.fyi"): str,
        vol.Required("lat"): str,
        vol.Required("lon"): str,
    }
)


def _validate_step1(data: dict[str, Any]) -> dict[str, str]:
    errors: dict[str, str] = {}
    if not data.get("name", "").strip():
        errors["name"] = "required"
    if not _DATE_RE.match(data.get("date", "")):
        errors["date"] = "invalid_date"
    if not _TIME_RE.match(data.get("time", "")):
        errors["time"] = "invalid_time"
    return errors


def _validate_step2(data: dict[str, Any]) -> dict[str, str]:
    errors: dict[str, str] = {}
    if not data.get("lat", "").strip():
        errors["lat"] = "required"
    if not data.get("lon", "").strip():
        errors["lon"] = "required"
    if not data.get("server_url", "").strip():
        errors["server_url"] = "required"
    return errors


class MomentumConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._step1_data: dict[str, Any] = {}

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            errors = _validate_step1(user_input)
            if not errors:
                self._step1_data = user_input
                return await self.async_step_location()

        return self.async_show_form(
            step_id="user",
            data_schema=STEP1_SCHEMA,
            errors=errors,
        )

    async def async_step_location(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            errors = _validate_step2(user_input)
            if not errors:
                return await self._create_entry(user_input)

        return self.async_show_form(
            step_id="location",
            data_schema=STEP2_SCHEMA,
            errors=errors,
        )

    async def _create_entry(self, location_data: dict[str, Any]) -> ConfigFlowResult:
        data = {**self._step1_data, **location_data}

        try:
            local_url = await fetch_and_save_image(
                hass=self.hass,
                entry_id=self.flow_id,
                server_url=location_data["server_url"],
                lat=location_data["lat"],
                lon=location_data["lon"],
                date=self._step1_data["date"],
                time=self._step1_data["time"],
            )
            data["image_local_url"] = local_url
        except ImageFetchError as err:
            return self.async_show_form(
                step_id="location",
                data_schema=STEP2_SCHEMA,
                errors={"base": str(err)},
            )

        return self.async_create_entry(
            title=self._step1_data["name"],
            data=data,
        )
