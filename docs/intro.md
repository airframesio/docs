---
sidebar_position: 1
---

# Introduction

[Airframes](https://airframes.io) is an aeronautical/aircraft data service that aggregates data in real-time from feeds in the field all around the world, processes the data, and makes it available to the public.

Similar to [airplanes.live](https://airplanes.live), [adsb.fi](https://adsb.fi), [Plane Watch](https://plane.watch), and [ADSBExchange](https://adsbexchange.com), all data that is collected and processed remains unfiltered and unbiased by governments, nation states, and corporate interests.

The nature of the data collected by [Airframes](https://airframes.io) is that it augments and enhances the data of existing aggregation services, providing a deeper look at aircraft internals, airline inter-communications, and aerospace systems that power our skies.

## What makes Airframes different?

[Airframes](https://airframes.io) focuses on aggregation of ACARS data, which is actually an accumulation of various transmission mediums, formats, and protocols (such as VDL, HFDL, SATCOM, etc). ACARS is a short message system that was designed for many purposes. This allows bi-directional messaging capabilities between the airframe and ATC, the airframe and airline, as well as airframe to airframe.

An interesting use of ACARS is for automated OOOI reports (also known as Out, Off, On, In Reports), which allow for automated flight logging for important flight events. But beyond OOOI reports, there are many other purposes for ACARS, such as:
* Incremental Position Reporting and Estimated Time of Arrival (ETA) Messages
* Text Weather (METARs/TAFs/NOTAMs/PIREPs)
* Graphical Weather Charts
* Pre-Departure Clearance (PDC) and Datalink Clearance (DCL) Messages
* Flight Plan Uplinks
* Oceanic Clearance Delivery (OCD)
* Terminal Weather Information for Pilots (TWIP)
* Digital Airport Terminal Information System (D-ATIS)
* Gate Notifications
* Fuel and Service Requests
* Free-Text Messages
* Maintenance Reporting
* Airframe Fatigue Reports
* Aircraft Engine and Health Reports
* Aircraft Weight-and-Balance Load Sheets and Trim Sheets
* Diversion Tracking
* Special Passenger Advice
* Air Traffic Services (ATS)
* Future Air Navigation System (FANS)
* ADS-Contract (ADS-C)
* Controller-Pilot Datalink Communications (CPDLC)

As you can see, there's a wealth of information on ACARS, and Airframes exists to continually capture, aggregate, parse, and reveal the useful information otherwise not available on unfiltered and unbiased aggregators. Airframes is partnering with other known ADS-B aggregators to enhance our collective capabilities. By feeding ACARS to Airframes, feeders are helping to enhance the data the partners receive.

## The Airframes Ecosystem

Airframes is more than just a single service. It's a growing ecosystem of tools, platforms, and community-built projects:

* **[app.airframes.io](https://app.airframes.io)** — The main Airframes web application where you can search live and historical ACARS messages, view active flights, browse feeder stations, and explore aircraft and airline data.
* **[tbg.airframes.io](https://tbg.airframes.io)** — A Node-RED-powered dashboard built by [thebaldgeek](https://thebaldgeek.github.io) that provides searchable live views of SATCOM ACARS, HFDL, and VHF/VDL feeds. TBG has been a huge inspiration for the Airframes project, demonstrating what's possible when you combine community-sourced data with creative visualization. See [Acknowledgments](/docs/acknowledgments) for more.
* **[tbgmap.airframes.io](https://tbgmap.airframes.io)** — A real-time map plotting ADSC and ACARS aircraft positions, including non-ADS-B position data.
* **[tbgacarshub.airframes.io](https://tbgacarshub.airframes.io)** — Military aircraft tracking with synchronized ACARS messages and position data.
* **[community.airframes.io](https://community.airframes.io)** — The Airframes Community forum for discussion, support, and sharing across tracking communities.
* **[shop.airframes.io](https://shop.airframes.io)** — The Airframes Shop for SDRs, SBCs, antennas, and swag.
* **[blog.airframes.io](https://blog.airframes.io)** — The Airframes Blog with guides, updates, and deep dives.
