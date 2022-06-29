import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class AdminUser extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { email: 'admin@books.com' },
      {
        email: 'admin@books.com',
        firstName: 'Admin',
        lastName: 'User',
        password: 'Admin22*',
        role: 'ROLE_ADMIN',
      }
    )
  }
}
