'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group( () => {
  Route.post("/signup", "UserController.signup")
  Route.post("/login", "UserController.login")
})
.prefix("/api/v1/users")

Route.group( () => {
  Route.get("/", 'TodoController.index')
  Route.post("/", 'TodoController.createTodo')
  Route.get("/:id", "TodoController.getTodoById")
  Route.put("/:id", 'TodoController.editTodoById')
  Route.delete("/:id", "TodoController.deleteTodoById")
})
.prefix("api/v1/todos")
.middleware('auth')
