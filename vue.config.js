module.exports = {
  // 关闭eslint
  lintOnSave: false,
  devServer: {
    // 配置代理服务器
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: {'/api': ''} 路径重写
      }
    }
  }
}