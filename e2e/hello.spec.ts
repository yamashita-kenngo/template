import { test, expect } from '@playwright/test'

test('displays Helloworld message', async ({ page }) => {
  await page.goto('/')
  
  // Check if the text is visible
  await expect(page.getByText('Helloworld')).toBeVisible()
  
  // Verify the card container exists
  await expect(page.locator('.w-[300px]')).toBeVisible()
  
  // Verify the text has correct styling
  const heading = page.getByText('Helloworld')
  await expect(heading).toHaveClass(/text-2xl.*font-bold.*text-center/)
})
