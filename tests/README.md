# Good Ear Shopping Cart Tests

This directory contains comprehensive tests for the shopping cart functionality using Snipcart.

## Test Structure

### Unit Tests (`tests/unit/`)

Unit tests validate individual components and functionality without requiring a browser.

- **`snipcart-integration.test.ts`** - Tests for Snipcart integration
  - Validates Snipcart div configuration
  - Checks CSS and script loading
  - Tests preconnect links
  - Validates error handling
  - Checks API key warnings

- **`cart-button.test.ts`** - Tests for cart button rendering
  - Validates button structure and classes
  - Tests accessibility features (aria-label, aria-live)
  - Checks item count display and updates
  - Tests button interaction

- **`product-data-attributes.test.ts`** - Tests for product data attributes
  - Validates all required Snipcart data attributes
  - Tests product data formatting
  - Validates URLs and image paths
  - Tests price formatting
  - Checks accessibility labels

- **`environment.test.ts`** - Tests for environment configuration
  - Validates environment variable naming
  - Tests CDN URLs
  - Validates site configuration
  - Tests product URL construction

### End-to-End Tests (`tests/e2e/`)

E2E tests use Playwright to test the shopping cart in real browsers.

- **`cart.spec.ts`** - End-to-end cart interaction tests
  - Tests cart button visibility and functionality
  - Validates navigation between pages
  - Tests product display and information
  - Validates add to cart button attributes
  - Tests accessibility features
  - Validates responsive design
  - Tests keyboard navigation

## Running Tests

### Run Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run a specific test file
npm test snipcart-integration

# Run tests with coverage
npm test -- --coverage
```

### Run E2E Tests

```bash
# First, build the site
npm run build

# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode (see the browser)
npm run test:e2e -- --headed

# Run E2E tests in a specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit

# Debug E2E tests
npm run test:e2e -- --debug
```

### Run All Tests

```bash
npm run test:all
```

## Test Coverage

The test suite covers:

- ✅ Snipcart initialization and configuration
- ✅ Environment variable handling
- ✅ Error handling for Snipcart loading failures
- ✅ Cart button rendering and functionality
- ✅ Item count display and updates
- ✅ Product data attribute validation
- ✅ Add to cart button functionality
- ✅ Navigation between pages
- ✅ Product information display
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Responsive design
- ✅ URL validation
- ✅ Price formatting
- ✅ Image path validation

## CI/CD Integration

These tests are designed to run in CI/CD pipelines. The Playwright configuration automatically detects CI environments and adjusts settings accordingly.

## Debugging

### Unit Tests

Use Vitest UI for interactive debugging:

```bash
npm run test:ui
```

### E2E Tests

Use Playwright's debug mode:

```bash
npm run test:e2e -- --debug
```

Or view the test report after running tests:

```bash
npx playwright show-report
```

## Known Limitations

- E2E tests require a built version of the site to be available
- Snipcart integration cannot be fully tested without a valid API key
- Some Snipcart features (actual cart operations, checkout) are mocked in tests

## Future Improvements

- Add visual regression testing
- Add performance testing
- Add tests for Snipcart webhooks
- Add tests for cart abandonment tracking
- Add tests for currency and tax calculations
