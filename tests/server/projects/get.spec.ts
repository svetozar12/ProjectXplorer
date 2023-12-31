import { test, expect, type Response } from '@playwright/test';

test('GET - get all projects /api/projects', async ({ page }) => {
	// Navigate to the API endpoint
	const response = (await page.goto('/api/projects')) as Response;
	const responseBody = await response.json();

	expect(response.ok()).toBeTruthy();
	expect(responseBody.data.length).toEqual(10);
	expect(responseBody.pagination).toEqual({
		page: 1,
		limit: 10,
		total: 15,
		prev: false,
		next: true
	});
});

test('GET - get all project with different pagination /api/projects', async ({ page }) => {
	const pagination = {
		page: 3,
		limit: 2
	};
	// Navigate to the API endpoint
	const response = (await page.goto(
		`/api/projects?page=${pagination.page}&limit=${pagination.limit}`
	)) as Response;
	const responseBody = await response.json();

	expect(response.ok()).toBeTruthy();
	expect(responseBody.data.length).toEqual(pagination.limit);
	expect(responseBody.pagination).toEqual({
		page: pagination.page,
		limit: pagination.limit,
		total: 15,
		prev: true,
		next: true
	});
});
