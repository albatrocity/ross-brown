const keystone = require('keystone')
const Project  = keystone.list('Project')
const Role     = keystone.list('Role')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  var locals = res.locals

  view.on('init', (next) => {
    return Project.model.findOne({slug: req.params.slug}).then((project) => {
      if (!project) { res.notfound() }
      locals.project = project
      locals.section = project.key
      return project
    }).then((project) => {
      return Role.model.where('_id').in(project.roles).exec()
    }).then((roles) => {
      locals.project.roles = roles
      return next()
    }).catch((err) => {
      res.err(err, 'Something went wrong')
      return next()
    })
  })

  view.render('project')
}