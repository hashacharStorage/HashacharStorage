const { join } = require('path');

// default system Chromium path that Render's apt will provide
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || '/usr/bin/chromium';

module.exports = {
  launch: {
    executablePath: CHROMIUM_PATH,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-zygote'
    ],
    // headless by default — keep as true (puppeteer default)
    headless: true
  }
};
