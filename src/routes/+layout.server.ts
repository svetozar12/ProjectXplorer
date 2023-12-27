import { type ServerLoadEvent } from '@sveltejs/kit';
import { authGuard } from '$lib/server';
export async function load(event: ServerLoadEvent) {
	authGuard(event);

	return {};
}
