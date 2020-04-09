

import {VuexModule,Module,Action,Mutation,getModule} from 'vuex-module-decorators';
import store from "@/store";


@Module({name:'user',dynamic:true,namespaced:true,store})
class UserModel extends VuexModule {

  public user:any = {};


  @Mutation
  init():void {
    this.user={};
  }

  @Mutation
  private set(obj:any):void {
    this.user={...obj};
  }

  @Action
  public setAddress(obj:any):void {
    this.set(obj);
  }
  @Action
  public initAddress():void {
    this.init();
  }
}

const UserModule=getModule(UserModel);

export default UserModule;
