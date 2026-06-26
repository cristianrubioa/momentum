from __future__ import annotations

from pathlib import Path

import aiohttp
from homeassistant.core import HomeAssistant


class ImageFetchError(Exception):
    """Raised when the sky map image cannot be fetched."""


async def fetch_and_save_image(
    hass: HomeAssistant,
    entry_id: str,
    server_url: str,
    lat: str,
    lon: str,
    date: str,
    time: str,
) -> str:
    """Fetch SVG from the Celeste API and save it locally. Returns the local path."""
    dt = f"{date}T{time}:00Z"
    url = f"{server_url.rstrip('/')}/api/sky.svg?lat={lat}&lon={lon}&dt={dt}"

    www_dir = Path(hass.config.path("www")) / "momentum"
    await hass.async_add_executor_job(lambda: www_dir.mkdir(parents=True, exist_ok=True))
    dest = www_dir / f"{entry_id}.svg"

    timeout = aiohttp.ClientTimeout(total=20)
    try:
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.get(url) as resp:
                if resp.status != 200:
                    raise ImageFetchError("api_error")
                content = await resp.read()
    except aiohttp.ServerTimeoutError as err:
        raise ImageFetchError("timeout") from err
    except TimeoutError as err:
        raise ImageFetchError("timeout") from err
    except aiohttp.ClientConnectorError as err:
        raise ImageFetchError("cannot_connect") from err

    await hass.async_add_executor_job(dest.write_bytes, content)
    return f"/local/momentum/{entry_id}.svg"


def local_image_path(hass: HomeAssistant, entry_id: str) -> Path:
    return Path(hass.config.path("www")) / "momentum" / f"{entry_id}.svg"


async def delete_image(hass: HomeAssistant, entry_id: str) -> None:
    """Remove the locally stored SVG file if it exists."""
    path = local_image_path(hass, entry_id)
    await hass.async_add_executor_job(_unlink_if_exists, path)


def _unlink_if_exists(path: Path) -> None:
    if path.exists():
        path.unlink()
