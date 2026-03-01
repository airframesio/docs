---
sidebar_position: 3
---

# Compatibility

## Platforms

### Embedded (ARM)

| Board | Status | Notes |
|-------|--------|-------|
| Raspberry Pi 5 | Supported | Recommended for multi-SDR setups |
| Raspberry Pi 4 | Supported | Best all-around choice |
| Raspberry Pi 3 | Supported | Limited to 1–2 SDRs |
| Rock Pi 4 | Supported | Alternative to Raspberry Pi |

### Personal Computers (x86)

Any x86_64 PC or mini PC running Debian-based Linux should work. Mini PCs like the TRIGKEY N100 are well-suited for demanding multi-SDR or SATCOM setups.

## SDRs

| SDR | Status | Notes |
|-----|--------|-------|
| RTL-SDR (v3, v4, Blog) | Supported | Most common choice for ACARS/VDL2 |
| Airspy Mini / R2 | Supported | Higher dynamic range than RTL-SDR |
| SDRplay RSP1A / RSPdx | Supported | Wide frequency range, good for HF |
| LimeSDR | Supported | Full-duplex capable |
| KerberosSDR | Supported | 4-channel coherent SDR |

## System Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| Memory | 2 GB | 4 GB (8 GB for 3+ SDRs) |
| Storage | 8 GB SD card | 16 GB+ SD card or SSD |
| Network | Ethernet or Wi-Fi | Ethernet preferred for reliability |

If you have had results outside of what is documented here, please submit a documentation update (click `Edit this page` below) or [contact us](mailto:kevin@airframes.io).
