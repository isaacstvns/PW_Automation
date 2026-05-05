const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {

        this.products = page.locator('div li').last();
        this.productTitleAddedtoCart = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.locator("[type='button']").nth(1);
    }

    async validateProductAddedToCart() {
        await this.products.waitFor();
        const bool = await this.productTitleAddedtoCart.isVisible();
        expect(bool).toBeTruthy();
    }
    async navigateToCheckout() {
        await this.checkoutButton.click();
    }
}
module.exports = { CartPage };