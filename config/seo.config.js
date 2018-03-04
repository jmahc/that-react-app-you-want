/**
 *  Search Engine Optimization
 *
 *  Configure your SEO `<meta />` tags here to be included
 *  via the `HtmlWebpackPlugin` and injected into the
 *  `<head />` of our `index.html`.
 *
 *  - Twitter cards
 *  - Open Graph
 */

module.exports = {
  title: 'that-react-app-you-want',
  url: 'https://github.com/jmahc',
  image: 'https://avatars3.githubusercontent.com/u/5778136?s=460&v=4',
  description:
    'This is that React app that you have been searching day and night for - enjoy.',
  twitter: {
    // The page's Twitter handle.
    creator: '@j_mahc',
    // The website's Twitter handle.
    site: '@j_mahc'
  }
}
