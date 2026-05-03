const{test, expect, request} = require('@playwright/test');
const{APIUtils} = require('./utils/APIUtils')

const loginPayload = {userEmail: "hello@abc.com",userPassword: "Abc.123456"}

let token;
let orderId;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    token = await apiUtils.getToken(loginPayload);
})

test('Security test request intercept', async ({page}) => {
    //Insert the token into local storage
    await page.addInitScript (value => {
        window.localStorage.setItem('token', value);}, 
        token
    );

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").first().click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6960eac0c941646b7a8b3aa34'})
    )
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order');
})