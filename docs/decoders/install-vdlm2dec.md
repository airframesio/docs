# Install vdlm2dec

Here are the steps to install vdlm2dec from source code on Ubuntu:

1. Open the terminal on your Ubuntu system.

2. Install the required dependencies by running the following command:

   ```
   sudo apt-get install build-essential libusb-1.0-0-dev librtlsdr-dev
   ```

3. Download the vdlm2dec source code by running the following command:

   ```
   git clone https://github.com/szpajder/vdlm2dec.git
   ```

4. Change to the vdlm2dec directory by running the following command:

   ```
   cd vdlm2dec
   ```

5. Run the following command to compile and install vdlm2dec:

   ```
   make && sudo make install
   ```

6. Once the installation is complete, you can run vdlm2dec by typing the following command:

   ```
   vdlm2dec
   ```

Note: You may need to configure your RTL-SDR device before running vdlm2dec. You can do this by running the `rtl_test` command in the terminal, which will check if your device is working properly. If it is not working, you may need to install additional drivers or firmware.
