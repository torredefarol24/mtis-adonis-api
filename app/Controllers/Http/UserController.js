'use strict'
const User = use('App/Models/User');
const Todo = use('App/Models/Todo');

class UserController {
  async signup({ request, response, auth }){
    const userInfo = request.only(['email', 'password', 'username'])
    const user = new User()
    user.email = userInfo.email
    user.password = userInfo.password
    user.username = userInfo.username

    await user.save()
    let token = await auth.generate(user)
    return response.status(201).json({token : token, user : user})

  }

  async login({ auth, request, response}){
    const userInfo = request.only(['email', 'password'])
    const user = await User.findByOrFail('email', userInfo.email)

    let token = await auth.attempt(user.email, userInfo.password)
    return response.status(201).json(token)
  }

  async getUsers({ response }){
    let users = await User.query().with('todos').fetch()
    return response.status(200).json({ users : users})
  }

  async getUsersById({ params, response }){
    // let user = await User.findByOrFail('id', params.id)
    let user = await User.query().where('id', params.id).with('todos').fetch()

    return response.status(200).json({ user : user })
  }

  async getUsersWithTodos({ response }){

    let users = await User.query().has('todos').with('todos').fetch()
    return response.status(200).json({ users : users})

  }

  async createTodoForUser({ params, response , request }){
    let user = await User.findByOrFail('id', params.userid)
    let todoInfo = request.only(['title' , 'priority'])

    let todo = new Todo()
    todo.title = todoInfo.title
    todo.priority = todoInfo.priority

    // await todo.owner().save(user)
    await user.todos().save(todo)
    return response.status(200).json({ todo : todo})
  }







  async createUser({ request, view, auth }){
    const userInfo = request.only(['email', 'password'])
    const user = new User()
    user.email = userInfo.email
    user.username = userInfo.email
    user.password = userInfo.password
    await user.save()
    return view.render('msgs.done', {msg : "User Created"})
  }

  async loginUser({ request, response, auth }){
    const userInfo = request.only(['email', 'password'])
    const user = await User.findByOrFail('email', userInfo.email)

    let result = await auth.attempt(user.email, userInfo.password)

    if (result){
      return response.redirect("/users")
    } else {
      return response.redirect("/login")
    }
  }

  async showUsers({ view, auth }){
    let users = await User.all()
    return view.render('user.users', {users : users.toJSON() })
  }

  async showLogin({ view }){
    return view.render('user.login')
  }

  async logoutUser({ auth, response }){
    await auth.logout()
    return response.redirect ("/login")
  }


}

module.exports = UserController
