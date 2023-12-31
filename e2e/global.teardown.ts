if (process.env.NODE_ENV !== 'test') {
	// Only import the file if the environment is not 'test'
	require('../scripts/unseed');
}

async function globalTeardown() {
	console.log('db cleanup');
}

export default globalTeardown;
