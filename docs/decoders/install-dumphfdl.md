---
sidebar_position: 4
---

# Install and Configure dumphfdl

dumphfdl is a multichannel HFDL decoder that receives ACARS messages, ADS-C position reports, and CPDLC communications from aircraft via High Frequency radio. HFDL provides coverage over oceans and remote areas where VHF signals don't reach.

## Installation on Debian/Ubuntu

### Install dependencies

```bash
sudo apt-get install build-essential cmake git pkg-config libglib2.0-dev libconfig++-dev libliquid-dev libfftw3-dev
```

For SoapySDR hardware support:

```bash
sudo apt-get install libsoapysdr-dev
```

For ZeroMQ output support:

```bash
sudo apt-get install libzmq3-dev
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

### Build dumphfdl

```bash
git clone https://github.com/szpajder/dumphfdl.git
cd dumphfdl
mkdir build && cd build
cmake ../
make
sudo make install
```

## Configuration

### Basic usage

HFDL frequencies are specified in kHz:

```bash
dumphfdl --soapysdr driver=rtlsdr --sample-rate 250000 \
  --output decoded:json:udp:address=feed.airframes.io,port=5556 \
  --station-id MY-STATION-HFDL \
  8927 8912 8894 8885 8834
```

### Key command-line options

| Option | Description |
|--------|-------------|
| `--soapysdr <driver>` | SoapySDR device string (e.g., `driver=rtlsdr`) |
| `--sample-rate <rate>` | Sample rate in Hz (required) |
| `--gain <dB>` | Tuner gain in dB |
| `--gain-elements <spec>` | Per-stage gain (e.g., `IFGR=54,RFGR=0`) |
| `--freq-correction <ppm>` | Frequency correction in PPM |
| `--centerfreq <freq>` | Center frequency in Hz (auto-calculated if omitted) |
| `--station-id <id>` | Station identifier for output |
| `--output <spec>` | Output configuration (same syntax as dumpvdl2) |

### Output configuration

dumphfdl uses the same output syntax as dumpvdl2:

```
--output <what>:<format>:<transport>:<parameters>
```

Examples:
- `decoded:json:udp:address=feed.airframes.io,port=5556` — Feed to Airframes
- `decoded:text:file:path=/var/log/hfdl.log,rotate=hourly` — Log to file
- `decoded:json:zmq:mode=server,endpoint=tcp://0.0.0.0:45556` — ZeroMQ output

### Feeding to Airframes

```bash
dumphfdl --soapysdr driver=rtlsdr --sample-rate 250000 --gain 42 \
  --output decoded:json:udp:address=feed.airframes.io,port=5556 \
  --station-id MY-STATION-HFDL \
  8927 8912 8894 8885 8834
```

## HFDL Ground Stations and Frequencies

HFDL uses a global network of ground stations, each operating on multiple HF frequencies. Active frequencies change throughout the day based on ionospheric propagation conditions. Generally, lower frequencies work better at night and higher frequencies during the day.

### Frequency selection tips

- Use [hfdl.observer](https://hfdl.observer) to see which ground stations and frequencies are currently active in real-time
- Focus on ground stations within your reception range (HFDL signals travel far, but closer stations are stronger)
- A bandwidth of 250 kHz can cover approximately 5–8 channels on a single ground station
- Multiple SDRs can monitor multiple ground stations simultaneously

### Example frequency sets

**North Atlantic / Shannon (ground station near you in eastern North America or western Europe):**

```
8942 8957 8927 8912 8885
```

**North Pacific (western North America):**

```
8927 8912 8894 8885 8834
```

:::tip
The [hfdl.observer](https://hfdl.observer) website and the [HFDLObserver](https://github.com/hfdl-observer/hfdlobserver) software can automatically retrieve and update active frequency lists, which is helpful since HFDL ground stations change their active frequencies regularly.
:::

## Running as a Service

```bash
sudo tee /etc/systemd/system/dumphfdl.service << 'EOF'
[Unit]
Description=dumphfdl HFDL decoder
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/dumphfdl --soapysdr driver=rtlsdr --sample-rate 250000 --gain 42 --output decoded:json:udp:address=feed.airframes.io,port=5556 --station-id MY-STATION-HFDL 8927 8912 8894 8885 8834
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable dumphfdl
sudo systemctl start dumphfdl
```

## Verifying Your Feed

Visit the [Airframes stations page](https://app.airframes.io/stations) and search for your station ID. HFDL message volume depends heavily on time of day, propagation conditions, and how many aircraft are using the ground station you're monitoring.
