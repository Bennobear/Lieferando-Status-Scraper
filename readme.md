 Lieferando Status Checker

 This is a Node.js application that uses Puppeteer to scrape the status of a restaurant on Lieferando.de and sends notifications to a Discord channel based on the restaurant's availability. It periodically checks the status of the restaurant and notifies you if it becomes available or unavailable.

 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Miscellaneous](#miscellaneous)

 ### Installation

 **Step 1: Clone the Repository**

 First, you need to clone the repository to your local machine. You can do this by running the following command in your terminal:

 ```bash
 git clone https://github.com/bennobear/lieferando-status-checker.git
 ```

 **Step 2: Install Node.js Dependencies**

 Navigate to the project directory and install the required Node.js packages using npm. Run the following command in your terminal:

 ```bash
 cd lieferando-status-checker
 npm install
 ```

 **Step 3: Configure the Application**

 Before you can use the application, you need to configure it. Create or edit `config.json` file in the project directory and set the following parameters:

 ```json
 {
     "token": "YOUR_DISCORD_BOT_TOKEN",
     "channel_id": "YOUR_DISCORD_CHANNEL_ID",
     "url": "https://www.lieferando.de/speisekarte/restaurant-name",
     "check_interval": 300000,
     "selector_timeout": 60000
 }
 ```

 - `token`: Replace with your Discord bot token.
 - `channel_id`: Replace with the Discord channel ID where you want to send notifications.
 - `url`: The URL of the Lieferando restaurant page you want to monitor.
 - `check_interval`: The time interval in milliseconds between status checks (e.g., 300000ms is 5 minutes).
 - `selector_timeout`: The maximum time in milliseconds to wait for the status selector to appear on the page.

 ### Usage

 **Step 1: Run the Application**

 After configuring the `config.json` file, you can run the application using the following command:

 ```bash
 node lieferando_status_checker.js
 ```

 **Step 2: Monitor Restaurant Status**

 The application will log in to Discord using the provided token and start checking the restaurant's status at the specified interval.

 **Step 3: Receive Notifications**

 If the status changes (from available to unavailable or vice versa), the application will send a notification to the specified Discord channel.

 **Step 4: Continuous Monitoring**

 You can keep the application running to continuously monitor the restaurant's status. It will automatically check and notify you according to the configured interval.

 ### Dependencies

 This project uses the following Node.js packages:

 - [puppeteer](https://www.npmjs.com/package/puppeteer): A headless browser automation library for web scraping.
 - [puppeteer-extra](https://www.npmjs.com/package/puppeteer-extra): An extension of Puppeteer with additional features.
 - [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth): A Puppeteer plugin for evading detection.
 - [discord.js](https://www.npmjs.com/package/discord.js): A library for interacting with the Discord API.

 ### Miscellaneous

 This project is a work in progress, and there are several improvements I'd like to make or changes that are needed:

~~Currently, if the restaurant changes its delivery time while it's open, the script interprets this as a new status and posts another "restaurant open" message. This issue can be addressed by modifying the script to return custom status values rather than relying on the content of the div.~~

I also aim to implement a feature in the script that reads the last message upon startup and checks if the current status matches it. This will prevent the script from posting the same status twice when it's restarted.

I've got this running smoothly on my Raspberry Pi 4B 2GB with no hiccups. It runs every 5 minutes and the scraper has a timeout of 1, which never failed as of now. I've also created a Python script for the same task, but it ran into timeout problems (only on the Raspberry Pi). I'm not entirely sure why, but it might have to do with the Python Puppeteer port. If anyone's interested in the Python version, just give me a shout, and I'd be happy to assist!
