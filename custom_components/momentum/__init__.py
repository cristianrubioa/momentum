from __future__ import annotations

from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .image import delete_image

PLATFORMS = ["sensor"]
_CARD_URL = "/momentum/momentum-card.js"
_REGISTERED = False


async def async_setup(hass: HomeAssistant, _config: dict) -> bool:
    global _REGISTERED
    if not _REGISTERED:
        bundle = Path(__file__).parent / "momentum-card.js"
        if bundle.exists():
            hass.http.register_static_path(_CARD_URL, str(bundle), cache_headers=False)
            _REGISTERED = True
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    delete_image(hass, entry.entry_id)
