import { test } from '@japa/runner'
import User from "App/Models/User";

test.group('Users', async () => {
  test('Create user', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.post('/api/v1/users').json({
      "firstName": "John",
      "lastName": "Doe",
      "isAuthor": true,
      "email": "john.doe@mail.com",
      "password": "jDoe123"
    }).loginAs(user)

    response.assertStatus(200)
  })

  test('Create user without required email param', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.post('/api/v1/users').json({
      "firstName": "John",
      "lastName": "Doe"
    }).loginAs(user)

    response.assertStatus(400)
  })

  test('Update user', async ({ client }) => {
    const [loginUser, updateUser] = await Promise.all([
      User.find(1),
      User.findBy('email', 'john.doe@mail.com')
    ])

    const response = await client.patch(`/api/v1/users/${(updateUser.toJSON()).id}`).json({
      "firstName": "Admin John",
      "email": "john.doe@mail.com"
    }).loginAs(loginUser)

    response.assertStatus(200)
  })

  test('Update invalid user', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.patch('/api/v1/users/111').json({
      "firstName": "Admin John",
      "email": "john.doe@mail.com"
    }).loginAs(user)

    response.assertStatus(400)
  })

  test('Get list of users, with paginate request', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/users?limit=3').loginAs(user)

    response.assertStatus(200)
  })

  test('Get list of users, without paginate request', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/users').loginAs(user)

    response.assertStatus(200)
  })

  test('Get specific user', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/users/1').loginAs(user)

    response.assertStatus(200)
  })

  test('Get invalid user', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/users/111').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ data: null })
  })

  test('Delete user', async ({ client }) => {
    const [loginUser, updateUser] = await Promise.all([
      User.find(1),
      User.findBy('email', 'john.doe@mail.com')
    ])

    const response = await client.delete(`/api/v1/users/${(updateUser.toJSON()).id}`).loginAs(loginUser)

    response.assertStatus(200)
  })
})
