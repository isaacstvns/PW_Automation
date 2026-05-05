const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Browser Context-Validation Error Login', async ({ page }) => {

    const productName = 'ZARA COAT 3';

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.goTo('https://rahulshettyacademy.com/client/#/auth/login');
    await loginPage.validLogin('hello@abc.com', 'Abc.123456');

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();

    await cartPage.validateProductAddedToCart();
    await cartPage.navigateToCheckout();

    const orderReviewPage = poManager.getOrderReviewPage();

    await orderReviewPage.selectCountry('ind', ' India');
    await orderReviewPage.validateUsername('hello@abc.com');
    await orderReviewPage.submitOrder();
    await orderReviewPage.validateThankYouMessage();
    const orderId = await orderReviewPage.getOrderId();
    await orderReviewPage.navigateToMyOrders();

    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.navigateToOrderDetails(orderId);
    await orderHistoryPage.validateOrderDetailsPageTitle();

})