const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('div li').last();
        this.productTitleAddedtoCart = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.locator("[type='button']").nth(1);
    }

    async validateProductAddedToCart(productName) {
        await this.products.waitFor();
        const bool = await this.getProductTitle(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async navigateToCheckout() {
        await this.checkoutButton.click();
    }
    
    getProductTitle(productName) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }

}
module.exports = { CartPage };