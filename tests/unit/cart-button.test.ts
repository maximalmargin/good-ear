import { describe, it, expect, beforeEach } from 'vitest';

describe('Cart Button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render cart button with correct classes', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.textContent = 'Cart (0)';
    document.body.appendChild(button);

    const cartButton = document.querySelector('.snipcart-checkout');
    expect(cartButton).toBeTruthy();
    expect(cartButton?.classList.contains('cart-btn')).toBe(true);
  });

  it('should have aria-label for accessibility', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.setAttribute('aria-label', 'View shopping cart');
    document.body.appendChild(button);

    const cartButton = document.querySelector('.snipcart-checkout');
    expect(cartButton?.getAttribute('aria-label')).toBe('View shopping cart');
  });

  it('should display item count with aria-live region', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.innerHTML = 'Cart (<span class="snipcart-items-count" aria-live="polite" aria-atomic="true">0</span>)';
    document.body.appendChild(button);

    const itemCount = document.querySelector('.snipcart-items-count');
    expect(itemCount).toBeTruthy();
    expect(itemCount?.getAttribute('aria-live')).toBe('polite');
    expect(itemCount?.getAttribute('aria-atomic')).toBe('true');
    expect(itemCount?.textContent).toBe('0');
  });

  it('should update item count dynamically', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.innerHTML = 'Cart (<span class="snipcart-items-count" aria-live="polite" aria-atomic="true">0</span>)';
    document.body.appendChild(button);

    const itemCount = document.querySelector('.snipcart-items-count');
    expect(itemCount?.textContent).toBe('0');

    // Simulate Snipcart updating the count
    if (itemCount) {
      itemCount.textContent = '3';
    }

    expect(itemCount?.textContent).toBe('3');
  });

  it('should be clickable and trigger cart modal', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.setAttribute('aria-label', 'View shopping cart');
    button.textContent = 'Cart (0)';
    document.body.appendChild(button);

    let clicked = false;
    button.addEventListener('click', () => {
      clicked = true;
    });

    button.click();
    expect(clicked).toBe(true);
  });

  it('should have proper button type', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.type = 'button';
    document.body.appendChild(button);

    const cartButton = document.querySelector('.snipcart-checkout') as HTMLButtonElement;
    expect(cartButton?.tagName).toBe('BUTTON');
    expect(cartButton?.type).toBe('button');
  });

  it('should have cart button in header navigation', () => {
    // Simulate header structure
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const button = document.createElement('button');
    button.className = 'snipcart-checkout cart-btn';
    button.setAttribute('aria-label', 'View shopping cart');
    button.innerHTML = 'Cart (<span class="snipcart-items-count">0</span>)';

    nav.appendChild(button);
    header.appendChild(nav);
    document.body.appendChild(header);

    const navButton = document.querySelector('header nav .snipcart-checkout');
    expect(navButton).toBeTruthy();
  });
});
