import { expect, test } from "@playwright/test";

test("displays Helloworld message", async ({ page }) => {
	await page.goto("/");

	// Check if the text is visible
	await expect(page.getByText("Hello World !")).toBeVisible();

	// Verify the text has correct styling
	const heading = page.getByText("Hello World !");
	await expect(heading).toHaveClass(/text-2xl.*font-bold.*text-center/);
});
