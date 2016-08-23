const keystone = require('keystone')
const Page     = keystone.list('Page')
const Project  = keystone.list('Project')

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home'

  view.on('init', (next) => {
    return Page.model.findOne({slug: 'home'}).then((page) => {
      if (!page) { res.notfound() }
      locals.content = page.content
      locals.section = 'home'
      return locals
    }).then(() => {
      return Project.model.find().sort('-date').limit(1).exec()
    }).then((project) => {
      locals.project = project[0]
      next()
    })
  })

  // Render the view
  view.render('home')
}
