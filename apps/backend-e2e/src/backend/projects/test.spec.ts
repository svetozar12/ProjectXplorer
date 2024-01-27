import { dbConnect } from '@svetozar12/api/mongo';
import {
  createTestUser,
  deleteTestUser,
  getUserAccessToken,
} from '../../utils/auth.utils';

describe('Test Suite', () => {
  beforeAll(async () => {
    console.log('SETUP...');

    await dbConnect();
    const {
      user: { uid },
    } = await createTestUser();
    const { token } = await getUserAccessToken(uid);
    global.accessToken = token;
  });
  afterAll(async () => {
    // unseed databse
    await deleteTestUser();
  });
  require('./create');
});
