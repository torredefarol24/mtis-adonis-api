'use strict'

const Model = use('Model')

class Todo extends Model {
  static get table() {
    return 'todos'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Todo
