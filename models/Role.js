const keystone = require('keystone')
const Types = keystone.Field.Types

const Role = new keystone.List('Role', {
  autokey: { path: 'slug', from: 'name', unique: true }
})

Role.add({
  name: { type: Types.Text, required: true, index: true },
  color: { type: Types.Color, initial: true },
  textColor: { type: Types.Color, initial: true },
  slug: { type: Types.Text, initial: true }
})

Role.defaultColumns = 'title, url, date, roles'
Role.register()
