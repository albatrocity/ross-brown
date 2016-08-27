const keystone = require('keystone')
const Types = keystone.Field.Types

const Project = new keystone.List('Project', {
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: '-createdAt'
})

Project.add({
  name: { type: Types.Text, required: true, index: true },
  description: { type: Types.Markdown, initial: true, required: true },
  meta: { type: Types.Markdown, initial: true },
  slug: { type: Types.Text, initial: true },
  date: { type: Types.Date },
  roles: { type: Types.Relationship, ref: 'Role', many: true, initial: true },
  images: { type: Types.CloudinaryImages, select: true, autoCleanup : true },
  published: { type: Types.Boolean, default: true, initial: true }
})

Project.defaultColumns = 'title, url, date, published'
Project.register()
