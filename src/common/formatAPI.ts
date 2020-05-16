/**
 * @des 格式化接口数据
 * @author zhangchao  zhangchao@ftl-express.cn
 * @date 2020-04-28 18:53
 */
import {Cart, DetailedAddress, Goods, OrderDetail, Package} from "@/common/FtlClass";
import _ from 'lodash';

const formatAPI = {
  address(obj:any):any{
    const res:Partial<DetailedAddress>=obj;
    let treeIds=[obj.region.countryId];
    if(obj.region.treeCode.length>0){
      treeIds=[obj.region.countryId,..._.split(_.trim(obj.region.treeCode,','),',')]
    }
    treeIds.push(obj.region.id);
    res.addressIndex=_.map(treeIds,id=>({id:_.toInteger(id)}));
    return res;
  },
  addressToApi(obj:Partial<DetailedAddress>):any{
    const res:any=obj;
    const treeIds=_.map(obj.addressIndex,'id');
    const nameList=_.map(obj.addressIndex,'name');
    res.fullRegion=_.join(nameList,'');
    res.fullAddress=res.fullRegion+obj.address;
    res.regionId=_.last(treeIds);
    return res;
  },
  createOrder:{
    toApi(order:OrderDetail){
      let obj:any ;
      obj={...order,...order.cost};
      delete obj.cost;
      return obj;
    },
    toOrder(obj:any){
      let sendAddresDetail:DetailedAddress;
      let receiveAddresDetail:DetailedAddress;
      let goodsList:Cart[];
      const {
        sendAreaId, // 寄件地区id
        sendRegion, // 寄件地区
        sendName, // 寄件人姓名
        sendPhone,// 寄件人电话
        sendPostCode,// 寄件人邮编
        sendCountryCode,
        sendAddress,
        sendCountryId,// 寄件国家id
        sendFullAddress,
        sendAddressId
      } = obj;
      sendAddresDetail= {
        id:sendAddressId,
        address:sendAddress,
        realName:sendName,
        phone:sendPhone,
        postCode:sendPostCode,
        regionId:sendAreaId,
        fullAddress:sendFullAddress,
        country:{id:sendCountryId},
        addressIndex:[]
      };

      const {
        receiveAreaId, // 收件地区id
        receiveRegion, // 收件地区
        receiveName, // 收件人姓名
        receivePhone,// 收件人电话
        receivePostCode,// 收件人邮编
        receiveCountryCode,
        receiveAddress,
        receiveCountryId,// 收件国家id
        receiveFullAddress,
        receiveAddressId,
        receiveIdCard
      } = obj;
      receiveAddresDetail= {
        id:receiveAddressId,
        address:receiveAddress,
        realName:receiveName,
        phone:receivePhone,
        postCode:receivePostCode,
        regionId:receiveAreaId,
        fullAddress:receiveFullAddress,
        country:{id:receiveCountryId},
        addressIndex:[],
        idcard:receiveIdCard
      };

      goodsList=_.map(obj.goodsList,item=>({
        id:item.goodsId,
        name:item.name,
        count:item.count
      }));
      const order:Partial<OrderDetail>={
        id:obj.id,
        code: obj.code,//法翔单号
        trackingNumber:obj.trackingNumber,//快递单号
        payStatus:obj.payStatus,//付款状态
        status:obj.status,//订单状态
        cost:obj.cost,
        value: obj.value,
        weight: obj.weight,
        desc: obj.desc,
        type:obj.type, //交货方式id
        pickupOrder:obj.pickupOrder,
        sendAddress:sendAddresDetail,
        receiveAddress:receiveAddresDetail,
        goodsList, //商品集合
        supplier:obj.supplier
      };
      return order;
    }
  }
};

export default formatAPI;
