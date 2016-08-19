const keystone = require('keystone')
const Project  = keystone.list('Project')
const Role     = keystone.list('Role')
const _        = require('lodash')

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  var locals = res.locals

  view.on('init', (next) => {
    new Promise((resolve, reject) => {
      return Project.paginate({
        page: req.query.page || 1,
        perPage: 10,
        maxPages: 10
      })
      .populate('roles')
      .exec((err, results) => {
        if (err) { return reject(err) }
        resolve(results)
      })
    }).then((paginated) => {
      console.log(paginated)
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
