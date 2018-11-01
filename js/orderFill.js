$(function() {
	var num = sessionStorage.getItem("num");
	var prodId = sessionStorage.getItem("prodId");
	var specId = sessionStorage.getItem("specId");
	var price = sessionStorage.getItem("price");
	var color = sessionStorage.getItem("color");
	var prodName = sessionStorage.getItem("prodName");
	var specImgUrl = sessionStorage.getItem("specImgUrl");
	var prodImgUrl = sessionStorage.getItem("prodImgUrl");
	var caror = sessionStorage.getItem("carorder");
	var goodsor = sessionStorage.getItem("goodsorder");
	var goodsorder = JSON.parse(goodsor);
	var carorder = JSON.parse(caror);
	var account = getCookie("account");
	var openId = getCookie("openid");
	//订单获取验单ID及其他
	var Optometryid = sessionStorage.getItem("ordId");
	var Optometryname = sessionStorage.getItem("ordname");
	var Optometrytime = sessionStorage.getItem("ordtime");
	var catalogid = sessionStorage.getItem("catalogid");
	var bespeakResultId =''
	//End
	var acc = sessionStorage.getItem("account");
	var openi = sessionStorage.getItem("openid");
	var sum = price*num
	var sumpr = sum.toString()
	var Order = {
		init: function() {
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.orderNum = '';
			this.params = {
				"userId": "",
				"userName": "",
				"totalMoney": "",
				"reveiverProvince": "",
				"reveiverCity": "",
				"reveiverTown": "",
				"reveiverAddress": "",
				"reveiverPhone": "",
				"goodsNum": "",
				"addres":'',
				"shopname":prodName,
				"addressId":'',
				"orderfile":'',
				"payname":''
			};
			this.goodsShow();
			this.submitOrder();
			this.addressInfor()
			this.choose();
			this.addressjump();
		},
		choose: function(){
			if(catalogid ==2){
				$('.Optometry').show()
			}else{
				$('.Optometry').hide()
			}
			console.log(Optometryid)
			if(Optometryid==null){
				console.log('没数据')
				$('.Optometryshow').hide()
			}else{
				console.log('有数据')
				$('#show').hide()
				var str = '<div class="Optometryshow" Optometryid=\'' + Optometryid + '\' style="height: 1.35rem;position: relative;">' +                              
							'<p>姓名：' + Optometryname + '</p>' +
							'<br />'+
							'<br />'+
							'<p>时间：' + Optometrytime + '</p>' +
							'<span class="jumpop" style="font-size: .12rem;padding-top: .05rem;bottom: .05rem;right:.5rem;position:absolute;background: red;background: #ccc;width: 1rem;height:.35rem;line-height: .35rem;text-align: center;">更换数据</span>'+
							'</div>' 
							
				$('.Optometry li').prepend(str);
				var a = $('.Optometryshow').attr('optometryid')
				bespeakResultId = a
		}
			$('.Optometry span').click(function(){	
				console.log('123')
				sessionStorage.setItem("Optometry", "1"); 
				window.location.href = 'http://wx.bjysjglasses.com/static/wxshop//html/Optometry_management.html?'+openi;
			})
			$('.Optometry li').click(function(){
				var typp = $('#show').css('display') === 'none'
				console.log(typeof(typp))
				if(typp == false){
					console.log('跳转找数据')
					sessionStorage.setItem("Optometry", "1"); 
					window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/Optometry_management.html?'+openi;
				}
			})
		},		
		//顶部地址跳转
		addressjump: function(){
			$('#noConsignee').click(function(){
				window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/Management_address.html?'+acc;
			})
			$('#consignee_infor').click(function(){
				window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/Management_address.html?'+acc;
			})
		},
		addressInfor: function() {
			$.ajax({
				url: globa + "/v1.0/address/getAddress",
				type: 'post',
				dataType: 'json',
				data: {
					"account": acc
				},
				//				contentType: 'application/json;charset=UTF-8',
				//				data: JSON.stringify({
				//					"addressUserId": 1
				//				}),
				success: function(data) {
					var res = data.data[0]
					var ree = data.data.length;
//					
					var state = data.code;
					
					
					if(ree >= 1){
						$('#noConsignee').hide();
						Order.addressId = res.id
						Order.params.addres = res.id					
						Order.params.userName = res.addressUserName;
						Order.params.reveiverProvince = res.addressProvince;
						Order.params.reveiverCity = res.addressCity;
						Order.params.reveiverTown = res.addressCounty;
						Order.params.reveiverAddress = res.addressDetail;
						Order.params.reveiverPhone = res.addressPhone;
						var str = '<li class="name">' +
							'<p>收货人：' + res.name + '</p>' +
							'<p>' + res.mobile + '</p>' +
							'<p class="default">默认</p>' +
							'</li>' +
							'<a>' +
							'<li class="address">' +
							'<p>收货地址：' + res.province + '' + res.city + '' + res.area + '' + res.address + '</p>' +
							'<img src="http://wx.bjysjglasses.com/static/wxshop//images/jiantou_you.png">' +
							'</li>' +
							'</a>'
						$('#consignee_infor').html(str);
					} else {
						$('#consignee_infor').hide();
						$('#noConsignee').show();
					}
					
				}
			});
		},
		goodsShow: function() {
			console.log(carorder)
				var str = '';
				var typp = ''
				if(goodsorder == null){
					Order.orderfile = carorder;
					console.log(111)
					for(var i=0; i<carorder.length;i++){
					console.log(carorder[i])
					if(carorder[i].refraction == ''){
						str += '<li>' +
						'<div class="goodsImg">' +
						'<img src="' + carorder[i].specImgUrl + '">' +
						'</div>' +
						'<div class="infor">' +
						'<p class="name">' + carorder[i].prodName + '</p>' +
						'<p class="color">' + carorder[i].specColor + '</p>' +
						'<p class="price">￥' + carorder[i].prodPrice + '</p>' +
						'<p class="num">x' + carorder[i].number + '</p>' +
						'</div>' +
						'</li>'
					}else{
						str += '<li>' +
						'<div class="goodsImg">' +
						'<img src="' + carorder[i].specImgUrl + '">' +
						'</div>' +
						'<div class="infor">' +
						'<p class="name">' + carorder[i].prodName + '</p>' +
						'<p class="color">' + carorder[i].refraction + '</p>' +
						'<p class="price">￥' + carorder[i].prodPrice + '</p>' +
						'<p class="num">x' + carorder[i].number + '</p>' +
						'</div>' +
						'</li>'
					}
					
					}
					$('#goods_infor').append(str);	
				}else if(carorder == null){
					Order.orderfile = goodsorder;
					for(var i=0; i<goodsorder.length;i++){
						if(goodsorder[i].refraction == ''){
								console.log('颜色')
								str += '<li>' +
									'<div class="goodsImg">' +
									'<img src="' + goodsorder[i].specImgUrl + '">' +
									'</div>' +
									'<div class="infor">' +
									'<p class="name">' + goodsorder[i].prodName + '</p>' +
									'<p class="color">颜色:' + goodsorder[i].specColor + '</p>' +
									'<p class="price">￥' + goodsorder[i].prodPrice + '</p>' +
									'<p class="num">x' + goodsorder[i].number + '</p>' +
									'</div>' +
									'</li>'
						} else if (goodsorder[i].specColor == ''){
								console.log('折射')
								str += '<li>' +
									'<div class="goodsImg">' +
									'<img src="' + goodsorder[i].specImgUrl + '">' +
									'</div>' +
									'<div class="infor">' +
									'<p class="name">' + goodsorder[i].prodName + '</p>' +
									'<p class="color">折射率:' + goodsorder[i].refraction + '</p>' +
									'<p class="price">￥' + goodsorder[i].prodPrice + '</p>' +
									'<p class="num">x' + goodsorder[i].number + '</p>' +
									'</div>' +
									'</li>'
							}

//						console.log(goodsorder[i].refraction)
					
					}
					$('#goods_infor').append(str);	
				}
		},
		submitOrder: function() {
			
			$('#balance .right').click(function(event) {
				setCookie("account", acc, 24 * 60 * 60);			
				var arr = [{
					"prodId": prodId,
					"specId": specId,
					"number": num,
					"prodName": prodName,
					"prodImgUrl": prodImgUrl,
					"prodPrice": price,
					"specColor": color,
					"refraction": "",
					"specImgUrl": specImgUrl,
					"sumPrice": sumpr
				}]

				$.ajax({
					url: globa + '/v1.0/order/createOrder',
					type: 'post',
					dataType: 'json',
					data: {
						"prodJson": JSON.stringify(Order.orderfile),
						"account": acc,
						"addrId": Order.addressId,
					},
					success: function(data) {
						var res = data.msg;
						Order.orderNum = res;
						var getNum = location.search;
						var goodsNum = getNum.substring(1);
						var str1 = goodsNum.split('&');
						var allMoney = str1[1];
						var totalMoneys = parseInt(allMoney + '00');
						var orderno = data.data
						$.ajax({
							type: "post",
							url: global + "/v1.0/WXPayController/H5Pay",
							dataType: "json",
							async: 'true',
							data: {
								"vo_body": "商品订单-"+orderno,
								"vo_openid":openi,
//								"vo_openid":'o1K4o00ElLQB3r7DWZ8fF22lrhkU',
								"vo_out_trade_no": orderno,

							},
							success: function(data) {
								var res = data.data;
								setCookie("account", acc, 24 * 60 * 60);	
								onBridgeReady(res);
							}

						});
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
							window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/Mall_orders.html?'+acc+'&'+openi;
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

			});
		}
	}
	Order.init();
})