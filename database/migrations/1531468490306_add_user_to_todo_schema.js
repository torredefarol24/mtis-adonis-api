'use strict'

const Schema = use('Schema')

class AddUserToTodoSchema extends Schema {
  up () {
    this.table('todos', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('todos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddUserToTodoSchema
