<template>
 <div class="map">
  <!--container-->
  <div id="r-result">
   <div>搜索提示：<input type="text" v-model="address_detail" id="suggestId" value="" placeholder="请输入地址"/><br/></div>
   <div>
    通讯地址：<input type="text" class="address" v-model="address_detail" :disabled="isFlag?false:true"/>
    <el-button type="primary"  v-on:click="sendMapData">确定通讯地址</el-button>
   </div>
  </div>
  <div id="ResultPanel" style="width:150px;height:auto;display:none;"></div>
  <div id="l-map"></div>
  <!--container end-->
 </div>
</template>

<script>
 import BMap from 'BMap'

 export default {
  props:{
   message:{
    type:String,
   },
   centerAndZoom:{
    type:String,
    default:'北京'
   },
   position:{
    type:Object,
    default(){
     return{lng:'',lat:""}
    }
   },
   address:{
   	type:String,
   },
  },
  data: () => ({
   address_detail: '',
   lng: '',
   lat: '',
   isFlag:false,
  }),
  created() {
  },
  mounted() {
//   this.lng = position.lng
//   this.lat = position.lat var point = new BMap.Point(116.404, 39.915);
//   if(this.position.lng !== '' && this.position.lat !== ''){
//
//   }
   this.ready()
  },
  watch:{
   message(curVal,oldVal){
    this.address_detail=curVal;
   }
  },
  methods: {
   setCenterAndZoom(city) {
     if(this.centerAndZoom&&this.centerAndZoom!==''){
      this.ready()
     }
   },

   sendMapData() {
    if (this.address_detail != '') {
     let params = {
      descript: this.address_detail,
      lng: this.lng,
      lat: this.lat
     }
     this.$emit('listenMap', params)
    } else {
     return
    }
   },
   setMapData(address, lng, lat) {
    this.address_detail = address
    this.lng = lng
    this.lat = lat
   },
   ready: function () {
   	if(this.address){
   		this.address_detail=this.address
   		this.isFlag=true
   	}
   	console.log(2222,this.address);
    //this.address_detail=this.message;
    this.lat=this.position.lat;
    this.lng=this.position.lng;
    var th = this
    var map = new BMap.Map('l-map')
    if(this.lng !== '' && this.lat !== ''){
		    var point = new BMap.Point(this.lng,this.lat);
     	map.centerAndZoom(point,16);
     	var marker = new BMap.Marker(point);        // 创建标注
     	map.addOverlay(marker);
    }else{
		    var point = new BMap.Point(101.06,30.67);  // 创建点坐标
     	map.centerAndZoom(point, 16)
    }
    map.enableScrollWheelZoom(true)// 缩放
    var geoc = new BMap.Geocoder()

    // 建立一个自动完成的对象
    var ac = new BMap.Autocomplete(
     {
      'input': 'suggestId',
      'location': map
     })

    function G(id) {
     return document.getElementById(id)
    }

    // 鼠标放在下拉列表上的事件
    ac.addEventListener('onhighlight', function (e) {
     var str = ''
     var _val = e.fromitem.value
     var val = ''
     if (e.fromitem.index > -1) {
      val = _val.province + _val.city + _val.district + _val.street + _val.business
     }
     str = 'FromItem<br/>index=' + e.fromitem.index + '<br/>value=' + val
     val = ''
     if (e.toitem.index > -1) {
      _val = e.toitem.value
      val = _val.province + _val.city + _val.district + _val.street + _val.business
     }
     str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + val
     G('ResultPanel').innerHTML = str
    })
    var myVal
    // 鼠标点击下拉列表后的事件
    ac.addEventListener('onconfirm', function (e) {
     let _val = e.item.value
     myVal = _val.province + _val.city + _val.district + _val.street + _val.business
     G('ResultPanel').innerHTML = 'onconfirm<br/>index=' + e.item.index + '<br/>myVal=' + myVal
     setPlace(myVal)
    })

    function setPlace(myVal) {
   	th.isFlag=true
     // 清除地图上所有覆盖物{
     map.clearOverlays()

     function myFun() {
      // 获取第一个智能搜索的结果
      var point = local.getResults().getPoi(0).point
      map.centerAndZoom(point, 16)
      // 创建标注，为要查询的地方对应的经纬度
      var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat))
      map.addOverlay(marker)
      marker.enableDragging()// 设置可拖拽
      geoc.getLocation(point, function (rs) {
       let add = rs.addressComponents
       let dizhi = add.city + add.district + add.street + add.streetNumber
       // document.getElementById('suggestId').value = dizhi// 更新地址数据
       th.setMapData(myVal, point.lng, point.lat)
      })
      // 拖动事件
      marker.addEventListener('dragend', function (e) {
       let pt = e.point
       geoc.getLocation(pt, function (rs) {
        let add = rs.addressComponents
        let dizhi = add.city + add.district + add.street + add.streetNumber
        document.getElementById('suggestId').value = dizhi// 更新地址数据
        th.setMapData(dizhi, point.lng, point.lat)
        var infoWindow = new BMap.InfoWindow('<p>' + dizhi + '</p>')
        // 将经纬度信息显示在提示框内
        marker.openInfoWindow(infoWindow, map.getCenter())
       })
      })
     }

     // 智能搜索
     var local = new BMap.LocalSearch(map, {
      onSearchComplete: myFun
     })
     local.search(myVal)
    }
   }
  }
 }
</script>

<style>
 /* 去掉地图左下角的百度LOGO */
 .anchorBL {
  display: none
 }

 .map input {
  border: solid #ccc 1px;
  width: 40%;
  height: 40px;
  padding: 0 2%;
 }

 .map #l-map {
  width: 100%;
  height: 540px;
 }

 .map #ResultPanel {
  z-index: 2003;
 }

 #tangram-suggestion--TANGRAM__1c-main {
  z-index: 2003;
 }

 .map #r-result > div {
  margin-bottom: 20px;
 }

 .map .address {
  display: inline-block;
  width: 40%;
  height: 40px;
  line-height: 40px;
  border: solid #ccc 1px;
 }

 .tangram-suggestion-main {
  position: absolute;
  z-index: 12345 !important;
  left: 542px;
  top: 128px;
  width: 300px;
 }
</style>
