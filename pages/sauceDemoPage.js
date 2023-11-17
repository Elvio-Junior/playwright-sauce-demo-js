const { expect } = require('@playwright/test');

exports.SauceDemoPage = class SauceDemoPage {

    constructor(page) {
        this.page = page;
        this.elements = {
            userName: page.locator('[data-test="username"]'),
            userPassword: page.locator('[data-test="password"]'),
            loginButton: page.locator('[data-test="login-button"]'),
            messageError: page.locator('[data-test="error"]')
        };
    }

    async goTo() {
        await this.page.goto(process.env.BASE_URL);
    };

    async inputCredentials(userName, userPassword) {
        
        if (userName) {
            await this.elements.userName.clear();
            await this.elements.userName.fill(userName);
        } 

        if (userPassword) {
            await this.elements.userPassword.clear();
            await this.elements.userPassword.fill(userPassword);
        } 
    };

    async submitCredentials() {
        await this.elements.loginButton.click();
    };
    
    async assertErrorMessage(messageError){
        await expect(this.elements.messageError).toBeVisible();
        await expect(this.elements.messageError).toHaveText(messageError);
    };
};

