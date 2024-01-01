import mongoose from 'mongoose';
import type { ProjectDocument } from '../../../src/lib/server/mongo';
import { test, expect } from '@playwright/test';
import { PROJECT_MESSAGES } from '../../../src/lib/constants/project';
test.describe('Testing DELETE - /api/projects/{id}', () => {
	let project: ProjectDocument;

	test.beforeAll(async ({ request }) => {
		// Navigate to the projects list endpoint
		const response = await request.post('/api/projects', {
			data: { name: 'testDelete' }
		});
		const responseBody = await response.json();
		project = responseBody;
	});

	test('delete project', async ({ request }) => {
		// Navigate to the specific project endpoint
		const response = await request.delete(`/api/projects/${project._id}`);
		const responseBody = await response.json();
		expect(response.ok()).toBeTruthy();
		expect(responseBody).toEqual(PROJECT_MESSAGES.PROJECT_DELETED);
	});
	test('project not found', async ({ request }) => {
		// Navigate to the specific project endpoint
		const fakeId = new mongoose.Types.ObjectId();
		const response = await request.delete(`/api/projects/${fakeId}`);
		const responseBody = await response.json();
		expect(response.ok()).toBeFalsy();
		expect(responseBody).toEqual(PROJECT_MESSAGES.PROJECT_NOT_FOUND);
	});
});
