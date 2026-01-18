export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButtons = page.locator('button:has-text("Remove")');
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async getItemName(index) {
    return await this.cartItems.nth(index).locator('.inventory_item_name').textContent();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeItem(index) {
    await this.removeButtons.nth(index).click();
  }
}
