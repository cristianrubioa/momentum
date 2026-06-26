"""Tests for SVG cleanup on entry removal."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock

import pytest

from custom_components.momentum.image import delete_image


def _make_hass(tmp_path: Path) -> MagicMock:
    hass = MagicMock()
    hass.config.path = lambda *parts: str(tmp_path.joinpath(*parts))

    async def _executor(func, *args):
        return func(*args)

    hass.async_add_executor_job = _executor
    return hass


@pytest.mark.asyncio
async def test_cleanup_removes_svg_on_entry_removal(tmp_path: Path):
    hass = _make_hass(tmp_path)
    svg_dir = tmp_path / "www" / "momentum"
    svg_dir.mkdir(parents=True)
    svg_file = svg_dir / "entry_xyz.svg"
    svg_file.write_bytes(b"<svg>sky</svg>")

    assert svg_file.exists()
    await delete_image(hass, "entry_xyz")
    assert not svg_file.exists()


@pytest.mark.asyncio
async def test_cleanup_noop_when_no_file(tmp_path: Path):
    hass = _make_hass(tmp_path)
    await delete_image(hass, "ghost_entry")
