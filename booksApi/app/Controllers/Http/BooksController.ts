import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import BookValidator from 'App/Validators/BookValidator'

export default class BooksController {
  /**
   * Get list of books
   * @param {number} page Page number
   * @param {number} limit Number of records
   * @param {number} authorID Author ID
   *
   * @returns {JSON} JSON object with meta (paggination meta data) and data (array of records).
   */
  public async index({ request }: HttpContextContract) {
    const page = request.input('page') || 1 // set default page number
    const limit = request.input('limit') || 5 // set default no of records
    const authorID = request.input('authorID') || null // get author ID

    let books
    if (authorID) {
      books = await Book.query().where('author_id', authorID).paginate(page, limit)
    } else {
      books = await Book.query().paginate(page, limit) // get records
    }

    return books.serialize()
  }

  /**
   * Get single book
   * @param {number} id Book ID
   *
   * @returns {JSON} Book object
   */
  public async show({ params }: HttpContextContract) {
    return await Book.find(params.id)
  }

  /**
   * Create book
   * @param {string} title Book title
   * @param {string} publisher Publisher name
   * @param {number} authorID Author ID
   *
   * @returns {string} Message 'New book added'
   */
  public async create({ request, response }: HttpContextContract) {
    try {
      await request.validate(BookValidator) // first validate params
    } catch (e) {
      return response.status(400).send(e.messages.errors[0].message)
    }

    await Book.create(request.body()) // create book
    return { message: 'New book added' }
  }

  /**
   * Update book
   * @param {number} id Book ID
   * @param {string} title Book title
   * @param {string} publisher Publisher name
   * @param {number} authorID Author ID
   *
   * @returns {string} Message 'Book updated'
   */
  public async update({ request, response, params }: HttpContextContract) {
    try {
      await request.validate(BookValidator) // first validate params
    } catch (e) {
      return response.status(400).send(e.messages.errors[0].message)
    }

    const data = request.only(['title', 'publisher', 'authorId']) // get params

    const bookData = await Book.find(params.id) // check if book exist
    if (!bookData) {
      response.badRequest({ error: 'Invalid book requested' })
      return
    }

    bookData.merge(data)
    await bookData.save() // update book

    return { message: 'Book updated' }
  }

  /**
   * Delete book
   * @param {number} id Book id
   *
   * @returns {string} Message 'Book deleted'
   */
  public async delete({ response, params }: HttpContextContract) {
    const bookData = await Book.find(params.id) // check if book exist
    if (!bookData) {
      response.badRequest({ error: 'Invalid book requested' })
      return
    }

    await bookData.delete() // delete book
    return { message: 'Book deleted' }
  }
}
