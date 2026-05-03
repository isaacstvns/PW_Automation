const{test, expect, request} = require('@playwright/test')
const{APIUtils} = require('./utils/APIUtils')

const loginPayload = {userEmail: "hello@abc.com",userPassword: "Abc.123456"}
const orderPayload = {orders: [{country: "India",productOrderedId: "6960eac0c941646b7a8b3e68"}]}

const fakePayloadOrders = {data: [], messsage: "No Orders"}

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


test('Browser Context-Validation Error Login', async ({page})=>{

    //Insert the token into local storage
    await page.addInitScript (value => {
        window.localStorage.setItem('token', value);}, 
        token
    );

    await page.goto('https://rahulshettyacademy.com/client');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            await route.fulfill({
                response,
                body
            })
        })
        
    await page.locator("button[routerlink*='myorders']").first().click();    
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator(".mt-4").textContent().then(text => console.log(text));
    })