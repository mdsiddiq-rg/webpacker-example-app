// Note: You must restart bin/webpack-watcher for changes to take effect

const webpack = require('webpack')
const { basename, join, resolve } = require('path')
const { sync } = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { env, paths, publicPath } = require('./configuration.js')

const extensions = ['.js', '.coffee', '.jsx', '.ts']
const extensionGlob = `*{${extensions.join(',')}}*`
const packPaths = sync(join(paths.source, paths.entry, extensionGlob))

module.exports = {
  entry: packPaths.reduce(
    (map, entry) => {
      const localMap = map
      localMap[basename(entry, extname(entry))] = resolve(entry)
      return localMap
    }, {}
  ),

  output: { filename: '[name].js', path: resolve(paths.output, paths.entry) },

  module: {
    rules: [
      { test: /.ts$/, loader: 'ts-loader' },
      {
        test: /.vue$/, loader: 'vue-loader',
        options: {
          loaders: { 'scss': 'vue-style-loader!css-loader!sass-loader', 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'}
        }
      },
      { test: /\.coffee(\.erb)?$/, loader: 'coffee-loader' },
      {
        test: /\.(js|jsx)?(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ['env', { modules: false }]
          ]
        }
      },
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {
          runner: 'DISABLE_SPRING=1 bin/rails runner'
        }
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpeg|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath,
            name: env.NODE_ENV === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),
    new ManifestPlugin({ fileName: 'manifest.json', publicPath, writeToFileEmit: true })
  ],

  resolve: {
    alias: { 'vue$':'vue/dist/vue.esm.js' },
    extensions,
    modules: [
      resolve(paths.source),
      resolve(paths.node_modules)
    ]
  },

  resolveLoader: {
    modules: [paths.node_modules]
  }
}
