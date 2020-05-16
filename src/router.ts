/**
 * @des 路由配置
 * @author zhangchao  zhangchao@ftl-express.cn
 * @date 2020-05-15 14:03
 */

import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
import UserModule from "@/store/decorators/user";
import utils from "@/common/utils";

Vue.use(Router);

//初始化
const router = new Router({
  routes:ROUTES //路由表
});

console.log(router.$holdTab);

//全局路由前置守卫
router.beforeEach((to:any, from:any, next:Function) => {
  if(!UserModule.isLogin){
    if(to.path.indexOf('login')>-1){
      next();
    }else {
      utils.toLogin();
    }
  }
  next();
});
// 全局路由后置守卫
router.afterEach((to:any, from:any) => {
});
export default router;
