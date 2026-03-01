
# Introduction to AoA (ACARS over AERO)

ACARS over AERO refers to ACARS data transmitted via the Inmarsat satellite constellation's aeronautical services. This provides air-ground communication for aircraft flying over oceans and remote areas beyond VHF or even HF coverage.

## How It Works

The Inmarsat constellation consists of geostationary satellites providing coverage over the Atlantic, Pacific, and Indian Ocean regions. Aircraft equipped with SATCOM avionics connect to these satellites to send and receive ACARS messages, ADS-C position reports, and CPDLC communications.

There are two primary bands used:

* **L-Band** — The primary band for aeronautical SATCOM. L-Band signals from Inmarsat satellites can be received with a relatively modest dish antenna (around 1 meter or larger) and an appropriate LNA (Low Noise Amplifier). Software such as [JAERO](/docs/decoders/clients) decodes these signals.
* **C-Band** — Used for the satellite-to-ground station feeder links. C-Band reception requires a larger dish (typically 1.8 meters or more) but can yield a high volume of data since it carries aggregated traffic from multiple aircraft.

## What It Carries

AERO SATCOM carries a rich set of ACARS data including ADS-C position reports (which provide latitude, longitude, altitude, heading, and speed for aircraft over oceans), CPDLC messages between controllers and pilots, airline operational communications, and standard ACARS traffic.

## Receiving AERO SATCOM

Receiving Inmarsat AERO signals is more involved than VHF or HFDL reception, requiring a satellite dish, an LNA, and a capable SDR. [thebaldgeek's documentation](https://thebaldgeek.github.io/) provides extensive guides for setting up both L-Band and C-Band reception stations, and has been an invaluable resource for the community in this area. Decoded data can be fed to Airframes alongside your other feeds.
