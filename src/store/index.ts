
import Vue from 'vue'
import Vuex from 'vuex'
import init from "@/store/init";

Vue.use(Vuex)

const store = new Vuex.Store({
	modules :{
		init
	}
})

export default store
