const{test, expect} = require('@playwright/test')

test('Browser Context-Validation Error Login', async ({page})=>{


    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('hello@abc.com');
    await page.locator('#userPassword').fill('Abc.123456');
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();
    await page.locator('.card-body b').allTextContents().then(text => console.log(text));

    const countOfProducts = await products.count();
    await console.log(countOfProducts + " Products found on the page");

    for(let i=0; i<countOfProducts; i++){
         if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator('text=Add To Cart').click();
            break;
    }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').last().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("[type='button']").nth(1).click();

    await page.locator("[placeholder*='Country']").pressSequentially('ind');

    const countryOptions = await page.locator('.ta-results');
    await countryOptions.waitFor();
    const countOfCountries = await countryOptions.locator('button').count();

    for(let i=0; i<countOfCountries; i++){
        if(await countryOptions.locator('button').nth(i).textContent() === " India"){
            await countryOptions.locator('button').nth(i).click();
            break;
        }
    }
        await expect(page.locator(".user__name [type='text']").first()).toHaveText('hello@abc.com');

        await page.locator('.action__submit').click();

        await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

        const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

        const trimmedOrderId = orderId.split('|')[1].trim();

        await console.log(trimmedOrderId);

        await page.locator("button[routerlink*='myorders']").first().click();

        const orderRows = await page.locator('tbody tr');
        await orderRows.last().waitFor();
        const countOfOrders = await orderRows.count();
        await console.log(countOfOrders + " Orders found on the page");

        for(let i=0; i<countOfOrders; i++){
            await console.log(await orderRows.nth(i).locator('th').textContent());
            if(await orderRows.nth(i).locator('th').textContent() === trimmedOrderId){
                 await orderRows.nth(i).locator('.btn-primary').click();
                 await console.log("Clicked on the view button of the order id: " + trimmedOrderId);
                 break;
            }
        }

        const orderViewPageTitle = await page.locator('div.email-title').textContent();
        await console.log(orderViewPageTitle);
        await expect(orderViewPageTitle).toBe(' order summary ');

    })