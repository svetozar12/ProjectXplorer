type ResponseType = { status: number; message: string };
export function createResponse({ message, status }: ResponseType) {
	return new Response(message, { status });
}
