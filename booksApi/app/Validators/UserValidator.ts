import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstName: schema.string.optional([
      rules.maxLength(50)
    ]),
    lastName: schema.string.optional([
      rules.maxLength(50)
    ]),
    isAuthor: schema.boolean.optional(),
    email: schema.string([
      rules.email()
    ]),
    password: schema.string.optional([
      rules.minLength(4)
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    string: 'The {{ field }} is in wrong format',
    required: 'The {{ field }} is required',
    maxLength: 'Maximum length for {{field}} is 50 characters',
    minLength: 'Minimum length for {{field}} is 4 characters',
    email: 'Invalid email'
  }
}
