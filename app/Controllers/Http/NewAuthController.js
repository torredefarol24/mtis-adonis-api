'use strict'
const User = use('App/Models/User');

class NewAuthController {
	async showLogin({ view}){
		return view.render('auth.login')
	}

	async createUser({ request , response}){
		const userInfo = request.only(['email', 'password'])
    const user = new User()
    user.user = userInfo.email
    user.email = userInfo.email
    user.password = userInfo.password

    await user.save()
    return response.redirect("/show/users")
	}

	async showUsers({ view }){
		let users = await User.all()
		return view.render("success.users", { users : users.toJSON()})

	}

	async loginUser({ view, response }){
		const userInfo = request.only(['email', 'password'])
    const user = await User.findByOrFail('email', userInfo.email)
    if (auth.attempt(user.email, userInfo.password) ){
    	return response.redirect('/show/users')
    } else {
    	let loginFailed = "Login Failed"
    	return view.render('auth.login', {msg : loginFailed})
    }
	}

}

module.exports = NewAuthController
