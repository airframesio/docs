---
sidebar_position: 4
---

# Feeding with Docker

You can run your feeders in Docker containers to provide isolation and simple management. This document will help you create your Docker containers and show you how to manage them with Docker Compose.

## Building the Containers

The first step is to build the container images that will run the feeders. You will build an image for each feeder you want to run.

Make a directory to store your docker configuration files:

```
mkdir airframes
```

### Building a acarsdec Container

1. Make a directory for the acarsdec Dockerfile:

```
mkdir -p airframes/acarsdec
cd airframes/acarsdec
```

2. Create a Dockerfile:

```
FROM ubuntu:22.04 as scratch

ARG TZ=America/Los_Angeles
RUN apt update && \
    apt upgrade -y && \
    DEBIAN_FRONTEND="noninteractive" TZ=$TZ apt install -y \
      gcc \
      git \
      cmake \
      make \
      build-essential \
      debhelper \
      libusb-1.0-0-dev \
      zlib1g-dev \
      libxml2-dev \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*

ARG BUILD_DATE=0424211021
RUN apt upgrade -y && \
    rm -rf /var/lib/apt/lists/*

RUN git clone git://git.osmocom.org/rtl-sdr.git /rtl-sdr
WORKDIR /rtl-sdr
ARG CFLAGS="-mcpu=cortex-a72+crypto -mtune=cortex-a72"
RUN CFLAGS=$CFLAGS dpkg-buildpackage -b -us -uc -nc
RUN dpkg --install /librtlsdr-dev_0.6_arm64.deb /librtlsdr0_0.6_arm64.deb

RUN git clone https://github.com/szpajder/libacars /libacars
RUN mkdir -p /libacars/build
WORKDIR /libacars/build
RUN CFLAGS=$CFLAGS cmake ../
RUN CFLAGS=$CFLAGS make
RUN make install
RUN ldconfig

RUN git clone https://github.com/TLeconte/acarsdec.git /acarsdec
RUN mkdir -p /acarsdec/build
WORKDIR /acarsdec/build
RUN sed -i 's/#define RTLMULT 160/#define RTLMULT 200/g' ../rtl.c
RUN CFLAGS=$CFLAGS cmake -Drtl=ON ../
RUN CFLAGS=$CFLAGS make

FROM ubuntu:22.04

RUN apt update && \
    apt upgrade -y && \
    DEBIAN_FRONTEND="noninteractive" TZ=$TZ apt install -y \
      zlib1g \
      libxml2 \
      libusb-1.0-0 && \
    rm -rf /var/lib/apt/lists/*

# Install librtlsdr
COPY --from=scratch /librtlsdr0_0.6_arm64.deb /librtlsdr0_0.6_arm64.deb
RUN dpkg --install /librtlsdr0_0.6_arm64.deb
RUN rm /librtlsdr0_0.6_arm64.deb

# Install libacars
RUN mkdir -p /usr/local/lib
COPY --from=scratch /libacars/build/libacars/libacars-2.so.2 /usr/local/lib/libacars-2.so.2
RUN ln -s /usr/local/lib/libacars-2.so.2 /usr/local/lib/libacars-2.so
RUN mkdir -p /usr/local/include/libacars-2/libacars
COPY --from=scratch /libacars/libacars/*.h /usr/local/include/libacars-2/libacars/
RUN mkdir -p /usr/local/lib/pkgconfig/
COPY --from=scratch /libacars/build/libacars/libacars-2.pc /usr/local/lib/pkgconfig/libacars-2.pc
RUN mkdir -p /usr/local/include/libacars-2/libacars/asn1
COPY --from=scratch /libacars/libacars/asn1/*.h /usr/local/include/libacars-2/libacars/asn1/
RUN mkdir -p /usr/local/bin
COPY --from=scratch /libacars/build/examples/adsc_get_position /usr/local/bin/adsc_get_position
COPY --from=scratch /libacars/build/examples/cpdlc_get_position /usr/local/bin/cpdlc_get_position
COPY --from=scratch /libacars/build/examples/decode_acars_apps /usr/local/bin/decode_acars_apps
RUN ldconfig

# Install acarsdec
COPY --from=scratch /acarsdec/build/acarsdec /usr/local/bin/acarsdec

ENTRYPOINT ["/usr/local/bin/acarsdec"]
CMD ["-o", "4", "-i", "<STATION ID>", "-j", "feed.acars.io:5550", "-r", "<ACARS SDR SERIAL>", "130.025", "130.425", "130.450", "131.125", "131.425", "131.550"]
```

In the above Dockerfile, you will need to put the serial number of the SDR you are going to use for ACARS in the CMD line, replacing the <ACARS SDR SERIAL\> template.

Your identifier (indicated by the -i parameter) can be whatever you want it to be. Our recommendation is to use the XX-YYYYZ format, where XX is a two-digit representation of your initials or other personal id (mine is MJ), YYYY is the nearest airport to you (mine is KCVO) and Z is the receiver number (in case you have multiple in the same locale). You are welcome to add additional identifiers to the end of it (such as -ACARS or -VDL2) to further clarify your station identification. Replace the <STATION ID\> with your identifier.

Also, update the list of frequencies to those appropriate for your region. See the [Airframes About Page](https://app.airframes.io/about) for a current list of frequencies.

3. Build your container:

The above Dockerfile assumes you will be running the container on a Raspberry PI 4. It can be built by running:

```
docker build -t example/acarsdec-docker:0.01 .
```

Typically you will substitute your login for "example" in the image tag.

If you are going to run the container on a Rasberry PI 3, use this build command instead:

```
docker build --build-arg CFLAGS="-mcpu=cortex-a53+crypto -mtune=cortex-a53" -t example/acarsdec-docker:0.01 .
```

If you want to run this container on other architectures, you will need to set CFLAGS="" and modify the Dockerfile to replace "arm64" with the appropriate architecture.

### Building a dumpvdl2 Container

1. Make a directory for the dumpvdl2 Dockerfile:

```
mkdir -p airframes/dumpvdl2
cd airframes/dumpvdl2
```

2. Create a Dockerfile:

```
FROM ubuntu:22.04 as scratch

ARG TZ=America/Los_Angeles
RUN apt update && \
    apt upgrade -y && \
    DEBIAN_FRONTEND="noninteractive" TZ=$TZ apt install -y \
      gcc \
      git \
      cmake \
      make \
      build-essential \
      debhelper \
      libusb-1.0-0-dev \
      zlib1g-dev \
      libxml2-dev \
      libglib2.0-dev \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*

ARG BUILD_DATE=0424211021
RUN apt upgrade -y && \
    rm -rf /var/lib/apt/lists/*

RUN git clone git://git.osmocom.org/rtl-sdr.git /rtl-sdr
WORKDIR /rtl-sdr
ARG CFLAGS="-mcpu=cortex-a72+crypto -mtune=cortex-a72"
RUN CFLAGS=$CFLAGS dpkg-buildpackage -b -us -uc -nc
RUN dpkg --install /librtlsdr-dev_0.6_arm64.deb /librtlsdr0_0.6_arm64.deb

RUN git clone https://github.com/szpajder/libacars /libacars
RUN mkdir -p /libacars/build
WORKDIR /libacars/build
RUN CFLAGS=$CFLAGS cmake ../
RUN CFLAGS=$CFLAGS make
RUN make install
RUN ldconfig

RUN git clone https://github.com/szpajder/dumpvdl2.git /dumpvdl2
RUN mkdir -p /dumpvdl2/build
WORKDIR /dumpvdl2/build
RUN CFLAGS=$CFLAGS cmake -DRTLSDR=TRUE -DMIRISDR=FALSE -DSDRPLAY=FALSE -DSDRPLAY3=FALSE -DSOAPYSDR=FALSE -DSQLITE=FALSE -DETSY_STATSD=FALSE -DRAW_BINARY_FORMAT=FALSE -DZMQ=FALSE  ../
RUN CFLAGS=$CFLAGS make
RUN CFLAGS=$CFLAGS make install

FROM ubuntu:22.04

RUN apt update && \
    apt upgrade -y && \
    DEBIAN_FRONTEND="noninteractive" TZ=$TZ apt install -y \
      zlib1g \
      libxml2 \
      libglib2.0-0 \
      libusb-1.0-0 && \
    rm -rf /var/lib/apt/lists/*

COPY --from=scratch /librtlsdr0_0.6_arm64.deb /librtlsdr0_0.6_arm64.deb
RUN dpkg --install /librtlsdr0_0.6_arm64.deb
RUN rm /librtlsdr0_0.6_arm64.deb

# Install libacars
RUN mkdir -p /usr/local/lib
COPY --from=scratch /libacars/build/libacars/libacars-2.so.2 /usr/local/lib/libacars-2.so.2
RUN ln -s /usr/local/lib/libacars-2.so.2 /usr/local/lib/libacars-2.so
RUN mkdir -p /usr/local/include/libacars-2/libacars
COPY --from=scratch /libacars/libacars/*.h /usr/local/include/libacars-2/libacars/
RUN mkdir -p /usr/local/lib/pkgconfig/
COPY --from=scratch /libacars/build/libacars/libacars-2.pc /usr/local/lib/pkgconfig/libacars-2.pc
RUN mkdir -p /usr/local/include/libacars-2/libacars/asn1
COPY --from=scratch /libacars/libacars/asn1/*.h /usr/local/include/libacars-2/libacars/asn1/
RUN mkdir -p /usr/local/bin
COPY --from=scratch /libacars/build/examples/adsc_get_position /usr/local/bin/adsc_get_position
COPY --from=scratch /libacars/build/examples/cpdlc_get_position /usr/local/bin/cpdlc_get_position
COPY --from=scratch /libacars/build/examples/decode_acars_apps /usr/local/bin/decode_acars_apps
RUN ldconfig

# Install dumpvld2
COPY --from=scratch /usr/local/bin/dumpvdl2 /usr/local/bin/dumpvdl2

ENTRYPOINT ["/usr/local/bin/dumpvdl2"]
CMD ["--rtlsdr", "<VDL SDR SERIAL>", "--gain", "40", "--output", "decoded:json:udp:address=feed.airframes.io,port=5552", "--station-id", "<STATION ID>", "136600000", "136650000", "136700000", "136800000", "136925000", "136975000"]
```

In the above Dockerfile, you will need to put the serial number of the SDR you are going to use for VDL in the CMD line, replacing the <VDL SDR SERIAL\> template.

Your identifier (indicated by the -i parameter) can be whatever you want it to be. Our recommendation is to use the XX-YYYYZ format, where XX is a two-digit representation of your initials or other personal id (mine is MJ), YYYY is the nearest airport to you (mine is KCVO) and Z is the receiver number (in case you have multiple in the same locale). You are welcome to add additional identifiers to the end of it (such as -ACARS or -VDL2) to further clarify your station identification. Replace the <STATION ID\> with your identifier.

Also, update the list of frequencies to those appropriate for your region. See the [Airframes About Page](https://app.airframes.io/about) for a current list of frequencies.

3. Build your container:

The above Dockerfile assumes you will be running the container on a Raspberry PI 4. It can be built by running:

```
docker build -t example/dumpvdl2-docker:0.01 .
```

Typically you will substitute your login for "example" in the image tag.

If you are going to run the container on a Rasberry PI 3, use this build command instead:

```
docker build --build-arg CFLAGS="-mcpu=cortex-a53+crypto -mtune=cortex-a53" -t example/dumpvdl2-docker:0.01 .
```

If you want to run this container on other architectures, you will need to set CFLAGS="" and modify the Dockerfile to replace "arm64" with the appropriate architecture.

### Rebuilding the Container Images

From time to time you may want to update the containers with new versions of the software used in them. You can do this by running the build with --build-arg BUILD_DATE=<current_datetime_string> or by editing the Dockerfile and setting the BUILD_DATE value. Editing the Dockerfile will give you a record of the last time you updated the container.

```
  docker build --build-arg BUILD_DATE=0724221030 -t example/acarsdec-docker:0.01 .
```

If you want to rebuild the container images from scratch. You can do this by adding the "--no-cache" argument to the "docker build" command:

```
  docker build --no-cache -t example/acarsdec-docker:0.01 .
```

## Running with Docker Compose

Docker Compose lets you manage multiple Docker containers together as one application. Even if you are only going to run one SDR to feed, I recommend you setup Docker Compose to manage the container.

1. From the airframes directory:

```
cd airframes
```

2. Create the docker-compose.yml:

```
version: '3.5'

services:
  acarsdec:
    build:
      context: ./acarsdec
    image: example/acarsdec-docker:0.01
    devices:
      - /dev/bus/usb
    restart: unless-stopped
    logging:
      driver: none
  dumpvdl2:
    build:
      context: ./dumpvdl2
    image: example/dumpvdl2-docker:0.01
    devices:
      - /dev/bus/usb
    restart: unless-stopped
    logging:
      driver: none
```

This Docker Compose file will setup the containers to restart when the host restarts. It also sets the logging to "none" to save wear on your flash drive.

### Starting the Containers

From the airframes directory containing the docker-compose.yml file:

```
docker-compose up -d
```

### Stopping the Containers

From the airframes directory containing the docker-compose.yml file:

```
docker-compose down
```

## Validating Your Feeder

Once your feeder is up and running, you can visit the [AIRFRAMES stations](https://app.airframes.io/stations) page to see how many messages have been
received from each of your processes.

> Note: You might not receive any messages right away.

## Setting up SNTP Time Synchronization (Optional)

It is nice to have accurate timestamps for the messages received. Since the
Raspberry Pi does not include a Real Time Clock (RTC), we would like to
have a bootstrap timestamp to get the clock set early. To accomplish this
you can use the systemd-timesyncd service. This will sync the clock using
Simple Network Time Protocol (SNTP) and write out a time file that will be
used on boot. As the clock stabilizes, it will increase the interval of the
time synchronization and file update. The default maximum poll interval is
thirty-four minutes, so the write wear from this bootstrap time file is low.

To configure systemd-timesyncd follow these steps:

1. Edit /etc/systemd/timesyncd.conf if you have preferred NTP server:

```
[Time]
NTP=pool.ntp.org
```

2. Make sure the service is enabled:

```
sudo systemctl enable systemd-timesyncd
```

3. Restart the servie:

```
sudo systemctl restart systemd-timesyncd
```

The systemd-timesyncd service can be monitored with the "timedatectl" command.

```
timedatectl timesync-status
```

## Troubleshooting

If you need to get inside one of the containers, you can run the following
commands:

```
docker ps
docker exec -it <container_id_or_name> bash
```

The "docker ps" command will list the containers running on your host.
The "docker exec" command will launch a bash shell inside the container.
