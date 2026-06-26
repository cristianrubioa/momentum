"""Stub out homeassistant imports so unit tests run without a full HA install."""
from __future__ import annotations

import sys
import types


def _make_module(name: str, **attrs) -> types.ModuleType:
    mod = types.ModuleType(name)
    mod.__dict__.update(attrs)
    return mod


# --- homeassistant.core ---
class HomeAssistant:
    pass

ha_core = _make_module("homeassistant.core", HomeAssistant=HomeAssistant)

# --- homeassistant.config_entries ---
class ConfigEntry:
    pass

class ConfigFlow:
    def __init_subclass__(cls, domain: str = "", **kw):
        super().__init_subclass__(**kw)

    async def async_show_form(self, *, step_id, data_schema, errors=None):
        pass

    async def async_create_entry(self, *, title, data):
        pass

ConfigFlowResult = dict

ha_config_entries = _make_module(
    "homeassistant.config_entries",
    ConfigEntry=ConfigEntry,
    ConfigFlow=ConfigFlow,
    ConfigFlowResult=ConfigFlowResult,
)

# --- homeassistant.components.sensor ---
class SensorEntity:
    _attr_native_value = None
    _attr_extra_state_attributes: dict = {}
    _attr_has_entity_name = False
    _attr_name = ""
    _attr_unique_id = ""

    def async_write_ha_state(self):
        pass

ha_sensor = _make_module("homeassistant.components.sensor", SensorEntity=SensorEntity)
ha_components = _make_module("homeassistant.components")

# --- homeassistant.helpers ---
class AddEntitiesCallback:
    pass

ha_helpers_entity_platform = _make_module(
    "homeassistant.helpers.entity_platform",
    AddEntitiesCallback=AddEntitiesCallback,
)

def async_track_time_change(hass, action, *, hour, minute, second):
    def unsub():
        pass
    return unsub

ha_helpers_event = _make_module(
    "homeassistant.helpers.event",
    async_track_time_change=async_track_time_change,
)

ha_helpers = _make_module("homeassistant.helpers")

# --- register all stubs ---
stubs = {
    "homeassistant": _make_module("homeassistant"),
    "homeassistant.core": ha_core,
    "homeassistant.config_entries": ha_config_entries,
    "homeassistant.components": ha_components,
    "homeassistant.components.sensor": ha_sensor,
    "homeassistant.helpers": ha_helpers,
    "homeassistant.helpers.entity_platform": ha_helpers_entity_platform,
    "homeassistant.helpers.event": ha_helpers_event,
}

for name, mod in stubs.items():
    if name not in sys.modules:
        sys.modules[name] = mod
