export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.totalLabel = page.locator('.summary_total_label');
    this.items = page.locator('.cart_item');
  }

  async finish() {
    await this.finishButton.click();
  }

  async getTotal() {
    return await this.totalLabel.textContent();
  }

  async getItemCount() {
    return await this.items.count();
  }
}
