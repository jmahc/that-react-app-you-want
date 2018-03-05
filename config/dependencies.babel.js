import packageJson from '../package.json'

/**
 * When building "vendor" DLL files, you may experience a
 * webpack error for third-party libraries that are
 * Exclude any `package.json` dependencies that throw errors here.
 */
const ignoreThese = ['normalize.css']

let dependencies = []

Object.keys(packageJson.dependencies).filter(
  key => (ignoreThese.indexOf(key) === -1 ? dependencies.push(key) : null)
)

export default dependencies

// function getVendorDependencies() {
//   let dependencies = []
//   Object.keys(packageJson.dependencies).filter(
//     key => (ignored.indexOf(key) === -1 ? dependencies.push(key) : null)
//   )
//   return dependencies
// }

// const response = getVendorDependencies()

// export default response
