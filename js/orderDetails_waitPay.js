$(function() {
	var account = getCookie("account");
	var openid = getCookie('openid');
	var ordersta = location.search.substring(1).split('&')[1].split('=')[1];
	console.log(ordersta);
	var finish = {
		init: function() {			
			this.orderId = location.search.substring(1).split('&')[0].split('=')[1];
			//console.log(this.orderId)
			this.orderStatus = "";
			this.btn1 = '';
			this.btn2 = '';
			this.style = '';
			this.style2 = '';
			this.orderStatusText = '';
			//this.orderId = "";
			this.orderFinish();
			//this.syTime();
			//this.cancelOrder();
			//this.getUserId();			
		},
		getUserId: function() {
			$.ajax({
				url: global + '/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid": finish.openId					
				},
				success: function(data) {
					var res = data.data;
					order.userId = res.userId;
				}
			});
		},
		orderFinish: function() {
			var that = this;
			$.ajax({
				type: "post",
				url: glo + '/v1.0/order/getOrderDetails',
				dataType: "json",				
				async: false,
				data: {
					
					"orderId":finish.orderId,
					
				},
				success: function(data) {
					console.log(data);
					var res = data.data;
					console.log(res);
					var state = '';
					var str = '';
					var html = '';
					var price = '';
					var goodsInfo = '';
					var com = '';
					var price = '';
					var html = '';
					var yingfu = '';
					//订单状态作判断
					var state_del = $('.fl p').text();
					var state_icon = $('f1 img').attr('src');
					//var orderinfo = data.data.order;
					//地址
					var result = res.orderShip;						
					str = '<img src="http://wx.bjysjglasses.com/static/wxshop/images/order02.png">' +
						'<div class="name">' +
						'<p>' + result.shipname + '</p>' +
						'<p>' + result.phone + '</p>' +
						'</div>' +
						'<p class="address">' + result.province + result.city + result.area + result.shipaddress + '</p>'
					$('#infor').html(str);
					var stateInfo = res.order;
					if(stateInfo.status == 'init') {
							state_del = "等待付款";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order01.png';
							finish.style = '';
							finish.btn1 = '立即付款';
							finish.btn2 = '取消订单';
						} else if(stateInfo.status == "send") {
							state_del = "等待收货";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order03.png';
							finish.style = '';
							finish.btn1 = '确认收货';
							finish.btn2 = '查看物流';
						} else if(stateInfo.status == "finish") {
							state_del = "已成功";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order06.png';
							finish.style = '';
							finish.btn1 = '重新购买';
							finish.btn2 = '删除订单';
						} else if(stateInfo.status == "cancel") {
							state_del = "已取消";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order05.png';
							finish.style = '';
							finish.btn1 = '重新购买';
							finish.btn2 = '删除订单';
						} else if(stateInfo.status == "pass") {
							state_del = "等待发货";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order03.png';							
							finish.style = 'border:none';								
							finish.btn1 = '';								
							finish.style2 = 'margin-right:-1.24rem';	
							finish.btn2 = '取消订单';
						}
						state = '<div class="fl">' +
							'<img src="'+state_icon+'">' +
							'<p>'+state_del+'</p>' +
							'</div>'
					//商品列表
					var shopInfo = res.orderProduct;
					for(var j = 0;j<shopInfo.length;j++){
						if(shopInfo[j].refraction == null || shopInfo[j].refraction ==""){
							goodsInfo += '<li>' +
								'<div class="goodsImg">' +
								'<img src="' + shopInfo[j].prodImgUrl + '">' +
								'</div>' +
								'<div class="infor">' +
								'<p class="name">' + shopInfo[j].prodName + '</p>' +
								'<p class="color">颜色：'+shopInfo[j].specColor+'</p>' +
								'<p class="price">￥' + shopInfo[j].prodPrice + '</p>' +
								'<p class="num">x' + shopInfo[j].number + '</p>' +
								'</div>' +
								'</li>'
						}else{
							goodsInfo += '<li>' +
								'<div class="goodsImg">' +
								'<img src="' + shopInfo[j].prodImgUrl + '">' +
								'</div>' +
								'<div class="infor">' +
								'<p class="name">' + shopInfo[j].prodName + '</p>' +
								'<p class="color">折射率：'+shopInfo[j].refraction+'</p>' +
								'<p class="price">￥' + shopInfo[j].prodPrice + '</p>' +
								'<p class="num">x' + shopInfo[j].number + '</p>' +
								'</div>' +
								'</li>'
						}
					}
					//商品信息
					var orderTime = res.order.createdate.split('T');
					//console.log(orderTime);
					var ordermin = orderTime[1].split('.000+0000');
					price = '<p>商品合计：' + res.order.amount + '</p>' + '<p>运费：0</p>'
					
					html = '<p>订单编号：<b>' + res.order.orderno + '</b></p>' +
						'<p>提交时间：' + orderTime[0] + '&nbsp&nbsp' + ordermin[0] + '</p>' +
						'<p>支付方式：在线支付</p>'+
						'<p>实付金额：¥' + res.order.amount + '</p>'+
						'<p>付款时间：' + orderTime[0] + '&nbsp&nbsp' + ordermin[0] + '</p>'
						
					var btnStr = '';
					btnStr = '<p style="' + finish.style + '" class="pay">' + finish.btn1 + '</p>'+
							'<p style="' + finish.style2 + '" class="cancel">' + finish.btn2 + '</p>'
						
					for(var i = 0;i<res.length;i++){
						//判断状态
						if(res[i].status == 'init') {
							state_del = "等待付款";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order01.png';
							finish.style = '';
							finish.btn1 = '立即付款';
							finish.btn2 = '取消订单';
						} else if(res[i].status == "send") {
							state_del = "等待收货";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order03.png';
							finish.style = '';
							finish.btn1 = '确认收货';
							finish.btn2 = '查看物流';
						} else if(res[i].status == "finish") {
							state_del = "已成功";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order06.png';
							finish.style = '';
							finish.btn1 = '重新购买';
							finish.btn2 = '删除订单';
						} else if(res[i].status == "cancel") {
							state_del = "已取消";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order05.png';
							finish.style = '';
							finish.btn1 = '重新购买';
							finish.btn2 = '删除订单';
						} else if(res[i].status == "pass") {
							state_del = "等待发货";
							state_icon = 'http://wx.bjysjglasses.com/static/wxshop/images/order03.png';							
							finish.style = 'border:none';								
							finish.btn1 = '';								
							finish.style2 = 'margin-right:-1.24rem';	
							finish.btn2 = '取消订单';
						}
						state = '<div class="fl">' +
							'<img src="'+state_icon+'">' +
							'<p>'+state_del+'</p>' +
							'</div>'
						$('#count_down').html(state);
						
						
					}
					$('#price').html(btnStr);
					$('#count_down').html(state);
					$('#infor').html(str);
					$('#goods_infor').append(goodsInfo);
					$('.total').html(price);
					$('.orderNum').html(html);	
					that.cancelOrder();
					that.deleteOrder();
					that.confirm();
					that.checkLogistics();
					that.buyAgain();
					that.payNow();
				}
				
			})
		},
		/* 取消订单 */
		cancelOrder: function() {
			$('.cancel').on('click',function(){
			//$('.cancel_order').click(function() {
				var that = this;
				if($(this).html() == '取消订单') {
					$('.tk').show();
					$('.z_cancel').click(function() {
						$('.tk').hide();
					})
					$('.confirm').click(function() {
						$('.tk').hide();
						//var orderId = $(that).parents('.payment').attr('id');
						//console.log(orderId);
//						var orderNum = $(that).parents('.cancel').siblings('.payment_top').find('.num a').html();
//						console.log(orderNum);
						$.ajax({
							url: glo + '/v1.0/order/cancelOrder',
							type: 'POST',
							dataType: 'json',
							data: {
								"orderId": finish.orderId
							},
							success: function() {
								//$(that).parents('.payment').remove();
								window.location.reload();
								
								
							}
						});
					});
				}		
			});
			return;
		},
		/* 删除订单 */
		deleteOrder: function() {
			$('.cancel').on('click',function(){
				var that = this;
				if($(this).html() == '删除订单') {
					$('.bigbox').show();
					$('.word a:first-child').click(function() {
						$('.bigbox').hide();
					})
					$('.word a:last-child').click(function() {
						$('.bigbox').hide();
						var orderId = $(that).parents('.payment').attr('id');
						//var orderNum = $(that).parents('.cancel').siblings('.payment_top').find('.num a').html();
						$.ajax({
							url: glo + '/v1.0/order/delOrder',
							type: 'POST',
							dataType: 'json',
							data: {
								"orderId": finish.orderId
							},
							success: function() {
								//window.location.reload()
								window.location.href="http://wx.bjysjglasses.com/static/wxshop/html/Mall_orders.html";
							}
						});
					});
				}
			});
		},
		/* 确认收货 */
		confirm: function() {
			$('.pay').click(function() {							
				var that = this;
				if($(this).html() == '确认收货') {
					$('.bigbox').show();
					$('.word a:first-child').click(function() {
						$('.bigbox').hide();
					})
					$('.bigbox p').html("是否确认收货?");
					$('.word a:last-child').html("确定");
					$('.word a:last-child').click(function() {
						$('.bigbox').hide();
						var orderNum = $(that).parents('.cancel').siblings('.payment_top').find('.num a').html();
						//console.log(orderNum);
						$.ajax({
							url: glob + "/v1.0/order/confirmTakeGoods",
							type: "get",
							dataType: "json",
							data: {
								"orderNo": finish.orderId
							},
							success: function() {
								window.location.reload()
								$(".take").show();
								setTimeout(function() {
									$(".take").hide();
								}, 1000);								
							}
						});
					});
				}
				
			});
		},
		/* 查看物流 */
		checkLogistics: function() {
			$('.cancel').click(function() {
				if($(this).html() == '查看物流') {
//					var orderNum = $(this).parents('.cancel').siblings('.payment_top').find('.num a').html();
//					console.log(orderNum);
					var orderNum = finish.orderId;
					window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/order_tracking.html?" + orderNum;
				}
			});
		},
		/* 重新购买 */
		buyAgain: function() {
			$('.pay').click(function() {
				if($(this).html() == '重新购买') {
					window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/shop.html";
				}
			});
		},
		/* 立即付款 */
		payNow: function() {
			$('.pay').click(function() {
				if($(this).html() == '立即付款') {
					var orderNum = $(this).parents('#price').siblings('#order_infor').find('.orderNum p:first-child b').html();
					//console.log(orderNum);
					var goodName = $(this).parents('#price').siblings('#goods_infor').find('.name').html();
					//console.log(goodName);
//					var totalMoney = $(this).parent('.go').siblings('.all_price').find('number').html();
//					console.log(totalMoneys);
//					var totalMoneys = parseInt(totalMoney + '00');
					$.ajax({
						type: "post",
						url: glob + "/v1.0/WXPayController/H5Pay",
						dataType: "json",
						async: 'true',
						data: {
							"vo_body": "商品订单-"+orderNum,//名称
							"vo_openid":openid,
							"vo_out_trade_no": orderNum,//订单号
							"vo_total_fee": 0
						},
						success: function(data) {
							var res = data.data;
							onBridgeReady(res);
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
									//window.location.href="Mall_orders.html"
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
				}
			});
		}
		//订单取消状态		
		/*concelOrder: function() {
			var arr = window.location.href;
			var Num = arr.split("?")[1]; //.split('=')[1]
			//console.log(Num)
			

			if(Num == goodsnum) {
				var date = new Date();
				var month = toDub(date.getMonth() + 1); //月
				var day = toDub(date.getDate()); //日
				var hour = toDub(date.getHours()); //时
				var minute = toDub(date.getMinutes()); //分
				var second = toDub(date.getSeconds()); //秒 
				//当前时间
				var curTime = date.getFullYear() + "-" + month + "-" + day +
					" " + hour + ":" + minute + ":" + second;
				var endDate = new Date(curTime);
				var end = endDate.getTime();

				localStorage.user_phone = end + 900000;
				var last = localStorage.user_phone;

				var timer = null;

				function countTime() {

					var date = new Date();
					var month = toDub(date.getMonth() + 1); //月
					var day = toDub(date.getDate()); //日
					var hour = toDub(date.getHours()); //时
					var minute = toDub(date.getMinutes()); //分
					var second = toDub(date.getSeconds()); //秒 
					//当前时间
					var curTime = date.getFullYear() + "-" + month + "-" + day +
						" " + hour + ":" + minute + ":" + second;
					var endDate = new Date(curTime);
					var endfirst = endDate.getTime();
					/*	console.log(last)
						console.log(end)*/
					/*if(endfirst < last) {
						//时间差  
						var leftTime = last - endfirst;
						//console.log(leftTime)
						//定义变量 d,h,m,s保存倒计时的时间  
						var d, h, m, s;
						if(leftTime >= 0) {
							//              d = Math.floor(leftTime/1000/60/60/24);  
							h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
							//console.log(h)
							m = Math.floor(leftTime / 1000 / 60 % 60);
							//console.log(m)
							s = Math.floor(leftTime / 1000 % 60);
							//console.log(s)
						}
						var IHTML = toDub(m) + " : " + toDub(s)
						//将倒计时赋值到div中  
						document.getElementById("sheng").innerHTML = '剩 余'+IHTML+'订单取消';

						//递归每秒调用countTime方法，显示动态时间效果  

						//递归每秒调用countTime方法，显示动态时间效果  
					} else {

					}
					//alert(end)	
					clearInterval(timer)
					timer = setInterval(countTime, 1000);
				}
				clearInterval(timer)
				timer = setInterval(countTime, 1000);
			}
			
			function toDub(n) {
				return n < 10 ? "0" + n : "" + n;
			};
			
			if(document.getElementById("sheng").html == '00:00'){
				$.ajax({
					type: "get",
		            url: global+"http://10.0.232.197:8099/ysj/wxshop/admin/v1.0/order/cancleOrder",
		            dataType: "json",
		            async:true,
		            data:{
		            	"orderNumber":goodsnum
		            },
					successs:function(){
						document.getElementById("sy").innerHTML = '订单已取消';
					}
				});
				
			}
		}*/
		
		/*var kk = location.search.substring(1).split('&');
		var goodsnum = kk[0];
		var allprice = kk[1];
		var userName = kk[2];
		var cookieString = getCookie('cartInfoCookie')	
		var arr = JSON.parse(cookieString);
		console.log(arr)
		var str = ''
		for(var i = 0; i < arr.length; i++) {
		goodsInfo = '<li>' +
			'<div class="goodsImg">' +
			'<img src="' + arr[i].goodsImg + '">' +
			'</div>' +
			'<div class="infor">' +
			'<p class="name">' + arr[i].goodsName + '</p>' +
			'<p class="color">颜色：红色</p>' +
			'<p class="price">￥' + arr[i].goodsPrice + '</p>' +
			'<p class="num">x' + kk + '</p>' +
			'</div>' +
			'</li>'
			price = '<p>商品合计：' + arr[i].goodsPrice*arr[i].num + '</p>' + '<p>运费：0</p>'
						
		}
		str = '<img src="http://wx.bjysjglasses.com/static/wxshop/images/order02.png">' +
			'<div class="name">' +
			'<p>' + userName + '</p>' +
			'<p>' + reveiverPhone + '</p>' +
			'</div>' +
			'<p class="address">' + reveiverProvince + reveiverCity + reveiverTown + reveiverAddress + '</p>'
		$('#infor').append(str);
		$('#goods_infor').append(goodsInfo);
		$('.total').append(price);*/
	}
	finish.init();
})