---
sidebar_position: 3
---

# How to Feed

Feeding requires that you have active reception of aviation data (coming from aircraft, ground stations, etc) already using one or more SDRs.

## Airframes Installers (Recommended for Beginners)

The easiest way to get started is the [Airframes Installers](https://install.airframes.sh), which provide one-command setup for ACARS, VDL2, and HFDL decoders on Linux, macOS, and Windows (via WSL):

```bash
curl -sSL https://install.airframes.sh/installer | bash
```

The installer will walk you through selecting your decoder type, configuring your SDR, and setting up feeding to Airframes.

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
| HFDL | UDP | feed.airframes.io | 5556 |

See the individual decoder guides for the exact command-line flags:
- [acarsdec](/docs/decoders/install-acarsdec) — Use `-j feed.airframes.io:5550`
- [dumpvdl2](/docs/decoders/install-dumpvdl2) — Use `--output decoded:json:udp:address=feed.airframes.io,port=5552`
- [dumphfdl](/docs/decoders/install-dumphfdl) — Use `--output decoded:json:udp:address=feed.airframes.io,port=5556`

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
