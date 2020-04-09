import axios from "uni-axios-ts";

import _ from 'lodash';
import config from '@/common/config'

axios.defaults.baseURL = config.base_url;

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

function showError(message: string, show = true) {
  show &&
  uni.showToast({
    title: message || "请求异常",
    icon: "none"
  });
  return Promise.reject(message);
}
let showToast = true;

axios.interceptors.request.use((config: any) => { /* 请求之前拦截器 */
  front_loading(config.loading);
  config.header.token = uni.getStorageSync('Authorization');
  return config;
});

// 必须使用异步函数，注意
axios.interceptors.response.use((response: any) => { /* 请求之后拦截器 */
  //statusCode为200
  finish_Loading();
  const status = response.data.status;
  if (status === HTTP_STATUS.NOT_FOUND) {
    return showError("请求资源不存在", showToast);
  } else if (status === HTTP_STATUS.BAD_GATEWAY) {
    return showError("服务端出现了问题", showToast);
  } else if (status === HTTP_STATUS.FORBIDDEN) {
    uni.setStorageSync("Authorization", "");
    uni.navigateTo({
      url: "/pages/login/login"
    });
    return showError("没有权限访问", showToast);
  } else if (status === HTTP_STATUS.AUTHENTICATE) {
    uni.setStorageSync("Authorization", "");
    uni.navigateTo({url: "/pages/login/index"});
    return showError("需要鉴权", showToast);
  } else if (status >= 400) {
    let errorMsg = response.data && response.data.message;
    return showError(errorMsg, showToast);
  } else {
    return response;
  }
},(err)=>{
  finish_Loading(true,err.response);
  return Promise.reject(err);
});

// 结束拦截
export function finish_Loading(Br: boolean = false, data: any='') {
  if (Br) {
    uni.hideLoading();
    uni.showToast({
      title: '数据加载失败',
      duration: 2000,
      icon: 'none'
    });
    if (!_.isEmpty(data)) {
      console.error(data);
    }
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

