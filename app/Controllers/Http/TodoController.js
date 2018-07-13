'use strict'
const Todo = use('App/Models/Todo');
const User = use('App/Models/User');
const Database = use('Database')


class TodoController {
  async index({ response}) {
    // let todos = await Todo.all()

    const todos = await Todo.query().with('owner').fetch()
    return response.status(200).json(todos)
  }

  async getHighPrTodosM1({ response }){
    // let highTodos = await Todo.query().where('priority', 'high').fetch()
    let highTodos = await Todo.query().where({ priority : 'high'}).fetch()
    return response.status(200).json(highTodos)
  }

  async getTodoById({ params, response}){
    const todo = await Todo.find(params.id)
    const todoUser = await todo.owner().fetch()

    if (todo){
      return response.status(201).json({ todo : todo, todoUser : todoUser })
    } else {
      return response.status(404).json({ msg: " Todo not found"})
    }

  }

  async createTodo({ request, response}) {
    const todoInfo = request.only(['title' , 'priority' , 'user_id'])
    const todo = new Todo()
    todo.title = todoInfo.title
    todo.priority = todoInfo.priority

    const user = await User.findByOrFail('id' , todoInfo.user_id)
    await user.todos().save(todo);

    return response.status(201).json(todo)
  }

  async editTodoById({ params, request, response }) {
    const todo = await Todo.find(params.id)
    const todoInfo = request.only(['title' , 'priority'])
    if (todo){
      todo.title = todoInfo.title
      todo.priority = todoInfo.priority
      await todo.save()
      return response.status(201).json(todo)
    } else {
      return response.status(404).json({ msg: " Todo not found"})
    }
  }

  async deleteTodoById({ params, response}){
    const todo = await Todo.find(params.id)
    if (todo){
      await todo.delete()
      return response.status(201).json({ success : true})
    } else {
      return response.status(404).json({ msg: " Todo not found"})
    }
  }


}

module.exports = TodoController
