# QA E2E Testing Framework

E2E testing framework for UI and API testing using Playwright.

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

### UI Tests
```bash
npm run test:sauce_ui
```

### API Tests
```bash
npm run test:pet_api
```

### All Tests
```bash
npm run test:all
```

### Debug Mode
```bash
npm run test:ui:debug
```

### View Reports
```bash
npm run report
```

## Test Structure

- **UI Tests**: `tests/usauce_ui/` - SauceDemo application tests
- **API Tests**: `tests/pet_api/` - Pet Store API tests
- **Page Objects**: `pages/` - UI page object classes
- **Utilities**: `utils/` - Reusable helper functions

## Test Plans

See [TEST_PLAN.md](./TEST_PLAN.md) for detailed test cases.

## Architecture

See [ARCHITECTURE_REPORT.md](./ARCHITECTURE_REPORT.md) for framework architecture and design decisions.
