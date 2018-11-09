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

  /*登录相关 */
  login (params) {
    return Vue.httpClient.post('/home.cop/login', qs.stringify(params))
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
  //企业管理
  addIndu(params){
  	return Vue.httpClients.post('/home.cop/indu/add',params)//新增行业信息
  },
  getInduList(params){
  	return Vue.httpClient.post('/home.cop/indu/list',qs.stringify(params))//获取机构列表
  },
  deleteInduList(params){
  	return Vue.httpClient.post('/home.cop/indu/delete',qs.stringify(params))//根据编号删除行业
  },
  undateInduList(params){
  	return Vue.httpClients.post('/home.cop/indu/update',params)//更新行业信息
  },
  /*数字字典 */
  addDict(params){
    return Vue.httpClient.post('/home.cop/dict/add',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  deleteDict(params){
    return Vue.httpClient.post('/home.cop/dict/delete',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  getDictInfo(params){
    return Vue.httpClient.post('/home.cop/dict/info',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  getDictList(params){
    return Vue.httpClient.post('/home.cop/dict/list',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  changeDictStatus(params){
    return Vue.httpClient.post('/home.cop/dict/status',qs.stringify(params))//根据编号获取当前分组的数据字典
  },
  getDictTree(params){
    return Vue.httpClient.post('/home.cop/dict/tree',qs.stringify(params))//根据编号获取当前分组的数据字典
  },

  getRegionList(params){
  	return Vue.httpClient.post('/home.cop/region/list',qs.stringify(params))//行政区域列表
  },
	getRegionTree(params){
  	return Vue.httpClient.post('/home.cop/region/tree',qs.stringify(params))//行政区域树
  },
  /* 员工相关 */
  //员工管理
  addEmployee(params){
    return Vue.httpClients.post('/home.cop/employee/add',params)//超级管理员新增员工
  },
  deleteEmployee(params){
    return Vue.httpClient.post('/home.cop/employee/delete',qs.stringify(params))//删除员工
  },
  getEmployeeList(params){
    return Vue.httpClient.post('/home.cop/employee/list',qs.stringify(params))//根据条件查询员工列表
  },
  getEmployeeListByInstId(params){
    return Vue.httpClient.post('/home.cop/employee/listByInstId',qs.stringify(params))//根据机构编号获取员工，只返回账号和姓名
  },
  upateEmployeeStatus(params){
    return Vue.httpClient.post('/home.cop/employee/upateStatus',qs.stringify(params))//修改密码
  },
  upateEmployeePass(params){
    return Vue.httpClient.post('/home.cop/employee/upatePass',qs.stringify(params))//修改员工状态
  },
  updateEmployeeInfo(params){
    return Vue.httpClient.post('/home.cop/employee/updateInfo',qs.stringify(params))//修改信息
  },
  //部门管理
  addDept(params){
    return Vue.httpClients.post('/home.cop/dept/add',params)//新增部门
  },
  deleteDept(params){
    return Vue.httpClient.post('/home.cop/dept/delete',qs.stringify(params))//删除部门
  },
  getDeptList(params){
    return Vue.httpClient.post('/home.cop/dept/list',qs.stringify(params))//根据条件查询部门列表
  },
  updateDeptInfo(params){
    return Vue.httpClient.post('/home.cop/dept/updateInfo',qs.stringify(params))//修改信息
  },
}
