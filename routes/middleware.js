/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const _ = require('lodash')
const keystone = require('keystone')
const Page = keystone.list('Page')


/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
  Page.model.where({inMenu: true}).exec().then((results) => {
    let menuPages = results.map( (r) => {
      return {label: r.name, key: r.slug, href: `/${r.slug}`}
    })
    res.locals.navLinks = [
      { label: 'Projects', key: 'projects', href: '/projects' }
    ].concat(menuPages)
    res.locals.user = req.user
    next()
  })
}

exports.initErrorHandlers = function(req, res, next) {

  res.err = function(err, title, message) {
    res.status(500).render('errors/500', {
      err: err,
      errorTitle: title,
      errorMsg: message
    })
  }

  res.notfound = function(title, message) {
    res.status(404).render('errors/404', {
      errorTitle: title,
      errorMsg: message
    })
  }

  next()

}

/**
  Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  }
  res.locals.messages = _.some(flashMessages, (msgs) =>{
    return msgs.length
  }) ? flashMessages : false
  next()
}


/**
  Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.')
    res.redirect('/keystone/signin')
  } else {
    next()
  }
}
