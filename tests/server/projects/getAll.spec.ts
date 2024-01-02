import { test, expect, type Response } from '@playwright/test';
test.describe('Testing GET - /api/projects', () => {
	test('get all projects', async ({ page }) => {
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

	test('get all project with different pagination', async ({ page }) => {
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

	test('get all project with invalid pagination', async ({ request }) => {
		const paginations = [
			{
				page: -1,
				limit: 51,
				expectedResponse: [
					'page: Number must be greater than or equal to 1',
					'limit: Number must be less than or equal to 50'
				]
			},
			{
				page: -1,
				limit: -1,
				expectedResponse: [
					'page: Number must be greater than or equal to 1',
					'limit: Number must be greater than or equal to 1'
				]
			}
		];

		for (const pagination of paginations) {
			const response = await request.get(
				`/api/projects?page=${pagination.page}&limit=${pagination.limit}`
			);
			const responseBody = await response.json();

			expect(response.ok()).toBeFalsy();
			expect(responseBody.validationErrors).toStrictEqual(pagination.expectedResponse);
		}
	});

	test('get all project with empty page', async ({ page }) => {
		const pagination = {
			page: 3,
			limit: 50
		};
		// Navigate to the API endpoint
		const response = (await page.goto(
			`/api/projects?page=${pagination.page}&limit=${pagination.limit}`
		)) as Response;
		const responseBody = await response.json();

		expect(response.ok()).toBeTruthy();
		expect(responseBody.data.length).toEqual(0);
		expect(responseBody.pagination).toEqual({
			page: pagination.page,
			limit: pagination.limit,
			total: 15,
			prev: true,
			next: false
		});
	});
});
