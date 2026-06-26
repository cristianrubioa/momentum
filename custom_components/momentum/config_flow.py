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

STEP2_API_SCHEMA = vol.Schema(
    {
        vol.Required("image_source", default="api"): vol.In(["api", "manual"]),
        vol.Optional("server_url", default="https://api.celeste.crubio.fyi"): str,
        vol.Optional("lat"): str,
        vol.Optional("lon"): str,
        vol.Optional("image_url"): str,
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
    source = data.get("image_source", "api")
    if source == "api":
        if not data.get("lat", "").strip():
            errors["lat"] = "required"
        if not data.get("lon", "").strip():
            errors["lon"] = "required"
        if not data.get("server_url", "").strip():
            errors["server_url"] = "required"
    elif source == "manual":
        if not data.get("image_url", "").strip():
            errors["image_url"] = "required"
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
                return await self.async_step_image_source()

        return self.async_show_form(
            step_id="user",
            data_schema=STEP1_SCHEMA,
            errors=errors,
        )

    async def async_step_image_source(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}

        if user_input is not None:
            errors = _validate_step2(user_input)
            if not errors:
                return await self._create_entry(user_input)

        return self.async_show_form(
            step_id="image_source",
            data_schema=STEP2_API_SCHEMA,
            errors=errors,
        )

    async def _create_entry(self, image_data: dict[str, Any]) -> ConfigFlowResult:
        data = {**self._step1_data, **image_data}

        if image_data.get("image_source") == "api":
            try:
                local_url = await fetch_and_save_image(
                    hass=self.hass,
                    entry_id=self.flow_id,
                    server_url=image_data["server_url"],
                    lat=image_data["lat"],
                    lon=image_data["lon"],
                    date=self._step1_data["date"],
                    time=self._step1_data["time"],
                )
                data["image_local_url"] = local_url
            except ImageFetchError as err:
                return self.async_show_form(
                    step_id="image_source",
                    data_schema=STEP2_API_SCHEMA,
                    errors={"base": str(err)},
                )

        return self.async_create_entry(
            title=self._step1_data["name"],
            data=data,
        )
