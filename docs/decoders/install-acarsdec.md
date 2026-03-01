---
sidebar_position: 2
---

# Install and Configure acarsdec

acarsdec is a multi-channel VHF ACARS decoder. This guide covers installation, configuration, and feeding to Airframes.

## Installation on Debian/Ubuntu

### Install dependencies

```bash
sudo apt-get install build-essential cmake git libusb-1.0-0-dev librtlsdr-dev libxml2-dev zlib1g-dev pkg-config
```

### Install libacars (required for message decoding)

```bash
git clone https://github.com/szpajder/libacars.git
cd libacars
mkdir build && cd build
cmake ../
make
sudo make install
sudo ldconfig
```

### Build acarsdec

```bash
git clone https://github.com/TLeconte/acarsdec.git
cd acarsdec
mkdir build && cd build
cmake .. -Drtl=ON
make
sudo make install
```

Build options for other SDR hardware:
- Airspy: `cmake .. -Dairspy=ON`
- SDRplay: `cmake .. -Dsdrplay=ON`
- SoapySDR: `cmake .. -Dsoapy=ON`

## Configuration

### Basic usage

```bash
acarsdec -o 4 -j feed.airframes.io:5550 -i MY-STATION-ACARS -r 0 130.025 130.450 131.125 131.550
```

### Key command-line options

| Option | Description |
|--------|-------------|
| `-r <device> f1 f2 ...` | RTL-SDR device number followed by frequencies (MHz) |
| `-s <device> f1 f2 ...` | Airspy device number followed by frequencies |
| `-o <level>` | Output format: `0` none, `1` one-line, `2` full (default), `3` monitor, `4` JSON, `5` route JSON |
| `-j <host:port>` | Send JSON messages via UDP to the specified destination |
| `-i <station_id>` | Station identifier included in output messages |
| `-g <gain>` | Tuner gain in dB (use `-10` or values over `52` for AGC) |
| `-p <ppm>` | Frequency correction in PPM |
| `-A` | Only display aircraft (downlink) messages, not uplink |
| `-e` | Exclude empty messages |
| `-l <logfile>` | Log to file instead of stdout |
| `-H` | Rotate log file hourly |
| `-D` | Rotate log file daily |

### Feeding to Airframes

To feed VHF ACARS data to Airframes, use the `-j` flag with JSON output (`-o 4`):

```bash
acarsdec -o 4 -j feed.airframes.io:5550 -i MY-STATION-ACARS -g 42 -r 0 130.025 130.450 131.125 131.550
```

**Important parameters for feeding:**
- `-o 4` enables JSON output (required for Airframes)
- `-j feed.airframes.io:5550` sends data to the Airframes ACARS ingest (UDP port 5550)
- `-i MY-STATION-ACARS` identifies your station (see [Station ID format](#station-id-format) below)

### Station ID format

Your station ID helps identify your feed on Airframes. The recommended format is:

```
XX-YYYY-ACARS
```

Where:
- `XX` — Your initials or a personal identifier (e.g., `KE`)
- `YYYY` — The ICAO code of the nearest airport (e.g., `KSEA`)
- `ACARS` — The decoder type

Example: `KE-KSEA-ACARS`

## Common ACARS Frequencies

All frequencies must be within the same 2 MHz band. Up to 8 channels can be decoded simultaneously.

### North America

| Frequency | Provider |
|-----------|----------|
| 129.125 MHz | ARINC (USA/Canada) |
| 130.025 MHz | ARINC (USA/Canada) |
| 130.425 MHz | ARINC (USA) |
| 130.450 MHz | ARINC (USA/Canada) |
| 131.125 MHz | ARINC (USA) |
| 131.550 MHz | ARINC (USA/Canada) |

Recommended North America set: `130.025 130.425 130.450 131.125 131.550`

### Europe

| Frequency | Provider |
|-----------|----------|
| 131.525 MHz | SITA |
| 131.725 MHz | SITA (primary) |
| 131.825 MHz | SITA |
| 131.850 MHz | SITA |
| 136.900 MHz | SITA |
| 136.925 MHz | ARINC |

Recommended Europe set: `131.525 131.725 131.825 131.850`

### Asia-Pacific

| Frequency | Provider |
|-----------|----------|
| 131.550 MHz | SITA (primary) |
| 131.450 MHz | SITA |
| 129.125 MHz | ARINC |
| 130.025 MHz | ARINC |

### Middle East / Africa

| Frequency | Provider |
|-----------|----------|
| 131.550 MHz | SITA (primary) |
| 129.125 MHz | ARINC |
| 130.025 MHz | ARINC |

:::tip
Check the [Airframes stations page](https://app.airframes.io/stations) to see what frequencies other feeders in your area are using. Frequencies vary by region and may change — the station list shows what's working for feeders near you.
:::

## Running as a Service

To run acarsdec at boot, create a systemd service:

```bash
sudo tee /etc/systemd/system/acarsdec.service << 'EOF'
[Unit]
Description=acarsdec ACARS decoder
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/acarsdec -o 4 -j feed.airframes.io:5550 -i MY-STATION-ACARS -g 42 -r 0 130.025 130.450 131.125 131.550
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable acarsdec
sudo systemctl start acarsdec
```

## Verifying Your Feed

Once running, visit the [Airframes stations page](https://app.airframes.io/stations) and search for your station ID. You should see message counts appearing within a few minutes (depending on air traffic in your area).

## Troubleshooting

**No messages received:**
- Verify your SDR is detected: `rtl_test`
- Check your gain setting — try different values between 20–48
- Ensure you're using frequencies active in your region
- Make sure no other software is using the SDR device

**Permission errors:**
- Create a udev rule for the RTL-SDR: `sudo sh -c 'echo "SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"0bda\", ATTRS{idProduct}==\"2838\", MODE=\"0666\"" > /etc/udev/rules.d/rtl-sdr.rules'`
- Blacklist the kernel DVB-T driver: `sudo sh -c 'echo "blacklist dvb_usb_rtl28xxu" > /etc/modprobe.d/blacklist-rtlsdr.conf'`
- Reboot after making these changes
