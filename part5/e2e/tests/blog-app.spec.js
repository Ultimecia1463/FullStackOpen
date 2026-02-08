const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users/register', {
      data: {
        name: 'user name',
        username: 'username',
        password: 'password'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('username')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('username logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('userbame')
      await page.getByLabel('password').fill('passbord')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('username logged in')).not.toBeVisible()
    })
  })
})