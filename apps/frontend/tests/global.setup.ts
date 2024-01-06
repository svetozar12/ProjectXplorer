import { dbConnect } from '../src/lib/server/mongo';
import '../scripts/seed';
import { createTestUser } from './server/utils/auth.utils';

async function globalSetup() {
	console.log('SETUP...');
	await dbConnect();
	await createTestUser();
}

export default globalSetup;
