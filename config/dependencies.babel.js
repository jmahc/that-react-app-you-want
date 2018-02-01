import packageJson from '../package.json'

const getVendorDependencies = () => {
  let dependencies = []

  Object.keys(packageJson.dependencies).filter(key => {
    /**
     * Exclude any package.json dependencies (e.g. `normalize.css`)
     * that throw errors here.
     *
     * Example:
     * if (key !== 'normalize.css' && key !== 'someOtherDependency')
     */
    if (key !== 'normalize.css') {
      return dependencies.push(key)
    }
  })

  return dependencies
}

const response = getVendorDependencies()

export default response
