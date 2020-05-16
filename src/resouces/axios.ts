import axios from "@ftlab/uni-axios";
import config from '@/common/config';
import qs from 'qs';
import utils from "@/common/utils";
import storage from "@/storage";

axios.defaults.baseURL = config.base_url;
// axios.defaults.timeout = 10000;

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};



axios.interceptors.request.use((config: any) => { /* 请求之前拦截器 */
  front_loading(config.loading);
  if(config.method === 'GET'){
    let {data}= config;
    data=utils.queryFormat(data);
    config.url += '?' + qs.stringify(data, {encode: false, arrayFormat: 'repeat'});
    config.data = {}
  }
  config.header.Authorization ='Bearer '+ storage.getToken();
  return config;
});



// 必须使用异步函数，注意
axios.interceptors.response.use((response: any) => { /* 请求之后拦截器 */
  //statusCode为200
  finish_Loading();
  return response;
},(err:any)=>{
  let msg: any = undefined;
  let isToast = true;
  const status = err.statusCode;
  if (status === HTTP_STATUS.NOT_FOUND) {
    msg="请求资源不存在";
  } else if (status === HTTP_STATUS.BAD_GATEWAY) {
    msg='服务端出现了问题';
  } else if (status === HTTP_STATUS.FORBIDDEN) {
    utils.logOut();
    msg='没有权限';

  } else if (status === HTTP_STATUS.AUTHENTICATE) {
    if(err.response.data.action==='login'){
      msg=err.response.data.message;
    }else {
      utils.logOut();
      utils.toLogin();
      isToast=false;
    }
  } else if (status >= 400) {
    console.log(err);
    msg=err.response.data.message;
  }
  finish_Loading(isToast,msg);
  throw err;
});

// 结束拦截
export function finish_Loading(Br: boolean = false, data: any='数据加载失败') {
  if (Br) {
    uni.hideLoading();
    uni.showToast({
      title: data,
      duration: 2000,
      icon: 'none'
    });
  } else {

    uni.hideLoading()
  }
  uni.hideNavigationBarLoading()
}

// 请求拦截
export function front_loading(Br: boolean = true) {
  if (Br) {
    uni.showNavigationBarLoading();
    uni.showLoading({
      title: '正在加载中',
      mask: true
    })
  }
}

export default axios;

