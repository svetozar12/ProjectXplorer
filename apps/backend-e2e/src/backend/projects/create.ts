// eslint-disable-next-line @nx/enforce-module-boundaries
import { Project, ProjectDocument } from 'apps/backend/src/models';
import axios from 'axios';
import type { ObjectId } from 'mongoose';

describe('Testing POST - /api/projects', () => {
  const projectData: Project = {
    name: 'new test project',
    description: 'nice short description',
  };
  const projectIds: ObjectId[] = [];

  afterAll(async () => {
    for (const projectId of projectIds) {
      await axios.delete(`http://localhost:3000/api/projects/${projectId}`, {
        headers: { Authorization: global.accessToken },
      });
    }
  });

  test('create project', async () => {
    const response = await axios
      .post('http://localhost:3000/api/projects', projectData, {
        headers: { Authorization: global.accessToken },
      })
      .catch((err) => err);
    console.log(response, 'Hello', 'debug');
    expect(response.status).toBe(201); // Assuming 201 is the success status code for creation

    const responseBody: ProjectDocument = response.data;
    projectIds.push(responseBody._id);

    expect(responseBody.name).toBe(projectData.name);
    expect(responseBody.description).toBe(projectData.description);
  });

  test('create project with bad payload', async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/projects',
        {
          description: 1,
        },
        {
          headers: { Authorization: global.accessToken },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        expect(error.response.status).not.toBe(200);
        expect(error.response.status).not.toBe(201);
        expect(error.response.data.validationErrors).toStrictEqual([
          'name: Required',
          'description: Expected string, received number',
        ]);
      } else {
        throw error; // rethrow if it's not an Axios error
      }
    }
  });
});
