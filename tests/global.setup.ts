import { dbConnect } from '../src/lib/server/mongo';
import '../scripts/seed';

async function globalSetup() {
	await dbConnect();
}

export default globalSetup;
