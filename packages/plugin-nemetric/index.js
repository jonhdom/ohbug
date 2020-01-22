'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/plugin-nemetric.umd.prod.js')
} else {
  module.exports = require('./dist/plugin-nemetric.umd.js')
}
