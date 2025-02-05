# Trapezoid Area Calculations API Test Automation
This project is for automated testing of the Trapezoid Area Calculation API using Playwright. The API calculate area of a trapezoid with given bases and height.

## Project Description
This project contains automated tests that check endpoints of the API. The tests use Playwright with TypeScript. Tests check valid inputs, error conditions, and extreme cases (very large/small numbers, fractional numbers, etc.). Tests also check if extra fields in the request are ignored.

## Environment Setup
1. **Tech Stack:**
   - Node.js
   - TypeScript
   - Playwright

2. **Installation:**
   - Clone the repository.
   - Run `npm install` to install all dependencies.

3. **Configuration Files:**
   - `package.json` – contains project metadata, scripts and dependencies.
   - `tsconfig.json` – setup TypeScript compiler options.
   - `playwright.config.ts` – configuration for Playwright tests.

## How to Use Test Harness

1. Open terminal in project folder.
2. Run tests with command:
   `npx playwright test`
3. To see the report in HTML, run
    `npx playwright show-report`

## Test Results
command output

    Running 9 tests using 1 worker

    ✓  1 tests\trapezoid-api.spec.ts:7:7 › Trapezoid API › Test 1: calculate area for valid inputs (223ms)
    ✓  2 tests\trapezoid-api.spec.ts:22:7 › Trapezoid API › Test 2: return an error for empty fields (153ms)
    ✓  3 tests\trapezoid-api.spec.ts:30:7 › Trapezoid API › Test 3: return an error for missing fields (151ms)
    ✓  4 tests\trapezoid-api.spec.ts:38:7 › Trapezoid API › Test 4: return an error for negative numbers (155ms)
    ✓  5 tests\trapezoid-api.spec.ts:46:7 › Trapezoid API › Test 5: return an error for non-numeric inputs (146ms)
    ✓  6 tests\trapezoid-api.spec.ts:54:7 › Trapezoid API › Test 6: handle extra fields (147ms)
    ✓  7 tests\trapezoid-api.spec.ts:76:7 › Trapezoid API › Test 7: handle extreme values correctly (327ms)
    ✓  8 tests\trapezoid-api.spec.ts:97:7 › Trapezoid API › Test 8: calculate area correctly for fractional inputs (148ms)
    ✓  9 tests\trapezoid-api.spec.ts:109:7 › Trapezoid API › Test 9: return an error for all zero inputs (149ms)

    9 passed (2.1s)

