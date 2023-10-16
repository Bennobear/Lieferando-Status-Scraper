const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealth());
const { Client, GatewayIntentBits } = require('discord.js');

const config = require('./config.json');

// Access the configuration values
const token = config.token;
const channelId = config.channel_id;
const url = config.url;
const check_interval = config.check_interval;
const selector_timeout = config.selector_timeout;

const open = 'open';
const closed = 'closed';

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

let previousStatus = null;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    checkAndNotifyStatus();
});

async function scrapeRestaurantStatus() {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser' });
    const page = await browser.newPage();

    try {
        await page.goto(url);
        await page.waitForSelector('div[data-qa="shipping-type-switcher-delivery-availability-text"]', {
            timeout: selector_timeout,
        });
        const status = await page.evaluate(
            () =>
                document.querySelector('div[data-qa="shipping-type-switcher-delivery-availability-text"]').textContent
        );
        if (status === 'Nicht verfügbar') {
            return closed;
        } else {
            return open;
        }
    } catch (error) {
        console.error('Scraping failed:', error);
        return null;
    } finally {
        await browser.close();
    }
}

async function sendDiscordNotification(status) {
    if (!status) return;
    const channel = await client.channels.fetch(channelId);

    if (status !== previousStatus) {
        if (status = closed) {
            await channel.send('Restaurant closed!');
        } else {
            await channel.send('Restaurant open!');
        }
    }

    previousStatus = status; // Update the previousStatus
}

async function checkAndNotifyStatus() {
    console.log('Checking Status..');
    const currentStatus = await scrapeRestaurantStatus();
    sendDiscordNotification(currentStatus);
    setTimeout(checkAndNotifyStatus, check_interval);
}

client.login(token);
