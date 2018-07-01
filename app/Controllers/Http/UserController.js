'use strict'
const User = use('App/Models/User');


class UserController {
  async signup({ request, response, auth }){
    const userInfo = request.only(['email', 'password', 'username'])
    const user = new User()
    user.email = userInfo.email
    user.password = userInfo.password
    user.username = userInfo.username

    await user.save()
    let token = await auth.generate(user)
    return response.status(201).json(token)

  }

  async login({ auth, request, response}){
    const userInfo = request.only(['email', 'password'])
    const user = await User.findByOrFail('email', userInfo.email)

    let token = await auth.attempt(user.email, userInfo.password)
    return response.status(201).json(token)
  }
}

module.exports = UserController
