// auth_token
export function hasAuthToken () {
  // return !!localStorage.getItem('authToken_customer')
  return !!sessionStorage.getItem('authToken_customer')
}
export function setAuthToken (authToken) {
  // localStorage.setItem('authToken_customer', JSON.stringify(authToken))
  sessionStorage.setItem('authToken_customer', JSON.stringify(authToken))
}

export function getAuthToken () {
  // return JSON.parse(localStorage.getItem('authToken_customer'))
  return JSON.parse(sessionStorage.getItem('authToken_customer'))
}
// 返回标记
export function setSignsession (session) {
  localStorage.setItem('signMessage', session)
}
export function getSignsession () {
  return localStorage.getItem('signMessage')
}
// 仓储下单
export function setdrugsession (session) {
 localStorage.setItem('drugs', JSON.stringify(session))
}
export function getdrugsession () {
 return JSON.parse(localStorage.getItem('drugs'))
}
export function removedrugseession () {
 localStorage.removeItem('drugs')
}
// 销售下单
export function setSaleData (session) {
 sessionStorage.setItem('saleData', JSON.stringify(session))
}
export function getSaleData () {
 return JSON.parse(sessionStorage.getItem('saleData'))
}
export function removeSaleData () {
 sessionStorage.removeItem('saleData')
}

// 临时下单
export function setTemporaryseeion (session) {
  localStorage.setItem('temporaryList', JSON.stringify(session))
}
export function getTemporaryseeion () {
  return JSON.parse(localStorage.getItem('temporaryList'))
}
export function removeTemporaryseeion () {
  localStorage.removeItem('temporaryList')
}
// 入库华药
export function setWarehouseOrders (session) {
 localStorage.setItem('warehouseOrders', JSON.stringify(session))
}
export function getWarehouseOrders () {
 return JSON.parse(localStorage.getItem('warehouseOrders'))
}
export function removeWarehouseOrders () {
 localStorage.removeItem('warehouseOrders')
}
// 入库华药区域码
export function setAreaCode (session) {
 sessionStorage.setItem('areaCode', JSON.stringify(session))
}
export function getAreaCode () {
 return JSON.parse(sessionStorage.getItem('areaCode'))
}
export function removeAreaCode () {
 sessionStorage.removeItem('areaCode')
}
// 订单查询
export function setOrderDetailseeion (session) {
  localStorage.setItem('orderDetail', JSON.stringify(session))
}
export function getOrderDetailseeion () {
  return JSON.parse(localStorage.getItem('orderDetail'))
}
// 用户信息
export function hasSession () {
  // return !!localStorage.getItem('session_customer')
  return !!sessionStorage.getItem('session_customer')
}

export function clearLSession () {
  // localStorage.removeItem('session_customer')
  // localStorage.removeItem('authToken_customer')
  sessionStorage.removeItem('session_customer')
  sessionStorage.removeItem('authToken_customer')
}

export function setLSession (session) {
  // localStorage.setItem('session_customer', JSON.stringify(session))
  sessionStorage.setItem('session_customer', JSON.stringify(session))
}

export function getLSession () {
  // return JSON.parse(localStorage.getItem('session_customer'))
  return JSON.parse(sessionStorage.getItem('session_customer'))
}
// 司机信息
export function getDriveSession () {
  return JSON.parse(localStorage.getItem('driveEdit'))
}
export function setDriveSession (session) {
  localStorage.setItem('driveEdit', JSON.stringify(session))
}
export function setSSession (name, session) {
  sessionStorage.setItem(name, JSON.stringify(session))
}

export function getSSession (name) {
  return JSON.parse(sessionStorage.getItem(name))
}

export function clearSSession (name) {
  sessionStorage.removeItem(name)
}

//赔偿单
export function setSingleCode (session) {
 sessionStorage.setItem('SingleCode', JSON.stringify(session))
}
export function getSingleCode () {
 return JSON.parse(sessionStorage.getItem('SingleCode'))
}
//退换货单
export function setReturnGoods (session) {
 sessionStorage.setItem('returnGoods', JSON.stringify(session))
}
export function getReturnGoods () {
 return JSON.parse(sessionStorage.getItem('returnGoods'))
}
export function removeReturnGoods () {
 sessionStorage.removeItem('returnGoods')
}
//补发货单货单
export function setReturnSingleManagement (session) {
 sessionStorage.setItem('ReturnSingleManagement', JSON.stringify(session))
}
export function getReturnSingleManagement () {
 return JSON.parse(sessionStorage.getItem('ReturnSingleManagement'))
}
export function reReturnSingleManagement () {
 sessionStorage.removeItem('ReturnSingleManagement')
}

// //查询进入详情
export function setQueryDetailsPage (session) {
 sessionStorage.setItem('DetailsPage', JSON.stringify(session))
}
export function getQueryDetailsPage () {
 return JSON.parse(sessionStorage.getItem('DetailsPage'))
}
export function removeQueryDetailsPage () {
 sessionStorage.removeItem('DetailsPage')
}
//清单管理
export function setInventoryManagement (session) {
 sessionStorage.setItem('InventoryManagement', JSON.stringify(session))
}
export function getInventoryManagement () {
 return JSON.parse(sessionStorage.getItem('InventoryManagement'))
}
export function removeInventoryManagement () {
 sessionStorage.removeItem('InventoryManagement')
}
//发票上传
export function setImgDataSession (session) {
 sessionStorage.setItem('imgData', JSON.stringify(session))
}
export function getImgDataSession () {
 return JSON.parse(sessionStorage.getItem('imgData'))
}
export function removeImgDataSession () {
 sessionStorage.removeItem('imgData')
}
//药品名称跳转
export function setDrugsDetails (session) {
 sessionStorage.setItem('DrugsDetails', JSON.stringify(session))
}
export function getDrugsDetails () {
 return JSON.parse(sessionStorage.getItem('DrugsDetails'))
}
export function removeDrugsDetails () {
 sessionStorage.removeItem('DrugsDetails')
}

