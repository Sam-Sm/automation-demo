import { test, expect } from '@playwright/test';
import elements from '../../elements'

test(`Go to the Parabank Site`, async ({ page }) => {
  await page.goto(process.env.DEFAULT_URL)
  await page.waitForSelector(elements.homepage.login.username)
  const title = await page.title()
  expect(title).toBe('ParaBank | Welcome | Online Banking')

  // Fill in random username and password
  await page.fill(elements.homepage.login.username, `${Math.random() * 10000} - ${Math.random() * 10000}`)
  await page.fill(elements.homepage.login.password, `${Math.random() * 10000} - ${Math.random() * 10000}`)
  await page.click(elements.homepage.login.submit)

  // Make sure the URL does not include /overview
  expect(page.url()).not.toContain('/overview')

  // Make sure the error message is displayed
  const PageTitle = await page.waitForSelector(elements.homepage.title)
  expect(await PageTitle.innerText()).toBe('Error!')
})