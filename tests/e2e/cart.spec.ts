import { test, expect } from '@playwright/test';

test.describe('Shopping Cart E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display cart button in header', async ({ page }) => {
    const cartButton = page.locator('.snipcart-checkout');
    await expect(cartButton).toBeVisible();
    await expect(cartButton).toContainText('Cart');
  });

  test('should show initial cart count as 0', async ({ page }) => {
    const itemCount = page.locator('.snipcart-items-count');
    await expect(itemCount).toHaveText('0');
  });

  test('should navigate to shop page', async ({ page }) => {
    await page.click('a[href="/shop"]');
    await expect(page).toHaveURL('/shop');
    await expect(page.locator('h1')).toContainText('Shop');
  });

  test('should display product cards on shop page', async ({ page }) => {
    await page.goto('/shop');
    const productCards = page.locator('.product-card');
    await expect(productCards.first()).toBeVisible();
  });

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('/shop');

    // Click on first product
    const firstProduct = page.locator('.product-card').first();
    await firstProduct.click();

    // Should be on product detail page
    await expect(page).toHaveURL(/\/records\/.+/);
  });

  test('should display add to cart button on product page', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const addToCartButton = page.locator('.snipcart-add-item');
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toContainText('Add to Cart');
  });

  test('should have correct data attributes on add to cart button', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const addToCartButton = page.locator('.snipcart-add-item');

    // Check data attributes
    await expect(addToCartButton).toHaveAttribute('data-item-id', 'miles-davis-kind-of-blue');
    await expect(addToCartButton).toHaveAttribute('data-item-name', /Miles Davis.*Kind of Blue/);
    await expect(addToCartButton).toHaveAttribute('data-item-price', '35');

    const itemUrl = await addToCartButton.getAttribute('data-item-url');
    expect(itemUrl).toContain('/records/miles-davis-kind-of-blue');
  });

  test('should have proper aria-label on cart button', async ({ page }) => {
    const cartButton = page.locator('.snipcart-checkout');
    await expect(cartButton).toHaveAttribute('aria-label', 'View shopping cart');
  });

  test('should have proper aria-label on add to cart button', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const addToCartButton = page.locator('.snipcart-add-item');
    const ariaLabel = await addToCartButton.getAttribute('aria-label');

    expect(ariaLabel).toContain('Add');
    expect(ariaLabel).toContain('Miles Davis');
    expect(ariaLabel).toContain('Kind of Blue');
    expect(ariaLabel).toContain('$35');
  });

  test('should display product information correctly', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    await expect(page.locator('h1')).toContainText('Kind of Blue');
    await expect(page.locator('.artist')).toContainText('Miles Davis');
    await expect(page.locator('.price')).toContainText('$35');
  });

  test('should have back to shop link', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const backLink = page.locator('.back-link');
    await expect(backLink).toBeVisible();
    await expect(backLink).toContainText('Back to Shop');
    await expect(backLink).toHaveAttribute('href', '/shop');
  });

  test('should load Snipcart CSS', async ({ page }) => {
    const snipcartCss = page.locator('link[href*="snipcart.css"]');
    await expect(snipcartCss).toHaveAttribute('rel', 'stylesheet');
  });

  test('should have Snipcart script tag', async ({ page }) => {
    const snipcartScript = page.locator('script[src*="snipcart.js"]');
    await expect(snipcartScript).toHaveAttribute('async', '');
  });

  test('should have preconnect links for performance', async ({ page }) => {
    const preconnects = page.locator('link[rel="preconnect"]');
    const count = await preconnects.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should display all product metadata', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    // Check metadata sections
    await expect(page.locator('.meta')).toBeVisible();
    await expect(page.locator('text=Year')).toBeVisible();
    await expect(page.locator('text=Label')).toBeVisible();
    await expect(page.locator('text=Condition')).toBeVisible();
  });

  test('should display shipping information', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const shippingNote = page.locator('.shipping-note');
    await expect(shippingNote).toBeVisible();
    await expect(shippingNote).toContainText('Ships via USPS Media Mail');
  });

  test('should handle multiple product pages', async ({ page }) => {
    const products = [
      'miles-davis-kind-of-blue',
      'fleetwood-mac-rumours',
      'talking-heads-remain-in-light'
    ];

    for (const product of products) {
      await page.goto(`/records/${product}`);

      const addToCartButton = page.locator('.snipcart-add-item');
      await expect(addToCartButton).toBeVisible();
      await expect(addToCartButton).toHaveAttribute('data-item-id', product);
    }
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/records/miles-davis-kind-of-blue');

    const addToCartButton = page.locator('.snipcart-add-item');
    await expect(addToCartButton).toBeVisible();
  });

  test('should maintain header on scroll', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    // Header should still be visible (sticky)
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');
    await expect(page).toHaveTitle(/Miles Davis.*Kind of Blue.*Good Ear/);
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('cart button should be keyboard accessible', async ({ page }) => {
    const cartButton = page.locator('.snipcart-checkout');

    // Focus the button using keyboard
    await cartButton.focus();

    // Check if it's focused
    await expect(cartButton).toBeFocused();
  });

  test('add to cart button should be keyboard accessible', async ({ page }) => {
    await page.goto('/records/miles-davis-kind-of-blue');

    const addButton = page.locator('.snipcart-add-item');
    await addButton.focus();
    await expect(addButton).toBeFocused();
  });
});
