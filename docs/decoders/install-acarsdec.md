# Install acarsdec

Here are the steps to install acarsdec from source on Ubuntu:

1. Open the terminal on your Ubuntu system.

2. Install the required dependencies by running the following command:

   ```
   sudo apt-get install build-essential libtool librtlsdr-dev libusb-1.0-0-dev
   ```

3. Download the acarsdec source code by running the following command:

   ```
   git clone https://github.com/TLeconte/acarsdec.git
   ```

4. Change to the acarsdec directory by running the following command:

   ```
   cd acarsdec
   ```

5. Run the following command to compile and install acarsdec:

   ```
   make && sudo make install
   ```

6. Once the installation is complete, you can run acarsdec by typing the following command:

   ```
   acarsdec
   ```

Note: You may need to configure your RTL-SDR device before running acarsdec. You can do this by running the `rtl_test` command in the terminal, which will check if your device is working properly. If it is not working, you may need to install additional drivers or firmware.
