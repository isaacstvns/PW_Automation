const { expect } = require("@playwright/test");

class OrderReviewPage {
    constructor(page) {
        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryOptions = page.locator('.ta-results');
        this.username = page.locator(".user__name [type='text']").first();
        this.submitButton = page.locator('.action__submit');
        this.thankYouMessage = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.myOrdersButton = page.locator("button[routerlink*='myorders']").first();
    }

    async selectCountry(input, countryName) {
        await this.countryInput.pressSequentially(input);
        await this.countryOptions.waitFor();
        const countOfCountries = await this.countryOptions.locator('button').count();
        for (let i = 0; i < countOfCountries; i++) {
            if (await this.countryOptions.locator('button').nth(i).textContent() === countryName) {
                await this.countryOptions.locator('button').nth(i).click();
                break;
            }
        }
    }

    async validateUsername(expectedUsername) {
        await expect(this.username).toHaveText(expectedUsername);
    }

    async submitOrder() {
        await this.submitButton.click();
    }

    async validateThankYouMessage() {
        await expect(this.thankYouMessage).toHaveText(' Thankyou for the order. ');
    }

    async navigateToMyOrders() {
        await this.myOrdersButton.click();
    }

    async getOrderId() {
        const orderIdText = await this.orderId.textContent();
        return orderIdText.split('|')[1].trim();
    }
}
module.exports = { OrderReviewPage };