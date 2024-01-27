import mongoose from 'mongoose';
import type { ProjectDocument } from '../../../src/lib/server/mongo';
import { test, expect, type Response } from '@playwright/test';
import { PROJECT_MESSAGES } from '../../../src/lib/constants/project';
test.describe('Testing GET - /api/projects/{id}', () => {
  let project: ProjectDocument;

  test.beforeEach(async ({ page }) => {
    // Navigate to the projects list endpoint
    const response = (await page.goto('/api/projects')) as Response;
    const responseBody = await response.json();
    project = responseBody.data[0];
  });

  test('get project', async ({ page }) => {
    // Navigate to the specific project endpoint
    const response = (await page.goto(
      `/api/projects/${project._id}`
    )) as Response;
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(responseBody).toEqual(project);
  });
  test('project not found', async ({ page }) => {
    // Navigate to the specific project endpoint
    const fakeId = new mongoose.Types.ObjectId();
    const response = (await page.goto(`/api/projects/${fakeId}`)) as Response;
    const responseBody = await response.json();
    expect(response.ok()).toBeFalsy();
    expect(responseBody).toEqual(PROJECT_MESSAGES.PROJECT_NOT_FOUND);
  });
});
