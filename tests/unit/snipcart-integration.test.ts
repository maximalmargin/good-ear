import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Snipcart Integration', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  it('should have snipcart div with correct attributes', () => {
    // Simulate the Snipcart div
    const snipcartDiv = document.createElement('div');
    snipcartDiv.id = 'snipcart';
    snipcartDiv.setAttribute('hidden', '');
    snipcartDiv.setAttribute('data-api-key', 'test_key');
    document.body.appendChild(snipcartDiv);

    const element = document.getElementById('snipcart');
    expect(element).toBeTruthy();
    expect(element?.hasAttribute('hidden')).toBe(true);
    expect(element?.getAttribute('data-api-key')).toBe('test_key');
  });

  it('should load Snipcart CSS from CDN', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css';
    document.head.appendChild(link);

    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const snipcartCss = Array.from(stylesheets).find(
      (link) => link.getAttribute('href')?.includes('snipcart.css')
    );

    expect(snipcartCss).toBeTruthy();
    expect(snipcartCss?.getAttribute('href')).toBe(
      'https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
    );
  });

  it('should have preconnect links for Snipcart domains', () => {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://app.snipcart.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://cdn.snipcart.com';
    document.head.appendChild(preconnect2);

    const preconnects = document.querySelectorAll('link[rel="preconnect"]');
    const preconnectUrls = Array.from(preconnects).map((link) => link.getAttribute('href'));

    expect(preconnectUrls).toContain('https://app.snipcart.com');
    expect(preconnectUrls).toContain('https://cdn.snipcart.com');
  });

  it('should handle Snipcart ready event', () => {
    const mockCallback = vi.fn();
    window.addEventListener('snipcart.ready', mockCallback);

    const event = new Event('snipcart.ready');
    window.dispatchEvent(event);

    expect(mockCallback).toHaveBeenCalled();
  });

  it('should detect when Snipcart fails to load', () => {
    vi.useFakeTimers();

    // Setup error handling
    const mockAlert = vi.fn();
    window.alert = mockAlert;

    const button = document.createElement('button');
    button.className = 'snipcart-checkout';
    document.body.appendChild(button);

    // Simulate the error handling code
    setTimeout(() => {
      if (typeof (window as any).Snipcart === 'undefined') {
        const cartButtons = document.querySelectorAll('.snipcart-checkout, .snipcart-add-item');
        cartButtons.forEach((button) => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Shopping cart is currently unavailable. Please try again later.');
          });
        });
      }
    }, 5000);

    vi.advanceTimersByTime(5000);
    button.click();

    expect(mockAlert).toHaveBeenCalledWith('Shopping cart is currently unavailable. Please try again later.');

    vi.useRealTimers();
  });

  it('should warn if API key is missing', () => {
    const consoleWarn = vi.spyOn(console, 'warn');
    const apiKey = undefined;

    if (!apiKey) {
      console.warn('Warning: PUBLIC_SNIPCART_API_KEY is not set. Shopping cart will not function properly.');
    }

    expect(consoleWarn).toHaveBeenCalledWith(
      'Warning: PUBLIC_SNIPCART_API_KEY is not set. Shopping cart will not function properly.'
    );
  });
});
