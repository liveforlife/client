webpackJsonp([2],{AXOX:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",{staticClass:"account account-add"},[r("el-header",{staticStyle:{height:"50px"}},[r("el-row",[r("el-col",{attrs:{span:11}},[r("div",{staticClass:"grid-content bg-purple"},[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",[e._v("账户管理")]),e._v(" "),r("el-breadcrumb-item",[e._v("新增账户")])],1)],1)]),e._v(" "),r("el-col",{attrs:{span:13}},[r("NavHeader")],1)],1)],1),e._v(" "),r("el-main",[r("div",{staticClass:"form"},[r("navTitle",[e._v("新建账户")]),e._v(" "),r("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[r("el-col",{attrs:{span:11}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px",size:"medium","status-icon":""}},[r("el-form-item",{attrs:{label:"姓 名 : ",prop:"username"}},[r("el-col",{attrs:{span:18}},[r("el-input",{model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"性 别 : ",prop:"sex"}},[r("el-col",{attrs:{span:18}},[r("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.sex,callback:function(t){e.$set(e.ruleForm,"sex",t)},expression:"ruleForm.sex"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"0"},model:{value:e.ruleForm.sex,callback:function(t){e.$set(e.ruleForm,"sex",t)},expression:"ruleForm.sex"}},[e._v("女")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"出生日期 : ",prop:"birthday"}},[r("el-col",{attrs:{span:18}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"出生日期"},model:{value:e.ruleForm.birthday,callback:function(t){e.$set(e.ruleForm,"birthday",t)},expression:"ruleForm.birthday"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"岗 位 : ",prop:"position"}},[r("el-col",{attrs:{span:18}},[r("el-input",{model:{value:e.ruleForm.position,callback:function(t){e.$set(e.ruleForm,"position",t)},expression:"ruleForm.position"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号码 : ",prop:"mobile"}},[r("el-col",{attrs:{span:18}},[r("el-input",{model:{value:e.ruleForm.mobile,callback:function(t){e.$set(e.ruleForm,"mobile",t)},expression:"ruleForm.mobile"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"座机号 : ",prop:"phone"}},[r("el-col",{attrs:{span:18}},[r("el-input",{model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"邮 箱 : ",prop:"email"}},[r("el-col",{attrs:{span:18}},[r("el-input",{model:{value:e.ruleForm.email,callback:function(t){e.$set(e.ruleForm,"email",t)},expression:"ruleForm.email"}})],1)],1),e._v(" "),r("el-form-item",{staticClass:"height",attrs:{label:"角 色 : ",prop:"role",min:1}},[r("el-checkbox-group",{model:{value:e.ruleForm.role,callback:function(t){e.$set(e.ruleForm,"role",t)},expression:"ruleForm.role"}},e._l(e.role,function(t,o){return r("el-col",{key:o,attrs:{span:9}},[r("el-checkbox",{attrs:{label:t.id,value:t.id,name:"type"}},[e._v(e._s(t.name))])],1)}))],1),e._v(" "),r("el-form-item",{staticClass:"height1",attrs:{label:"公司名称 : "}},[r("span",{staticClass:"text"},[e._v(e._s(e.info.name))])]),e._v(" "),r("el-form-item",{attrs:{label:"通讯地址 : "}},[r("span",{staticClass:"text"},[e._v(e._s(e.info.address))])]),e._v(" "),r("el-row",{staticClass:"row-bg",staticStyle:{"margin-top":"60px"},attrs:{type:"flex",justify:"space-around"}},[r("div",{staticClass:"save-btn liner-btn",on:{click:function(t){e.submitForm("ruleForm")}}},[r("i",{staticClass:"icon-l icon-save"}),e._v("保存")]),e._v(" "),r("router-link",{attrs:{to:"/accountSearch"}},[r("el-button",{attrs:{icon:"icon-l icon-cancel-1"}},[e._v("取消")])],1)],1)],1)],1)],1)],1)]),e._v(" "),r("el-footer",{staticStyle:{height:"44px"}},[e._v("版权所有：华药共享网络科技有限公司")])],1)},n=[],a={render:o,staticRenderFns:n};t.a=a},XVgC:function(e,t,r){t=e.exports=r("FZ+f")(!0),t.push([e.i,".el-col-lg-11{width:65%}.account-add .form .el-form-item__label{width:120px!important}.height .el-form-item__content{margin-left:118px!important}","",{version:3,sources:["D:/Documents/HBuilderProject/Client/src/pages/account/add/index.vue"],names:[],mappings:"AACA,cACC,SAAW,CACX,AACD,wCACC,qBAAwB,CACxB,AACD,+BACC,2BAA6B,CAC7B",file:"index.vue",sourcesContent:["\n.el-col-lg-11{\n width: 65%;\n}\n.account-add .form .el-form-item__label{\n width: 120px !important;\n}\n.height .el-form-item__content{\n margin-left: 118px!important;\n}\n"],sourceRoot:""}])},Yads:function(e,t,r){t=e.exports=r("FZ+f")(!0),t.push([e.i,".title-content{width:100%;height:20px;border-bottom:1px solid #d8d8d8;margin-bottom:50px;background:#fff}.title-content span{display:block;width:170px;height:40px;line-height:40px;text-align:center;font-size:20px;color:#397cf1;margin:0 auto;letter-spacing:2px;background:#fff}","",{version:3,sources:["D:/Documents/HBuilderProject/Client/src/components/navTitle.vue"],names:[],mappings:"AACA,eACI,WAAY,AACZ,YAAa,AACb,gCAAiC,AACjC,mBAAoB,AACpB,eAAoB,CACvB,AACD,oBACI,cAAe,AACf,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,cAAe,AACf,mBAAoB,AACpB,eAAoB,CACvB",file:"navTitle.vue",sourcesContent:["\n.title-content{\n    width: 100%;\n    height: 20px;\n    border-bottom: solid #d8d8d8 1px;\n    margin-bottom: 50px;\n    background: #ffffff;\n}\n.title-content span{\n    display: block;\n    width: 170px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    font-size: 20px;\n    color: #397cf1;\n    margin: 0 auto;\n    letter-spacing: 2px;\n    background: #ffffff;\n}\n"],sourceRoot:""}])},dUDC:function(e,t,r){"use strict";function o(e){r("vRI0")}var n=r("oVm5"),a=r("VU/8"),i=o,l=a(null,n.a,!1,i,null,null);t.a=l.exports},"l+8p":function(e,t,r){var o=r("mFLE");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("rjj0")("2561b7fd",o,!0,{})},l0XQ:function(e,t,r){"use strict";var o=r("Lp+n"),n=r("dUDC"),a=r("l+8p"),i=(r.n(a),r("vLgD")),l=r("RH4F");t.a={data:function(){return{role:[],info:{},companyName:"",address:"",ruleForm:{cid:"",username:"",sex:"",birthday:"",position:"",mobile:"",phone:"",email:"",role:[],roleids:[],sales:"0",ifSendSms:"1"},rules:{username:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:10,message:"长度3-10",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],position:[{required:!0,message:"请输入岗位",trigger:"blur"},{min:2,max:10,message:"长度2-10",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1\d{10}$/,message:"请输入正确的11位手机号码"}],phone:[{message:"",trigger:"change"}],email:[{message:"请输入正确的邮箱",trigger:"change"}],role:[{type:"array",required:!0,message:"请选择角色",trigger:"change"}]}}},components:{NavHeader:o.a,navTitle:n.a},mounted:function(){this.getInfp()},methods:{getInfp:function(){var e=Object(l.d)().data.org;null!==e&&""!==e?(this.info=e,this.ruleForm.cid=e.id,this.getRole(e.id)):this.$message.error("获取角色信息出错！")},getRole:function(e){var t=this;i.a.getComRole({companyId:e}).then(function(e){var r=e.data;r.success?t.role=r.data:t.$message.error(r.message)})},submitForm:function(e){var t=this;this.$refs[e].validate(function(r){if(r&&t.info.id){var o=t.ruleForm;o.roleids=o.role.join(","),i.a.addAccount(o).then(function(r){var o=r.data;o.success?(t.$message({message:"新增账户成功！",type:"success"}),t.$refs[e].resetFields()):t.$message.error(o.message)})}})}}}},mFLE:function(e,t,r){t=e.exports=r("FZ+f")(!0),t.push([e.i,".account .el-main{padding-right:0}.account-edit_user .el-form-item,.account-s-edit .el-form-item{margin-bottom:18px}.account-edit_com .el-button{padding:9px 36px;margin-left:38px;margin-top:20px;display:block}.account-edit_com .el-checkbox-group{height:30px}.account-edit_com .el-form-item__label{font-size:16px}.account-edit_com .el-form-item{margin-bottom:18px}.account-edit_com .file-onload{margin-top:10px;border:2px dashed #d7d7d7;padding:15px;border-radius:4px}.account-edit_com .el-upload-list--picture-card .el-upload-list__item{margin-bottom:0}.account-edit_com .el-col-18 .el-form-item__content{line-height:0}.account-edit_com .warning{border:2px dashed #dcdfe6}","",{version:3,sources:["D:/Documents/HBuilderProject/Client/src/pages/account/account.css"],names:[],mappings:"AACA,kBACE,eAAmB,CACpB,AAQD,+DACE,kBAAoB,CACrB,AAGD,6BACI,iBAAkB,AAClB,iBAAkB,AAClB,gBAAiB,AACjB,aAAe,CAChB,AACD,qCACE,WAAa,CACd,AACD,uCACE,cAAgB,CACjB,AACD,gCACE,kBAAoB,CACrB,AACD,+BACE,gBAAiB,AACjB,0BAA2B,AAC3B,aAAc,AACd,iBAAmB,CACpB,AAED,sEACE,eAAiB,CAClB,AAED,oDACE,aAAe,CAChB,AAED,2BACE,yBAA2B,CAC5B",file:"account.css",sourcesContent:["/* 新增账户、账户编辑、个人信息编辑、企业信息编辑 --- 公共部分样式 */\r\n.account .el-main{\r\n  padding-right: 0px;\r\n}\r\n\r\n/* 账户编辑 */\r\n.account-s-edit .el-form-item {\r\n  margin-bottom: 18px;\r\n}\r\n\r\n/* 个人信息编辑 */\r\n.account-edit_user .el-form-item {\r\n  margin-bottom: 18px;\r\n}\r\n\r\n/* 企业信息编辑 */\r\n.account-edit_com .el-button{\r\n    padding: 9px 36px;\r\n    margin-left: 38px;\r\n    margin-top: 20px;\r\n    display: block;\r\n  }\r\n  .account-edit_com .el-checkbox-group{\r\n    height: 30px;\r\n  }\r\n  .account-edit_com .el-form-item__label{\r\n    font-size: 16px;\r\n  }\r\n  .account-edit_com .el-form-item {\r\n    margin-bottom: 18px;\r\n  }\r\n  .account-edit_com .file-onload{\r\n    margin-top: 10px;\r\n    border: dashed 2px #d7d7d7;\r\n    padding: 15px;\r\n    border-radius: 4px;\r\n  }\r\n\r\n  .account-edit_com .el-upload-list--picture-card .el-upload-list__item{\r\n    margin-bottom: 0;\r\n  }\r\n\r\n  .account-edit_com .el-col-18 .el-form-item__content{\r\n    line-height: 0;\r\n  }\r\n\r\n  .account-edit_com .warning{\r\n    border: dashed 2px #DCDFE6;\r\n  }\r\n"],sourceRoot:""}])},oVm5:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"title-content"},[r("span",[e._t("default")],2)])},n=[],a={render:o,staticRenderFns:n};t.a=a},okiC:function(e,t,r){var o=r("XVgC");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("rjj0")("3ba3ef4a",o,!0,{})},vRI0:function(e,t,r){var o=r("Yads");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("rjj0")("46db6f0c",o,!0,{})},xVcM:function(e,t,r){"use strict";function o(e){r("okiC")}Object.defineProperty(t,"__esModule",{value:!0});var n=r("l0XQ"),a=r("AXOX"),i=r("VU/8"),l=o,s=i(n.a,a.a,!1,l,null,null);t.default=s.exports}});
//# sourceMappingURL=2.6c40e9bae6ba6d3b3027.js.map