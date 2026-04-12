import{test, expect} from '@playwright/test'

test('Special locators in Playwright', async ({page})=>{


    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').check();

    await page.getByLabel('Gender').selectOption('Female');

    await page.getByLabel('Employed').check();

    await page.getByPlaceholder('Password').fill('myStrongPassword');

    await page.getByRole('button', {name: 'Submit'}).click();

    const bool = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await expect(bool).toBeTruthy();

    await page.getByRole('link', {name : 'Shop'}).click();

    await page.locator('app-card').filter({hasText : "Nokia Edge"}).getByRole('button', {name : 'Add'}).click();
})