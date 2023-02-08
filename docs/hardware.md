---
sidebar_position: 4
---

# Hardware

To get started with feeding Airframes (or ADS-B partners), you will first need to acquire the hardware necessary to receive signals from nearby
airframes (commonly known as aircraft) and ground stations. We have personally tested everything listed here, and use them in our own stations. We will never recommend something that we don't stand by.

## Computer

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Raspberry Pi 4 4GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) | Embedded | Computer / Server | Low cost, low power, small dedicated embedded computer to run all your capture and feeding needs. |

## Software Defined Radio

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [ADSBExchange.com Orange SDR](https://www.amazon.com/ADSBexchange-com-Orange-R860-RTL2832U-TCXO/dp/B09NJWMY56?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | SDR | ACARS, VDL | The official co-branded Orange SDR from ADS-B Exchange &amp; Airframes.io is unfiltered (unlike the Blue SDR which contains a filter intended for ADS-B traffic at 1090mhz) and ideal for ACARS or VDL. |
| [ADSBExchange.com Blue SDR](https://www.amazon.com/ADSBexchange-com-RTL2832U-Antenna-Software-Industrial/dp/B09F2ND4R6/r?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=3f770a9f2aa2cb592f7cd490064b55f7&camp=1789&creative=9325) | SDR | ADS-B | The official ADS-B Exchange Blue SDR is filtered and intended for ADS-B reception. |

## Filters & LNAs

| Item | Type | Purpose | Notes |
| ---- | ---- | ------- | ----- |
| [Nooelec Flamingo+ FM](https://www.amazon.com/Flamingo-FM-Applications-Problematic-SMA-Connected/dp/B07XKY8YKB?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | Notch Filter | FM Broadcast | If you have any tall FM broadcast towers nearby, this will help by reducing overload to the SDR and give you higher signal attenuation. |
| [Nooelec SAWbird+ IR](https://www.amazon.com/Nooelec-SAWbird-IR-Ultra-Low-Applications/dp/B07K1LW983?&_encoding=UTF8&tag=airframes05-20&linkCode=ur2&linkId=b8c22b69822d02b6f223318844d22d08&camp=1789&creative=9325) | LNA | Iridium / Inmarsat | If you plan to setup ACARS over Iridium or Inmarsat stations, this is a must have. It is perfect for L-band signals. |


## Affiliate Links

Some of the links provided above are affiliate links with Amazon. We encourage you to purchase with these links in order to help us
continue to raise funding that supports the costs of development and hosting. If you prefer to purchase these elsewhere, we certainly understand.
