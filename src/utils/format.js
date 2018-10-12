// 数据格式化
import format from 'date-fns/format'

export function formatDateTime (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD HH:mm:ss')
}

export function formatDateMin (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD HH:mm')
}

export function formatDate (timestamp) {
  return timestamp && format(timestamp, 'YYYY-MM-DD')
}

export function formatDate2 (timestamp) {
  let day = timestamp.getDay()
  let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let week = weeks[day]
  let ymd = format(timestamp, 'YYYY-MM-DD')
  let hm = format(timestamp, 'HH:mm')
  let date = ymd + '，' + week + '，' + hm
  return date
}

export function getTime () {
  var dateObj = new Date()

  var y = dateObj.getFullYear()
  var m = dateObj.getMonth() + 1
  var d = dateObj.getDate()
  var day = dateObj.getDay()
  var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var week = weeks[day]
  var h = dateObj.getHours()
  var min = dateObj.getMinutes()

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (min < 10) {
    min = '0' + min
  }

  var newDate = y + '-' + m + '-' + d + ' ' + h + ':' + min + ' ' + week
  return newDate
}
/*
 		传入订单类型id,
 		返回订单类型名
 * */
export function getOrderTypeName(typeId){
		if (typeId === 1) {
      return '销售订单'
    } else if (typeId === 2) {
      return '仓储订单'
    } else if (typeId === 3) {
      return '临时订单'
    } else if(typeId === 7){
      return '补货单'
    }else{
    	return '退换货订单'
    }
}
/*
 		传入订单类型id,订单状态id
 		返回订单状态名
 * */
export function getOrderStatusName(typeId,statusId){
	switch(statusId){
		   	case -1 :
		   		return '已关闭'
		   		break
	   		case 0 :
		   		return '审核中'
		   		break
		   	case 1 :
		   		return '派单中'
		   		break
		   	case 2 :
		   		return '出库中'
		   		break
		   	case 4 :
		   		return '运输中'
		   		break
		   	case 5 :
		   		return '回单中'
		   		break
		   	case 6 :
		   		return '已完成'
		   		break
      case 7:
       return '签收复核'
		   	case 12 :
		   		return '返厂中'
		   		break
		   	case 11 :
		   		return '处理中'
		   		break
		   	case 14 :
		   		return '已完成'
		   		break
		   }
}
/**
*    精确乘法（去除浮点数引起的误差）
*/
export function accMul(arg1,arg2)
{
 var m=0,s1=arg1.toString(),s2=arg2.toString();
 try{m+=s1.split(".")[1].length}catch(e){}
 try{m+=s2.split(".")[1].length}catch(e){}
 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/**
*    精确加法（去除浮点数引起的误差）
*/
export function accAdd(arg1,arg2){

var r1,r2,m;

try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}

try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}

m=Math.pow(10,Math.max(r1,r2))

return (arg1*m+arg2*m)/m

}

/*
 		传入 交货要求 字段 ：trpDeliveryWay
 		返回交货要求 内容 ：trpDeliveryWayName
 * */
export function getOrderTrpDeliverWayName(id){
	switch(id){
	case 1 :
   return '送货上门'
   break
  case 2 :
   return '营业点自提'
   break
  case 3 :
   return '送货上门代客卸货(平地卸货)'
   break
  case 4 :
   return '送货上门代客卸货(有电梯)'
   break
  case 5 :
   return '送货上门代客卸货(无电梯)'
   break
 }
}
/*
 		传入 返单时间 字段 ：trpReturnDateTime(返单时间)  trpExArrivalDate(预计送达时间)
 		返回返单时间 内容 ：trpReturnDateTimeName
 * */
export function getOrderTrpReturnDateTime(endTime,startTime){
	let startDate=new Date(startTime)
	let endDate=new Date(endTime)
	let numTime=(endDate-startDate)/(1000*60*60*24)
	if(numTime<15){
		return '15天以内'
	}else{
		return '暂无要求'
	}
}
