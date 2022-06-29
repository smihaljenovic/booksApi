import { test } from '@japa/runner'
import User from "App/Models/User"

test.group('Login', () => {
  test('Try login with invalid credentials', async ({ client }) => {
    const response = await client.post('/api/v1/login').json({
      email: 'foo',
      password: 'bar'
    })

    response.assertStatus(401)
    response.assertBody({error: "Invalid credentials"})
  })

  test('Login with valid credentials', async ({ client }) => {
    const response = await client.post('/api/v1/login').json({
      email: 'admin@books.com',
      password: 'Admin22*'
    })

    response.assertStatus(200)
  })

  test('Logout user', async ({ client }) => {
    const user = await User.find(1)   // get user details to logged with before logout

    const response = await client.get('/api/v1/logout').loginAs(user)

    response.assertStatus(200)
  })
})
