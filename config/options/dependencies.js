import { dependencies } from '../../package.json'

/**
 * Exclude any package.json dependencies that throw errors here.
 */
const ignored = []

let vendors = []

Object.keys(dependencies).filter(
  key => (ignored.indexOf(key) === -1 ? vendors.push(key) : null),
)

export const vendorEntries = vendors
