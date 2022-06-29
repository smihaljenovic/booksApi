import { test } from '@japa/runner'
import User from "App/Models/User";
import Book from "App/Models/Book";

test.group('Books', async () => {
  test('Create book', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.post('/api/v1/books').json({
      "title": "Learning JavaScript",
      "publisher": "Addison-Wesley ",
      "authorId": 1
    }).loginAs(user)

    response.assertStatus(200)
  })

  test('Create book without required param', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.post('/api/v1/books').json({
      "publisher": "Addison-Wesley ",
      "authorId": 1
    }).loginAs(user)

    response.assertStatus(400)
  })

  test('Update book', async ({ client }) => {
    const [user, book] = await Promise.all([
      User.find(1),
      Book.findBy('title', 'Learning JavaScript')
    ])

    const response = await client.patch(`/api/v1/books/${(book.toJSON()).id}`).json({
      "title": "Learning JavaScript",
      "publisher": "JavaScript",
      "authorId": 1
    }).loginAs(user)

    response.assertStatus(200)
  })

  test('Update invalid book', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.patch('/api/v1/books/111').json({
      "publisher": "Addison-Wesley",
    }).loginAs(user)

    response.assertStatus(400)
  })

  test('Get list of books, with paginate request', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/books?limit=3').loginAs(user)

    response.assertStatus(200)
  })

  test('Get list of books, without paginate request', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/books').loginAs(user)

    response.assertStatus(200)
  })

  test('Get specific book', async ({ client }) => {
    const [user, book] = await Promise.all([
      User.find(1),
      Book.findBy('title', 'Learning JavaScript')
    ])
    const response = await client.get(`/api/v1/books/${(book.toJSON()).id}`).loginAs(user)

    response.assertStatus(200)
  })

  test('Get invalid book', async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/api/v1/books/111').loginAs(user)

    response.assertStatus(204)
  })

  test('Delete book', async ({ client }) => {
    const [user, book] = await Promise.all([
      User.find(1),
      Book.findBy('title', 'Learning JavaScript')
    ])
    const response = await client.delete(`/api/v1/books/${(book.toJSON()).id}`).loginAs(user)

    response.assertStatus(200)
  })
})
