/**
 * Handle GET requests to this route and respond with a plain text greeting.
 *
 * @param request - The incoming Fetch API Request object.
 * @returns A Response containing the plain text "Hello, from API!".
 */
export async function GET(request: Request) {
  return new Response('Hello, from API!');
}