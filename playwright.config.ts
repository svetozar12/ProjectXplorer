import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			NODE_ENV: 'test'
		}
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	globalSetup: './tests/global.setup.ts',
	globalTeardown: './tests/global.teardown.ts'
};

export default config;
