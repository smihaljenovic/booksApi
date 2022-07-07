import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from "App/Validators/UserValidator"

export default class UsersController {
  /**
   * Get list of users
   * @param {number} page Page number
   * @param {number} limit Number of records
   *
   * @returns {JSON} JSON object with meta (paggination meta data) and data (array of records).
   */
  public async index({ auth, request }: HttpContextContract) {
    // @ts-ignore
    const loggedUser = auth.user.toJSON()   // get logged user data
    const page = request.input('page') || 1   // set default page number
    const limit = request.input('limit') || 5   // set default no of records

    let users = await User.query().paginate(page, limit)  // get users

    return users.serialize()
  }

  /**
   * Get single user
   * @param {number} id User ID
   *
   * @returns {JSON} User object
   */
  public async show({ params, auth }: HttpContextContract) {
    // @ts-ignore
    const loggedUser = auth.user.toJSON()   // get logged user data

    return {data: await User.find(params.id)}
  }

  /**
   * Create user
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @param {boolean} isAuthor Define if user is author
   * @param {string} email User email for login
   * @param {string} password User password for login
   *
   * @returns {string} Message 'New user added'
   */
  public async create({ request, response }: HttpContextContract) {
    let user;
    try {
      await request.validate(UserValidator)    // first validate params
      user = await User.create(request.body())   // create user
    } catch (error) {
      let errorMessage = ''
      if (error.code === 'ER_DUP_ENTRY') {
        // handling duplicate user by email (email is unique)
        errorMessage = 'User with requested email already exist'
      } else if (error.code === 'E_VALIDATION_FAILURE') {
        errorMessage = error.messages.errors[0].message
      } else errorMessage = error.message

      return response.status(400).send({error: errorMessage})
    }

    return {
      data: user,
      message: 'New user added'
    }
  }

  /**
   * Update user
   * @param {number} id User id
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @param {boolean} isAuthor Define if user is author
   * @param {string} email User email for login
   * @param {string} password User password for login
   *
   * @returns {string} Message 'User updated'
   */
  public async update({ request, response, params }: HttpContextContract) {
    try {
      await request.validate(UserValidator)    // first validate params
    }catch (e) {
      return response.badRequest({error: e.messages.errors[0].message})
    }

    // get params from body req
    const data = request.only(['email', 'firstName', 'lastName', 'isAuthor', 'password'])

    const userData = await User.find(params.id)   // check if user exist
    if (!userData) {
      response.badRequest({ error: 'Invalid user requested' })
      return
    }

    userData.merge(data)
    await userData.save()   // update user

    return {message: 'User updated'}
  }

  /**
   * Delete user
   * @param {number} id User id
   *
   * @returns {string} Message 'User deleted'
   */
  public async delete({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)   // check if user exist
    if (!user) {
      response.badRequest({ error: 'Invalid user requested' })
      return
    }

    await user.delete()   // delete user
    return {message: 'User deleted'}
  }
}
