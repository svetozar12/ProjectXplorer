import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			NODE_ENV: 'test'
		}
	},
	testDir: 'e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	globalSetup: './e2e/global.setup.ts',
	globalTeardown: './e2e/global.teardown.ts'
};

export default config;
