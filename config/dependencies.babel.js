import {
  dependencies
} from '../package.json'

/**
 * Exclude any package.json dependencies that throw errors here.
 */
const ignored = [
  //
  'normalize.css',
]

export const vendorEntries = Object.keys(dependencies).filter(
  (key) => !ignored.includes(key),
)
