const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
        .test(/\.ts&/)
        .include
          .add(path.resolve(__dirname, './src'))
          .end()
        .use('ts-loader')
          .loader('other-loader')
  }
}