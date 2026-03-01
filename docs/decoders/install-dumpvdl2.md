---
sidebar_position: 3
---

# Install and Configure dumpvdl2

dumpvdl2 is a VDL Mode 2 message decoder and protocol analyzer. It is the recommended decoder for VDL2 and supports multiple simultaneous channels with flexible output options.

## Installation on Debian/Ubuntu

### Install dependencies

```bash
sudo apt-get install build-essential cmake git pkg-config libglib2.0-dev librtlsdr-dev
```

### Install libacars (required)

```bash
git clone https://github.com/szpajder/libacars.git
cd libacars
mkdir build && cd build
cmake ../
make
sudo make install
sudo ldconfig
```

### Build dumpvdl2

```bash
git clone https://github.com/szpajder/dumpvdl2.git
cd dumpvdl2
mkdir build && cd build
cmake ../
make
sudo make install
```

Optional build flags:
- `-DRTLSDR=TRUE` — RTL-SDR support (enabled by default if librtlsdr is found)
- `-DMIRISDR=TRUE` — Mirics SDR support
- `-DSDRPLAY=TRUE` — SDRplay support
- `-DSOAPYSDR=TRUE` — SoapySDR support
- `-DSQLITE=TRUE` — Aircraft database enrichment
- `-DZMQ=TRUE` — ZeroMQ output support (install `libzmq3-dev` first)

### Quick install via script

An alternative to building from source is wiedehopf's install script:

```bash
bash -c "$(wget -q -O - https://raw.githubusercontent.com/wiedehopf/adsb-wiki/main/dumpvdl2-install.sh)"
```

## Configuration

### Basic usage

```bash
dumpvdl2 --rtlsdr 0 --gain 40 --correction 0 \
  --output decoded:json:udp:address=feed.airframes.io,port=5552 \
  --station-id MY-STATION-VDL2 \
  136975000
```

### Key command-line options

| Option | Description |
|--------|-------------|
| `--rtlsdr <device>` | Use RTL-SDR device (by index or serial number) |
| `--sdrplay <device>` | Use SDRplay device |
| `--soapysdr <device>` | Use SoapySDR device |
| `--gain <dB>` | Tuner gain in dB |
| `--correction <ppm>` | Frequency correction in PPM |
| `--centerfreq <freq>` | Set center frequency (useful to avoid DC spike) |
| `--station-id <id>` | Station identifier for output messages |
| `--output <spec>` | Output configuration (see below) |

Frequencies are specified as trailing arguments in Hz (e.g., `136975000`) or with suffixes (`136.975M`).

### Output configuration

dumpvdl2 uses a flexible output system with the syntax:

```
--output <what>:<format>:<transport>:<parameters>
```

**Formats:**
- `text` — Human-readable text
- `json` — JSON format (required for Airframes)

**Transports:**
- `file:path=/path/to/file` — Write to file (supports `rotate=hourly` or `rotate=daily`)
- `udp:address=<host>,port=<port>` — Send via UDP
- `tcp:address=<host>,port=<port>` — Send via TCP
- `zmq:mode=<client|server>,endpoint=<endpoint>` — ZeroMQ pub/sub

Multiple `--output` flags can be used simultaneously.

### Feeding to Airframes

```bash
dumpvdl2 --rtlsdr 0 --gain 40 \
  --output decoded:json:udp:address=feed.airframes.io,port=5552 \
  --station-id MY-STATION-VDL2 \
  136650000 136700000 136800000 136975000
```

You can feed to Airframes and log locally at the same time:

```bash
dumpvdl2 --rtlsdr 0 --gain 40 \
  --output decoded:json:udp:address=feed.airframes.io,port=5552 \
  --output decoded:text:file:path=/var/log/vdl2.log,rotate=daily \
  --station-id MY-STATION-VDL2 \
  136650000 136700000 136800000 136975000
```

## Common VDL2 Frequencies

### North America

| Frequency | Provider |
|-----------|----------|
| 136.650 MHz | ARINC |
| 136.700 MHz | ARINC |
| 136.800 MHz | SITA |
| 136.975 MHz | Common Signalling Channel (worldwide) |

Recommended: `136650000 136700000 136800000 136975000`

### Europe

| Frequency | Provider |
|-----------|----------|
| 136.725 MHz | ARINC |
| 136.775 MHz | SITA |
| 136.825 MHz | ARINC |
| 136.875 MHz | SITA |
| 136.975 MHz | Common Signalling Channel (worldwide) |

Recommended: `136725000 136775000 136825000 136875000 136975000`

### Asia-Pacific

| Frequency | Provider |
|-----------|----------|
| 136.700 MHz | ARINC |
| 136.750 MHz | SITA |
| 136.975 MHz | Common Signalling Channel (worldwide) |

### Middle East

| Frequency | Provider |
|-----------|----------|
| 136.750 MHz | SITA |
| 136.975 MHz | Common Signalling Channel (worldwide) |

:::tip
136.975 MHz is the VDL2 Common Signalling Channel (CSC) and should always be included. Check the [Airframes stations page](https://app.airframes.io/stations) to see what frequencies work for feeders in your area.
:::

## Running as a Service

```bash
sudo tee /etc/systemd/system/dumpvdl2.service << 'EOF'
[Unit]
Description=dumpvdl2 VDL2 decoder
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/dumpvdl2 --rtlsdr 0 --gain 40 --output decoded:json:udp:address=feed.airframes.io,port=5552 --station-id MY-STATION-VDL2 136650000 136700000 136800000 136975000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable dumpvdl2
sudo systemctl start dumpvdl2
```

## Verifying Your Feed

Visit the [Airframes stations page](https://app.airframes.io/stations) and search for your station ID. VDL2 typically produces a higher volume of messages than VHF ACARS, so you should see activity fairly quickly near busy airports.
