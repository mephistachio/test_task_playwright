export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async getTitle() {
    return await this.title.textContent();
  }

  async addToCart(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  async getCartCount() {
    const badge = this.cartBadge.first();
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent());
    }
    return 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getProductNames() {
    const names = [];
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      names.push(await this.inventoryItems.nth(i).locator('.inventory_item_name').textContent());
    }
    return names;
  }
}
