const{test, expect, request} = require('@playwright/test')
const{APIUtils} = require('./utils/APIUtils')

const loginPayload = {userEmail: "hello@abc.com",userPassword: "Abc.123456"}
const orderPayload = {orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let token;
let orderId;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);
    token = await apiUtils.getToken(loginPayload);
    orderId = await apiUtils.createOrder(orderPayload, token);
})

test.beforeEach( async () => {

})


test.only('Browser Context-Validation Error Login', async ({page})=>{

    //Insert the token into local storage
    await page.addInitScript (value => {
        window.localStorage.setItem('token', value);}, 
        token
    );

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator("button[routerlink*='myorders']").first().click();

        const orderRows = await page.locator('tbody tr');
        await orderRows.last().waitFor();
        const countOfOrders = await orderRows.count();
        await console.log(countOfOrders + " Orders found on the page");

        for(let i=0; i<countOfOrders; i++){
            console.log(await orderRows.nth(i).locator('th').textContent());
            if(await orderRows.nth(i).locator('th').textContent() === orderId){
                 await orderRows.nth(i).locator('.btn-primary').click();
                 console.log("Clicked on the view button of the order id: " + orderId);
                 break;
            }
        }

        const orderViewPageTitle = await page.locator('div.email-title').textContent();
        await console.log(orderViewPageTitle);
        await expect(orderViewPageTitle).toBe(' order summary ');
    })