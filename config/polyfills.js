// eslint-disable-next-line
if (typeof Promise === 'undefined') {
  /*
    Rejection tracking prevents a common issue where React gets into an
    inconsistent state due to an error, but it gets swallowed by a Promise,
    and the user has no idea what causes React's erratic future behavior.
   */

  // eslint-disable-next-line
  require('promise/lib/rejection-tracking').enable()

  // eslint-disable-next-line
  window.Promise = require('promise/lib/es6-extensions.js')
}

// fetch() polyfill for making API calls.

// eslint-disable-next-line
require('whatwg-fetch')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.

// eslint-disable-next-line
Object.assign = require('object-assign')
