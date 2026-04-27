const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createUser, createBlog} = require("./helper");

describe('Blog app', () => {
  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByTestId('link-login')).toHaveCount(1)
  })
})

describe('Login', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await createUser(request, 'mluukkai', 'salainen', 'Matti Luukkainen')
    await page.goto('http://localhost:5173')
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByTestId('logout-button')).toHaveCount(1)
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'baduser', 'badpassword')
    const notification = await page.getByText('wrong credentials')
    await expect(notification).toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await createUser(request, 'mluukkai', 'salainen', 'Matti Luukkainen')
    await createUser(request, 'ppassword', 'password', 'Peter Password')
    await page.goto('http://localhost:5173')
  })

  test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'test a new blog can be created', 'test author', 'test url')
    const notification = await page.getByText('a new blog test a new blog can be created by test author added')
    await expect(notification).toBeVisible()
  })

  test('like button can be pushed', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'test a new blog can be created', 'test author', 'test url')
    const blogLink = await page.getByTestId('blog-link').filter({ hasText: 'test a new blog can be created' })
    await blogLink.click()
    await page.getByTestId("like-button").click()
  })

  test('remove button only visible to user that added the blog', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'test a new blog can be created', 'test author', 'test url')

    let blogLink = await page.getByTestId('blog-link').filter({ hasText: 'test a new blog can be created' })
    await blogLink.click()
    await expect(page.getByTestId('remove-button')).toBeVisible()
    await page.getByTestId("logout-button").click()

    await loginWith(page, 'ppassword', 'password')
    blogLink = await page.getByTestId('blog-link').filter({ hasText: 'test a new blog can be created' })
    await blogLink.click()

    await expect(page.getByTestId('remove-button')).toHaveCount(0)
  })

  test('remove button works for user who added the blog', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page, 'test a blog can be removed', 'test author', 'test url')

    let blogLink = await page.getByTestId('blog-link').filter({ hasText: 'test a blog can be removed' })
    await blogLink.click()

    page.once('dialog', async dialog => {
      console.log(dialog.message()); // Access text
      await dialog.accept();         // or dialog.dismiss();
    });
    await page.getByTestId('remove-button').click()
    await expect(
      page.getByTestId('blog-link').filter({ hasText: 'test a blog can be removed' })
    ).toHaveCount(0)

  })

  test('ensure blogs are sorted correctly by number of likes', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await createBlog(page,'First Blog Title', 'First Blog Author', 'First Blog Url')
    await createBlog(page,'Second Blog Title', 'Second Blog Author', 'Second Blog Url')
    await createBlog(page,'Third Blog Title', 'Third Blog Author', 'Third Blog Url')

    const blog1 = await page.getByTestId('blog-link').filter({ hasText: 'First Blog Title' })
    const blog2 = await page.getByTestId('blog-link').filter({ hasText: 'Second Blog Title' })
    const blog3 = await page.getByTestId('blog-link').filter({ hasText: 'Third Blog Title' })

    await blog1.click()
    await page.getByTestId("like-button").click()
    await expect(page.getByText("1 likes")).toBeVisible()
    await page.getByTestId("link-blogs").click()

    await blog2.click()
    await page.getByTestId("like-button").click()
    await expect(page.getByText("1 likes")).toBeVisible()
    await page.getByTestId("like-button").click()
    await page.getByTestId("link-blogs").click()

    const blogs = await page.getByTestId('blog-link')
    await expect(blogs.nth(0)).toContainText('Second Blog Title')
    await expect(blogs.nth(1)).toContainText('First Blog Title')
    await expect(blogs.nth(2)).toContainText('Third Blog Title')
  })
})