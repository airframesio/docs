---
sidebar_position: 1
---

# Introduction to Airwaves OS

:::caution Work in Progress
Airwaves OS is under active development. Some features described here are planned but not yet available. Check the [download](/docs/aros/download) page for the latest release status.
:::

**Airwaves OS** (AROS) is a custom operating system based on Debian Linux, purpose-built for interacting with [Airframes](https://airframes.io) and other aggregation services. It is designed for low-power embedded systems like the Raspberry Pi, but also runs on standard x86 PCs and mini PCs.

The goal of AROS is to eliminate the complexity of manually installing and configuring decoder software, SDR drivers, and feed destinations. Instead of following multi-step guides for each decoder, you get a turnkey system that handles everything through a web interface.

## Features

**Airwaves OS** provides:

- **Easy installation** — Flash an image, boot, and configure via the web UI
- **Web-based configuration & management** — No command-line knowledge required for day-to-day operation
- **Simplified updating and upgrading** — System and decoder updates managed through the dashboard
- **Dashboard** — Real-time view of your station's activity, message counts, and system health
- **Broad SDR support** — Works with RTL-SDR, Airspy, SDRplay, LimeSDR, and more
- **Multiple simultaneous SDRs** — Run as many SDRs as your hardware supports (e.g., one for ACARS, one for VDL2, one for HFDL)
- **Customizable outputs** — Send decoded data to log files, other AROS nodes, or aggregation services like Airframes
- **Multiple outputs per feed** — A single decoder can feed Airframes, a local logger, and other services simultaneously
- **App catalog** — Install additional radio-related software from a curated catalog
