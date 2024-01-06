import { firebaseConfig } from '../../../src/lib/constants/firebase';
// import { firebaseServerInstance } from '$lib/server';

export async function createTestUser() {
	console.log(firebaseConfig, 'DEDBUH');
	// try {
	// 	testUser = await firebaseServerInstance.auth().createUser({
	// 		email: process.env.TEST_USER_EMAIL || 'default_test_email@example.com',
	// 		password: process.env.TEST_USER_PASSWORD || 'defaultTestPassword'
	// 	});
	// 	return { success: true, user: testUser };
	// } catch (error) {
	// 	console.error('Error creating test user:', error);
	// 	return { success: false, error: error };
	// }
}

// export async function deleteTestUser() {
// 	if (!testUser) {
// 		console.log('No test user to delete.');
// 		return { success: false, message: 'No test user to delete.' };
// 	}

// 	try {
// 		await firebaseServerInstance.auth().deleteUser(testUser.uid);
// 		testUser = undefined;
// 		return { success: true, message: 'Test user deleted successfully.' };
// 	} catch (error) {
// 		console.error('Error deleting test user:', error);
// 		testUser = undefined;
// 		return { success: false, error: error };
// 	}
// }
