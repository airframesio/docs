---
sidebar_position: 2
---

# HFDL Applications & Utilities

Tools and applications built by the community for working with HFDL data.

## hfdlobserver888

![hfdlobserver888](https://github.com/user-attachments/assets/48b919a2-1be2-42c9-a5f8-e3b440ac8300)

[hfdlobserver888](https://github.com/hfdl-observer/hfdlobserver888) is a console/CLI-based multi-headed dumphfdl receiver for use with Web-888 devices. Written in Python by KuupaOrk on the Airframes Discord.

It manages multiple dumphfdl instances monitoring different HFDL ground stations simultaneously, making it easier to maximize coverage without manually juggling individual decoder processes.

## hfdl.observer

[hfdl.observer](https://hfdl.observer) is a web-based tool that shows the real-time status of HFDL ground stations worldwide — which stations are active, what frequencies they're using, and current propagation conditions. It is an essential resource for anyone setting up HFDL reception, as ground station frequencies change throughout the day based on ionospheric conditions.

The companion software [HFDLObserver](https://github.com/hfdl-observer/hfdlobserver) can automatically retrieve updated frequency lists from hfdl.observer or airframes.io and feed them to your local dumphfdl instances.

## ACARS Hub

[ACARS Hub](https://github.com/sdr-enthusiasts/docker-acarshub) is a Docker-based multi-decoder management system with a built-in web dashboard. It can run acarsdec, dumpvdl2, and dumphfdl in a unified container, and provides a web-based UI for viewing decoded messages. ACARS Hub simplifies multi-SDR setups by handling decoder orchestration, message routing, and feeding to Airframes and other aggregators automatically.

See the [Docker feeding guide](/docs/feeding/Docker) for instructions on using ACARS Hub to feed Airframes.

## acars_router

[acars_router](https://github.com/sdr-enthusiasts/acars_router) is a message router and deduplicator for ACARS feeds. When running multiple decoders that may produce duplicate messages (such as overlapping VDL2 frequency coverage), acars_router consolidates the output, removes duplicates, and forwards clean data to one or more destinations including Airframes. It supports UDP, TCP, and ZeroMQ inputs and outputs.
