/**
 * @des 用户信息
 * @author zhangchao  zhangchao@ftl-express.cn
 * @date 2020-04-23 18:51
 */

import {VuexModule,Module,Action,Mutation,getModule} from 'vuex-module-decorators';
import store from "@/store";
import _ from 'lodash';
import {User} from "@/common/FtlClass";
import ClientAPI from "@/resouces/client";
import storage from "@/storage";

function initData():User{
  return {
    isLogin:false,
    username: '',
    nickName: '',//微信昵称
    realName:'',
    phone: '',
    email: '',
    canSelf: false, //自助下单
    balance: 0,//余额
    ftlCoin: 0,//法翔币
    bond: 0 //保证金
  };
}


@Module({name:'user',dynamic:true,namespaced:true,store})
class UserModel extends VuexModule {
  public user!:Partial<User> ;

  public isLogin!:boolean;
  public action !:string;

  constructor(module:any){
    super(module);
    this.initUser();
  }

  @Mutation
  private setUserDetail(user:Partial<User>){
    this.user=user;
    storage.setUser(user);
  }

  @Mutation
  private  setLogin(isLogin:boolean){
    this.isLogin=isLogin;
  }

  /*@Mutation
  private setAction(){
    action
  }*/




  @Action
  initUser(){
    const token =storage.getToken();
    const init = initData();
    let isLogin=false;
    if(token){
      isLogin=true;
    }
    this.setLogin(isLogin);
    const user=storage.getUser();
    this.setUserDetail({...init,...user});
  }

  @Action
  setUser(user:Partial<User>):void{
    this.setUserDetail(user);
  }

  @Action
  logOut(){
    uni.removeStorageSync('Authorization');
    storage.setUser({});
    this.initUser();
  }

  @Action
  login(token:any){
    storage.setToken(token);
    this.initUser();
  }

  @Action
  async fetchUser(){
    const {data}=await ClientAPI.getUserDetail();
    const user=_.pickBy(data, (item:any)=>!(_.isNil(item)||item.length===0));
    this.setUserDetail(user);
  }
}

const UserModule= getModule(UserModel);
export default UserModule;
