import { firebaseAuth } from '@svetozar12/api/src/config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

let testUser: UserRecord;

export async function createTestUser() {
  try {
    testUser = await firebaseAuth.createUser({
      email: process.env.TEST_USER_EMAIL || 'default_test_email@example.com',
      password: process.env.TEST_USER_PASSWORD || 'defaultTestPassword',
    });
    return { success: true, user: testUser };
  } catch (error) {
    console.error('Error creating test user:', error);
    return { success: false, error: error };
  }
}

export async function deleteTestUser() {
  if (!testUser) {
    console.log('No test user to delete.');
    return { success: false, message: 'No test user to delete.' };
  }

  try {
    await firebaseAuth.deleteUser(testUser.uid);
    testUser = undefined;
    return { success: true, message: 'Test user deleted successfully.' };
  } catch (error) {
    console.error('Error deleting test user:', error);
    testUser = undefined;
    return { success: false, error: error };
  }
}

export async function getUserAccessToken(uid: string) {
  try {
    const customToken = await firebaseAuth.createCustomToken(uid);
    return { success: true, token: customToken };
  } catch (error) {
    console.error('Error getting user access token:', error);
    return { success: false, error: error };
  }
}
