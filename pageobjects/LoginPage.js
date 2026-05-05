class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.submitButton = page.locator('#login');
    }

    async goTo(url) {
        await this.page.goto(url);
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };