
import {QueryConditions,Conditions} from "@/common/FtlClass";
import _ from 'lodash'

const queryUtil = {

  conditionsFormat(data:any){
    const condition=getConditionToObj(data);
    return conditionstoArr(condition);
  }
};
function conditionstoArr(data:any={}){
  const arr=[];
  for(const i in data){
    let key=i;
    let value=data[i];
    for(const j in value ){// 如果是 $键值对
      if(['$isnull','$notnull'].includes(j)){
        arr.push(`${key}||${j}`)
      }else {
        arr.push(`${key}||${j}||${value[j]}`)
      }
    }
  }
  return arr;
}
function getConditionToObj(data:any={}){
  const obj:any={};
  for(const key in data){
    let value:Conditions=_.clone(data[key]);
    if(_.isNull(data[key])){
      value={$isnull:true}
    }else if(_.isArray(data[key])){
      value={$in:data[key]}
    }else if(_.isString(data[key])&&(data[key] as string).length<1) {
      value={}
    }else {
      value={$eq:data[key]}
    }
    obj[key]=value;
  }
  return obj;
}
export default queryUtil;
