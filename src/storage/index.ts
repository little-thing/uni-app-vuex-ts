import {User} from "@/common/FtlClass";

const storage ={
  setUser(user:Partial<User>){
    uni.setStorageSync('user',JSON.stringify(user));
  },
  getUser(){
    const userStr=uni.getStorageSync('user');
    if(userStr){
      return JSON.parse(userStr);
    }else {
      return {}
    }
  },
  getToken(){
    return uni.getStorageSync('Authorization');
  },
  setToken(authorization:string){
    return uni.setStorageSync('Authorization',authorization);
  }
};

export default storage;
