// vue.config.js
module.exports = {
  publicPath: process.env.publicPath,
  assetsDir: 'static',
  devServer: {
      host: '0.0.0.0',
      port: 9999,
      hot: true,
      disableHostCheck: true,
  }
}