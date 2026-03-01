---
sidebar_position: 5
---

# Install vdlm2dec

:::caution
vdlm2dec is an older VDL2 decoder that is no longer actively developed. For new installations, we recommend using [dumpvdl2](/docs/decoders/install-dumpvdl2) instead, which offers more features, flexible output options, and active maintenance.
:::

vdlm2dec is a lightweight VDL Mode 2 decoder. If you still need to use it, here are the installation steps for Ubuntu/Debian.

## Installation

### Install dependencies

```bash
sudo apt-get install build-essential cmake git libusb-1.0-0-dev librtlsdr-dev
```

### Install libacars

```bash
git clone https://github.com/szpajder/libacars.git
cd libacars
mkdir build && cd build
cmake ../
make
sudo make install
sudo ldconfig
```

### Build vdlm2dec

```bash
git clone https://github.com/TLeconte/vdlm2dec.git
cd vdlm2dec
mkdir build && cd build
cmake .. -Drtl=ON
make
sudo make install
```

## Basic Usage

```bash
vdlm2dec -j feed.airframes.io:5555 -i MY-STATION-VDL2 -r 0 -g 40 136975000
```

### Key options

| Option | Description |
|--------|-------------|
| `-r <device>` | RTL-SDR device number |
| `-g <gain>` | Tuner gain in dB |
| `-j <host:port>` | Send JSON via UDP |
| `-i <station_id>` | Station identifier |
| `-v` | Verbose output |

Frequencies are specified as trailing arguments in Hz.

## Migrating to dumpvdl2

dumpvdl2 is a drop-in improvement over vdlm2dec. The equivalent command would be:

```bash
dumpvdl2 --rtlsdr 0 --gain 40 \
  --output decoded:json:udp:address=feed.airframes.io,port=5552 \
  --station-id MY-STATION-VDL2 \
  136975000
```

See the [dumpvdl2 installation guide](/docs/decoders/install-dumpvdl2) for the complete setup.
