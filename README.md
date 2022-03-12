# Remix Mount Routes

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

This package enables you to mount your Remix app at a different path than root.

## 🛠 Installation

```bash
> npm install -D remix-mount-routes
```

## ⚙️ Configuration

Update your _remix.config.js_ file and use the custom routes config option.

Call `mountRoutes(appDir, basePath, defineRoutes, ignoredRouteFiles?)` and return
the route manifest.

NOTE: `basePath` should be an absolute path (e.g., `/myapp`)

Your route files are still relative to `app/routes` folder. That is
`app/routes/posts/$slug.tsx` will map to the URL `/myapp/posts/:slug`

You also need to update `publicPath` and `assetsBuildDirectory` to include your
`basePath`. This will ensure that your assets will be served properly.

You can either hard-code the basePath in your config file, or use an environment
variable like:

```json
"build": "cross-env NODE_ENV=production REMIX_BASEPATH=/myapp remix build",
"dev": "cross-env NODE_ENV=development REMIX_BASEPATH=/myapp remix dev",
```

```js
// remix.config.js
const { mountRoutes } = require('remix-mountroutes')

const basePath = process.env.REMIX_BASEPATH ?? ''

module.exports = {
  ignoredRouteFiles: ['.*'],
  publicPath: `${basePath}/build/`,
  assetsBuildDirectory: `public${basePath}/build`,
  routes: defineRoutes => mountRoutes('app', basePath, defineRoutes),
}
```

## 💡 Sample Web App

Here's a repo with a sample app mounted to `/myapp`

https://github.com/kiliman/remix-mount-routes-example

And here's the running app

https://remix-mount-routes-example.herokuapp.com

## 😍 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kiliman.dev/"><img src="https://avatars.githubusercontent.com/u/47168?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kiliman</b></sub></a><br /><a href="https://github.com/kiliman/remix-mount-routes/commits?author=kiliman" title="Code">💻</a> <a href="https://github.com/kiliman/remix-mount-routes/commits?author=kiliman" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
