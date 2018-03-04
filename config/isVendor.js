/**
 * Takes a provided resource or dependency and determines
 * if it is a vendor/third-party dependency by searching
 * the `node_modules` directory and returns `true` if found.
 *
 * @param {Object} resource The resource or dependency in question.
 * @returns {boolean} If found in `node_modules`, returns `true`.
 */
const isVendor = ({ resource }) =>
  resource && resource.indexOf('node_modules') >= 0 && resource.match(/.js$/)

module.exports = isVendor
