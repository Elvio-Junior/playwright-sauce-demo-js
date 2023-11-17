const { test, expect } = require('@playwright/test');
const { SauceDemoPage } = require('../../pages/sauceDemoPage');
const { loginPageMessages } = require('../../helpers/loginPageMessages');
const { InventoryPage } = require('../../pages/inventoryPage');

test.describe('Suite Test Login Page', async () => {
  let sauceDemoPage;
  let inventoryPage

  test.beforeEach(async ({ page }) => {
    sauceDemoPage = new SauceDemoPage(page);
    inventoryPage = new InventoryPage(page);
    await sauceDemoPage.goTo();
  });

  test('should return error on blank credentials', async ({ page }) => {
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userNameRequired);
  });

  test('should return error on blank user credentials', async ({ page }) => {
    await sauceDemoPage.inputCredentials(null, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userNameRequired);
  });

  test('should return error on blank password credentials', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.STANDARD_USER, null);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.passwordRequired);
  });

  test('should return error on wrong user credentials', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.WRONG_USER, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userNamePasswordNotMatch);
  });

  test('should return error on wrong password credentials', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.STANDARD_USER, process.env.WRONG_USER);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userNamePasswordNotMatch);
  });
  
  test('should return error on wrong user and password credentials', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.WRONG_USER, process.env.WRONG_PASSWORD);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userNamePasswordNotMatch);
  });

  test('should logon with standard_user', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.STANDARD_USER, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await expect(inventoryPage.elements.hamburgerMenu).toBeVisible();
  });

  test('should return error on logon with locked user', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.LOCKED_OUT_USER, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await sauceDemoPage.assertErrorMessage(loginPageMessages.userLocked);
  });

  test('should logon with problem_user', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.PROBLEM_USER, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await expect(inventoryPage.elements.hamburgerMenu).toBeVisible();
  });

  test('should logon with performance_glitch_user', async ({ page }) => {
    await sauceDemoPage.inputCredentials(process.env.PERFORMANCE_GLITCH_USER, process.env.PASSWORD);
    await sauceDemoPage.submitCredentials();
    await expect(inventoryPage.elements.hamburgerMenu).toBeVisible();
  });
});
