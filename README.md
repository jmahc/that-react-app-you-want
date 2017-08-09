# that-react-app-you-want

[![Build Status]](https://travis-ci.org/jmahc/that-react-app-you-want)
[![Dependencies]](https://david-dm.org/jmahc/that-react-app-you-want)
[![devDependencies Status]](https://david-dm.org/jmahc/that-react-app-you-want?type=dev)

[![license]](http://opensource.org/licenses/MIT)
[![All Contributors]](#contributors)
[![semantic-release]](https://github.com/semantic-release/semantic-release)

[![Watch on GitHub]](https://github.com/jmahc/that-react-app-you-want/watchers)
[![Star on GitHub]](https://github.com/jmahc/that-react-app-you-want/stargazers)
[![Tweet]](https://twitter.com/intent/tweet?text=Check%20out%20that-react-app-you-want!%20https://github.com/jmahc/that-react-app-you-want%20%F0%9F%91%8D)

**Yeah, this is it.**

What you've all been waiting for: that **react app boilerplate shit** that you seek day and night.

Here it is.

Right here.

You can have it.

---

## Pick your poison
You even have options to decide what you want to use!

- The [master branch] branch contains a simple react application.
- The [redux branch] branch implements [redux] alongside the simple react application.

---

## What do you want to see from this?
Please fill free to open a card, or shoot me an email (found in the `package.json` file) with tips, ideas and improvements!.

Hopefully you guys are enjoying it!

---

## Getting started
What do you need? Linux/macOS or a Windows machine and [yarn].

### Linux & macOS Instructions
Steps for you [yarn] losers:
1. `yarn` - Install the dependencies.
2. `yarn run dev-vendor` - Required and allows **for quicker development builds** due to the DLL's generated.
3. `yarn run start` or `yarn run dev` - start development server.
4. `yarn run build` - build for production.

**OPTIONAL**
- `yarn run clean-all` - Removes any production-built files, DLL files, installed dependencies and any `lock` files.
- `yarn run clean-dist` - Removes any production-built files.
- `yarn run clean-dll` - Removes any DLL files.
- `yarn run clean-yarn` - Removes any [yarn]-specific files, including dependencies.

---

### Windows Instructions
Steps for you [yarn] losers:
1. `yarn` - Install the dependencies.
2. `yarn run dev:vendor` - Required and allows **for quicker development builds** due to the DLL's generated.
3. `yarn run start` or `yarn run dev` - Starts the development server.
4. `yarn run build:win` - Builds the application for production.

**OPTIONAL**
- `yarn run clean:all` - Removes any production-built files, DLL files, installed dependencies and any `lock` files.
- `yarn run clean:dist` - Removes any production-built files.
- `yarn run clean:dll` - Removes any DLL files.
- `yarn run clean:yarn` - Removes any [yarn]-specific files, including dependencies.

---

## That engine version shit for you semantic manics
This is what I use.  Feel free to change `.node-version`, `.nvmrc` and the `package.json` file's engines to suit your needs.

- [NodeJS] with: `>=8.0.0`
- [npm] with: `>=5.0.0`
- [yarn] with: `>=0.27.5`

---

## What is inside, though?
Some really cool things:

- `webpack v3.5.1`
- prettier formatting
- webpack but you can use ES6 syntax
- chunks
- jsx
- Code-splitting aka importin' shit on the fly
- Tree-shaking for money-makers
- DLL's for faster build times
- PostCSS
- PurifyCSS
- hot reloadin'
- react
- (optional) favicon generaton
- (optional) preloading/prefetching
- and last but not least: [generact]! Check that out, it's dope.
- sample `travis.yml` file

---

## Todos
- Implement testing
- Add an optional `redux` branch. *in progress as of August 4, 2017*
- Add an optional `react-router v4` branch.
- Add an optional authentication process.

---

### Issues

- None as of now :)

---

### Open Graph
[Open Graph] meta tags were added in the `public/index.js` file for your SEO needs.  Customize them inside the `html-webpack-plugin` instance located in the `config/webpack.config.commons.babel.js` file, within the `seo` object!

---

### Optional Functionality
These are optional decisions to made on your end, depending on the project required.  I have chosen not to include them, as they vary from project-to-project.

Topics include:

1. [Preload and Prefetch]
2. [Favicon and Mobile Icon Generation]

---

#### Preload and Prefetch
Still looking to further optimize your web application's loading times?  Preloading *might* be for you.  Maybe you've seen `<link rel="preload">` or `<link rel="prefetch">` in a DOM's `<head>` before, maybe not.  Because this project utilizes code-splitting to produce chunks, preloading and prefetching might be right up your alley!  For this reason, I do have the plugin available in the `webpack.config.production.babel.js` file.  You should notice it at the top of the plugin list.

**Note**: For more information, [this Medium article] can help distinguish your needs for `preload` or `prefetch`.

**Side note**: This example utilizes `preload` but the syntax should be the same for `prefetch`.

Here's what to do:
1. `yarn add --dev preload-webpack-plugin`.
2. Don't forget to `import` the plugin at the top of the `config/webpack.config.production.babel.js` file, if not already:

```javascript
...
import PreloadWebpackPlugin from 'preload-webpack-plugin'
...
```
2. In `config/webpack.config.production.babel.js`, you will want to place this first inside of the `plugins` array:

```
...
plugins: [
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script',
    include: 'asyncChunks'
  }),
]
...
```
3. This will take any async chunks generated by [webpack] that the browser will then *preload* before everything else!
4. If you have a feeling that the async chunks won't be used too soon after the page loads, then you may want to investigate a `prefetch` solution.
5. Any other questions about the plugin can be referenced by visiting the [preload-webpack-plugin repository].

---

#### Favicon and Mobile Icon Generation
These generate favicons for all devices (android, iOS, and the favicon itself) using a supplied image.  Personally, I would be placed in the `public` directory.  That's why you might see the `my-image.png` and `favicon.ico` in there.  It's up to you which you choose to use.

1. `yarn add --dev favicons-webpack-plugin`
2. In `config/webpack.config.commons.babel.js`, you will want to comment/remove the `favicons` key:

```javascript
...
plugins: [
  new HtmlWebpackPlugin({
    ...
    // favicon: PATHS.favicon
    ...
  })
]
...
```
3. In `config/webpack.config.production.babel.js`, you will want to import the newly installed package at the top of the file:

```javascript
...
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
...
```
4. In the plugins section of the same production file, you will add this as one of the first plugins:

```javascript
...
plugins: [
  new FaviconsWebpackPlugin({
    logo: PATHS.image,
    prefix: 'icons-[hash]/',
    emitStats: false,
    statsFilename: 'iconstats-[hash].json',
    persistentCache: true,
    inject: true,
    // (see https://github.com/haydenbleasel/favicons#usage)
    background: '#fff',
    title: 'that-react-app-you-want',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: true,
      yandex: false,
      windows: false
    }
  }),
  ...
]
...
```
5. For reference, visit the [favicons-webpack-plugin page].

---

## License

MIT

---

## Contributors
Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/5778136?v=3" width="100px;"/><br /><sub>Jordan McArdle</sub>](http://mcardle.tech/)<br />[💻](https://github.com/jmahc/that-react-app-you-want/commits?author=jmahc "Code") [📖](https://github.com/jmahc/that-react-app-you-want#README "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors] specification. Contributions of any kind welcome!

---

  [About the author]: <http://mcardle.tech/>
  [All Contributors]: <https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square>
  [all-contributors]: <https://github.com/kentcdodds/all-contributors/>
  [Build Status]: <https://travis-ci.org/jmahc/that-react-app-you-want.svg?branch=master/>
  [Dependencies]: <https://david-dm.org/jmahc/that-react-app-you-want.svg>
  [devDependencies Status]: <https://david-dm.org/jmahc/that-react-app-you-want/dev-status.svg>
  [Favicon and Mobile Icon Generation]: <#favicon-and-mobile-icon-generation>
  [favicons-webpack-plugin pageÂ]: <https://github.com/jantimon/favicons-webpack-plugin/>
  [generact]: <https://github.com/diegohaz/generact/>
  [license]: <https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square>
  [master branch]: <https://github.com/jmahc/that-react-app-you-want/>
  [NodeJS]: <https://nodejs.com/>
  [npm]: <https://npmjs.com/>
  [Open Graph]: <http://ogp.me/>
  [Preload and Prefetch]: <#preload-and-prefetch>
  [preload-webpack-plugin repository]: <https://github.com/googlechrome/preload-webpack-plugin/>
  [redux]: <http://redux.js.org/>
  [redux branch]: <https://github.com/jmahc/that-react-app-you-want/tree/redux/>
  [semantic-release]: <https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square>
  [Star on GitHub]: <https://img.shields.io/github/stars/jmahc/that-react-app-you-want.svg?style=social>
  [this Medium article]: <https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf/>
  [Tweet]: <https://img.shields.io/twitter/url/https/github.com/jmahc/that-react-app-you-want.svg?style=social>
  [Watch on GitHub]: <https://img.shields.io/github/watchers/jmahc/that-react-app-you-want.svg?style=social>
  [webpack]: <https://webpack.js.org/>
  [yarn]: <https://yarnpkg.com/>
