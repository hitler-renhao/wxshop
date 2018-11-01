function delCookie(name) {
				  var exp = new Date();
				  exp.setTime(exp.getTime()- 1);
				  var cval = getCookie(name);
				  if (cval != null)
				    console.log(document.cookie)
				    console.log(name+"=" + escape(cval) + ";expires=" + exp.toGMTString())
				    　　// document.cookie ="token=" + escape(cval) + ";expires=" + exp.toGMTString();
				  　　document.cookie = name + "=" + escape(cval) + ";expires=" + exp.toGMTString()+";path= /";
				  console.log(document.cookie)
				}
$(function(){
	var kk = location.search.substring(1).split('&');
	var goodsnum = kk[0];
	var allprice = kk[1];
	console.log(goodsnum)
//	var img = localStorage.getItem('img'); 
//	var goodsName = localStorage.getItem('goodsName'); 
//	var goodsNum = localStorage.getItem('goodsNum');
//	var goodsPrice = localStorage.getItem('goodsPrice');
//	var num = localStorage.getItem('num');
	
	var cookieString = getCookie('cartInfoCookie');
	var arr =[];
	if(cookieString!=''){
		arr = JSON.parse(cookieString);
	}
	console.log(arr)
	var str = ''
	for(var i=0;i<arr.length;i++){
		$('#goods_infor li').remove();
		str = '<li>'
		+		'<div class="goodsImg">'
		+			'<img src="'+ arr[i].goodsImg +'">'
		+		'</div>'
		+		'<div class="infor">'
		+			'<p class="name">'+ arr[i].goodsName +'</p>'
		//+			'<p class="color">'+ refVal +'</p>'
		+			'<p class="price">￥'+ arr[i].goodsPrice +'</p>'
		+			'<p class="num">x'+ arr[i].num +'</p>'
		+		'</div>'
		+	'</li>'
	}
	$('#goods_infor').html(str);
	
		
	var Order = {
		init: function(){
			//this.openId = getCookie('OPENIDCOOKIENAME');
			this.openId =getCookie('openid');
			this.orderNum = '';
			this.dataId = '';
			this.params = {
				"userId": "",
				"userName": "",
				"totalMoney": "",
				"reveiverProvince": "",
				"reveiverCity": "",
				"reveiverTown": "",
				"reveiverAddress": "",
				"reveiverPhone": "",
				"goodsNum": ""
			};
			
			//this.getUserId();
			//this.user();
			this.addressInfor();
			this.goodsShow();
			this.submitOrder();			
		},
//		getUserId: function(){
//			$.ajax({
//				url: globa+'/v1.0/user/queryUserByOpenid',
//				type: 'post',
//				dataType: 'json',
//				data: {
//					"openid" : Order.openId	
//				},
//				success: function(data){
//					var res = data.data;
//					Order.params.userId =  res.userId;
//					Order.addressInfor();
//				}
//			});
//		},
		user:function(){
			$.ajax({
				type: "post",
	            url: globa+"/v1.0/appointment_optometrist/tBespeak/queryUserIdByUserOpenId",
	            dataType: "json",
	            data:{
	            	"userOpenId":Order.openId
	            },
				successs:function(data){
					
					Order.dataId = data.data;
					tbs_userId = Order.dataId;
					setCookie("userId",dataId,24*60*60);
				}
			});
		},
		addressInfor: function(){
			var account=getCookie('account');
			$.ajax({
				url: globa+'/v1.0/address/getAddress',
				type: 'post',
				dataType: 'json',
				data: {
					"account": account
				},
				success: function(data){
					console.log(data);
					var res = data.data[0];
					var state = data.code;
					if(state == 200){
						$('#noConsignee').hide();
						var str = '<li class="name">'
							+		'<p>收货人：'+ res.name +'</p>'
							+		'<p>'+ res.mobile +'</p>'
							+		'<p class="default">默认</p>'
							+	'</li>'
							+	'<a href="../html/Management_address.html">'
							+		'<li class="address">'
							+			'<p>收货地址：'+res.province+''+ res.city +''+ res.area +''+ res.address +'</p>'
							+			'<img src="../images/jiantou_you.png">'
							+		'</li>'
							+	'</a>'
						$('#consignee_infor').html(str);
					}else {
						$('#consignee_infor').hide();
						$('#noConsignee').show();
					}
					Order.params.userName = res.name;
					Order.params.reveiverProvince = res.province;
					Order.params.reveiverCity = res.city;
					Order.params.reveiverTown = res.area;
					Order.params.reveiverAddress = res.address;
					Order.params.reveiverPhone = res.mobile;
				}
			});
		},
		goodsShow: function(){
			var getNum = location.search;
			var goodsNum = getNum.substring(1);
			var str1 = goodsNum.split('&');
			var allMoney = str1[1];//总价
			var str2 = str1[0];//商品id
			var strMoney = '<p class="price">￥'+allMoney+' </p>'
			$('#total .goods_total').append(strMoney);
			var strMoney2 = '<p>合计 :<i>￥'+ allMoney +'</i></p>'
			$('#balance .center').append(strMoney2);
			Order.params.goodsNum = str2;
			Order.params.totalMoney = allMoney;
			$.ajax({
				url: globa+'/v1.0/cart/queryCartByGoodsNum',
				type: 'post',
				dataType: 'json',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					"goodsNum": str2
				}),
				success: function(data){
					var res = data.data;
					var str = '';
					for(var key in res){
						/*var allMoney = Number(res[key].goodsPrice)*Number(res[key].num);
						var strMoney = '<p class="price">￥'+allMoney+' </p>'
						$('#total .goods_total').append(strMoney);
						var strMoney2 = '<p>合计 :<i>￥'+ allMoney +'</i></p>'
						$('#balance .center').append(strMoney2);*/
						var refVal = '';
						if(res[key].typeId == 3){
							refVal = '折射率:' + res[key].goodsRefractivity;
						//} else if (res[key].typeId == 1 || res[key].typeId == 2){
						}else{
							refVal = '颜色:' + res[key].goodsColor;
						}
						str += '<li>'
							+		'<div class="goodsImg">'
							+			'<img src="'+ res[key].goodsImg +'">'
							+		'</div>'
							+		'<div class="infor">'
							+			'<p class="name">'+ res[key].goodsName +'</p>'
							+			'<p class="color">'+ refVal +'</p>'
							+			'<p class="price">￥'+ res[key].goodsPrice +'</p>'
							+			'<p class="num">x'+ res[key].num +'</p>'
							+		'</div>'
							+	'</li>'
					}
					$('#goods_infor').append(str);
				}
			});
		},
		
		//秒杀下单
		submitOrder: function(){
			var stageId=getCookie('stageId'+Order.openId);
			var productId=getCookie('productId'+Order.openId);
			var paySpecId=getCookie('paySpecId'+Order.openId);
			var payNum=getCookie('number'+Order.openId);
			var productNo=getCookie('productNo'+Order.openId);
			var payMoney=getCookie('money'+Order.openId);
			$('#balance .right').click(function(event) {				
				var name = Order.params.userName;
				var city = Order.params.reveiverCity;
				var address = Order.params.reveiverAddress;
				var Province = Order.params.reveiverProvince;
				var City = Order.params.reveiverCity;
				var town = Order.params.reveiverTown;
				console.log(Province);
				console.log(City);
				console.log(town);
				var phone = Order.params.reveiverPhone;
				var userIdTbs = getCookie('userId');
				$.ajax({
					url:globa + '/v1.0/secKill/secKillGoods',
					type: 'post',
					dataType: 'json',
					data: {
						"secKillStageId": stageId,
						"productId": productId,
						"specId":paySpecId,
						"userOpenId":Order.openId,
						"number": payNum
					},
					success: function() {
						//window.location.href = '../html/seckill_order.html?' + goodsNum + '&' + money;
						$.ajax({
							type:"post",
							url:globa + '/v1.0/secKill/saveOrderBySecKillGoods',
							async:true,
							dataType:"json",
							data:{
								"secKillStageId": stageId,
								"productId": productId,
								"specId":paySpecId,
								"userOpenId":Order.openId,
								"number": payNum
							},
							success:function(data){
								console.log(data)
								var res = data.data;
								Order.orderNum = res.orderNo;
								var getNum = location.search;
								var goodsNum = getNum.substring(1);
								var str1 = goodsNum.split('&');
								var allMoney = str1[1];
								var totalMoneys = parseInt(payMoney+'00');
		
								$.ajax({
									type: "post",
									url: globa+"/v1.0/WXPayController/H5Pay",
									dataType: "json",
									async: 'true',
									data: {
										"vo_body": "商品订单-"+Order.orderNum,
										"vo_openid": Order.openId,
										"vo_out_trade_no": Order.orderNum
										//"vo_total_fee": totalMoneys
									},
									success: function(data) {
										var res = data.data;
										onBridgeReady(res);
									},
									error:function(){
										alert('出错啦')
									}
								});
								$.ajax({
									url: globa+'/v1.0/cart/deleteCartGoods',
									type: 'post',
									dataType: 'json',
									async: 'true',
									contentType: 'application/json;charset=UTF-8',
									data: JSON.stringify({
										"goodsNum" : productNo
									}),
									success:function(){
										delCookie('stageId'+openid);
										delCookie('number'+openid);
										delCookie('paySpecId'+openid);
										delCookie('money'+openid);
										delCookie('productNo'+openid);
										delCookie('productId'+openid);
									}
								});
							}
						});
					},
					error: function() {
						alert('数据有误,加入失败!');
							$('#ref').hide();
					}
				});
				
				function onBridgeReady(res) {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId": res.appId,
								"timeStamp": res.timeStamp,
								"nonceStr": res.nonceStr,
								"package": res.package,
								"signType": "MD5",
								"paySign": res.paySign
							},
							function(res) {
								if(res.err_msg == "get_brand_wcpay_request:ok") {
									alert('支付成功!')
								} else if(res.err_msg == "total_fee") {
									alert('支付会话标识prepay_id已失效!')
								}
							}
						);
					}
					if(typeof WeixinJSBridge == "undefined") {
						if(document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						} else if(document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						}
					} else {
						onBridgeReady();
					}
//				function onBridgeReady(res){ 
//					WeixinJSBridge.invoke( 
//						'getBrandWCPayRequest', { 
//							"appId" : res.appId, 
//							"timeStamp" : res.timeStamp, 
//							"nonceStr" : res.nonceStr,
//							"package" : res.package, 
//							"signType" : "MD5", 
//							"paySign" : res.paySign 
//						}, 
//						function(res){ 
//							if(res.err_msg == "get_brand_wcpay_request:ok" ){
//								alert('支付成功!');
//								window.location.href = '../html/Mall_orders.html';
//							} else if(res.err_msg == "total_fee"){
//								alert('支付会话标识prepay_id已失效!');
//								window.location.href = '../html/orderDetails_waitPay.html?' + goodsNum + '&' + money+ '&' + name+ '&' + Province+ '&' + City+ '&' + town+ '&' + phone;//提交订单未付款
//							}
//							
//						}
//					); 
//				}
//				
//				
//				if (typeof WeixinJSBridge == "undefined"){ 
//					if( document.addEventListener ){ 
//						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false); 
//					} else if (document.attachEvent){ 
//						document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
//						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); 
//					} 
//				} else { 
//					onBridgeReady(); 
//				}

				
			});
		}
	}
	Order.init();
})