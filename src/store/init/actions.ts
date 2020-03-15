import {ActionTree} from "vuex";

import {State} from './state';

const actions: ActionTree<State, any> = {
    // lazy loading openid
    getUserOpenId: async function ({commit, state}) {
        return await new Promise((resolve, reject) => {
            if (state.openid) {
                resolve(state.openid)
            } else {
                uni.login({
                    success: (data) => {
                        commit('login')
                        setTimeout(function () { //模拟异步请求服务器获取 openid
                            const openid = '123456789'
                            console.log('uni.request mock openid[' + openid + ']');
                            commit('setOpenid', openid)
                            resolve(openid)
                        }, 1000)
                    },
                    fail: (err) => {
                        console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
                        reject(err)
                    }
                })
            }
        })
    }
}

export default actions ;
