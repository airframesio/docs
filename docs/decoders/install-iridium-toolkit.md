---
sidebar_position: 6
---

# Install iridium-toolkit

iridium-toolkit is a set of tools developed by the Chaos Computer Club Munich for parsing and decoding Iridium satellite frames. It works in conjunction with a demodulator (either gr-iridium or iridium-sniffer) that captures the raw Iridium bursts from the air.

## How the Iridium decoding pipeline works

Decoding ACARS over Iridium requires two components:

1. **A demodulator** that captures and demodulates Iridium satellite bursts:
   - **[iridium-sniffer](https://github.com/alphafox02/iridium-sniffer)** (recommended) — Lightweight standalone C program. No GNU Radio dependency, runs well on Raspberry Pi.
   - **[gr-iridium](https://github.com/muccc/gr-iridium)** — GNU Radio-based demodulator. More resource-intensive but well-established.

2. **iridium-toolkit** that parses the demodulated frames and extracts ACARS messages.

## Installation on Debian/Ubuntu

### Install dependencies

```bash
sudo apt-get install build-essential python3 python3-pip git
```

### Install iridium-toolkit

```bash
git clone https://github.com/muccc/iridium-toolkit.git
cd iridium-toolkit
pip3 install -r requirements.txt
```

### Install iridium-sniffer (recommended demodulator)

```bash
sudo apt-get install cmake libsoapysdr-dev soapysdr-module-rtlsdr
git clone https://github.com/alphafox02/iridium-sniffer.git
cd iridium-sniffer
mkdir build && cd build
cmake ..
make
sudo make install
```

iridium-sniffer supports: HackRF, BladeRF, USRP (UHD), and SoapySDR (including RTL-SDR).

### Alternative: Install gr-iridium

If you prefer the GNU Radio-based demodulator:

```bash
sudo apt-get install gnuradio gnuradio-dev
git clone https://github.com/muccc/gr-iridium.git
cd gr-iridium
mkdir build && cd build
cmake ..
make
sudo make install
sudo ldconfig
```

## Usage

### Capture and decode

The typical workflow pipes demodulated output from iridium-sniffer into iridium-toolkit:

```bash
iridium-sniffer -d driver=rtlsdr 2>/dev/null | python3 iridium-parser.py
```

### Docker option

A Docker container is available that bundles gr-iridium and iridium-toolkit together:

```bash
docker pull ghcr.io/jkrasuk/docker-gr-iridium-toolkit
```

See the [docker-gr-iridium-toolkit](https://github.com/jkrasuk/docker-gr-iridium-toolkit) repository for Docker Compose configuration.

## Hardware requirements

- **SDR**: Any SDR that can tune to the Iridium L-Band (1616–1626.5 MHz). Higher bandwidth SDRs (like HackRF at 20 MHz) capture more of the Iridium band simultaneously and will decode more bursts. An RTL-SDR works but has limited bandwidth (~2.4 MHz).
- **Antenna**: An omnidirectional L-Band antenna with clear sky visibility. A simple patch antenna or helical antenna works well.
- **LNA**: A low-noise amplifier for the 1.6 GHz range is recommended (e.g., Nooelec SAWbird+ IR).

:::note
Iridium decoding is more advanced than VHF ACARS or VDL2 reception. If you're just getting started with Airframes, consider starting with [acarsdec](/docs/decoders/install-acarsdec) or [dumpvdl2](/docs/decoders/install-dumpvdl2) first.
:::
