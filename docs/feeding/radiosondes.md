---
sidebar_position: 5
---

# Feeding Radiosondes (Weather Balloons)

Airframes shows weather balloon flights on its maps. Most of that data comes from [SondeHub](https://sondehub.org) (CC BY-SA 2.0). You can also feed balloons you receive straight to Airframes, so they are credited to your station.

Send balloon reports to **`feed.airframes.io`, UDP port `5573`**.

## radiosonde_auto_rx

[radiosonde_auto_rx](https://github.com/projecthorus/radiosonde_auto_rx) can send a "payload summary" packet for every decoded frame. In `station.cfg`:

```ini
[habitat]
# Your Airframes station ident (the name you registered on app.airframes.io).
uploader_callsign = XX-KSEA-SONDE

[oziplotter]
payload_summary_enabled = True
payload_summary_host = feed.airframes.io
payload_summary_port = 5573
```

Restart auto_rx. Keep SondeHub uploads on if you like. Airframes stores each balloon once, whichever copy arrives first.

auto_rx sends payload summaries to one host only. If you also use Chasemapper on your network, which listens for the same packets, run a small UDP relay that sends each packet to both.

## xng

xng's RS41 decoder feeds Airframes like its other modes:

```bash
xng --mode sonde --freq 403M --feed-airframes --station-id XX-KSEA-SONDE
```

In a station file, add `[outputs.airframes.sonde]` (with `auto-suffix = true`, the station id gets `-SONDE`).

## Your station

Reports are credited to the station ident you send. If no station has that ident yet, Airframes creates one on first contact. Claim it on [app.airframes.io](https://app.airframes.io) like any other station. If the ident already belongs to one of your non-balloon stations (for example your ACARS station), the reports go to `<ident>-SONDE` instead. Placeholder callsigns (`CHANGEME`, `N0CALL`, `auto_rx`) are credited to `SONDE-<a>-<d>`, made from your public address.

Balloon data is uncalibrated sensor data. Use it for tracking and interest only.
