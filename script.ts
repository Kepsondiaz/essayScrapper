const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://paulgraham.com/articles.html');

    await page.screenshot({path: "essay.png", fullPage: true})

    const essays = await page.evaluate(() => 
        Array.from(document.querySelectorAll('table, tbody, tr'), (e) => ({
            title: e.querySelector('td').innerText,
        }))
    
    )

    console.log(essays)

    await browser.close()

})()
