import { test, expect } from '@playwright/test';

// happy paths
test('test /api/projects', async ({ page }) => {
	// Navigate to the API endpoint
	await page.goto('/api/projects');

	// Get the response JSON
	const response = await page.evaluate(() => {
		return fetch(document.URL).then((response) => response.json());
	});

	// Perform assertions based on your API response
	expect(response).not.toBeNull();
	// expect(response.status).toEqual('success');
	// expect(response.data).toHaveProperty('exampleProperty', 'expectedValue');
});
