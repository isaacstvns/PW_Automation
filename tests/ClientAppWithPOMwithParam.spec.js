const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const placeOrderTestData = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData2.json')));

for (const placeOrderData of placeOrderTestData) {
    test(`Client App - Place Order - ${placeOrderData.productName}`, async ({ page }) => {

        const productName = placeOrderData.productName;
        const username = placeOrderData.username;
        const password = placeOrderData.password;

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();

        await loginPage.goTo('https://rahulshettyacademy.com/client/#/auth/login');
        await loginPage.validLogin(username, password);

        const dashboardPage = poManager.getDashboardPage();

        await dashboardPage.searchProduct(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();

        await cartPage.validateProductAddedToCart(productName);
        await cartPage.navigateToCheckout();

        const orderReviewPage = poManager.getOrderReviewPage();

        await orderReviewPage.selectCountry('ind', ' India');
        await orderReviewPage.validateUsername(username);
        await orderReviewPage.submitOrder();
        await orderReviewPage.validateThankYouMessage();
        const orderId = await orderReviewPage.getOrderId();
        await orderReviewPage.navigateToMyOrders();

        const orderHistoryPage = poManager.getOrderHistoryPage();
        await orderHistoryPage.navigateToOrderDetails(orderId);
        await orderHistoryPage.validateOrderDetailsPageTitle();

    })
}