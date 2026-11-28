---
sidebar_position: 6
---

# Feeding ATC Audio

[Airframes ATC](https://atc.airframes.io) plays live air traffic control from receivers run by volunteers. If you have an RTL-SDR and an airband antenna near an airport, you can feed its tower, ground and approach frequencies with [xng](https://github.com/airframesio/xng). Anyone can then listen, with captions.

**You need:**
- an RTL-SDR (a V4 is fine)
- an airband or discone antenna
- a Linux box, a Raspberry Pi (Pi OS Bookworm) or a Mac
- a free Airframes account

One RTL-SDR covers about 2 MHz of the band, so the channels it feeds have to be within 2 MHz of each other.

## 1. Install xng

Get v0.26.0 or later from the [xng releases](https://github.com/airframesio/xng/releases).

```bash
# Debian, Ubuntu, Pi OS (pick -amd64, -arm64 or -armhf to match your machine)
sudo apt install ./xng-0.26.0-arm64.deb

# macOS (Apple Silicon)
brew install soapysdr soapyrtlsdr
tar xzf xng-v0.26.0-aarch64-apple-darwin.tar.gz
sudo cp xng-v0.26.0-aarch64-apple-darwin/xng /usr/local/bin/

xng devices        # the RTL-SDR should be listed
```

## 2. Sign in (once)

```bash
xng atc login      # prints a link and a code; approve it in a browser with your Airframes account
xng atc status     # checks that the sign-in works
```

## 3. Pick channels near you

List the tower, ground, approach and other channels near your position:

```
https://api.airframes.io/v1/atc/frequencies?near=37.62,-122.38&radius_nm=30&service=TWR,GND,APP,DEP,CLD,CTR
```

Choose a few that are within 2 MHz of each other. The center frequency (`-c`) goes in the middle of them. To check what each channel will be fed as:

```bash
xng atc match --lat 37.62 --lon -122.38 120.5 "121.8=SFO Ground"
```

:::tip Coming in the next xng release
`--channels auto` picks the channels for you: up to 8 tower, approach, ground, delivery and center channels within 30 nm that fit one dongle, never ATIS or AWOS. `xng atc nearby --lat 37.62 --lon -122.38` shows what it would pick.
:::

## 4. Run it

```bash
xng listen --sdr driver=rtlsdr --mode airband -r 2400000 -c 121.15 \
  --channels 120.5,121.8 --labels "121.8=SFO Ground" \
  --receiver-pos 37.62,-122.38 --atc-feed --atc-station-name "My station"
```

- `--receiver-pos` is required. With it, xng looks up each channel in the Airframes ATC catalog by frequency and position, and feeds it under the right entry (for example `airport:KSFO:TWR:120500`).
- When two airports nearby share a frequency, the channel label decides between them ("SFO Ground", "OAK Tower"). If it is still unclear, the log lists the candidates and skips that channel. Fix it with a label, or with `--atc-frequency 121.8=airport:KSFO:GND:121800`.
- The published position is rounded to 100 m. Add `--atc-hide-username` to show "Anonymous feeder" instead of your account name.

## 5. Check it's live

The log should show `atc feed: KSFO TWR (120.500) accepted as fd_...` and `connected to atc-ingest.airframes.io:4433`. Then open [atc.airframes.io](https://atc.airframes.io), find your airport, and listen. Audio only goes out while someone is transmitting, so a quiet frequency uses almost no bandwidth.

## 6. Keep it running (Linux)

Create `/etc/systemd/system/xng-atc.service`:

```ini
[Unit]
Description=xng ATC feed
After=network-online.target

[Service]
User=pi
ExecStart=/usr/bin/xng listen --sdr driver=rtlsdr --mode airband -r 2400000 -c 121.15 --channels 120.5,121.8 --labels "121.8=SFO Ground" --receiver-pos 37.62,-122.38 --atc-feed
Restart=always

[Install]
WantedBy=multi-user.target
```

Run `xng atc login` as that same user first, then:

```bash
sudo systemctl enable --now xng-atc
```

## Which frequencies help most

Busy airports with no receiver yet. On [atc.airframes.io](https://atc.airframes.io), search for an airport: those with "No receiver yet" have nobody feeding them. Each airport page shows which of its frequencies are live and which have no feed.
