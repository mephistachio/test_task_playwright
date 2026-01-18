import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage.js';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage.js';

test.describe('Checkout Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Complete checkout flow successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Add product to cart
    await productsPage.addToCart('Sauce Labs Backpack');
    await expect(productsPage.cartBadge).toHaveText('1');

    // Go to cart and proceed to checkout
    await productsPage.goToCart();
    await expect(cartPage.getItemCount()).resolves.toBe(1);
    await cartPage.proceedToCheckout();

    // Fill shipping information
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continue();

    // Verify overview and complete
    await expect(checkoutOverviewPage.totalLabel).toBeVisible();
    await checkoutOverviewPage.finish();

    // Verify completion
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toContainText('Your order has been dispatched');
  });

  test('Display error when shipping info is missing', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling info
    await checkoutPage.continue();

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('First Name is required');
  });

  test('Allow canceling checkout and returning to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Cancel checkout
    await checkoutPage.cancel();

    // Should return to cart
    await expect(cartPage.cartItems).toBeVisible();
    await expect(cartPage.getItemCount()).resolves.toBe(1);
  });
});
