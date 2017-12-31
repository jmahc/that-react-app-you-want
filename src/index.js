if (process.env.NODE_ENV === 'production') {
  module.exports = require('./application.prod')
} else {
  module.exports = require('./application.dev')
}
