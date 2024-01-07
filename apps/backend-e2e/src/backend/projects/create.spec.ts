import type { Project, ProjectDocument } from '../../../src/lib/server/mongo';
import { test, expect } from '@playwright/test';
import type { ObjectId } from 'mongoose';

test.describe('Testing POST - /api/projects', () => {
	const projectData: Project = { name: 'new test project', description: 'nice short description' };
	const projectIds: ObjectId[] = [];
	test.afterAll(async ({ request }) => {
		for (const projectId of projectIds) {
			const deleteResponse = await request.delete(`/api/projects/${projectId}`);
			expect(deleteResponse.ok()).toBeTruthy();
		}
	});
	test('create project', async ({ request }) => {
		// Sending a POST request to create a new project
		const response = await request.post('/api/projects', {
			data: projectData
		});

		// Check if the response status is 200 or 201 (success codes for POST)
		expect(response.ok()).toBeTruthy();

		// Parse the response body as JSON
		const responseBody: ProjectDocument = await response.json();
		projectIds.push(responseBody._id);
		// Validate if the created project data is returned
		expect(responseBody.name).toBe(projectData.name);
		expect(responseBody.description).toBe(projectData.description);
	});

	test('create project with bad payload', async ({ request }) => {
		// Sending a POST request to create a new project
		const response = await request.post('/api/projects', {
			data: { description: 1 }
		});
		// Check if the response status is 200 or 201 (success codes for POST)
		expect(response.ok()).toBeFalsy();

		// Parse the response body as JSON
		const responseBody = await response.json();
		expect(responseBody.validationErrors).toStrictEqual([
			'name: Required',
			'description: Expected string, received number'
		]);
	});
});
