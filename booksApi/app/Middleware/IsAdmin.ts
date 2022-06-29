import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // @ts-ignore
    const loggedUser = auth.user.toJSON()

    if (loggedUser.role !== 'ROLE_ADMIN') {
      response.forbidden({ error: 'You are not allowed to run this command.' })
      return
    }

    await next()
  }
}
