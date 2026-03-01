---
sidebar_position: 1
---

# Decoder Clients

Decoder clients are the software that receives raw radio signals from your SDR and converts them into structured ACARS messages. Each decoder handles a specific transmission medium. Here is a list of decoder clients supported by Airframes.

## acarsdec

[acarsdec](https://github.com/TLeconte/acarsdec) is a multi-channel VHF ACARS decoder with built-in support for RTL-SDR, Airspy, SDRplay, and SoapySDR devices. It can decode up to 8 channels simultaneously within a 2 MHz band and output messages in JSON format for feeding to aggregation services.

- [How to Install and Configure](install-acarsdec)

## dumpvdl2

[dumpvdl2](https://github.com/szpajder/dumpvdl2) is a VDL Mode 2 message decoder and protocol analyzer. It supports multiple simultaneous channels, flexible output configuration (text, JSON, UDP, TCP, ZeroMQ), and message enrichment with aircraft data. This is the recommended decoder for VDL2 reception.

- [How to Install and Configure](install-dumpvdl2)

## dumphfdl

[dumphfdl](https://github.com/szpajder/dumphfdl) is a multichannel HFDL (High Frequency Data Link) decoder. It receives ACARS messages, ADS-C position reports, and CPDLC communications from aircraft over HF radio, providing tracking data for flights over oceans and remote areas.

- [How to Install and Configure](install-dumphfdl)

## iridium-toolkit

[iridium-toolkit](https://github.com/muccc/iridium-toolkit) is a set of tools developed by the Chaos Computer Club Munich to parse and decode Iridium satellite frames. It processes demodulated Iridium packets (from gr-iridium or iridium-sniffer) and extracts ACARS messages transmitted over the Iridium satellite constellation.

- [How to Install](install-iridium-toolkit)

## iridium-sniffer

[iridium-sniffer](https://github.com/alphafox02/iridium-sniffer) is a standalone Iridium satellite burst detector and demodulator written in C. Created by Aaron (the developer behind DragonOS), it provides a lightweight alternative to gr-iridium that runs efficiently on lower-power systems like the Raspberry Pi without requiring GNU Radio. Compatible with HackRF, BladeRF, USRP, and SoapySDR (including RTL-SDR). Its output feeds directly into iridium-toolkit for ACARS decoding.

## JAERO

[JAERO](https://github.com/jontio/JAERO) is an open source decoder for Inmarsat AERO satellite signals. It demodulates and decodes ACARS messages, ADS-C position reports, and CPDLC from the Inmarsat satellite constellation's L-Band aeronautical channels. JAERO provides a GUI interface and can output decoded data for feeding to aggregation services.

## satdump

[satdump](https://github.com/SatDump/SatDump) (also available as `satdump-cli`) is a general purpose satellite data processing application. It supports a wide range of satellite protocols and can decode Inmarsat and other satellite signals relevant to ACARS data collection.

## vdlm2dec

[vdlm2dec](https://github.com/TLeconte/vdlm2dec) is an older VDL Mode 2 decoder. For new installations, [dumpvdl2](#dumpvdl2) is recommended as it offers more features, better output options, and active development.

- [How to Install](install-vdlm2dec)
