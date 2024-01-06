async function globalTeardown() {
	try {
		if (process.env.NODE_ENV === 'test') {
			await import('../scripts/unseed');
		}
	} catch (error) {
		console.log(`Error in globalTeardown: ${error}`);
	}
}

export default globalTeardown;
