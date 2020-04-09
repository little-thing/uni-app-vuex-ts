import Vue from 'vue'
import App from './App.vue'
import store from "@/store"
import i18n from "@/i18n";

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype._i18n = i18n


new App({
    store,
    i18n
}).$mount();
