const { expect } = require('@playwright/test');

class OrderHistoryPage {
    constructor(page) {
        this.orderRows = page.locator('tbody tr');
        this.orderReviewPageTitle = page.locator('div.email-title');
    }
    async navigateToOrderDetails(orderId) {
       
        await this.orderRows.last().waitFor();
        const countOfOrders = await this.orderRows.count();
        await console.log(countOfOrders + " Orders found on the page");

        for(let i=0; i<countOfOrders; i++){
            await console.log(await this.orderRows.nth(i).locator('th').textContent());
            if(await this.orderRows.nth(i).locator('th').textContent() === orderId){
                 await this.orderRows.nth(i).locator('.btn-primary').click();
                 await console.log("Clicked on the view button of the order id: " + orderId);
                 break;
            }
        }
    }
    async validateOrderDetailsPageTitle() {
        await expect(this.orderReviewPageTitle).toHaveText(' order summary ');
    }
}
module.exports = { OrderHistoryPage };