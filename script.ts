// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
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

    const cleanedArray = essays.filter((e) => e.title != ''); // filter data to delete some trash 

    const array = cleanedArray.map((item) => item.title) // put titles in on single array []

    const csvContent = array.join('\n'); // create csv file and put it all titles 

    fs.writeFile('output.csv', csvContent, (err) => {
        if (err) {
          console.error('Error writing CSV file', err);
        } else {
          console.log('CSV file written successfully');
        }
      });

    await browser.close()

})()
