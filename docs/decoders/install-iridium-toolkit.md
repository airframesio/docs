# Install iridium-toolkit

Here are the steps to install iridium-toolkit from source code on Ubuntu:

1. Open the terminal on your Ubuntu system.

2. Install the required dependencies by running the following command:

   ```
   sudo apt-get install build-essential libssl-dev libpcap-dev
   ```

3. Download the iridium-toolkit source code by running the following command:

   ```
   git clone https://github.com/muccc/iridium-toolkit.git
   ```

4. Change to the iridium-toolkit directory by running the following command:

   ```
   cd iridium-toolkit
   ```

5. Run the following command to compile and install iridium-toolkit:

   ```
   make && sudo make install
   ```

Note: You may need to configure your Iridium satellite modem before running iridium-toolkit. You can do this by connecting your modem to your computer and configuring it using the modem's configuration software. Once your modem is configured, you can use iridium-toolkit to decode and analyze data transmitted by the modem.
