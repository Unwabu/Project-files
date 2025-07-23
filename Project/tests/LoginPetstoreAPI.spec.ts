import { test, expect, request } from "@playwright/test";

const apiUrl = 'https://petstore.swagger.io/v2/user';

test('login to petstore API', async ({ request }) => {
	const response = await request.get(apiUrl + "/login");
	const responseBody = await response.json();
	expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log('Response Body:', responseBody);
    expect(responseBody.message).toContain('logged in user session:');
});
