import _ from 'lodash';
import {OrderDetail, Package, QueryObj} from "@/common/FtlClass";
import queryUtil from "@/common/getQueryFormat";
import UserModule from "@/store/decorators/user";
import storage from "@/storage";
import router from "@/router";

const utils = {
  getAuth(scope: string) {
    return new Promise((resolve, reject) => {
      uni.getSetting({
        success(res) {
          if (!res.authSetting[scope]) {
            resolve(false);
          }
          resolve(true);
        },
        fail() {
          resolve(false);
        }
      })
    })
  },
  getLogin():Promise<{isLogin:boolean,code:string}> {
    const login={isLogin:false,code:''};
    return new Promise((resolve, reject) => {
      uni.login({
        success(res:any) {
          login.isLogin=true;
          login.code=res.code;
          resolve(login);
        },
        fail() {
          resolve(login);
        }
      })
    });
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      uni.getUserInfo({
        success(res: any) {
          resolve(res.userInfo);
        },
        fail(e) {
          reject(e);
        }
      })
    })
  },
  compileData(data: any) {
    return encodeURIComponent(JSON.stringify(data));
  },
  formatData(str: string) {
    if(_.isUndefined(str)){
      return ;
    }
    return JSON.parse(decodeURIComponent(str));
  },
  type(type: number) {
    return type === 0 ? 'receive' : 'send';
  },
  numberCheck(num:string) {
    let re = /^\d*\.{0,1}\d{0,1}$/;
    return re.exec(num) != null;
  },
  /**
   * 深度遍历数据(停留在Array最后一级object)
   * @param data
   * @param fn
   * @return {Object}
   * */
  mapDeepObjectWith(data:any,fn:Function):any{
    if(_.isArray(data)){
      return _.map(data,item=>{
        return this.mapDeepObjectWith(item,fn);
      });
    }else {
      if(_.isObject(data)){
        const next:any=_.mapValues(data,(value:any)=>{
          if(_.isArray(value)){
            return this.mapDeepObjectWith(value,fn);
          }else {
            return value;
          }
        });
        if(_.isFunction(fn)){
          return fn(next);
        }
        return next;
      }
      return data;
    }
  },

 /**
  * 深度遍历数据，精确到属性
  * @return {Object}
  * */
  mapDeepWith(data:any,fn:Function):any{
    if(_.isArray(data)){
      return _.map(data,item=>{
        return this.mapDeepWith(item,fn);
      });
    }
    if(_.isObject(data)){
      return _.mapValues(data,(value:any,key:string)=>{
        if(_.isObject(value)){
          return this.mapDeepWith(value,fn);
        }else {
          if(_.isFunction(fn)){
            return fn(value,key);
          }else {
            return value;
          }
        }
      });
    }
    return data;
  },

  /**
   * 转义getQuery查询对象
   * */
  queryFormat(data:QueryObj={}){
    if(_.isEmpty(data)){
      return data;
    }
    data.filter=queryUtil.conditionsFormat(data.filter);
    data.or=queryUtil.conditionsFormat(data.or);
    if(!_.isEmpty(data.s)){
      data.s = JSON.stringify(data.s);
    }
    return data;
  },

  toLogin(cb:Function=()=>{}){
    let pages=getCurrentPages();
    let pageRoute:any = '/pages/home/index';
    if(pages.length>0){
      pageRoute = pages[pages.length - 1].route;
    }
    router.push('/pages/login/index');
    uni.$once('ftlLoginCallback',async ()=>{
      pages=getCurrentPages();
      const routeList=_.map(pages,'route');
      const index=_.indexOf(routeList,pageRoute);
      uni.navigateBack({
        delta:pages.length-index-1
      });
      return cb();
    });
  },

  async login(data:any){
    UserModule.login(data.token);
    uni.$emit('ftlLoginCallback');
  },
  logOut(){
    UserModule.logOut();
  },

  getProvider(option:GetProviderOptions):Promise<any>{
    return new Promise((resolve, reject)=>{
      uni.getProvider({
        service:option.service,
        success:(res:any)=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err);
        }
      })
    })
  },
  wechartPay(provider:'alipay' | 'wxpay' | 'baidu' | 'appleiap', payInfo:RequestPaymentOptions){
    return new Promise((resolve, reject) => {
      uni.requestPayment({
        provider,
        timeStamp:payInfo.timeStamp,
        nonceStr:payInfo.nonceStr,
        package:payInfo.package,
        signType:payInfo.signType,
        paySign:payInfo.paySign,
        success:(res)=>{
          resolve(res);
        },
        fail:(err)=>{
          reject(err);
        }
      });
    });
  },



}

export default utils;
