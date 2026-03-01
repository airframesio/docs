---
sidebar_position: 4
---

# Acknowledgments

Airframes wouldn't be what it is without the people and projects that inspired and shaped it along the way. This page recognizes those who have made a significant impact on the project and the broader ACARS community.

## thebaldgeek (TBG)

[thebaldgeek](https://thebaldgeek.github.io/) has been a huge inspiration for the Airframes project. What started as a set of "rough help notes" for setting up ACARS reception hardware and software has grown into one of the most comprehensive community resources for aircraft data decoding across every major transmission medium — VHF ACARS, VDL2, HFDL, Inmarsat L-Band and C-Band SATCOM, and Iridium.

TBG's philosophy of learning by doing, sharing openly, and helping "those that try and help themselves" resonates deeply with what Airframes aims to be. His work demonstrated early on that it was possible to build rich, community-powered dashboards and maps from aggregated ACARS data — and that vision helped shape the direction of Airframes itself.

### TBG's Platforms on Airframes

TBG maintains several platforms hosted under the Airframes umbrella:

* **[tbg.airframes.io](https://tbg.airframes.io)** — A Node-RED Dashboard providing searchable live views of SATCOM ACARS, HFDL, and VHF/VDL feeds. Features mobile-optimized pages, satellite logon tracking, and near real-time message browsing.
* **[tbgmap.airframes.io](https://tbgmap.airframes.io)** — A real-time map plotting aircraft positions from ADSC and ACARS data, showing aircraft that wouldn't appear on ADS-B-only tracking services.
* **[tbgacarshub.airframes.io](https://tbgacarshub.airframes.io)** — Military aircraft tracking with synchronized position plots and ACARS messages.

These platforms showcase what's possible when you combine globally-sourced ACARS data with creative visualization, and they have a dedicated community discussion area at [community.airframes.io](https://community.airframes.io/c/acars-thebaldgeek/30).

### TBG's Documentation

The [thebaldgeek documentation site](https://thebaldgeek.github.io/) covers an extensive range of topics for anyone looking to get into ACARS reception:

* Inmarsat L-Band and C-Band satellite reception setup
* VHF ACARS and VDL2 reception
* HFDL reception with dumphfdl
* Iridium satellite decoding
* JAERO, SDR receivers, and Node-RED integration
* Raspberry Pi station builds
* MQTT data pipelines and Telegram bots
* Radiosonde tracking and UAV/drone monitoring

If you're looking to set up any kind of ACARS reception station — especially satellite-based feeds — TBG's documentation is an essential starting point.

## Community Contributors

The Airframes feeder network is built on the contributions of hundreds of volunteer feeders worldwide who run stations, report bugs, help others in the Discord, and push the boundaries of what's possible with commodity SDR hardware. The project thrives because of this community.

## Open Source Projects

Airframes also acknowledges the open source decoder projects that make ACARS reception possible:

* **[acarsdec](https://github.com/TLeconte/acarsdec)** — VHF ACARS decoder
* **[dumpvdl2](https://github.com/szpajder/dumpvdl2)** — VDL2 decoder
* **[dumphfdl](https://github.com/szpajder/dumphfdl)** — HFDL decoder
* **[JAERO](https://github.com/jontio/JAERO)** — Inmarsat AERO decoder
* **[iridium-toolkit](https://github.com/muccc/iridium-toolkit)** — Iridium frame parser and decoder by the Chaos Computer Club Munich
* **[iridium-sniffer](https://github.com/alphafox02/iridium-sniffer)** — Standalone Iridium burst detector and demodulator by Aaron (creator of DragonOS). A lightweight alternative to gr-iridium that runs on resource-constrained systems like the Raspberry Pi without requiring GNU Radio
* **[gr-iridium](https://github.com/muccc/gr-iridium)** — GNU Radio-based Iridium burst detector and demodulator
* **[satdump](https://github.com/SatDump/SatDump)** — General purpose satellite decoder
* **[ACARS Hub](https://github.com/sdr-enthusiasts/docker-acarshub)** — Docker-based ACARS multi-decoder by Fred Clausen and the SDR Enthusiasts community
* **[acars_router](https://github.com/sdr-enthusiasts/acars_router)** — Message router and deduplicator for ACARS feeds by the SDR Enthusiasts community
* **[libacars](https://github.com/szpajder/libacars)** — ACARS message decoding library by Tomasz Lemiech, used by dumpvdl2, dumphfdl, and acarsdec

These tools, built and maintained by dedicated developers, form the foundation that makes community-driven ACARS aggregation possible.
