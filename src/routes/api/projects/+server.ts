export async function GET() {
	return new Response('Hello');
}

export function POST() {
	console.log('post');
	return new Response('hello');
}
