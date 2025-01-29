const puppeteer = require('puppeteer');
const config = require('./config');

(async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({ headless: false }); // Set headless: true untuk mode tanpa UI
    const page = await browser.newPage();

    // Navigate to Gleam login page
    await page.goto('https://gleam.io/login', { waitUntil: 'networkidle2' });

    // Login
    await page.type('#email', config.gleam.email);
    await page.type('#password', config.gleam.password);
    await page.click('button[type="submit"]');

    // Wait for login to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Navigate to the task URL
    await page.goto(config.gleam.taskUrl, { waitUntil: 'networkidle2' });

    // Complete tasks (contoh: klik tombol follow Twitter)
    const followButtonSelector = 'button.follow-button'; // Sesuaikan dengan selector elemen tugas
    await page.waitForSelector(followButtonSelector);
    await page.click(followButtonSelector);

    console.log('Task completed successfully!');

    // Close browser
    await browser.close();
  } catch (error) {
    console.error('Error during task execution:', error);
  }
})();
