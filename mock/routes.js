const db = require("./db.js");

// 添加自定义路由
const routes = {
  "/api?isbn=:isbn": "/api/login" // 参数中有isbn时，重定向到login
};

// 修改 db.js 中 "root_sub" 形式的路由为 "/root/sub"
Object.keys(db).map(key => {
  const newKey = "/api/" + key;
  key = "/" + key;
  routes[newKey] = key; // '/api/abc' => '/abc'
});

module.exports= routes;
