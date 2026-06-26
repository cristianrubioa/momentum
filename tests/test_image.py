"""Tests for image fetch and storage."""
from __future__ import annotations

from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import aiohttp
import pytest

from custom_components.momentum.image import fetch_and_save_image, delete_image, ImageFetchError


def _make_hass(tmp_path: Path) -> MagicMock:
    hass = MagicMock()
    hass.config.path = lambda *parts: str(tmp_path.joinpath(*parts))
    return hass


@pytest.mark.asyncio
async def test_fetch_saves_file(tmp_path: Path):
    hass = _make_hass(tmp_path)
    svg_content = b"<svg></svg>"

    mock_resp = AsyncMock()
    mock_resp.status = 200
    mock_resp.read = AsyncMock(return_value=svg_content)
    mock_resp.__aenter__ = AsyncMock(return_value=mock_resp)
    mock_resp.__aexit__ = AsyncMock(return_value=False)

    mock_session = AsyncMock()
    mock_session.get = MagicMock(return_value=mock_resp)
    mock_session.__aenter__ = AsyncMock(return_value=mock_session)
    mock_session.__aexit__ = AsyncMock(return_value=False)

    with patch("custom_components.momentum.image.aiohttp.ClientSession", return_value=mock_session):
        path = await fetch_and_save_image(
            hass=hass,
            entry_id="abc123",
            server_url="https://api.celeste.app",
            lat="40.7128",
            lon="-74.0060",
            date="2020-06-15",
            time="18:30",
        )

    assert path == "/local/momentum/abc123.svg"
    saved = (tmp_path / "www" / "momentum" / "abc123.svg").read_bytes()
    assert saved == svg_content


@pytest.mark.asyncio
async def test_non_200_raises_error(tmp_path: Path):
    hass = _make_hass(tmp_path)

    mock_resp = AsyncMock()
    mock_resp.status = 404
    mock_resp.__aenter__ = AsyncMock(return_value=mock_resp)
    mock_resp.__aexit__ = AsyncMock(return_value=False)

    mock_session = AsyncMock()
    mock_session.get = MagicMock(return_value=mock_resp)
    mock_session.__aenter__ = AsyncMock(return_value=mock_session)
    mock_session.__aexit__ = AsyncMock(return_value=False)

    with patch("custom_components.momentum.image.aiohttp.ClientSession", return_value=mock_session):
        with pytest.raises(ImageFetchError, match="api_error"):
            await fetch_and_save_image(
                hass=hass, entry_id="abc", server_url="https://api.celeste.app",
                lat="0", lon="0", date="2020-01-01", time="00:00",
            )


@pytest.mark.asyncio
async def test_timeout_raises_error(tmp_path: Path):
    hass = _make_hass(tmp_path)

    mock_resp = AsyncMock()
    mock_resp.__aenter__ = AsyncMock(side_effect=aiohttp.ServerTimeoutError())
    mock_resp.__aexit__ = AsyncMock(return_value=False)

    mock_session = AsyncMock()
    mock_session.get = MagicMock(return_value=mock_resp)
    mock_session.__aenter__ = AsyncMock(return_value=mock_session)
    mock_session.__aexit__ = AsyncMock(return_value=False)

    with patch("custom_components.momentum.image.aiohttp.ClientSession", return_value=mock_session):
        with pytest.raises(ImageFetchError, match="timeout"):
            await fetch_and_save_image(
                hass=hass, entry_id="abc", server_url="https://api.celeste.app",
                lat="0", lon="0", date="2020-01-01", time="00:00",
            )


def test_delete_removes_file(tmp_path: Path):
    hass = _make_hass(tmp_path)
    svg_dir = tmp_path / "www" / "momentum"
    svg_dir.mkdir(parents=True)
    svg_file = svg_dir / "abc123.svg"
    svg_file.write_bytes(b"<svg></svg>")

    delete_image(hass, "abc123")

    assert not svg_file.exists()


def test_delete_noop_if_missing(tmp_path: Path):
    hass = _make_hass(tmp_path)
    # Should not raise even if file doesn't exist
    delete_image(hass, "nonexistent")
