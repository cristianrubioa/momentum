"""Tests for the Momentum config flow."""

from __future__ import annotations

from custom_components.momentum.config_flow import _validate_step1, _validate_step2

# --- Step 1 validation ---


def test_step1_valid():
    errors = _validate_step1({"name": "Boda", "date": "2020-06-15", "time": "18:30"})
    assert errors == {}


def test_step1_missing_name():
    errors = _validate_step1({"name": "", "date": "2020-06-15", "time": "18:30"})
    assert "name" in errors


def test_step1_invalid_date():
    errors = _validate_step1({"name": "Boda", "date": "15-06-2020", "time": "18:30"})
    assert "date" in errors


def test_step1_invalid_time():
    errors = _validate_step1({"name": "Boda", "date": "2020-06-15", "time": "6:30pm"})
    assert "time" in errors


# --- Step 2 validation ---


def test_step2_valid():
    errors = _validate_step2(
        {
            "server_url": "https://api.celeste.app",
            "lat": "40.7128",
            "lon": "-74.0060",
        }
    )
    assert errors == {}


def test_step2_missing_lat():
    errors = _validate_step2(
        {
            "server_url": "https://api.celeste.app",
            "lat": "",
            "lon": "-74.0060",
        }
    )
    assert "lat" in errors


def test_step2_missing_lon():
    errors = _validate_step2(
        {
            "server_url": "https://api.celeste.app",
            "lat": "40.7128",
            "lon": "",
        }
    )
    assert "lon" in errors


def test_step2_missing_server_url():
    errors = _validate_step2(
        {
            "server_url": "",
            "lat": "40.7128",
            "lon": "-74.0060",
        }
    )
    assert "server_url" in errors
