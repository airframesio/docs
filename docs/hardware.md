---
sidebar_position: 4
---

# Hardware

To get started with feeding Airframes (or ADS-B partners), you will first need to acquire the hardware necessary to receive signals from nearby
airframes (commonly known as aircraft) and ground stations. We have personally tested everything listed here, and use them in our own stations. We will never recommend something that we don't stand by.

## Computer

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Raspberry Pi 5 16GB](https://www.amazon.com/dp/B0DSPYPKRG?tag=airframes05-20) | Embedded | Computer / Server | Low cost, low power, small dedicated SBC to run all your capture and feeding needs on a single server |
| [Raspberry Pi 5 8GB](https://www.amazon.com/dp/B0CK2FCG1K?tag=airframes05-20) | Embedded | Computer / Server | Low cost, low power, small dedicated SBC to run all your capture and feeding needs on a single server |
| [Raspberry Pi 4 4GB](https://www.amazon.com/dp/B07TC2BK1X?tag=airframes05-20) | Embedded | Computer / Server | Low cost, low power, small dedicated embedded computer to run all your capture and feeding needs. |
| [TRIGKEY Green G4 N100 + 16GB + 500G SSD](https://www.amazon.com/dp/B0CLNTGPM8?tag=airframes05-20) | Mini PC | Computer / Server | Low cost, low power, small dedicated computer with tons of CPU power and memory to run the most demanding of feed needs (such as HFDL, SATCOM, etc) |

## Software Defined Radio

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [ADSBExchange.com Orange SDR](https://www.amazon.com/ADSBexchange-com-Orange-R860-RTL2832U-TCXO/dp/B09NJWMY56?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | SDR | ACARS, VDL | The official co-branded Orange SDR from ADS-B Exchange &amp; Airframes.io is unfiltered (unlike the Blue SDR which contains a filter intended for ADS-B traffic at 1090mhz) and ideal for ACARS or VDL. |
| [ADSBExchange.com Blue SDR](https://www.amazon.com/ADSBexchange-com-RTL2832U-Antenna-Software-Industrial/dp/B09F2ND4R6?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=3f770a9f2aa2cb592f7cd490064b55f7&camp=1789&creative=9325) | SDR | ADS-B | The official ADS-B Exchange Blue SDR is filtered and intended for ADS-B reception. |

## Filters & LNAs

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Nooelec Flamingo+ FM](https://www.amazon.com/Flamingo-FM-Applications-Problematic-SMA-Connected/dp/B07XKY8YKB?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | Notch Filter | FM Broadcast | If you have any tall FM broadcast towers nearby, this will help by reducing overload to the SDR and give you higher signal attenuation. |
| [Nooelec SAWbird+ IR](https://www.amazon.com/Nooelec-SAWbird-IR-Ultra-Low-Applications/dp/B07K1LW983?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | LNA | Iridium / Inmarsat | If you plan to setup ACARS over Iridium or Inmarsat stations, this is a must have. It is perfect for L-band signals. |
| [Nooelec SAWbird+ NOAA](https://www.amazon.com/Nooelec-SAWbird-NOAA-Ultra-Low-Applications/dp/B07TWPR871?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | LNA | NOAA | Typically used for NOAA weather satellite reception, there may be some value (still testing) to ACARS/VDL in certain circumstances where signals are low (near frequency range). Let us know if you try this and it helps. |
| [Lothar ADS-B Cavity Filter](https://shop.airframes.io/products/crowhreidar-filtar-1090-mhz-filter) | Cavity Filter | Highly tuned, highly quality controlled filter for 1090mhz, perfect for ADS-B applications | Purchasing this directly from Airframes Shop helps support Airframes AND Lothar! |

## Miscellaneous

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Anker 10 Port 60W Data Hub w/ 7 USB3 Ports](https://www.amazon.com/Anker-PowerIQ-Charging-MacBook-Surface/dp/B00VDVCQ84?tag=airframes05-20) | USB Hub | Connect multiple SDRs | Allows attachment of multiple powered SDRs via USB 2.0 and USB 3.0 without drawing power from the host system |

## Affiliate Links

Some of the links provided above are affiliate links with Amazon. We encourage you to purchase with these links in order to help us
continue to raise funding that supports the costs of development and hosting. If you prefer to purchase these elsewhere, we certainly understand.
