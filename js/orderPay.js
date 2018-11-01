var reason_list = document.getElementById('reason_list');
var aImg = reason_list.getElementsByTagName('img');
for(var i = 0; i < aImg.length; i++) {
	aImg[i].onclick = function() {
		for(var i = 0; i < aImg.length; i++) {
			aImg[i].src = 'http://wx.bjysjglasses.com/static/wxshop/images/z_select.png';
		}
		this.src = 'http://wx.bjysjglasses.com/static/wxshop/images/z_selected.png';
	}
}
$(function() {
	var account = getCookie("account");
	var openid = getCookie("openid");
	order = {
		init: function() {
			this.isRefresh = true; //是否是刷新还是加载
			this.hasMore = true; //默认有更多数据
			this.hasNextPage = '';
			this.openId = $.cookie('OPENIDCOOKIENAME'); //o1K4o06zzK-V4ItZZ4AIsvLxG5J4
			this.userId = '';
			this.orderStatus = null;
			this.orderStatusText = '';
			this.btn1 = '';
			this.btn2 = '';
			this.style = '';
			this.getUserId();
			this.scroll();
			this.params = {
				"account":account,//_out_153622259303201
				"pageNum":1,
				"pageSize":5,
				"orderStatus":""
			};
			/* 全部订单 */
			$('#allOrder').click(function() {
				order.params.orderStatus = '';
				$('.body_box').empty();
				order.getData();
			});
			/* 0 代付款 */
			$('#waitPay').click(function() {
				order.params.orderStatus = "init";
				$('.body_box').empty();
				order.getData();
			}).click();
			/* 1 代收货 */
			$('#waitColect').click(function() {
				order.params.orderStatus = "send";
				$('.body_box').empty();
				order.getData();
			});
			/* 2 已完成 */
			$('#completed').click(function() {
				order.params.orderStatus = "finish";
				$('.body_box').empty();
				order.getData();
			});
			/* 3 已取消 */
			$('#cancel').click(function() {
				order.params.orderStatus = "cancel";
				$('.body_box').empty();
				order.getData();
			});
		},
		getUserId: function() {
			$.ajax({
				url: global + '/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid": openid			
				},
				success: function(data) {
					var res = data.data;
					order.userId = res.userId;
				}
			});
		},
		getData: function() {
			/* init代付款       pass代发货       send已发货       sign已完成       fail退货中       dismiss已退货         cancel已关闭         finish 交易完成*/
			$.ajax({
				url: glob + '/v1.0/order/getUserOrders',
				type: 'post',
				dataType: 'json',
				data: this.params,
				success: function(data) {
					console.log(data);
					var res = data.data.list;
					console.log(res);
					var strTop = '';
					var strCenter = '';					
					order.hasMore = res.length;
					order.hasNextPage = data.data.hasNextPage;
					if(res.length == 0) {
						$('.order_box').show();
					} else {
						$('.order_box').hide();
						for(var i = 0; i < res.length; i++) {
							if(res[i].status == "init") {
								order.orderStatusText = '等待付款';
								order.style = '';
								order.btn1 = '取消订单';
								order.btn2 = '立即付款';
							} else if(res[i].status == "send") {
								order.orderStatusText = '等待收货';
								order.style = '';
								order.btn1 = '查看物流';
								order.btn2 = '确认收货';
							} else if(res[i].status == "finish") {
								order.orderStatusText = '交易完成';
								order.style = '';
								order.btn1 = '删除订单';
								order.btn2 = '重新购买';
							} else if(res[i].status == "cancel") {
								order.orderStatusText = '交易关闭';
								order.style = '';
								order.btn1 = '删除订单';
								order.btn2 = '重新购买';
							}
							strTop += '<div class="payment" id="' + res[i].id + '">' +
								'<div class="payment_top">' +
								'<p class="num">订单编号：<a href="javacript:;">' + res[i].orderno + '</p>' +
								'<p class="fh">' + order.orderStatusText + '</p>' +
								'</div>';
							var result = res[i].cps;
							strCenter = '';	
							console.log(result)
							if(result != null) {
								for(var j = 0; j < result.length; j++) {
									if(result[j].refraction == null || result[j].refraction == "") {
										//$('.payment_center').remove();
										strCenter += '<div class="payment_center">' +
											'<a href="javascript:;" class="picture">' +
											'<img src="' + result[j].prodImgUrl + '" alt="" />' +
											'</a>' +
											'<div class="z_word">' +
											'<p>' + result[j].prodName + '</p>' +
											'<p>' + result[j].specColor + '</p>' +
											'<p>¥<s>' + result[j].prodPrice + '</s></p>' +
											'</div>' +
											'<div class="price">' +
											'<p>x<s>' + result[j].number + '</s></p>' +
											'</div>' +
											'</div>';
									} else{
										//$('.payment_center').remove();
										strCenter += '<div class="payment_center">' +
											'<a href="javascript:;" class="picture">' +
											'<img src="' + result[j].prodImgUrl + '" alt="" />' +
											'</a>' +
											'<div class="z_word">' +
											'<p>' + result[j].prodName + '</p>' +
											'<p>' + result[j].refraction + '</p>' +
											'<p>¥<s>' + result[j].prodPrice + '</s></p>' +
											'</div>' +
											'<div class="price">' +
											'<p>x<s>' + result[j].number + '</s></p>' +
											'</div>' +
											'</div>';
									}
								}
								
							}
							strTop += strCenter;
							strTop += '<div class="cancel">' +
								'<p class="all_price">应付金额:<number>' + res[i].amount + '</number></p>' +
								'<div class="go">' +
								'<a href="javascript:;" style="' + order.style + '" class="cancel_order">' + order.btn1 + '</a>' +
								'<a href="javascript:;" class="take_goods">' + order.btn2 + '</a>' +
								'</div>' +
								'</div>' +
								'</div>';							
						}
						if(order.isRefresh) {
							$('.body_box').html(strTop);
						} else {
							$('.body_box').append(strTop);
						}
						//$('.body_box').append(strTop);
					}
					order.orderDetails();					
					
					//order.confirm();
					order.checkLogistics();
					order.buyAgain();
					order.payNow();
					order.myscroll.refresh();
					order.cancelOrder();
					order.deleteOrder();
				}
			});
		},
		scroll: function() {
			order.myscroll = new iScroll("wrapper", {
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
						order.pullOnLoad();
			
					}
				}
			});
		},
		pullOnLoad: function() {			
			if(order.hasNextPage == false) {
				$("#wrapper .pull-loading").html("");
				return;
			}
			this.params.pageNum ++;		
			this.isRefresh = false;				
			this.getData();//hasNextPage
			
		},
		/* 订单详情 */
		orderDetails: function() {			
			$('.payment .payment_center').on("click",function(){
				var orderId = $(this).parent().attr('id');
				//console.log(orderId);
				window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/orderDetails_waitPay.html?id=" + orderId;								
			});
		},
		/* 取消订单 */
		cancelOrder: function() {
			$('.cancel').delegate('.cancel_order','click',function(){
			//$('.cancel_order').click(function() {
				var that = this;
				if($(this).html() == '取消订单') {
					$('.tk').show();
					$('.z_cancel').click(function() {
						$('.tk').hide();
					})
					$('.confirm').click(function() {
						$('.tk').hide();
						var orderId = $(that).parents('.payment').attr('id');
						//console.log(orderId);
						//var orderNum = $(that).parents('.cancel').siblings('.payment_top').find('.num a').html();
						$.ajax({
							url: glob + '/v1.0/order/cancelOrder',
							type: 'POST',
							dataType: 'json',
							data: {
								"orderId": orderId
							},
							success: function() {
								$(that).parents('.payment').remove();
								window.location.reload()
								
							}
						});
					});
				}
				
			});
			return;
		},
		/* 删除订单 */
		deleteOrder: function() {
			$('.cancel_order').click(function() {
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
							url: glob + '/v1.0/order/delOrder',
							type: 'POST',
							dataType: 'json',
							data: {
								"orderId": orderId
							},
							success: function() {
								$(that).parents('.payment').remove();
							}
						});
					});
				}
			});
		},
		/* 确认收货 */
		//		confirm: function() {
		//			$('.take_goods').click(function() {
		//				var that = this;
		//				if($(this).html() == '确认收货') {
		//					$('.bigbox').show();
		//					$('.word a:first-child').click(function() {
		//						$('.bigbox').hide();
		//					})
		//					$('.bigbox p').html("是否确认收货?");
		//					$('.word a:last-child').html("确定");
		//					$('.word a:last-child').click(function() {
		//						$('.bigbox').hide();
		//						var orderNum = $(that).parents('.cancel').siblings('.payment_top').find('.num a').html();
		//						$.ajax({
		//							url: glob + "/v1.0/order/updateOrder",
		//							type: "get",
		//							dataType: "json",
		//							data: {
		//								"account": orderNum
		//							},
		//							success: function() {
		//								$(".take").show();
		//								setTimeout(function() {
		//									$(".take").hide();
		//								}, 1000);
		//								$(that).parents('.payment').remove();
		//							}
		//						});
		//					});
		//				}
		//			});
		//		},
		/* 查看物流 */
		checkLogistics: function() {
			$('.cancel_order').click(function() {
				if($(this).html() == '查看物流') {
					var orderNum = $(this).parents('.cancel').siblings('.payment_top').find('.num a').html();
					console.log(orderNum);
					window.location.href = "order_tracking.html?" + orderNum;
				}
			});
		},
		/* 重新购买 */
		buyAgain: function() {
			$('.take_goods').click(function() {
				if($(this).html() == '重新购买') {
					window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/shop.html";
				}
			});
		},
		/* 立即付款 */
		payNow: function() {
			$('.take_goods').click(function() {
				if($(this).html() == '立即付款') {
					var orderNum = $(this).parents('.cancel').siblings('.payment_top').find('.num a').html();
					var totalMoney = $(this).parent('.go').siblings('.all_price').find('number').html();
					var totalMoneys = parseInt(totalMoney + '00');
					$.ajax({
						type: "post",
						url: glob + "/v1.0/WXPayController/H5Pay",
						dataType: "json",
						async: 'true',
						data: {
							"vo_body": "商品测试",
							"vo_openid": openid,
							"vo_out_trade_no": orderNum,
							"vo_total_fee": totalMoneys
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
	}
	order.init();
})