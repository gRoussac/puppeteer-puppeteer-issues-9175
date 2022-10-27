const puppeteer = require('puppeteer');

(async () => {
  const url = 'http://127.0.0.1/test2/test.html';

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame() &&
      request.url() !== url
    ) {
      request.abort('aborted');
    } else {
      request.continue();
    }
  });

  await page.goto(url, {
    timeout: 6666,
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });

  await page.close();
  await browser.close();
})();
