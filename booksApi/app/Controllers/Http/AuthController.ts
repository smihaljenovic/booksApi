import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  /**
   * Login
   * @param {string} email User email
   * @param {string} password User password
   *
   * @returns {JSON} JSON object with type, token and expires_at params
   */
  public async login({ auth, request, response }: HttpContextContract) {
    // get login credentials
    const email = request.input('email')
    const password = request.input('password')

    try {
      // check credentials and generate token
      const token = await auth.use('api').attempt(email, password, { expiresIn: '30mins' })
      return token
    } catch (e) {
      return response.unauthorized({error: 'Invalid credentials'})
    }
  }

  /**
   * Logout
   * Token is sent via request header
   *
   * @returns {JSON} JSON object with revoked param
   */
  public async logout({ auth, request, response }: HttpContextContract) {
    await auth.use('api').revoke()    // revoke token
    return { revoked: true }
  }
}
