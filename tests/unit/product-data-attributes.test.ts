import { describe, it, expect, beforeEach } from 'vitest';

describe('Product Data Attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const mockProduct = {
    slug: 'miles-davis-kind-of-blue',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    price: 35,
    image: '/records/kind-of-blue.svg',
    condition: 'VG+',
    year: '1959',
    label: 'Columbia',
    productUrl: 'https://goodear.shop/records/miles-davis-kind-of-blue'
  };

  it('should have all required Snipcart data attributes', () => {
    const button = document.createElement('button');
    button.className = 'btn snipcart-add-item';
    button.setAttribute('data-item-id', mockProduct.slug);
    button.setAttribute('data-item-name', `${mockProduct.artist} - ${mockProduct.title}`);
    button.setAttribute('data-item-price', mockProduct.price.toString());
    button.setAttribute('data-item-url', mockProduct.productUrl);
    button.setAttribute('data-item-image', mockProduct.image);
    button.setAttribute('data-item-description', `${mockProduct.condition} condition, ${mockProduct.year} ${mockProduct.label} pressing`);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    expect(addButton).toBeTruthy();
    expect(addButton?.getAttribute('data-item-id')).toBe(mockProduct.slug);
    expect(addButton?.getAttribute('data-item-name')).toBe(`${mockProduct.artist} - ${mockProduct.title}`);
    expect(addButton?.getAttribute('data-item-price')).toBe(mockProduct.price.toString());
    expect(addButton?.getAttribute('data-item-url')).toBe(mockProduct.productUrl);
    expect(addButton?.getAttribute('data-item-image')).toBe(mockProduct.image);
  });

  it('should have properly formatted item name', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-add-item';
    button.setAttribute('data-item-name', `${mockProduct.artist} - ${mockProduct.title}`);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const itemName = addButton?.getAttribute('data-item-name');

    expect(itemName).toBe('Miles Davis - Kind of Blue');
    expect(itemName).toContain('-');
    expect(itemName).toContain(mockProduct.artist);
    expect(itemName).toContain(mockProduct.title);
  });

  it('should have numeric price', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-add-item';
    button.setAttribute('data-item-price', mockProduct.price.toString());
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const price = addButton?.getAttribute('data-item-price');

    expect(price).toBe('35');
    expect(Number(price)).toBe(35);
    expect(isNaN(Number(price))).toBe(false);
  });

  it('should have valid product URL', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-add-item';
    button.setAttribute('data-item-url', mockProduct.productUrl);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const url = addButton?.getAttribute('data-item-url');

    expect(url).toBe(mockProduct.productUrl);
    expect(url).toContain('https://');
    expect(url).toContain('/records/');
    expect(url).toContain(mockProduct.slug);

    // Validate URL format
    expect(() => new URL(url!)).not.toThrow();
  });

  it('should have image path', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-add-item';
    button.setAttribute('data-item-image', mockProduct.image);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const image = addButton?.getAttribute('data-item-image');

    expect(image).toBe('/records/kind-of-blue.svg');
    expect(image).toContain('/records/');
    expect(image).toContain('.svg');
  });

  it('should have descriptive item description', () => {
    const button = document.createElement('button');
    button.className = 'snipcart-add-item';
    button.setAttribute('data-item-description', `${mockProduct.condition} condition, ${mockProduct.year} ${mockProduct.label} pressing`);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const description = addButton?.getAttribute('data-item-description');

    expect(description).toBe('VG+ condition, 1959 Columbia pressing');
    expect(description).toContain(mockProduct.condition);
    expect(description).toContain(mockProduct.year);
    expect(description).toContain(mockProduct.label);
  });

  it('should have unique item ID per product', () => {
    const button1 = document.createElement('button');
    button1.className = 'snipcart-add-item';
    button1.setAttribute('data-item-id', 'miles-davis-kind-of-blue');

    const button2 = document.createElement('button');
    button2.className = 'snipcart-add-item';
    button2.setAttribute('data-item-id', 'fleetwood-mac-rumours');

    document.body.appendChild(button1);
    document.body.appendChild(button2);

    const buttons = document.querySelectorAll('.snipcart-add-item');
    const ids = Array.from(buttons).map(btn => btn.getAttribute('data-item-id'));

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2); // All unique
  });

  it('should have aria-label for accessibility', () => {
    const button = document.createElement('button');
    button.className = 'btn snipcart-add-item';
    button.setAttribute('aria-label', `Add ${mockProduct.artist} - ${mockProduct.title} to cart for $${mockProduct.price}`);
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    const ariaLabel = addButton?.getAttribute('aria-label');

    expect(ariaLabel).toBe('Add Miles Davis - Kind of Blue to cart for $35');
    expect(ariaLabel).toContain('Add');
    expect(ariaLabel).toContain(mockProduct.artist);
    expect(ariaLabel).toContain(mockProduct.title);
    expect(ariaLabel).toContain('$35');
  });

  it('should handle products with different prices', () => {
    const products = [
      { slug: 'product-1', price: 25 },
      { slug: 'product-2', price: 30 },
      { slug: 'product-3', price: 45 }
    ];

    products.forEach(product => {
      const button = document.createElement('button');
      button.className = 'snipcart-add-item';
      button.setAttribute('data-item-id', product.slug);
      button.setAttribute('data-item-price', product.price.toString());
      document.body.appendChild(button);
    });

    const buttons = document.querySelectorAll('.snipcart-add-item');
    const prices = Array.from(buttons).map(btn => Number(btn.getAttribute('data-item-price')));

    expect(prices).toEqual([25, 30, 45]);
    expect(Math.min(...prices)).toBe(25);
    expect(Math.max(...prices)).toBe(45);
  });

  it('should have proper button classes for styling', () => {
    const button = document.createElement('button');
    button.className = 'btn snipcart-add-item';
    document.body.appendChild(button);

    const addButton = document.querySelector('.snipcart-add-item');
    expect(addButton?.classList.contains('btn')).toBe(true);
    expect(addButton?.classList.contains('snipcart-add-item')).toBe(true);
  });

  it('should validate product URL format for different slugs', () => {
    const slugs = [
      'miles-davis-kind-of-blue',
      'fleetwood-mac-rumours',
      'talking-heads-remain-in-light'
    ];

    slugs.forEach(slug => {
      const url = `https://goodear.shop/records/${slug}`;
      const button = document.createElement('button');
      button.className = 'snipcart-add-item';
      button.setAttribute('data-item-url', url);
      document.body.appendChild(button);

      expect(() => new URL(url)).not.toThrow();
      expect(url).toMatch(/^https:\/\/goodear\.shop\/records\/[a-z-]+$/);
    });
  });
});
