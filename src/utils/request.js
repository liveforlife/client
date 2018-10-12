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
  login (params) {
    return Vue.httpClient.post('/login', qs.stringify(params))
  },
  logout (params) {
    return Vue.httpClient.get('/logout', qs.stringify(params))
  },
  againSetPwd (params) {
    return Vue.httpClient.post('/user/updateUserPwdByToken', qs.stringify(params))
  },
  checkComName (params) {
    return Vue.httpClient.post('/exitsCompany', qs.stringify(params))
  },
  registerComInfo (params) {
    return Vue.httpClient.post('/companyRegister', qs.stringify(params))
  },
  registerUserInfo (params) {
    return Vue.httpClient.post('/userRegister', qs.stringify(params))
  },
  // 个人中心
  getUserInfo (params) {
    return Vue.httpClient.post('/user/info', qs.stringify(params))
  },
 getRolesList (params) {
  return Vue.httpClient.post('/user/rolesList', qs.stringify(params))
 },
  editUserInfo (params) {
    return Vue.httpClient.post('/user/edit', qs.stringify(params))
  },
  getComInfo (params) {
    return Vue.httpClient.post('/company/info', qs.stringify(params))
  },
  editComInfo (params) {
    return Vue.httpClient.post('/company/edit', qs.stringify(params))
  },
  getComRole (params) {
    return Vue.httpClient.post('/company/getCompanyRole', qs.stringify(params))
  },
  updateLoginPwd (params) {
    return Vue.httpClient.post('/user/updateUserPwd', qs.stringify(params))
  },
  imageOut (params) {
    return Vue.httpClient.get('/image/out?path=' + params)
  },
  getStoreHead (params) {
    return Vue.httpClient.post('/company/userList', qs.stringify(params))
  },
 updateAdmin (params) {
  return Vue.httpClient.post('/company/updateAdmin', qs.stringify(params))
 },
  //通讯录
  listConstacts (params) {
    return Vue.httpClient.post('/contacts/searchList', qs.stringify(params))
  },
  editConstacts (params) {
    return Vue.httpClient.post('/contacts/edit', qs.stringify(params))
  },
  infoConstacts (params) {
    return Vue.httpClient.post('/contacts/info', qs.stringify(params))
  },
  delConstacts (params) {
    return Vue.httpClient.post('/contacts/delete', qs.stringify(params))
  },
  // 新建账户
  addAccount (params) {
    return Vue.httpClient.post('/user/create', qs.stringify(params))
  },
  searAccount (params) {
    return Vue.httpClient.post('/company/searchUserList', qs.stringify(params))
  },
  userDisable (params) {
    return Vue.httpClient.post('/user/disable', qs.stringify(params))
  },
  userLogout (params) {
    return Vue.httpClient.post('/user/logout', qs.stringify(params))
  },
  // order
  getdrugs (params) {
    return Vue.httpClient.post('/drug/searchStock', qs.stringify(params))
  },
  getdrugstocked (params) {
    return Vue.httpClients.post('/drug/infoStock', params)
  },
  getArea (params) {
    return Vue.httpClient.post('/drug/getCodeSectionByOutNumber', qs.stringify(params))
  },
  getsearchList (params) {
    return Vue.httpClient.post('/contacts/searchList', qs.stringify(params))
  },
  getCompanyUsers(params){
    return Vue.httpClient.post('/user/companyUsers',qs.stringify(params))
  },
   getsearchHuaYaoWareHouseList (params) {
    return Vue.httpClient.post('/contacts/searchHuaYaoWareHouseList', qs.stringify(params))
  },
  getCreatePerfect (params) {
    return Vue.httpClients.post('/order/create', params)
  },
  getCreateDrug (params) {
    return Vue.httpClients.post('/drug/createDrug', params)
  },
  getOrderList (params) {
    return Vue.httpClient.post('/order/list', qs.stringify(params))
  },
  getDrugNumberList (params) {
    return Vue.httpClients.post('/drug/drugNumberList', params)
  },
  getOrderInfo (params) {
    return Vue.httpClient.post('/order/info', qs.stringify(params))
  },
  getCancelOrder (params) {
    return Vue.httpClient.post('/order/cancel', qs.stringify(params))
  },
  getOrderReceiveInfo (params) {
    return Vue.httpClient.post('/order/orderReceiveInfo', qs.stringify(params))
  },
  setCompensationPic (params) {
    return Vue.httpClient.post('/order/compensationPic', qs.stringify(params))
  },
  getDrugPrice(params){
  	return Vue.httpClient.post('/drug/drugPrice', qs.stringify(params))
  },
  createErrorOrder (params) {
    return Vue.httpClients.post('/order/createError', params)
  },
    getOrderErrorCusItemInfo (params) {
    return Vue.httpClient.post('/orderErrorCusItem/info', qs.stringify(params))
  },
  getComplainOrderDetail (params) {
    return Vue.httpClient.post('/complain/info', qs.stringify(params))
  },
   getOrderUpdateHisInfo (params) {
	  return Vue.httpClient.post('/orderUpdateHis/info', qs.stringify(params) // 订单变更详情
	  )
	 },
  // 保存发票
  createInvoice (params) {
    return Vue.httpClient.post('/invoiceTemplate/create', qs.stringify(params))
  },
  getInfo (params) {
    return Vue.httpClient.post('/invoiceTemplate/info', qs.stringify(params))
  },
  updateTemplate (params) {
    return Vue.httpClient.post('/invoiceTemplate/update', qs.stringify(params))
  },
  // 仓库管理
  depotList (params) {
    return Vue.httpClient.post('/warehouse/findPageWarehouses', qs.stringify(params))
  },
 depotListAll (params) {
  return Vue.httpClient.post('/warehouse/findAllWarehouses', qs.stringify(params))
 },
  depotAdd (params) {
    return Vue.httpClient.post('/warehouse/addWarehouse', qs.stringify(params))
  },
  getDepotInfo (params) {
    return Vue.httpClient.post('/warehouse/getWarehouse', qs.stringify(params))
  },
  updateDepotInfo (params) {
    return Vue.httpClient.post('/warehouse/updateWarehouse', qs.stringify(params))
  },
  depotPlaceList (params) {
    return Vue.httpClient.post('/warehouse/findPageWarehouseLocations', qs.stringify(params))
  },
  depotPlaceAdd (params) {
    return Vue.httpClient.post('/warehouse/addWarehouseLocation', qs.stringify(params))
  },
  getDepotPlaceInfo (params) {
    return Vue.httpClient.post('/warehouse/getWarehouseLocation', qs.stringify(params))
  },
  updateDepotPlace (params) {
    return Vue.httpClient.post('/warehouse/updateWarehouseLocation', qs.stringify(params))
  },
  depotPlaceDel (params) {
    return Vue.httpClient.post('/warehouse/deleteWarehouseLocation', qs.stringify(params))
  },
  searchLikeName (params) { // 录入药品
    return Vue.httpClient.post('/drug/searchLike', qs.stringify(params),{showLoading:false})
  },
  InsertDrugs (params) {
    return Vue.httpClients.post('/drug/insertDrug', params)
  },
  depotInList (params) {
    let url = '/warehouseRecord/findPageEnterWarehouseRecords'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  depotOutList (params) {
    let url = '/warehouseRecord/findPageOutWarehouseRecords'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  depotOutInList (params) {
    let url = '/warehouseRecord/findPageStorageRecords'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  outInDetails (params) {
    let url = '/warehouseRecord/getWarehouseRecordDetail'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  getStockList (params) {
    let url = '/warehouseDrug/findPageWarehouseDrugs'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  getDrugStock (params) { // 药品详情
    let url = '/warehouseDrug/findWarehouseDrugDetail'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  outInRecord (params) { // 出入库记录
    let url = '/warehouseDrug/findDrugWarehouseRecordDetail'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  getStockInfo (params) { // 库存详情
    let url = '/warehouseDrug/getWarehouseDrugLocations'
    return Vue.httpClient.post(url, qs.stringify(params))
  },
  checkStock (params) { // 库存盘点
    return Vue.httpClients.post('/warehouseDrug/warehouseCheck', params)
  },
  checkRecord (params) { // 盘点记录
    return Vue.httpClient.post('/warehouseDrug/findWarehouseCheckRecords', qs.stringify(params))
  },
 // 财务
 getSearchCompanyList (parms) {
  return Vue.httpClient.post('/company/search', qs.stringify(parms))
 },
 getCustomerMerge (parms) {
  return Vue.httpClient.post('/payMerge/customerMerge', qs.stringify(parms))
 },
 getIntegratedQuery (params) {
  return Vue.httpClient.post('/payOrderList/waitHuaYaoReceiveApply', qs.stringify(params)
  )
 },
 getCompensationReturn (params) {
  return Vue.httpClient.post('/payOrderList/listCustErrorDrugInfo', qs.stringify(params) //异常订单详情
  )
 },
 getSettlementList (params) {
  return Vue.httpClient.post('/payOrderList/payOrderInfo', qs.stringify(params)  //清单列表
  )
 },
 getPayOrderInfo (params) {
  return Vue.httpClient.post('/payOrderList/orderInfo', qs.stringify(params)  //订单详情
  )
 },
 getListOrderInfoByPayOrder (params) {
  return Vue.httpClient.post('/payOrderList/listOrderInfoByPayOrder', qs.stringify(params) // 清单列表下的订单
  )
 },
 getErrorOrderInfo (params) {
  return Vue.httpClient.post('/payOrderList/getErrorOrderInfo', qs.stringify(params) // 赔偿单详情上部分
  )
 },
 getListOrderErrorCusItem (params) {
  return Vue.httpClient.post('/payOrderList/listOrderErrorCusItem', qs.stringify(params) // 药损详情
  )
 },
 getBankPayInfo (params) {
  return Vue.httpClient.post('/pay/getBankPayInfo', qs.stringify(params) // 获取银行支付记录
  )
 },
 getPayTicketInfo (params) {
  return Vue.httpClient.post('/pay/getPayTicketInfo', qs.stringify(params) // 获取承兑票记录
  )
 },
 getCancelCustMerge (params) {
  return Vue.httpClient.post('/payMerge/cancelCustMerge', qs.stringify(params) // 解除分公司合并
  )
 },
 getInvoiceTemplate (params) {
  return Vue.httpClient.post('/invoiceTemplate/info', qs.stringify(params) // 开票
  )
 },

 getListChangeOrder (params) {
  return Vue.httpClient.post('/orderErrorDetail/listChangeOrder', qs.stringify(params) // 退换货管理列表
  )
 },
 getListCompensate (params) {
  return Vue.httpClient.post('/orderErrorDetail/listCompensate', qs.stringify(params) // 赔偿单列表
  )
 },
 getConfirmPaySuccess (params) {
  return Vue.httpClient.post('/pay/confirmPaySuccess', qs.stringify(params) // 结算单确认
  )
 },
 getCustPay(params){
  return Vue.httpClient.post('/payOrderList/custPay',qs.stringify(params))  //客户结算-确认对账
 },
 getpayBankConfirm (params) {
  return Vue.httpClients.post('/pay/payBankConfirm', params)//银行支付
 },

 getAcceptanceTicket (params) {
  return Vue.httpClients.post('/acceptanceTicket/edit', params)//承兑票填写
 },
 getPayTicketConfirm (params) {
  return Vue.httpClients.post('/pay/payTicketConfirm', params)//承兑票支付
 },
 getAcceptanceTicketInfo (params) {
  return Vue.httpClient.post('/acceptanceTicket/info',qs.stringify(params))//获取承兑票信息
 },
 getErrorInfo (params) {
  return Vue.httpClient.post('/orderErrorLog/info', qs.stringify(params)) //查看异常
 },
 getExpectedArrivalDate (params) {
  return Vue.httpClient.post('/order/expectedArrivalDate', qs.stringify(params)) //预计到达时间
 },
 getCostPercentumInfo (params) {
  return Vue.httpClient.post('/costPercentum/info', qs.stringify(params)) //税率
 },
 getOrderErrorCusItemEdit (params) {
  return Vue.httpClients.post('/orderErrorCusItem/edit', params)// 新增货损费用
 },
 getLastMapLocation (params) {
  return Vue.httpClient.post('/order/lastMapLocation', qs.stringify(params)) //实时位置
 },
  getUserMenu (params) {
    return Vue.httpClient.post('/resource/userMenu', qs.stringify(params))
  },
 uploadOrderPayInvoice (params) {
  return Vue.httpClient.post('/payOrderList/uploadOrderPayInvoice', qs.stringify(params) // 客户上传发票
  )
 },
 getPayComTimelimitConf (params) {
    return Vue.httpClient.post('/payComTimelimitConf/timeoutHours', qs.stringify(params)//获取超时未付款的时间
    )
  },
 getOrderFlowList (parms) {
  return Vue.httpClient.post('/order/getOrderFlowList', qs.stringify(parms)) //订单流转图
 },
 getOrderType (params) {
  return Vue.httpClient.post('order/getOrderType', qs.stringify(params))// 补货单
 },
 getImageCode (parms) {
  return Vue.httpClient.post('/qrcode/getImageCode', qs.stringify(parms)) //线路编辑
 },
  updateMobile (params) {
    return Vue.httpClient.post('/user/updateUserMobile', qs.stringify(params))
  },
  getConf (params) {
  return Vue.httpClient.post('/payComSettlement/getConf', qs.stringify(params)) // 获取固定付款比率
 },
 getPayAddr(params){
  return Vue.httpClient.post('/getPayAddr', qs.stringify(params))  //调用支付
 },
 getPayInfo(params){
  return Vue.httpClient.post('/getPayInfo',qs.stringify(params)) //获取结算信息
 },
 getImageCode(params){
   return Vue.httpClient.post('/qrcode/getImageCode',qs.stringify(params)) //获取付款二维码
 },
 paymentCallBack(params){
   return Vue.httpClient.post('/pay-callback',qs.stringify(params)) //付款成功回调
 },
  getAreaLocation(params){
   return Vue.httpClient.post('/area/location',qs.stringify(params)) //根据区域id获取经纬度信息
 }
}
