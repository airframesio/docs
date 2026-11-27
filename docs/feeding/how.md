---
sidebar_position: 3
---

# How to Feed

Feeding requires that you have active reception of aviation data (coming from aircraft, ground stations, etc) already using one or more SDRs.

## Airframes Installers (Recommended for Beginners)

The easiest way to get started is the [Airframes Installers](https://install.airframes.sh). Run this in a terminal on the machine your SDR is plugged into (Linux, macOS, or Windows via WSL):

```bash
curl -sSL https://install.airframes.sh/installer | bash
```

By default it sets up **[xng](https://github.com/airframesio/xng)**. One xng process gives every SDR a job (ACARS, VDL2, HFDL, AIS, airband voice or ADS-B) and feeds each mode to Airframes. The installer:

- signs you in with a code you enter at [app.airframes.io/device](https://app.airframes.io/device) on any phone or computer, and puts the station on your account right away
- reads your receiver position from PiAware or readsb if they are installed, or asks for it
- asks what each SDR should do, and leaves a dongle your ADS-B decoder already uses alone
- offers airband channels from the Airframes ATC directory near you
- runs xng as the `xng-station` systemd service (check it with `systemctl status xng-station`), or in Docker when the xng build doesn't run on your system, such as a 32-bit Pi

The xng dashboard is at `http://<your-machine>:8080` (or the next free port, such as 8081 on a PiAware box, where SkyAware uses 8080; the installer prints it). Your feeds show up as `STATION-ACARS`, `STATION-VDL2`, and so on. At the end, the installer checks that xng is running and shows what each SDR is decoding. If xng doesn't start, it shows the log and what usually fixes it.

#### Checking, updating and removing

```bash
# Check the station; paste the report in Discord if you need help (it has no passwords or tokens)
curl -sSL https://install.airframes.sh/installer | bash -s -- status

# Update xng to the latest release, keeping its configuration and sign-in
curl -sSL https://install.airframes.sh/installer | bash -s -- update

# Remove xng (add --purge to also remove /etc/xng and the sign-in)
curl -sSL https://install.airframes.sh/installer | bash -s -- uninstall
```

To change what each SDR does, run the installer again.

To skip the questions (for example over SSH without a terminal, or in a script), use `-y xng`. Add `--sign-in` to link the station to your account (it still shows the code and waits for you), and `--modes` to choose each SDR's job by serial or number:

```bash
curl -sSL https://install.airframes.sh/installer | bash -s -- -y xng --sign-in --modes "0=acars,1=vdl2"
```

The separate decoders are still available: pick them in the menu, or name one (`acarsdec`, `dumpvdl2`, `dumphfdl`, `vdlm2dec`, `all`):

```bash
curl -sSL https://install.airframes.sh/installer | bash -s -- -y acarsdec --station-id MY-STATION
```

On Linux this installs acarsdec and starts it as the `airframes-acarsdec` systemd service. Use the Station ID from your station's page on [app.airframes.io](https://app.airframes.io); without it, your feed shows up as an anonymous station.

Everything after `bash -s --` is passed to the installer. Useful options:

| Option | What it does |
|--------|--------------|
| `-y` | Don't ask for confirmation |
| `--sign-in` / `--no-sign-in` | xng: sign in to Airframes even with `-y`, or don't sign in |
| `--modes "0=acars,1=vdl2"` | xng: job per SDR (by serial or number): `acars`, `vdl2`, `hfdl`, `airband`, `ais`, `adsb`, `uat`, `sonde`, `iridium` or `off` |
| `--airband "120.500,119.100"` | xng: airband channels from the Airframes ATC directory, or `nearest` |
| `--xng-method docker` | xng: `native` or `docker` (default: native, else Docker) |
| `--lat 38.68 --lon -120.99` | Receiver position |
| `--station-id MY-STATION` | Your Station ID from app.airframes.io |
| `--region north_america` | Default frequencies for `north_america`, `europe`, `asia_pacific` or `global` |
| `--sdr airspy` | SDR type: `rtlsdr` (default), `airspy` or `sdrplay` |
| `--device 00000002` | Which RTL-SDR to use, by index or serial |
| `--method docker` | Install with `binary` (default), `source` or `docker` |
| `--no-service` | Only print the command to run, don't create a service |
| `--help` | All options |

### ADS-B

Airframes doesn't ingest ADS-B itself; ADS-B goes to Airframes' partner networks, [Airplanes.Live](https://airplanes.live) and [Plane Watch](https://plane.watch). The installer sets that up too: pick **ADS-B** in the menu, or name `adsb`:

```bash
curl -sSL https://install.airframes.sh/installer | bash -s -- -y adsb --lat 38.68001 --lon -120.99436 --alt 120m
```

- **Already running PiAware, readsb, ultrafeeder or another ADS-B decoder?** The installer feeds the partners from it (port 30005) and leaves it as it is.
- **No ADS-B decoder yet?** It installs readsb (or ADS-B Ultrafeeder with `--method docker`) on an SDR of its own.
- Airplanes.Live is set up with their feed client, including MLAT. For Plane Watch, create a feeder at [atc.plane.watch](https://atc.plane.watch) and pass `--planewatch-key <key>` (it runs in Docker).
- `--lat`, `--lon` and `--alt` (in `m` or `ft`) give the antenna position for MLAT; it's never shown exactly. `--mlat-name` sets the name on the MLAT map. In a terminal, the installer asks for these.

ACARS, VDL2 and HFDL for Airframes need an SDR of their own (an unfiltered one, since ADS-B dongles are often filtered for 1090 MHz). On a machine that already feeds ADS-B, plug in a second SDR and pick a decoder. The installer tries to leave the ADS-B dongle alone: it reads the PiAware, dump1090 and readsb settings, and asks you which dongle to use when it can't tell (with `-y` it stops instead). Check the device it reports before you go on, and pass `--device <index|serial>` to choose one yourself. `rtl_test` lists the plugged-in RTL-SDRs with their serials.

## Docker with ACARS Hub (Recommended for Experienced Users)

[ACARS Hub](https://github.com/sdr-enthusiasts/docker-acarshub) by the SDR Enthusiasts community is a Docker-based system that runs multiple decoders and provides a local web dashboard for viewing your received messages. It uses `acars_router` to deduplicate messages and feed them to aggregation services like Airframes.

See [Feeding with Docker](Docker) for the complete setup guide.

## Feeder Clients

Feeder clients are small pieces of software, often in the form of scripts, that take the output from your receiver software and shuttle the data off to a remote server.

Some feeder clients are sophisticated, in that they might filter and optimize what data is sent. Other feeder clients simply send everything completely unfiltered.

### Direct feeding from decoders

Most modern decoders can feed Airframes directly without a separate feeder client. Here are the Airframes ingest endpoints:

| Data Type | Protocol | Endpoint | Port |
|-----------|----------|----------|------|
| VHF ACARS | UDP | feed.airframes.io | 5550 |
| VDL2 | UDP | feed.airframes.io | 5552 |
| VDL2 | TCP | feed.airframes.io | 5553 |
| HFDL | TCP | feed.airframes.io | 5556 |

See the individual decoder guides for the exact command-line flags:
- [acarsdec](/docs/decoders/install-acarsdec) — Use `-j feed.airframes.io:5550`
- [dumpvdl2](/docs/decoders/install-dumpvdl2) — Use `--output decoded:json:udp:address=feed.airframes.io,port=5552`
- [dumphfdl](/docs/decoders/install-dumphfdl) — Use `--output decoded:json:tcp:address=feed.airframes.io,port=5556`

## Manual Installation

For those who prefer to build and configure everything from scratch:

* **[thebaldgeek's documentation](https://thebaldgeek.github.io/)** — Comprehensive guides covering hardware setup, software configuration, and feeding for every ACARS medium (VHF, VDL, HFDL, Inmarsat L-Band/C-Band, and Iridium). TBG's documentation has been an inspiration for the Airframes project and remains one of the best community resources for getting started. Start here if you're unsure which path to take.
* [acarsdec](https://github.com/wiedehopf/adsb-wiki/wiki/acarsdec-install) via wiedehopf's install script
* [dumpvdl2](https://raw.githubusercontent.com/wiedehopf/adsb-wiki/main/dumpvdl2-install.sh) via wiedehopf's install script

## AirwavesOS (formerly Airframes Receiver OS / AROS)

If you are using the [AirwavesOS](https://docs.airframes.io/docs/aros), feeder clients are already installed for most services and ready for you to configure as an `Output`. You are able to feed multiple aggregation services. This will be the easiest way to get going for just about everyone.

*In development.*

## Other Distributions

If you are using an OS distribution from one of the other aggregation services, you will need to install and/or configure a feeding client in order to feed your data to these services. The rule of thumb is that the aggregator that put together the OS distribution will likely have already included their own feeder client, but you will likely need to add the feeder clients for any other aggregation service that you would like to feed to.
