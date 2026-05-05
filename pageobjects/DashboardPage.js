class DashboardPage {

constructor(page){

    this.products = page.locator('.card-body');
    this.productTitle = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
}

async searchProduct(productName){

    await this.productTitle.allTextContents().then(text => console.log(text));
    const countOfProducts = await this.products.count();
    await console.log(countOfProducts + " Products found on the page");

    for(let i=0; i<countOfProducts; i++){
         if(await this.products.nth(i).locator("b").textContent() === productName){
            await this.products.nth(i).locator('text=Add To Cart').click();
            break;
    }
    }
}

async navigateToCart(){
    await this.cart.click();
}
}
module.exports = { DashboardPage };