const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const placeOrderTestData = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')));

const{customtest} = require('../utils/test-base');

customtest('Client App - Place Order', async ({ page, testDataForOrder }) => {

    const productName = testDataForOrder.productName;
    const username = testDataForOrder.username;
    const password = testDataForOrder.password;

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