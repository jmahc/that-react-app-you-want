import { dependencies } from '../package.json'

// List any `package.json` dependencies that may throw errors - ex. `normalize.css`.
const ignored = ['normalize.css']

let vendors = []

Object.keys(dependencies).filter(
  key => (ignored.indexOf(key) === -1 ? vendors.push(key) : null)
)

export default vendors
