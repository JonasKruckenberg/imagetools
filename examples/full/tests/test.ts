import { expect, test } from '@playwright/test'

test('metadata', async ({ page }) => {
  await Promise.all([page.waitForResponse((resp) => resp.url().endsWith('.webp')), page.goto('/metadata')])

  const img = page.locator('img')
  await expect(img).toBeVisible()

  const boundingBox = await (await img.elementHandle())?.boundingBox()
  expect(boundingBox?.width).toBe(300)
  expect(boundingBox?.height).toBeCloseTo(449.77)

  await expect(page).toHaveScreenshot()
})

test('picture', async ({ page }) => {
  page.goto('/picture')

  const img = page.locator('img')
  await expect(img).toBeVisible()

  await expect(page).toHaveScreenshot()
})
