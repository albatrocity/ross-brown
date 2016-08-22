const keystone = require('keystone')
const Project  = keystone.list('Project')
const Role     = keystone.list('Role')
const _        = require('lodash')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  var locals = res.locals
  const roleFilters = req.query.role.split(',')

  view.on('init', (next) => {
    Role.model.where({slug: {$in: roleFilters}}).exec()
    .then((roles) => {
      return new Promise((resolve, reject) => {
        const q = Project.paginate({
          page: req.query.page || 1,
          perPage: 10,
          maxPages: 10
        })
        .populate('roles')
        if (roleFilters) {
          q.where({roles: {$all: roles.map(r => r._id) }})
        }
        q.exec((err, results) => {
          if (err) { return reject(err) }
          resolve(results)
        })
      })
    })
    .then((paginated) => {
      locals.pagination = _.omit(paginated, 'results')
      locals.projects = paginated.results
      return paginated
    }).then(() => {
      return Role.model.find()
    }).then((roles) => {
      locals.roles = roles
      return next()
    }).catch((err) => {
      res.err(err, 'Something went wrong')
      return next()
    })
  })

  view.render('projects')
}
