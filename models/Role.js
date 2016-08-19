const keystone = require('keystone')
const Types = keystone.Field.Types

const Role = new keystone.List('Role')

Role.add({
  name: { type: Types.Text, required: true, index: true },
  description: { type: Types.Markdown, initial: true, required: true },
  color: { type: Types.Color, initial: true, required: true }
})

Role.defaultColumns = 'title, url, date, roles'
Role.register()
