import mongoose from 'mongoose';
import type { ProjectDocument } from '../../../src/lib/server/mongo';
import { test, expect, type Response } from '@playwright/test';
import { PROJECT_MESSAGES } from '../../../src/lib/constants/project';
test.describe('Testing PUT - /api/projects/{id}', () => {
	let project: ProjectDocument;

	test.beforeEach(async ({ page }) => {
		// Navigate to the projects list endpoint
		const response = (await page.goto('/api/projects')) as Response;
		const responseBody = await response.json();
		project = responseBody.data[1];
	});

	test('update project', async ({ request }) => {
		const newName = 'UpdateTestName';
		// Navigate to the specific project endpoint
		const response = await request.put(`/api/projects/${project._id}`, {
			data: { name: newName }
		});
		const responseBody = await response.json();
		project = responseBody;
		expect(response.ok()).toBeTruthy();
		expect(responseBody.name).toEqual(newName);
	});
	test('update project with empty payload', async ({ request }) => {
		// Navigate to the specific project endpoint
		const response = await request.put(`/api/projects/${project._id}`, {
			data: {}
		});
		const responseBody = await response.json();
		expect(response.ok()).toBeFalsy();
		expect(responseBody.error).toEqual('Invalid input');
	});
	test('project not found', async ({ request }) => {
		// Navigate to the specific project endpoint
		const fakeId = new mongoose.Types.ObjectId();
		const response = await request.put(`/api/projects/${fakeId}`, {
			data: { name: 'test' }
		});
		const responseBody = await response.json();
		expect(response.ok()).toBeFalsy();
		expect(responseBody).toEqual(PROJECT_MESSAGES.PROJECT_NOT_FOUND);
	});
});
