const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrderReviewPage} = require('../pageobjects/OrderReviewPage');
const {OrderHistoryPage} = require('../pageobjects/OrderHistoryPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrderReviewPage() {
        return this.orderReviewPage
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
}
module.exports = { POManager };