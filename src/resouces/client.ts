import axios from './axios'
import {Address, DetailedAddress, BaseResponse, ObjResponse, Pickup, User} from "@/common/FtlClass";
import formatAPI from "@/common/formatAPI";



const ClientAPI={
  updateClient(user:User){
    console.log(user);
    return axios.post(`/client/${user.id}/update`,user);
  },
  getUserDetail() {
    return axios.get<User>(`/client/detail`);
  },
  async getAddressListPage(params: any) {
    const res=await axios.get<BaseResponse<DetailedAddress>>('/address', {data:{page:1,limit:10,join:['region'],...params}});
    res.data.data.map(item=>formatAPI.address(item));
    return  res;
  },
  async getAddress(id: any) {
    const res=await axios.get<DetailedAddress>(`/address/${id}`,{data:{join:['region']}});
    res.data=formatAPI.address(res.data);
    return res;
  },
  createAddress(body: any) {
    return axios.post<any>('/address', body)
  },
  editAddress(body: any) {
    return axios.post<BaseResponse<any>>(`/address/${body.id}/update`, body)
  },
  deleteAddress(id:any) {
    return axios.delete<any>(`/address/${id}`)
  },
  getPickUpList(params:any){// 预约单列表
    return axios.get<BaseResponse<Pickup>>('/pickup', {data:{page:1,limit:10,...params}})
  },
  sendEmail(params:any){
    return axios.get<ObjResponse<any>>('/Client/sendEmail',params);
  },
  cancelPickup(id:number){// 取消预约单
    return axios.get<any>(`/order/${id}/cancelPick`)
  },
  getPayDetail(params:any){//获取付款单
    return axios.get<ObjResponse<any>>('/Client/payDetail',params);
  }
};

export default ClientAPI;
