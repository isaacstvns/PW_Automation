import{test, expect} from '@playwright/test'

//test.describe.configure({mode: 'parallel'});
test('More Validations in Playwright', async ({page})=>{    

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack()
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).not.toBeVisible();

    //This method is used to handle the alert pop up in the page. It can be used to accept or dismiss the alert pop up.
    //page.on('dialog', diaglog => diaglog.dismiss());
    page.on('dialog', diaglog => diaglog.accept());
    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover();

    const framewsPage = page.frameLocator('#courses-iframe');

    await framewsPage.locator('li a[href*="lifetime-access"]:visible').click();

    const numberOfSubs = await framewsPage.locator('.text h2 span').textContent();
    expect(numberOfSubs).toBe('13,522');
})

test("Screenshot and Visual Comparison", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'locatorScreenshot.png'}); 
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).not.toBeVisible();
})

test('Visual Comparison', async ({page}) => {

    await page.goto('https://google.com');
    await expect( await page.screenshot()).toMatchSnapshot('google.png');
})