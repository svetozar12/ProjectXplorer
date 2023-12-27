// src/app.d.ts

declare global {
	namespace App {
		interface Locals {
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
