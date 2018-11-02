import Vue from 'vue'
import qs from 'qs'

export default {
  checkMobile (params) {
    return Vue.httpClient.post('/exitsUserByMobile', qs.stringify(params))
  },
  sendSms (params) {
    return Vue.httpClient.post('/sendSms', qs.stringify(params))
  },
  checkSms (params) {
    return Vue.httpClient.post('/checkSmsCode', qs.stringify(params))
  },
  imgUpload (params) {
    return Vue.httpClient.post('/image/upload', qs.stringify(params))
  },
  
  getUsersByPhone(params){
  	return Vue.httpClient.post('/home.cop/getUsersByPhone',qs.stringify(params))
  },
	/* 系统相关*/
	// 机构管理
  addIns(params){
  	return Vue.httpClients.post('/home.cop/ins/add',params)
  },
  deleteIns(params){
  	return Vue.httpClient.post('/home.cop/ins/deleteInstRelation',qs.stringify(params))
  },
  instRelationIns(params){
  	return Vue.httpClient.post('/home.cop/ins/instRelation',qs.stringify(params)) //获取机构关系列表
  },  
  instRelationModifyIns(params){
  	return Vue.httpClient.post('/home.cop/ins/instRelationModify',qs.stringify(params))//机构关系列表维护
  },
  getInsList(params){
  	return Vue.httpClient.post('/home.cop/ins/list',qs.stringify(params))//获取机构列表
  },
  getDictList(params){
  	return Vue.httpClient.post('/home.cop/dict/list',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  getRegionList(params){
  	return Vue.httpClient.post('/home.cop/region/list',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
   
  login (params) {
    return Vue.httpClient.post('/home.cop/login', qs.stringify(params))
  },
}
