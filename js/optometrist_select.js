//HTML5与百度地图相关方法
// 检测浏览器是否支持HTML5
$(function() {
var geoLon;
var geoLat;
//HTML5与百度地图相关方法
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398,39.897445);
map.centerAndZoom(point,12);

var geolocation = new BMap.Geolocation();
// 开启SDK辅助定位
//geolocation.enableSDKLocation();
geolocation.getCurrentPosition(function(r){
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
		var mk = new BMap.Marker(r.point);
		map.addOverlay(mk);
		map.panTo(r.point);
		//alert('您的位置：'+r.point.lng+','+r.point.lat);
		geoLon = r.point.lng;
		geoLat = r.point.lat;
		var myGeo = new BMap.Geocoder();      
			// 根据坐标得到地址描述    
			
		myGeo.getLocation(new BMap.Point(geoLon, geoLat), function(r){   
			console.log(r)
		    if (r){      
		    //alert(r.address); 
		    //for(var a in r.addressComponents){
		   // 	alert(a);
		    //}
		    	var geoProvince = r.addressComponents.province;
				var geoCity = r.addressComponents.city;
				//geoAddress=r.address;
				//$('.address').text(r.address);
				$('#allmap').css('display',"none");
				//var infoWindow = new BMap.InfoWindow(sContent);
				//map.openInfoWindow(infoWindow, point);
				 var datt ={
				"pageNum":1,
				"pageSize":5,
				"lon":geoLon,
				"lat":geoLat,
				"geoProvince":geoProvince,
				"geoCity":geoCity
			}
			$.ajax({
				url: globa + '/v1.0/optometrist/getOptometrist',
				type: 'post',
				dataType: 'json',	
				data:datt,
				success: function(data) {
					console.log(data)
					var res = data.data.list;
					hasNextPage = data.data.hasNextPage;
					console.log(res);
					var str = '';
					var aaa="";
					var state = '';	
					Sun.hasMore = res.length;					
					for(var i = 0; i < res.length; i++) {
						var online='0';
						if(res[i].status == 1){
							aaa="http://wx.bjysjglasses.com/static/wxshop/images/star.png";	
						}else if(res[i].status == 2){
							aaa="http://wx.bjysjglasses.com/static/wxshop/images/two.png";
						}else if(res[i].status == 3){
							aaa="http://wx.bjysjglasses.com/static/wxshop/images/three.png";
						}else if(res[i].status == 4){
							aaa="http://wx.bjysjglasses.com/static/wxshop/images/four.png";
						}else if(res[i].status == 5){
							aaa="http://wx.bjysjglasses.com/static/wxshop/images/wu.png";
						}
						if(res[i].job == 0){
							state ="验光师"
						}
						if(res[i].online == 1){
							online='在线';
						}else{
							online='不在线';
						}
						str += '<li>' +
							'<input class="ipt1" num="'+i+'" id="' + res[i].id + '" type="hidden" />' +
							'<input class="ipt2" id1="'+ res[i].id +'" type="hidden" />' +
							'<input class="ipt3" id2="'+ res[i].status +'" type="hidden" />' +
							'<img src="http://wx.bjysjglasses.com/static/wxshop/images/touxiang.png" class="user" />' +
							'<span class="opbox">' +
							'<span class="namebox">' +
							'<p class="name">' + res[i].optistname + '</p>' +
							'<a href="javascript:;">平台已认证</a>' +
							'<button class="news" newsid="'+res[i].id+'">联系</button>'+
							'</span>' +
							'<span class="namebox">' +
							'<p class="title">星级评价：</p>' +
							'<span class="star">' +
							'<img src="'+aaa+'"  num="'+res[i].createby+'"/>'+							
							'</span>' +
							'</span>' +
							'<p class="evaluate">' + res[i].createby + '</p>' +//
							'<span class="renz">' +
							'<p>'+res[i].address+'</p>' +
							'<p>'+online+'</p>' +
							'</span>' +
							'</span>' +
							'</li>';
							$('#div1').find('#popular').eq(i).css('display', 'block');
					}
					if(Sun.isRefresh) {
						$('#popular').html(str);
					} else {
						$('#popular').append(str);
					}
					//联系
					$('.news').on('click',function(){					
						var newsId = $(this).attr('newsid');
						console.log(newsId);						
						//window.location.href = "http://wx.bjysjglasses.com:8098/ysjim/im/cuslogin?id="+newsId+"";						
						//  \"    这里面写东西  \"
						var iframes = '';
						iframes = "<div class='iframe' style='width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:99;'>"
								+ "<span class='close'>" 						
								+ 		'关闭'
								+ "</span>" 
								+ "<iframe id=\"imframe\" src=\"http://wx.bjysjglasses.com:8098/ysjim/im/cuslogin?id="+newsId+"&mallLoginUser="+getCookie("mallLoginUser")+"\"  style=\"position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;display:block;overflow-y:scroll;-webkit-overflow-scroll:touch\"}></iframe>" 
								+ "</div>"
						$("body").append(iframes);
						$(".close").click(function(){
							$(".iframe").hide(500)
						});								
					})
					//跳转列表详情
					$('.user').on('click',function(){
						var infoId = $(this).parent().find('.ipt1').attr('id');
						console.log(infoId);
						var score = $(this).parent().find('.ipt3').attr('id2')
						console.log(score);
						window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/optometrist_info.html?id="+infoId+"&age="+score;
					})					
					Sun.myscroll.refresh();
				},
				error: function() {
					console.log("出错了");
				}
			});
		    }      
		});
		
		
	}
	else {
		alert('failed'+this.getStatus());
	}        
});

	var Sun = {
		init: function() {
			this.openId = jQuery.cookie('openid');
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.hasNextPage = "";
			this.selectop = {
				"pageNum":1,
				"pageSize":5,
				"lon":geoLon,
				"lat":geoLat
			};
			setTimeout(Sun.getList,800)
		},

		/* 获取数据 */
		getList: function() {
			
			
		},
		scroll: function() {
			Sun.myscroll = new iScroll("wrapper", {
				onScrollMove: function() {
					if(this.y < this.maxScrollY) {
						$("#wrapper .pull-loading").html("");
						$("#wrapper .pull-loading").addClass("loading");
					} else {
						$("#wrapper .pull-loading").html("");
						$("#wrapper .pull-loading").removeClass("loading");
					}
				},
				onScrollEnd: function() {
					if($("#wrapper .pull-loading").hasClass('loading')) {
						$("#wrapper .pull-loading").html("");
						Sun.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			if(!hasNextPage) {
				$(".scroller .pull-loading").html("没有了哦");
				return;
			}
			this.isRefresh = false;
			Sun.selectop.pageNum++;			
			this.getList();
		}
	}
	//
//	if(supportsGeoLocation()) {
//		getLocation();
//	} else {
//		alert("不支持 GeoLocation.");
//	}
	Sun.init();
	
})