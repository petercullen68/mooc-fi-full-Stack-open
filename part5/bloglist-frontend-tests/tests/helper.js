import {expect} from "@playwright/test";

const loginWith = async (page, username, password)  => {
  await page.getByTestId("link-login").click()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByTestId("login-button").click()
}

const createUser = async (request, username, password, name) => {
  await request.post('http://localhost:3001/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

const createBlog = async (page, title, author, url) => {
  await page.getByTestId("link-create-blog").click()
  await page.getByLabel("Title").fill(title)
  await page.getByLabel("Author").fill(author)
  await page.getByLabel("Url").fill(url)
  await page.getByTestId("submit-create-blog-button").click()
  await page.pause()

  await expect(
    page.getByTestId("blog-link").filter({ hasText: title })
  ).toBeVisible()

  await expect(page.getByTestId("blog-link")).not.toHaveCount(0)

}

export { loginWith, createUser, createBlog }