import { test, expect } from '@playwright/test';

test('API endpoint returns expected data', async ({ page }) => {
	// Navigate to the API endpoint
	await page.goto('/api/projects');

	// Get the response JSON
	const response = await page.evaluate(() => {
		return fetch(document.URL).then((response) => response.json());
	});

	// Perform assertions based on your API response
	expect(response).not.toBeNull();
	console.log(response);
	// expect(response.status).toEqual('success');
	// expect(response.data).toHaveProperty('exampleProperty', 'expectedValue');
});
