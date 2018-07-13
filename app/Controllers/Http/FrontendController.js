'use strict'

class FrontendController {
  async welcome({ view }){
    return view.render('welcome')
  }
}

module.exports = FrontendController
