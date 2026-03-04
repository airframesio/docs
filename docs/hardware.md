---
sidebar_position: 4
---

# Hardware

To get started with feeding Airframes (or ADS-B partners), you will first need to acquire the hardware necessary to receive signals from nearby aircraft and ground stations. We have personally tested everything listed here, and use them in our own stations. We will never recommend something that we don't stand by.

## Computer

You need a small computer that runs 24/7 to capture and decode signals. The choice depends on how many SDRs you plan to run.

| Item | Type | Best For | Notes |
| ---- | ---- | -------- | ----- |
| [Raspberry Pi 5 16GB](https://www.amazon.com/dp/B0DSPYPKRG?tag=airframes05-20) | Embedded | 1–4 SDRs | Best Pi for multi-SDR setups. Handles ACARS + VDL2 + HFDL comfortably. |
| [Raspberry Pi 5 8GB](https://www.amazon.com/dp/B0CK2FCG1K?tag=airframes05-20) | Embedded | 1–3 SDRs | Great all-around choice for most feeder setups. |
| [Raspberry Pi 4 4GB](https://www.amazon.com/dp/B07TC2BK1X?tag=airframes05-20) | Embedded | 1–2 SDRs | Still capable for single or dual SDR setups. |
| [TRIGKEY Green G4 N100 + 16GB + 500G SSD](https://www.amazon.com/dp/B0CLNTGPM8?tag=airframes05-20) | Mini PC | 3+ SDRs / SATCOM | For demanding setups with many decoders, HFDL multi-station, or SATCOM. Plenty of CPU and memory. |

## Software Defined Radio (SDR)

The SDR is the device that receives radio signals and converts them to digital data for your decoder software to process.

| Item | Type | Best For | Notes |
| ---- | ---- | -------- | ----- |
| [ADSBExchange.com Orange SDR](https://www.amazon.com/ADSBexchange-com-Orange-R860-RTL2832U-TCXO/dp/B09NJWMY56?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | RTL-SDR | ACARS / VDL2 | The official co-branded Orange SDR from ADS-B Exchange & Airframes.io. Unfiltered (unlike the Blue SDR) and ideal for VHF ACARS or VDL2 reception. |
| [RTL-SDR Blog V4](https://www.amazon.com/RTL-SDR-Blog-RTL2832U-Software-Defined/dp/B0CD745394?tag=airframes05-20) | RTL-SDR | ACARS / VDL2 / HFDL | The latest RTL-SDR Blog dongle with R828D tuner, 1PPM TCXO, built-in HF upconverter, improved filtering, and SMA connector. Excellent all-around choice. |
| [RTL-SDR Blog V4 with Dipole Antenna Kit](https://www.amazon.com/RTL-SDR-Blog-RTL2832U-Software-Defined/dp/B0CD7558GT?tag=airframes05-20) | RTL-SDR + Antenna | Getting started | V4 dongle bundled with a multipurpose dipole antenna kit — a great starter package for beginners. |
| [RTL-SDR Blog V3](https://www.amazon.com/RTL-SDR-Blog-RTL2832U-Software-Defined/dp/B0BMKZCKTF?tag=airframes05-20) | RTL-SDR | ACARS / VDL2 | Previous generation with R860 tuner. Still a solid choice and widely available. |
| [Nooelec HackRF One Complete Bundle](https://www.amazon.com/NooElec-HackRF-Complete-Bundle-Enclosure/dp/B0BKJGKCDP?tag=airframes05-20) | Wideband SDR | Iridium / SATCOM | 1 MHz–6 GHz range with 20 MHz bandwidth. Metal-encased with 0.5PPM TCXO. Required for Iridium reception with iridium-sniffer. |
| [ADSBExchange.com Blue SDR](https://www.amazon.com/ADSBexchange-com-RTL2832U-Antenna-Software-Industrial/dp/B09F2ND4R6?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=3f770a9f2aa2cb592f7cd490064b55f7&camp=1789&creative=9325) | RTL-SDR | ADS-B | The official ADS-B Exchange Blue SDR. Filtered for 1090 MHz and intended specifically for ADS-B reception. Not recommended for ACARS/VDL2. |

:::tip
For a dual ACARS + VDL2 setup, you'll need two SDRs — one for each decoder. Assign unique serial numbers to each SDR with `rtl_eeprom -s MYSERIAL` so the decoders can address them individually.
:::

## Antennas

Your antenna matters more than your SDR for overall reception quality.

| Frequency Range | Antenna Type | Use Case |
|----------------|-------------|----------|
| VHF (118–137 MHz) | Quarter-wave whip, collinear, or discone | ACARS and VDL2 reception. A simple 53 cm wire antenna works for testing; a proper outdoor collinear is best for production. |
| HF (2–22 MHz) | Long wire, loop, or active HF antenna | HFDL reception. Length and height matter — longer and higher is better for HF. |
| L-Band (~1.5–1.6 GHz) | Patch antenna, helix, or small dish | Inmarsat AERO and Iridium. Pair with an LNA. |
| C-Band (~3.4–4.2 GHz) | 1.8m+ dish with GPSDO LNB | Inmarsat C-Band. Requires a large dish and tracking mount for 24-hour coverage. |

## Filters & LNAs

Filters remove unwanted signals, and LNAs (Low Noise Amplifiers) boost weak signals before they reach your SDR.

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Nooelec Flamingo+ FM](https://www.amazon.com/Flamingo-FM-Applications-Problematic-SMA-Connected/dp/B07XKY8YKB?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | Notch Filter | FM Broadcast rejection | If you have tall FM broadcast towers nearby, this reduces overload to the SDR and improves ACARS/VDL2 reception. |
| [Nooelec SAWbird+ IR](https://www.amazon.com/Nooelec-SAWbird-IR-Ultra-Low-Applications/dp/B07K1LW983?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | LNA + Filter | Iridium / Inmarsat L-Band | A must-have for ACARS over Iridium or Inmarsat L-Band reception. Tuned for 1542 MHz / 1620 MHz L-Band signals. |
| [Nooelec SAWbird+ NOAA](https://www.amazon.com/Nooelec-SAWbird-NOAA-Ultra-Low-Applications/dp/B07TWPR871?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | LNA + Filter | NOAA / experimental | Primarily for NOAA weather satellite reception. May provide some benefit for weak VHF signals in certain situations. |
| [Lothar ADS-B Cavity Filter](https://shop.airframes.io/products/crowhreidar-filtar-1090-mhz-filter) | Cavity Filter | ADS-B (1090 MHz) | Highly tuned, quality-controlled filter. Purchase from the [Airframes Shop](https://shop.airframes.io) to support both Airframes and Lothar. |

## Cables & Adapters

Good cables and adapters ensure clean signal paths between your antenna, filters, and SDR.

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [RTL-SDR Blog SMA Pigtail Adapter Kit (RG402, 10pc)](https://www.amazon.com/RTL-SDR-Blog-RG402-Pigtail-Adapters/dp/B082YPQPJY?tag=airframes05-20) | Adapter Kit | Connector conversion | 10-piece kit with SMA to BNC, Type N, Type F, and UHF adapters. Useful when connecting various antennas to your SDR. |
| [RTL-SDR Blog SMA Pigtail Adapter Kit (RG316)](https://www.amazon.com/RTL-SDR-Blog-RG316-Pigtail-Adapters/dp/B0132N1DM0?tag=airframes05-20) | Adapter Kit | Connector conversion | Flexible RG316 pigtail adapter set from RTL-SDR Blog. Same connector variety, lighter cable. |

## Miscellaneous

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Anker 10 Port 60W Data Hub w/ 7 USB3 Ports](https://www.amazon.com/Anker-PowerIQ-Charging-MacBook-Surface/dp/B00VDVCQ84?tag=airframes05-20) | USB Hub | Multiple SDRs | Allows connection of multiple powered SDRs without drawing power from the host system. Essential for 3+ SDR setups. |

## Starter Kits

Not sure what to buy? Here are recommended combinations based on your goals:

**Single SDR (VDL2):** Orange SDR + VHF antenna + Raspberry Pi 4/5 — ~$100
**Dual SDR (ACARS + VDL2):** 2x Orange SDR + VHF antenna + Raspberry Pi 5 — ~$150
**Triple SDR (ACARS + VDL2 + HFDL):** 2x Orange SDR + HF-capable SDR + antennas + Pi 5 or mini PC — ~$250+

## Next Steps

Once you have your hardware, head to the [Getting Started](/docs/getting_started) guide to set up your feeder station. If you're not sure which combination to choose, the [Receiver Systems](/docs/technology/receiver-systems) page can help you decide.

## Affiliate Links

Some of the links provided above are affiliate links with Amazon. We encourage you to purchase with these links to help us continue to raise funding that supports the costs of development and hosting. If you prefer to purchase these elsewhere, we certainly understand.
