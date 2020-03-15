import {Module} from "vuex";
import getters from "@/store/init/getters";
import state,{State} from "@/store/init/state";
import actions from "@/store/init/actions";
import mutations from "@/store/init/mutations";

const init: Module<State,any> = {
    namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
    state,
    getters,
    mutations,
    actions,
}

export default init;
