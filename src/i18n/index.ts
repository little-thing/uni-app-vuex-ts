
import  VueI18n from 'vue-i18n'
import Vue from "vue"
import zh from '@/i18n/lang/zh';
import en from "@/i18n/lang/en";

Vue.use(VueI18n);

const  i18n = new VueI18n({
    locale: 'en',          //默认语言
    messages: {
        en,zh
    }
})

export default i18n;
