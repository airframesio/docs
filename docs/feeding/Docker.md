---
sidebar_position: 4
---

# Feeding with Docker

Docker is the recommended approach for running multiple decoders on a single machine. This guide covers two approaches: the modern **ACARS Hub** setup (recommended), and a manual Docker Compose configuration.

## ACARS Hub (Recommended)

[ACARS Hub](https://github.com/sdr-enthusiasts/docker-acarshub) is an all-in-one Docker solution that decodes ACARS, VDL2, HFDL, and satellite messages, provides a local web dashboard, and feeds aggregation services like Airframes.

The architecture uses `acars_router` as a central hub:

```
acarsdec ──UDP──► ┐
dumpvdl2 ──ZMQ──► │ acars_router ──ZMQ──► ACARS Hub (web dashboard)
dumphfdl ──UDP──► ┘       │
                          └──UDP/TCP──► feed.airframes.io
```

### Docker Compose setup

Create a `docker-compose.yml` file:

```yaml
services:
  acarshub:
    image: ghcr.io/sdr-enthusiasts/docker-acarshub:latest
    container_name: acarshub
    restart: always
    ports:
      - 8080:80
    volumes:
      - ./acars_data:/run/acars
    tmpfs:
      - /database:exec,size=64M
      - /run:exec,size=64M
      - /var/log:size=64M
    environment:
      - TZ=Etc/UTC
      - ENABLE_ACARS=true
      - ENABLE_VDLM=true
      - ACARS_CONNECTIONS=zmq://acars_router:45550
      - VDLM_CONNECTIONS=zmq://acars_router:45555

  acars_router:
    image: ghcr.io/sdr-enthusiasts/acars_router:latest
    container_name: acars_router
    restart: always
    tmpfs:
      - /run:exec,size=64M
      - /var/log:size=64M
    environment:
      - TZ=Etc/UTC
      - AR_OVERRIDE_STATION_NAME=MY-STATION
      - AR_ENABLE_DEDUPE=true
      - AR_RECV_ZMQ_VDLM2=dumpvdl2:45555
      # Feed to Airframes (uncomment the lines for your decoder types)
      - AR_SEND_UDP_ACARS=feed.airframes.io:5550
      - AR_SEND_TCP_VDLM2=feed.airframes.io:5553
      # - AR_SEND_TCP_HFDL=feed.airframes.io:5556

  acarsdec:
    image: ghcr.io/sdr-enthusiasts/docker-acarsdec:latest
    container_name: acarsdec
    restart: always
    environment:
      - TZ=Etc/UTC
      - SERIAL=               # Your RTL-SDR serial number
      - GAIN=-10
      - PPM=0
      - FREQUENCIES=130.025;130.450;131.125;131.550
      - FEED_ID=MY-STATION
      - OUTPUT_SERVER=acars_router
      - OUTPUT_SERVER_MODE=udp
    tmpfs:
      - /run:exec,size=64M
      - /var/log:size=64M
    device_cgroup_rules:
      - "c 189:* rwm"
    volumes:
      - /dev/bus/usb:/dev/bus/usb:ro

  dumpvdl2:
    image: ghcr.io/sdr-enthusiasts/docker-dumpvdl2:latest
    container_name: dumpvdl2
    restart: always
    environment:
      - TZ=Etc/UTC
      - SERIAL=               # Your RTL-SDR serial number
      - GAIN=40.0
      - PPM=0
      - FREQUENCIES=136650000;136700000;136800000;136975000
      - FEED_ID=MY-STATION
      - ZMQ_MODE=server
      - ZMQ_ENDPOINT=tcp://0.0.0.0:45555
    tmpfs:
      - /run:exec,size=64M
      - /var/log:size=64M
    device_cgroup_rules:
      - "c 189:* rwm"
    volumes:
      - /dev/bus/usb:/dev/bus/usb:ro
```

### Configuration steps

1. **Set your station name:** Change `AR_OVERRIDE_STATION_NAME` and `FEED_ID` to your station identifier
2. **Set your SDR serial numbers:** Each SDR needs a unique serial. Set the `SERIAL` field for each decoder. You can assign serial numbers to RTL-SDR devices with `rtl_eeprom -s MYSERIAL`
3. **Set your frequencies:** Update the `FREQUENCIES` for each decoder to match your region (see the individual decoder guides for frequency lists)
4. **Set your timezone:** Change `TZ` to your local timezone
5. **Enable Airframes feeding:** The `AR_SEND_*` lines in `acars_router` control feeding. Uncomment the lines for each decoder type you're running

### acars_router feed ports

| Variable | Destination | Protocol |
|----------|------------|----------|
| `AR_SEND_UDP_ACARS` | feed.airframes.io:5550 | UDP |
| `AR_SEND_TCP_VDLM2` | feed.airframes.io:5553 | TCP |
| `AR_SEND_TCP_HFDL` | feed.airframes.io:5556 | TCP |

### Starting and stopping

```bash
# Start all containers
docker compose up -d

# View logs
docker compose logs -f

# Stop all containers
docker compose down
```

### Accessing the dashboard

Once running, open `http://localhost:8080` (or your machine's IP) in a browser to see the ACARS Hub dashboard with live decoded messages.

## Manual Docker Compose (Without ACARS Hub)

If you prefer a simpler setup without the ACARS Hub dashboard, you can run decoders directly in Docker containers that feed Airframes.

### acarsdec container

```yaml
services:
  acarsdec:
    image: ghcr.io/sdr-enthusiasts/docker-acarsdec:latest
    container_name: acarsdec
    restart: always
    environment:
      - TZ=Etc/UTC
      - SERIAL=               # Your RTL-SDR serial number
      - GAIN=-10
      - PPM=0
      - FREQUENCIES=130.025;130.450;131.125;131.550
      - FEED_ID=MY-STATION-ACARS
      - OUTPUT_SERVER=feed.airframes.io
      - OUTPUT_SERVER_PORT=5550
      - OUTPUT_SERVER_MODE=udp
    device_cgroup_rules:
      - "c 189:* rwm"
    volumes:
      - /dev/bus/usb:/dev/bus/usb:ro
```

### dumpvdl2 container

```yaml
services:
  dumpvdl2:
    image: ghcr.io/sdr-enthusiasts/docker-dumpvdl2:latest
    container_name: dumpvdl2
    restart: always
    environment:
      - TZ=Etc/UTC
      - SERIAL=               # Your RTL-SDR serial number
      - GAIN=40.0
      - PPM=0
      - FREQUENCIES=136650000;136700000;136800000;136975000
      - FEED_ID=MY-STATION-VDL2
      - SERVER=feed.airframes.io
      - SERVER_PORT=5552
    device_cgroup_rules:
      - "c 189:* rwm"
    volumes:
      - /dev/bus/usb:/dev/bus/usb:ro
```

## Validating Your Feeder

Once your feeder is up and running, visit the [Airframes stations page](https://app.airframes.io/stations) to see your station and message counts.

:::note
You might not receive any messages right away. Message volume depends on air traffic in your area and time of day.
:::

## Setting up Time Synchronization

Accurate timestamps are important for ACARS messages. If your system (especially a Raspberry Pi without a real-time clock) doesn't have reliable time:

```bash
# Configure NTP
sudo tee /etc/systemd/timesyncd.conf << 'EOF'
[Time]
NTP=pool.ntp.org
EOF

# Enable and start the time sync service
sudo systemctl enable systemd-timesyncd
sudo systemctl restart systemd-timesyncd

# Verify
timedatectl timesync-status
```

## Troubleshooting

**Containers won't start / SDR not found:**
- Verify USB device access: `lsusb` should show your SDR
- Check that `device_cgroup_rules` and volume mounts are correct
- Ensure no other software is using the SDR

**No messages being received:**
- Check container logs: `docker compose logs acarsdec` or `docker compose logs dumpvdl2`
- Verify frequencies are correct for your region
- Try adjusting the gain

**Getting inside a container for debugging:**
```bash
docker exec -it <container_name> bash
```
