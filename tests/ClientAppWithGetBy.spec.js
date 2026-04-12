const{test, expect} = require('@playwright/test')

test('Browser Context-Validation Error Login', async ({page})=>{


    const productName = 'ZARA COAT 3';

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill('hello@abc.com');
    await page.getByPlaceholder('enter your passsword').fill('Abc.123456');
    await page.getByRole('button', {name: 'Login'}).click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();

    await page.locator('.card-body').filter({hasText: productName}).getByRole('button', {name: 'Add To Cart'}).click();

    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();

    await page.locator('div li').last().waitFor();

    await expect(page.getByText(productName)).toBeVisible();
   
    await page.getByRole('button', {name: 'Checkout'}).click();

    await page.getByPlaceholder('Select Country').pressSequentially('ind');

    await page.locator('.ta-results').waitFor();

    await page.getByRole('button',  {name: 'India'}).nth(1).click();

    await page.getByText('PLACE ORDER').click();
    
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    const trimmedOrderId = orderId.split('|')[1].trim();

    await console.log(trimmedOrderId);

    await page.getByRole('button', {name: 'ORDERS'}).click();

    await page.locator('tbody tr').last().waitFor();

    await page.locator('tbody tr').filter({hasText: trimmedOrderId}).getByRole('button', {name: 'View'}).click();

    const orderViewPageTitle = await page.locator('div.email-title').textContent();
    
    await console.log(orderViewPageTitle);
    
    await expect(orderViewPageTitle).toBe(' order summary ');

    })