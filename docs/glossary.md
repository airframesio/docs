---
sidebar_position: 5
---

# Glossary

A reference of terms used throughout the Airframes documentation and the ACARS community.

## A

**ACARS** — Aircraft Communications Addressing and Reporting System. A digital data link system for short messages between aircraft and ground stations. See [Introduction to ACARS](/docs/technology/acars/intro).

**ADS-B** — Automatic Dependent Surveillance - Broadcast. Aircraft broadcast their GPS-derived position, altitude, and speed on 1090 MHz. ADS-B is the basis for services like airplanes.live, adsb.fi, and ADSBExchange. Airframes focuses on ACARS data which complements ADS-B.

**ADS-C** — Automatic Dependent Surveillance - Contract. Unlike ADS-B which broadcasts openly, ADS-C sends position reports on demand to specific ground stations over ACARS data links (HFDL, SATCOM, VDL2). ADS-C is how Airframes tracks aircraft over oceans.

**AERO** — The Inmarsat aeronautical SATCOM service used for ACARS messaging. See [Introduction to AoA](/docs/technology/satcom/aero/intro).

**AGC** — Automatic Gain Control. A feature of SDR tuners that automatically adjusts the gain to optimize signal reception.

**AoI** — ACARS over Iridium. ACARS messages transmitted via the Iridium satellite constellation. See [Introduction to AoI](/docs/technology/satcom/aoi/intro).

**AoIP** — ACARS over IP. The latest ACARS transport, using broadband IP connections instead of traditional radio links.

**ARINC** — Aeronautical Radio, Incorporated (now part of Collins Aerospace / RTX). One of two major ACARS data link service providers, originally developed ACARS in 1978.

**ASF** — Airframes Standard Format. The internal data representation used by the Airframes [aggregator](/docs/backend/aggregator) to normalize messages from different decoder types into a common format.

## C

**C-Band** — Radio frequencies in the 3.4–4.2 GHz range used for Inmarsat satellite-to-ground feeder links. Requires a large dish antenna (1.8m+) to receive.

**CPDLC** — Controller-Pilot Data Link Communications. Text-based messaging between air traffic controllers and pilots, carried over ACARS. Replaces voice communication for routine clearances and instructions, especially in oceanic airspace.

**CSC** — Common Signalling Channel. The VDL2 frequency 136.975 MHz used globally for initial contact between aircraft and ground stations. Should always be monitored when receiving VDL2.

## D

**DCL** — Datalink Clearance. ATC departure clearances delivered electronically via ACARS instead of voice.

## F

**FANS** — Future Air Navigation System. An avionics system enabling ADS-C and CPDLC over ACARS, critical for oceanic and remote airspace management.

## G

**Gain** — The amplification level of an SDR receiver, measured in dB. Higher gain amplifies weak signals but can cause overload near strong transmitters. Finding the right gain is key to good reception.

## H

**HFDL** — High Frequency Data Link. ACARS messages transmitted over HF radio (2–22 MHz), providing long-range communication over oceans and polar regions. See [Introduction to HFDL](/docs/technology/hfdl/intro).

## I

**ICAO** — International Civil Aviation Organization. Sets global aviation standards. In the context of Airframes: ICAO codes identify airports (e.g., KJFK), airlines (e.g., UAL), and aircraft (24-bit hex addresses).

**Ingest** — A component of the Airframes [aggregator](/docs/backend/aggregator) that receives, validates, and transforms a specific type of decoder data into the Airframes Standard Format.

**Iridium** — A constellation of 66 LEO satellites providing global voice and data coverage, including polar regions. Used by some aircraft for ACARS messaging.

## L

**L-Band** — Radio frequencies in the 1–2 GHz range. In ACARS context, refers to the 1.5–1.6 GHz Inmarsat satellite-to-aircraft frequencies or the 1616–1626.5 MHz Iridium band.

**LEO** — Low Earth Orbit. Satellites orbiting at roughly 160–2,000 km altitude. Iridium satellites orbit at ~780 km. Contrast with geostationary satellites at ~36,000 km.

**libacars** — An open source library for decoding ACARS message content, used by acarsdec, dumpvdl2, and dumphfdl.

**LNA** — Low Noise Amplifier. A device placed between the antenna and SDR to amplify weak signals while adding minimal noise. Important for satellite reception (L-Band, C-Band).

## M

**METAR** — Meteorological Aerodrome Report. Standardized weather observations from airports, frequently delivered to aircraft cockpits via ACARS.

## O

**OOOI** — Out, Off, On, In. Four automated ACARS events that log when an aircraft leaves the gate (Out), takes off (Off), lands (On), and arrives at the gate (In). Used for flight time tracking and airline operations.

## P

**PDC** — Pre-Departure Clearance. ATC clearance delivered to the cockpit via ACARS before pushback.

**POA** — Plain Old ACARS. The original VHF ACARS system using AM MSK modulation. See [Introduction to ACARS](/docs/technology/acars/intro).

**PPM** — Parts Per Million. A measure of frequency offset/error in an SDR's oscillator. Corrected with the `--correction` or `-p` flag in decoders.

## R

**RTL-SDR** — A family of inexpensive USB SDR receivers based on the RTL2832U chip. The most common entry-level SDR for ACARS reception.

## S

**SATCOM** — Satellite Communications. In ACARS context, refers to Inmarsat AERO (L-Band/C-Band) and Iridium (AoI) satellite links.

**SDR** — Software Defined Radio. A radio receiver where signal processing is done in software rather than dedicated hardware. RTL-SDR, Airspy, and SDRplay are common SDR devices used for ACARS reception.

**SITA** — Société Internationale de Télécommunications Aéronautiques. The other major global ACARS data link service provider alongside ARINC, with strong presence in Europe and Asia-Pacific.

**SoapySDR** — A vendor-neutral SDR support library that provides a common API for many different SDR hardware devices. Used by dumphfdl and other decoders.

## T

**Tail Number** — The registration number painted on an aircraft's fuselage (e.g., N842UA). Used to identify specific airframes in ACARS messages.

## V

**VDL2** — VHF Data Link Mode 2. A digital evolution of VHF ACARS with higher data rates and efficiency. See [Introduction to VDL](/docs/technology/vdl/intro).

**VHF** — Very High Frequency. Radio frequencies in the 30–300 MHz range. VHF ACARS operates primarily in the 118–137 MHz aviation band.
