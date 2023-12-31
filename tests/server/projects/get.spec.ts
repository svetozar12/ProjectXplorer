import { test, expect, type Response } from '@playwright/test';

test('test /api/projects', async ({ page }) => {
	// Navigate to the API endpoint
	const response = (await page.goto('/api/projects')) as Response;
	const responseBody = await response.json();

	expect(response.ok()).toBeTruthy();
	expect(responseBody.data.length).toEqual(1);
});
