const isVendor = ({ resource }) => {
  return (
    resource && resource.indexOf('node_modules') >= 0 && resource.match(/.js$/)
  )
}

export default isVendor
