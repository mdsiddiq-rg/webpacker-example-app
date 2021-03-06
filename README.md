# Rails Webpacker Example App

*Note: This has some experimental features, which are supposed to be merged [https://github.com/rails/webpacker/pull/153](https://github.com/rails/webpacker/pull/153) into webpacker Gem. Please follow the blog post to setup a fresh app.*

Demo app that showcases Rails on webpack and yarn using Webpacker gem (default setup in upcoming Rails 5.1)

* [Webpacker](https://github.com/rails/webpacker)
* [PR](https://github.com/rails/rails/pull/26836)
* [Blog Post](https://medium.com/@gauravtiwari/introducing-webpacker-7136d66cddfb)

# Alpha Features

Supports bundling
* Javascript
* Stylesheets
* Images
* Fonts
* Linking assets
* CND - Cloudfront


# Running in development

The app is using [foreman](https://github.com/ddollar/foreman), famous process manager. Checkout the `Procfile.dev` in app root for more information.

```bash
  git clone git@github.com:gauravtiwari/webpacker-example-app.git
  cd webpacker-example-app
  bundle install
  brew install yarn # (if not installed)
  ./bin/yarn install
```

Then, run the server using this binstub,

```bash
  ./bin/server
```
(try `chmod 777 ./bin/server` incase it doesn't work)

Visit [http://localhost:5000/](http://localhost:5000/)


# Installing and using new node modules

```bash
  # Using Yarn
  ./bin/yarn add material-ui
```

Then, import it in your component,

```js
  import { Card } from 'material-ui/Card';
```
