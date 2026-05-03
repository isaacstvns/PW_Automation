const {test, expect} = require('@playwright/test')


test('Intercept the request and abort',  async ({browser})=> {

        const context = await browser.newContext();
        const page = await context.newPage();

        //Abort the request for CSS files
        page.route('**/*.css', route => route.abort());

        //Listen to all the requests and responses and print the URL in console
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url() + " " + response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //css selector
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();
    await page.locator("[style*='block']").textContent().then(text => console.log(text));
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await page.locator('#username').fill('');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#signInBtn').click();
    //await page.locator('.card-body a').first().textContent().then(text => console.log(text));
    //await page.locator('.card-body a').nth(1).textContent().then(text => console.log(text));
    await page.locator('.card-body a').allTextContents().then(text => console.log(text));
});