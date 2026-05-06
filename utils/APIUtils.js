import { expect } from '@playwright/test';

class APIUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log('Token: ' + token);
        return token;
    }

    async createOrder(orderPayload, token) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': token,
                    'Content-type': 'application/json'
                }
            })

        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        console.log('Order ID: ' + orderId);
        return orderId;
    }
}
export { APIUtils };    