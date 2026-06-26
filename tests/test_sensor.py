"""Tests for the MomentoSensor elapsed time calculation."""

from __future__ import annotations

import datetime
from unittest.mock import MagicMock

from custom_components.momentum.sensor import MomentoSensor


def _make_entry(date: str, name: str = "Test", image_source: str = "api") -> MagicMock:
    entry = MagicMock()
    entry.entry_id = "test_id"
    entry.data = {
        "name": name,
        "date": date,
        "image_source": image_source,
        "image_url": "",
    }
    return entry


def _sensor_with_today(date: str, today: datetime.date) -> MomentoSensor:
    sensor = MomentoSensor(_make_entry(date))
    sensor._compute(today=today)
    return sensor


# --- State string ---


def test_more_than_one_year():
    today = datetime.date(2025, 9, 17)
    sensor = _sensor_with_today("2020-06-15", today)
    state = sensor._attr_native_value
    assert "year" in state
    assert "month" in state
    assert "day" in state


def test_less_than_one_year():
    today = datetime.date(2025, 9, 17)
    sensor = _sensor_with_today("2025-06-15", today)
    state = sensor._attr_native_value
    assert "year" not in state
    assert "month" in state
    assert "day" in state


def test_less_than_one_month():
    today = datetime.date(2025, 6, 20)
    sensor = _sensor_with_today("2025-06-15", today)
    state = sensor._attr_native_value
    assert "year" not in state
    assert "month" not in state
    assert "day" in state


def test_exact_years_zero_months_zero_days():
    today = datetime.date(2025, 6, 15)
    sensor = _sensor_with_today("2020-06-15", today)
    state = sensor._attr_native_value
    # 5 years exactly — months=0 days=0 should be omitted but years kept
    assert "5 years" in state
    assert "month" not in state
    assert "day" not in state


def test_singular_day():
    today = datetime.date(2025, 6, 16)
    sensor = _sensor_with_today("2025-06-15", today)
    state = sensor._attr_native_value
    assert state == "1 day"


# --- Attributes ---


def test_attributes_populated():
    today = datetime.date(2025, 9, 17)
    sensor = _sensor_with_today("2020-06-15", today)
    attrs = sensor._attr_extra_state_attributes
    assert isinstance(attrs["years"], int)
    assert isinstance(attrs["months"], int)
    assert isinstance(attrs["days"], int)
    assert isinstance(attrs["total_days"], int)
    assert attrs["total_days"] > 0
