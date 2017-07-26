# that-react-app-you-want

[![Build Status](https://travis-ci.org/jmahc/that-react-app-you-want.svg?branch=master)](https://travis-ci.org/jmahc/that-react-app-you-want)
[![Dependencies](https://david-dm.org/jmahc/that-react-app-you-want.svg)](https://david-dm.org/jmahc/that-react-app-you-want)
[![devDependencies Status](https://david-dm.org/jmahc/that-react-app-you-want/dev-status.svg)](https://david-dm.org/jmahc/that-react-app-you-want?type=dev)

[![MIT License](https://img.shields.io/npm/l/kwelch.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

[![Watch on GitHub](https://img.shields.io/github/watchers/jmahc/that-react-app-you-want.svg?style=social)](https://github.com/jmahc/that-react-app-you-want/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/jmahc/that-react-app-you-want.svg?style=social)](https://github.com/jmahc/that-react-app-you-want/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/jmahc/that-react-app-you-want.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20that-react-app-you-want!%20https://github.com/jmahc/that-react-app-you-want%20%F0%9F%91%8D)

**Yeah, this is it.**

What you've all been waiting for: that **react app boilerplate shit** that you seek day and night.

Here it is.

Right here.

You can have it.

---

## What do you want to see from this?
Please fill free to open a card, or shoot me an email (found in the `package.json` file) with tips, ideas and improvements!.

Hopefully you guys are enjoying it!

---

## Getting started
For you [yarn] losers:
1. `yarn` - install dependencies.
2. `yarn run dev:vendor` - **for quicker development builds** due to the DLL's generated.
3. `yarn run start` or `yarn run dev` - start development server.
4. `yarn run build` - build for production.

For you [npm] nerds:
1. `npm i` - install dependencies.
2. `npm run dev:vendor` - **for quicker development builds** due to the DLL's generated.
3. `npm run start` or `npm run dev` - start development server.
4. `npm run build` - build for production.

---

## That engine version shit for you semantic manics
- [NodeJS] with: >=8.0.0
- [npm] with: >=5.0.0
- [yarn] with: >=0.27.5

---

## What is inside, though?
Some really cool things:

- webpack v3.4.1
- prettier formatting
- webpack but you can use ES6 syntax
- chunks
- jsx
- babili
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
1. Implement testing
2. Add an optional `redux` branch.
3. Add an optional `react-router v4` branch.
4. Add an optional authentication process.

---

### Issues

1. `webpack-dashboard`
- You will notice some kind of `this.input.charAt()` error when running this application with `webpack-dashboard`.
- This is an issue since the upgraded Webpack 3.
- You can do without `webpack-dashboard` and notice that no errors occur.
- Otherwise, ignore them you pretentious asshole.

---

### Open Graph
Open Graph meta tags were added in the `public/index.js` file for your SEO needs.  Customize them inside the `html-webpack-plugin` instance located in the `config/webpack.config.commons.babel.js` file, within the `seo` object!

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
  [all-contributors]: <https://github.com/kentcdodds/all-contributors/>
  [Favicon and Mobile Icon Generation]: <#favicon-and-mobile-icon-generation>
  [favicons-webpack-plugin pageÂ]: <https://github.com/jantimon/favicons-webpack-plugin/>
  [generact]: <https://github.com/diegohaz/generact/>
  [NodeJS]: <https://nodejs.com/>
  [npm]: <https://npmjs.com/>
  [Preload and Prefetch]: <#preload-and-prefetch>
  [preload-webpack-plugin repository]: <https://github.com/googlechrome/preload-webpack-plugin/>
  [this Medium article]: <https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf/>
  [webpack]: <https://webpack.js.org/>
  [yarn]: <https://yarnpkg.com/>
