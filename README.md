# Momentum

A [HACS](https://hacs.xyz) integration for Home Assistant that preserves a meaningful moment in time — a birth, a wedding, a milestone — by capturing the exact sky above you that night and displaying it on your dashboard alongside a living counter of how much time has passed.

## Features

- Sky map image fetched once from a [Celeste](https://celeste.app)-compatible API and stored locally (survives server outages)
- Elapsed time sensor updated daily: `"4 years 3 months 2 days"`
- Custom Lovelace card showing the sky map and elapsed time
- YAML and visual card editor support

## Installation

1. Install via HACS (add this repo as a custom repository)
2. Restart Home Assistant
3. Go to **Settings → Devices & Services → Add Integration → Momentum**
4. Follow the setup steps

## Configuration

The config flow collects:

1. **Name/message** — shown on the card (e.g. "El día que nació Lucía")
2. **Date and time (UTC)** — the moment to preserve
3. **Image source** — either generate via Celeste API (requires lat/lon) or provide a manual image URL

## Lovelace Card

```yaml
type: custom:momentum-card
entity: sensor.momentum_<slug>
```

## Requirements

- Home Assistant 2023.x or later
- HACS 1.x or later
