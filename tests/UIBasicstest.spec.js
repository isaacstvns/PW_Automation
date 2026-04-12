const {test, expect} = require('@playwright/test')


test('Browser Context Playwright Test',  async ({browser})=> {

        const context = await browser.newContext();
        const page = await context.newPage();

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

test('Page Playwright Test',  async ({page})=> {

    //Navigate to the URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Enter login creds
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('Learning@830$3mK2');

    //Check the radio button
    await page.locator('span.radiotextsty').last().check(); //click() can also be used
    //Click on Okay button for pop up
    await page.locator('#okayBtn').click();

    //Select the dropdown
    await page.locator('select.form-control').selectOption('consult');

    //Control if the expected radio button selected or not and print the value in console
    await page.locator('span.radiotextsty').last().isChecked().then(checked => console.log(checked));

    //Assertion to check if the expected radio button is selected or not
    await expect(page.locator('span.radiotextsty').last()).toBeChecked();
    //Check the terms and conditions checkbox
    await page.locator('#terms').check();
    //Assertion to check if the terms and conditions checkbox is checked or not
    await expect(page.locator('#terms')).toBeChecked();
    //Uncheck the terms and conditions checkbox
    await page.locator('#terms').uncheck();
    //Assertion to check if the terms and conditions checkbox is unchecked or not
    expect( await page.locator('#terms').isChecked()).toBeFalsy();
    //Assertion to check if Blikk Text is present or not
    await expect(page.locator('[href*="documents-request"]')).toHaveAttribute('class', 'blinkingText');
});

test('Child windows handle', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
    ])

    const text = await newPage.locator('p.red').textContent();
    const domain = text.split('@')[1].split(' ')[0];
    await console.log(domain);

    await page.locator('#username').fill(domain);
    await page.locator('#username').inputValue().then(value => console.log(value));
})