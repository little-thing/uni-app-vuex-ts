// 重定向接口, 例子
// /api/Auth/SendPhoneCode => /SendPhoneCode
module.exports = {
  '/api/*/*': '/$2'
};
