const storage={};

storage['token']='zhangchao';


module.exports={
  setStorage(key,value){
    storage[key]=value;
    return value;
  },
  getStorage(key){
    return storage[key];
  }
};
