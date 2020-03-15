
const LoginFactory = require('./factory/login');

/**
 * json-server不支持嵌套访问，如'books/new'
 * 需要在routes.js中设置rewriter
 *
 * 服务启动后db中的数据将不会改变
 */
module.exports= {
  ...LoginFactory
}
