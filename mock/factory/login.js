const Mock =require('mockjs');
const Storage = require('../Storage');
const Random = Mock.Random;


const login = (()=>{
  const token = Random.string('number',5,10);
  Storage.setStorage('token',token);
  return {
    data:{
      token,
      nickName: Random.cname()//随机生成中文名字
    },
    time:Random.datetime()
  };
})();
const sendVerifiactionCode=(()=>{
  const message=Random.string('number',4,10);
  Storage.setStorage('verifiactCode',message);
  return {
    message
  }
})();

const codeLogin=(()=>{
  const code=Storage.getStorage('verifiactCode');
  if(code.toString()!==Storage.getStorage('verifiactCode')){
    return {
      message: 'fail'
    }
  }
  return{
    message:'ok',
    data:login.data
  }
})();

module.exports={
  login,
  sendVerifiactionCode,
  codeLogin,
  passLogin:login
}
