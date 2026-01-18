import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';

test.describe('Login Feature', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(productsPage.title).toBeVisible();
    await expect(productsPage.title).toHaveText('Products');
  });

  test('should display error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('should display error message for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });
});
