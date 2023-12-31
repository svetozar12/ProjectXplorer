import { test, expect } from '@playwright/test';

// happy paths
test('test /api/projects', async ({ page }) => {
	// Navigate to the API endpoint
	await page.goto('/api/projects');

	// Get the response JSON
	const response = await page.evaluate(async () => {
		return fetch(document.URL);
	});
	console.log(response);
	const { data } = await response.json();
	expect(data.length).toEqual(1);
});
