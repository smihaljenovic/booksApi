import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('first_name', 50).defaultTo('')
      table.string('last_name', 50).defaultTo('')
      table.boolean('is_author').defaultTo(false)
      table.string('password', 180).defaultTo('')
      table.string('remember_me_token').nullable()
      table.enu('role', ['ROLE_ADMIN', 'ROLE_AUTHOR']).defaultTo('ROLE_AUTHOR')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
