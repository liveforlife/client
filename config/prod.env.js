'use strict'
const target = process.env.npm_lifecycle_event;
if(target==='test'){
 var obj= {
  NODE_ENV: '"production"',
  CONNECTOR_SERVER: JSON.stringify(''),
  BACKEND_SERVER: JSON.stringify(''),
  MOBILE_PAYMENT:JSON.stringify('')
 }
}else{
 var obj= {
  NODE_ENV: '"production"',
  CONNECTOR_SERVER: JSON.stringify(''),
  BACKEND_SERVER: JSON.stringify(''),
  MOBILE_PAYMENT:JSON.stringify(''),
 }
}
module.exports=obj

