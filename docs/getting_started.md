---
sidebar_position: 2
---

# Getting Started

This guide will help you go from zero to feeding ACARS data to Airframes.

If you're not yet familiar with aircraft tracking and the technologies it involves, it is suggested that you read the [Technology Overview](/docs/technology/overview) and [What is Feeding?](/docs/feeding/what) first.

## Quick Start

The fastest path from unboxing to feeding:

1. **Get an RTL-SDR dongle and antenna** — An [RTL-SDR Blog V4](https://www.rtl-sdr.com/rtl-sdr-blog-v-4/) or [ADSBExchange Orange SDR](/docs/hardware) and a basic VHF antenna will work.
2. **Set up a Raspberry Pi or Linux computer** — Any Raspberry Pi 3 or newer, or an x86 Linux machine.
3. **Run the Airframes installer:**
   ```bash
   curl -sSL https://install.airframes.sh/installer | bash
   ```
4. **Verify your feed** — Visit [app.airframes.io/stations](https://app.airframes.io/stations) and search for your station ID.

That's it — you're feeding!

## Choosing Your Path

There are several ways to set up your station depending on your experience level and preferences:

### Path 1: Airframes Installers (Easiest)

The [Airframes Installers](https://install.airframes.sh) provide one-command setup for ACARS, VDL2, and HFDL decoders. Works on Linux, macOS, and Windows (via WSL). Best for getting started quickly.

### Path 2: Docker with ACARS Hub

[ACARS Hub](/docs/feeding/Docker) is a Docker-based setup that runs decoders in containers and provides a local web dashboard showing your received messages. Best for users comfortable with Docker who want a visual interface and easy management of multiple decoders.

### Path 3: Manual Installation

Build and configure each decoder from source. This gives you the most control and is best for experienced users who want to fine-tune everything. See the individual decoder guides:
- [acarsdec](/docs/decoders/install-acarsdec) for VHF ACARS
- [dumpvdl2](/docs/decoders/install-dumpvdl2) for VDL2
- [dumphfdl](/docs/decoders/install-dumphfdl) for HFDL

### Path 4: AirwavesOS

[AirwavesOS](/docs/aros/introduction) is a custom Debian-based OS image for Raspberry Pi that comes with everything pre-installed. Flash, boot, configure via web UI, and you're done. *(In development.)*

## Steps to Begin

1. **[Determine what kind of system you want to set up](/docs/technology/receiver-systems)** — Start with a single SDR for VHF ACARS or VDL2, then expand.
2. **[Acquire the parts](/docs/hardware)** — An SDR, antenna, and a computer to run it on.
3. **Install the software** — Use one of the paths above.
4. **Configure frequencies for your region** — Each decoder guide includes region-specific frequency lists.
5. **Feed to Airframes** — Point your decoder output at the [Airframes ingest endpoints](/docs/feeding/how#direct-feeding-from-decoders).
6. **Verify on [app.airframes.io](https://app.airframes.io/stations)** — Confirm your station is appearing and messages are being received.
7. **[Explore the data](/docs/using-airframes)** — Browse messages, flights, and stations on the Airframes web app.

## Need Help?

- Check the [Troubleshooting](/docs/troubleshooting) guide for common issues and solutions
- Visit the [Airframes Discord](https://discord.gg/airframes) or [Community Forum](https://community.airframes.io) for support
- Browse the [Glossary](/docs/glossary) if you encounter unfamiliar terms
