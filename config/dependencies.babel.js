import packageJson from '../package.json'

/**
 * Exclude any package.json dependencies (e.g. `normalize.css`)
 * that throw errors here.
 */
const ignored = ['normalize.css']

function getVendorDependencies() {
  let dependencies = []

  Object.keys(packageJson.dependencies).filter(
    key => (ignored.indexOf(key) === -1 ? dependencies.push(key) : null)
  )
  return dependencies
}

export default getVendorDependencies()
