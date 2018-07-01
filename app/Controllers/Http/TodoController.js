'use strict'
const Todo = use('App/Models/Todo');

class TodoController {
  async index({ response}) {
    let todos = await Todo.all()
    return response.status(200).json(todos)
  }

  async getTodoById({ params, response}){
    const todo = await Todo.find(params.id)
    return todo ? response.status(200).json(todo) : response.status(404).json({ msg: " Todo not found"})
  }

  async createTodo({ request, response}) {
    const todoInfo = request.only(['title' , 'priority'])
    const todo = new Todo()
    todo.title = todoInfo.title
    todo.priority = todoInfo.priority
    await todo.save()
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
