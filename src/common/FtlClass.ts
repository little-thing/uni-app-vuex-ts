
export interface BaseResponse<T> {
  count: number,
  total:number,
  page:number,
  pageCount:number,
  data: T[]
}

export interface ObjResponse<T> {
  status: number;
  message: string;
  data: T
}

export interface Address extends BaseClass{
  phone: string;
  realName:string;
  fullRegion?: string;// 完整地址
  fullAddress?:string; // 完整地址详细到详细地址
  regionId?: any;
  address: string;
  isDefault ?: boolean;
  postCode: string;
  idcard?: string;
  type?: number;
  country?: Country;
}



export interface DetailedAddress extends Address {
  addressIndex: BaseClass[]
}

export interface Parcel extends BaseClass{
  [key:string]: any
  type: number //交货方式id
  value: string //价值
  weight: string|number //重量
  desc: string //说明
  goodsList: Cart[] //商品集合
  pickupOrder?:Pickup // todo 删除 预约单
}

export interface Pickup extends BaseClass {//预约单
  code: string | number // 单号
  pickTime: string,// 预约时间
  status?: string, // 状态
  count?: string | number,
  address: string, // 取件地址
  regionId: number | string, // 取件区域id
  cost: string | number,  // 费用
  memberName:string | number, // 取货人名字
  memberPhone:string | number, // 取货人电话
}

export interface Tracking {
  id: string | number,
  time: string,
  desc: string
}

export interface Country extends BaseClass{

}

export interface Package extends OrderDetail{//接口数据
  settleType: string
  price: number
  supp_name: string

  receiveAddressId?:number,
  receiveName: string
  receivePhone:string
  receivePostCode:string
  receiveFullAddress:string
  receiveRegion:{
    [key:string]:any;
    country: Country
  }

  sendAddressId?:number,
  sendName: string
  sendPhone: string
  sendPostCode: string
  sendFullAddress:string
  receiveIdCard:string
  sendRegion:{
    [key:string]:any;
    country: Country
  }

  parcelLogistics?:Tracking[];
  handle:OrderHandle;
}

export interface OrderHandle {
  can_edit?:boolean; //编辑
  can_cancel?:boolean; // 取消
  can_pay?:boolean;  // 付款
  can_bill?:boolean; // 出单
  can_del?:boolean; // 删除
}

export interface Order  extends Parcel{ // todo 删除 extends
  sendAddress: DetailedAddress
  receiveAddress: DetailedAddress
  parcel:Parcel,
  pickupOrder?:Pickup // 预约单
}

export interface OrderDetail extends Order {
  code?: string ,//法翔单号
  trackingNumber?: string ,//快递单号
  payStatus?: number|string,//付款状态
  status?: number|string,//订单状态
  supplier: Supplier,//服务商

  cost: Cost
}

export interface Supplier extends BaseClass{

}


export interface Cost {
  freight: string | number,//运费
  insuranceValue: string | number,//保险
  urgentPrice: string | number,//加急
  appendix: string | number,//附件
  discount: string | number,//优惠
  total: string | number//合计
}


export interface WechartPay {
  appId: string;
  callback_url: any;
  nonceStr: string;
  package:  string;
  paySign:  string;
  prepayId:  string;
  signType:  string;
  status:  string;
  timeStamp:  string;
}


export interface Select {
  label: string
  value: any
}


export interface BaseClass {
  name ?: string,
  id ?: number | string
}

export interface Goods extends BaseClass {

}

export interface GoodsTypeSubclass extends BaseClass {
  goods: Cart[]
}

export interface Cart {
  id: string | number
  name: string
  classId?:number
  count: number | string
}



export interface User extends BaseClass {
  token?:string,// 登录token暂存
  isLogin:boolean, // 登陆状态
  openId?:string,
  username: string,
  nickName: string,//微信昵称
  realName:string,
  phone: string | number,
  email: string,
  canSelf: boolean, //自助下单 ('T','F')
  balance: number,//余额
  ftlCoin: number,//法翔币
  bond: number //保证金
}

export interface Node {
  [key: string]: any,

  children: Node[]
}

export declare type Conditions = {
  $eq?: conditionValue,
  '$ne'?: conditionValue,
  '$gt'?: conditionValue,
  '$lt'?: conditionValue,
  '$gte'?: conditionValue,
  '$lte'?: conditionValue,
  '$starts'?: conditionValue,

  '$ends'?: conditionValue,
  '$cont'?: conditionValue,
  '$excl'?: conditionValue,
  '$in'?: conditionValue,
  '$notin'?: conditionValue,
  '$isnull'?: conditionValue,

  '$notnull'?: conditionValue,
  '$between'?: conditionValue,
  '$eqL'?: conditionValue,
  '$neL'?: conditionValue,
  '$startsL'?: conditionValue,

  '$endsL'?: conditionValue,
  '$contL'?: conditionValue,
  '$exclL'?: conditionValue,
  '$inL'?: conditionValue,
  '$notinL'?: conditionValue
}

interface SortOption {
  [key: string]: 'ASC' | 'DESC'
}
declare type conditionValue= dataType| dataType[];

declare type dataType = string | null | undefined | number | boolean;

export interface QueryConditions {
  [key: string]: Conditions | dataType[]
}


export interface QueryObj {
  [key:string]:any;
  s?:any,
  filter?: QueryConditions| dataType[],
  select?: string[],
  or?: QueryConditions| dataType[],
  sort?: SortOption
}


