declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module 'async-validator-uniapp'

declare interface Rule {
  field: string
  required:boolean
  message:string
}


// TODO: remove this part after vue-count-to has its typescript file
declare module '@dcloudio/uni-ui'
declare module '@/components/*.vue'

declare const ROUTES:any;
declare module 'uni-hold-tabbar';
