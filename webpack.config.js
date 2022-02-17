const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack5ではデフォルトでTerserPlugin入ったらしいがまだ必要らしい
const TerserPlugin = require('terser-webpack-plugin')

// OptimizeCSSAssetsPluginが消えたのでcss-minimizer-webpack-pluginに切り替える
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const mode = process.env.NODE_ENV || 'production'
const isDevserver = process.env.IS_DEVSERVER == 1
const port = process.env.PORT || '1111'
const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

console.log('** mode **', mode)

module.exports = {
  // mode 必須
  mode: mode === 'production' ? mode : 'development',
  

  // buildするときの速度があがる。webpack5ではメモリで管理していたがキャッシュを導入した。デフォルトではoff
  // webpack.DefinePluginでバージョン指定とかすると指定によってはキャッシュが無効化できる
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },


  devtool: mode === 'production'
    ? false
    : 'eval-cheap-module-source-map'
    // : 'eval-cheap-module-source-map'
  ,

  entry: isDevserver
    ? [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${ port }`,
        'webpack/hot/only-dev-server',
        `${ src }/main.dev.tsx`,
      ]
    : {
        'bundle': `${ src }/main.tsx`
      },
  
  output: {
    path: dist,
    filename: isDevserver ? '[name].js' : '[name].js?[hash]',
    // filename: isDevserver ? 'bundle.js' : '[name].js?[hash]', // bundle.jsにするとエラーになるv4ではいけたが。
    publicPath: '/',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.scss|.css$/,
        use: [
          isDevserver ? 'style-loader' : MiniCssExtractPlugin.loader,
          // { loader: 'css-loader', options: { url: false } },
          // { loader: 'postcss-loader' },
          // { loader: 'sass-loader' }
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${ src }/index.html`,
      inject: 'body',
      filename: `index.html`
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({ filename: '[name].css?[contenthash]' })
  ],

  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          }
        }
      })
    ]
  },

  devServer: {
    // contentBase: dist, // v4で消えた
    static: {
      directory: dist,
    },
    historyApiFallback: true,
    host: 'localhost',
    compress: true,
    port: port,
    // inline: true, // 消えた
    hot: true,
    // disableHostCheck: true, // 消えた
    open: true
  },

  resolve: {
    alias: {
      'src'            : src,
      'const'          : `${ src }/const/index.ts`,
      'components'     : `${ src }/components`,
      'atoms'          : `${ src }/components/atoms`,
      'molecules'      : `${ src }/components/molecules`,
      'organisms'      : `${ src }/components/organisms`,
      'pages'          : `${ src }/components/pages`,
      'hooks'          : `${ src }/hooks`,
      'api'            : `${ src }/api`,
      'lib'            : `${ src }/lib`,
      'sass'           : `${ src }/sass`,
      'modules'        : `${ src }/modules`,
      'types'          : `${ src }/types`,
      // https://github.com/gaearon/react-hot-loader/issues/1227
      'react-dom'      : '@hot-loader/react-dom'
    },
    extensions: ['.ts', '.tsx', '.js'],
    // fallback: {
    //   child_process: false,
    //   fs: false,
    //   crypto: false,
    //   net: false,
    //   tls: false
    // }
  },

  performance: {
    hints: false
  },

  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: isDevserver ? ["web"] : ["web", "es5"],
}