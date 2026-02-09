const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'username', 'password')
      await expect(page.getByText('user name logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'userbame', 'passbord')
      await expect(page.getByText('user name logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'username', 'password')
      await expect(page.getByText('user name logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog title', 'blog author', 'blog url')
      await expect(page.getByText('blog title blog author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'blog title', 'blog author', 'blog url')
      await expect(page.getByText('blog title blog author')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, 'blog title', 'blog author', 'blog url')
      await expect(page.getByText('blog title blog author')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      page.once('dialog', dialog =>{
        expect(dialog.message()).toBe('Remove blog blog title by blog author')
        dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('blog title blog author')).not.toBeVisible()
    })

    test('user who added the blog sees the blog delete button', async ({ page}) => {
      await createBlog(page, 'blog title', 'blog author', 'blog url')
      await expect(page.getByText('blog title blog author')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('user who did not add the blog does not see the blogs delete button', async ({ page, request }) => {
      await createBlog(page, 'blog title', 'blog author', 'blog url')
      await request.post('/api/users/register', {
        data: {
          name: 'someone',
          username: 'someuser',
          password: 'somepassword'
        }
      })
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'someuser', 'somepassword')
      await expect(page.getByText('blog title blog author')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
    
    test('blogs are arranged in the order according to the likes', async ({ page }) => {
      await createBlog(page, 'blog1', 'author1', 'url1')
      await createBlog(page, 'blog2', 'author2', 'url2')
      await createBlog(page, 'blog3', 'author3', 'url3')

      await page.getByText('blog1 author1').getByRole('button', { name: 'view' }).click()
      await page.getByText('blog2 author2').getByRole('button', { name: 'view' }).click()
      await page.getByText('blog3 author3').getByRole('button', { name: 'view' }).click()

      const likebuttons = await page.getByRole('button',{ name: 'like' }).all()
      
      for (const button of likebuttons) {
        const randomClicks = Math.floor(Math.random() * 9) + 1

        for (let i = 0; i < randomClicks; i++) {
          await button.click()
        }
      }

      const likes = await page.getByText(/likes/).allTextContents()
      const likesCount = likes.map(str => Number(str.split(" ")[1]))
      const isDescending = likesCount.every((v, i) => i === 0 || v <= likesCount[i - 1])
      expect(isDescending).toBeTruthy()
    })
  })
})