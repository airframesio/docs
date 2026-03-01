---
sidebar_position: 6
---

# Troubleshooting

Common issues and solutions for setting up and running an Airframes feeder station.

## SDR and Hardware

### SDR not detected

**Symptom:** `rtl_test` fails or the decoder can't find the device.

**Solutions:**
- Verify the SDR is connected: `lsusb` should show a device from Realtek (RTL-SDR) or your SDR vendor
- Create a udev rule for RTL-SDR devices:
  ```bash
  sudo sh -c 'echo "SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"0bda\", ATTRS{idProduct}==\"2838\", MODE=\"0666\"" > /etc/udev/rules.d/rtl-sdr.rules'
  sudo udevadm control --reload-rules
  sudo udevadm trigger
  ```
- Blacklist the kernel DVB-T driver which conflicts with SDR use:
  ```bash
  sudo sh -c 'echo "blacklist dvb_usb_rtl28xxu" > /etc/modprobe.d/blacklist-rtlsdr.conf'
  ```
- Reboot after making udev or blacklist changes
- Ensure no other software (like another decoder instance, or `rtl_test`) is using the SDR

### Multiple SDRs not working

**Symptom:** Only one SDR works, or decoders grab the wrong device.

**Solutions:**
- Assign unique serial numbers to each SDR:
  ```bash
  rtl_eeprom -d 0 -s ACARS01
  rtl_eeprom -d 1 -s VDL201
  ```
  Unplug and re-plug the SDRs after changing serials.
- Reference SDRs by serial number instead of device index in your decoder configuration
- Use a powered USB hub if running 3+ SDRs to avoid power issues

### Poor reception / low message count

**Solutions:**
- **Antenna placement:** Move your antenna outdoors and as high as possible. Even a few feet of elevation makes a significant difference for VHF
- **Gain adjustment:** Try different gain values. Too high causes overload near strong transmitters; too low misses weak signals. Start around 40 dB and adjust
- **FM interference:** If you have strong FM broadcast towers nearby, add a [Nooelec Flamingo+ FM notch filter](/docs/hardware#filters--lnas)
- **Cable quality:** Use quality coaxial cable (RG-6 or LMR-240) and keep runs as short as practical. Every 10 feet of cheap cable loses signal
- **Check frequencies:** Make sure you're monitoring frequencies active in your region. See the frequency tables in the individual decoder guides

## Decoder Issues

### No messages received but decoder is running

**Possible causes:**
- Wrong frequencies for your region — check the frequency lists in the [acarsdec](/docs/decoders/install-acarsdec#common-acars-frequencies), [dumpvdl2](/docs/decoders/install-dumpvdl2#common-vdl2-frequencies), or [dumphfdl](/docs/decoders/install-dumphfdl#hfdl-ground-stations-and-frequencies) guides
- Gain set too low or too high
- Low air traffic in your area — try during peak hours (morning and evening) when commercial flights are active
- For HFDL: poor propagation conditions. Lower frequencies work better at night, higher during the day. Check [hfdl.observer](https://hfdl.observer) for active frequencies

### Decoder crashes or uses excessive CPU

**Solutions:**
- Ensure you're running the latest version of the decoder
- For HFDL: reduce the number of monitored frequencies to stay within your SDR's bandwidth
- Check system memory: `free -h`. If running low, reduce the number of simultaneous decoders
- Monitor CPU usage: `htop`. An RTL-SDR-based decoder typically uses 5–15% of one CPU core on a Raspberry Pi 4

## Feeding Issues

### Messages not appearing on Airframes

**Possible causes:**
- **Firewall:** Ensure outbound UDP (ports 5550, 5552, 5556) and TCP (ports 5553, 5556) to `feed.airframes.io` are not blocked
- **Wrong output configuration:** Verify the `--output` or `-j` flag matches the [Airframes ingest endpoints](/docs/feeding/how#direct-feeding-from-decoders)
- **Station ID missing:** Some ingests require a station ID. Make sure `-i` or `--station-id` is set
- **JSON output not enabled:** For acarsdec, make sure `-o 4` is included (enables JSON output)

**To verify connectivity:**
```bash
# Test UDP connectivity
echo "test" | nc -u feed.airframes.io 5550

# Test TCP connectivity
nc -z feed.airframes.io 5553 && echo "Connected" || echo "Blocked"
```

### Station not showing on app.airframes.io

- It can take a few minutes for a new station to appear
- Make sure your station ID is set and consistent across decoder restarts
- Check that you're actually sending messages (verify in decoder logs that messages are being decoded)

## Docker Issues

### Containers can't access SDR

**Solutions:**
- Make sure the `device_cgroup_rules` and `/dev/bus/usb` volume mount are in your `docker-compose.yml`:
  ```yaml
  device_cgroup_rules:
    - "c 189:* rwm"
  volumes:
    - /dev/bus/usb:/dev/bus/usb:ro
  ```
- Stop any host-level decoders that might be holding the SDR device
- Restart the container after plugging in/unplugging SDR hardware

### ACARS Hub dashboard shows no messages

- Check container logs: `docker compose logs -f acarshub`
- Verify the `ACARS_CONNECTIONS` and `VDLM_CONNECTIONS` environment variables point to the correct `acars_router` endpoints
- Ensure decoder containers are running and producing output: `docker compose logs acarsdec`

## System Issues

### Timestamps are wrong

Accurate timestamps matter for ACARS message correlation. See the [time synchronization guide](/docs/feeding/Docker#setting-up-time-synchronization) for NTP setup.

### Service doesn't start on boot

If your systemd service isn't starting:
```bash
# Check service status
sudo systemctl status acarsdec

# View logs
sudo journalctl -u acarsdec -f

# Common fix: reload and re-enable
sudo systemctl daemon-reload
sudo systemctl enable acarsdec
sudo systemctl start acarsdec
```

## Still stuck?

- Search the [Airframes Community Forum](https://community.airframes.io) — someone may have encountered the same issue
- Ask in the [Airframes Discord](https://discord.gg/airframes) — the community is active and helpful
- Check the [thebaldgeek documentation](https://thebaldgeek.github.io/) for detailed hardware and software setup guides
