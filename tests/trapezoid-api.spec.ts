import { test, expect } from '@playwright/test';

const endpoint = '/calculate-area';

test.describe('Trapezoid API', () => {

  test('Test 1: calculate area for valid inputs', async ({ request }) => {
    const input = { base1: 10, base2: 20, height: 5 };
    const expectedArea = ((input.base1 + input.base2) * input.height) / 2;

    const response = await request.post(endpoint, { data: input });
    expect(response.status()).toBe(200);

    const result = await response.json();
   // Check for the 'area' property in the response
    expect(result).toHaveProperty('area');

    // Check that the computed area matches the expected value
    expect(result.area).toBeCloseTo(expectedArea, 2);
  });

  test('Test 2: return an error for empty fields', async ({ request }) => {
    const input = { }; 
    const response = await request.post(endpoint, { data: input });

    // Expecting an error code\
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('Test 3: return an error for missing fields', async ({ request }) => {
    const input = { base1: 10, height: 5 }; 
    const response = await request.post(endpoint, { data: input });

    // Expecting an error code
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('Test 4: return an error for negative numbers', async ({ request }) => {
    const input = { base1: -10, base2: 20, height: 5 };
    const response = await request.post(endpoint, { data: input });

    // Expecting an error due to invalid negative input
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('Test 5: return an error for non-numeric inputs', async ({ request }) => {
    const input = { base1: "a", base2: 20, height: 5 };
    const response = await request.post(endpoint, { data: input });

    // Expecting an error due to invalid data type.
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('Test 6: handle extra fields', async ({ request }) => {
    const input = { 
      base1: 12, 
      base2: 30, 
      height: 5,
      extraneousField1: "extra data",
      extraneousField2: 12345
    };
    const response = await request.post(endpoint, { data: input });
    expect(response.status()).toBe(200);
    const result = await response.json();

    // Calculate expected area ignoring the extra fields
    const expectedArea = ((input.base1 + input.base2) * input.height) / 2;
    expect(result.area).toBeCloseTo(expectedArea, 2);
    
    // Ensure extra fields are not present in the response
    expect(result).not.toHaveProperty('extraneousField1');
    expect(result).not.toHaveProperty('extraneousField2');
  });


  test('Test 7: handle extreme values correctly', async ({ request }) => {
    // Test with very large values
    const hugeInput = { base1: 1e9, base2: 1e9, height: 1e9 };
    const responseHuge = await request.post(endpoint, { data: hugeInput });
    expect(responseHuge.status()).toBe(200);
    
    const resultHuge = await responseHuge.json();
    const expectedHugeArea = ((hugeInput.base1 + hugeInput.base2) * hugeInput.height) / 2;
    expect(resultHuge.area).toBeCloseTo(expectedHugeArea, 2);

    // Test with very small positive values
    const tinyInput = { base1: 1e-9, base2: 1e-9, height: 1e-9 };
    const responseTiny = await request.post(endpoint, { data: tinyInput });
    expect(responseTiny.status()).toBe(200);

    const resultTiny = await responseTiny.json();
    const expectedTinyArea = ((tinyInput.base1 + tinyInput.base2) * tinyInput.height) / 2;
    expect(resultTiny.area).toBeCloseTo(expectedTinyArea, 10);
  });


  test('Test 8: calculate area correctly for fractional inputs', async ({ request }) => {
    // Check calculation with fractional values
    const input = { base1: 13.5, base2: 20.75, height: 8.25 };
    const response = await request.post(endpoint, { data: input });
    expect(response.status()).toBe(200);
    
    const result = await response.json();
    const expectedArea = ((input.base1 + input.base2) * input.height) / 2;
    expect(result.area).toBeCloseTo(expectedArea, 2);
  });

  // The homework description requires positive floating-point numbers, a payload with all zeros should result in an error
  test('Test 9: return an error for all zero inputs', async ({ request }) => {
    const input = { base1: 0, base2: 0, height: 0 };
    const response = await request.post(endpoint, { data: input });
    
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});