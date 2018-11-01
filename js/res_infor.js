$(function () {
	// alert(1)
	// 设置localStorage
	// storage.a=1;
	// 清除localStorage
	// localStorage.clear()
	// 获取localStorage
	var productId = localStorage.getItem('ids');
	console.log(productId);
	

	// $('.add-goods').click(function() {
	// 	// window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html";
	// 	window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html";
	// })

	// var prodName = localStorage.getItem('prodName');
	// prodName = JSON.parse(prodName);
	// var prodName = prodName.split(',');
	// var strTop = '';
	// if (!prodName.length) {
	// 	strTop += 	'<li>'
	// 								+ '<img src="http://wx.bjysjglasses.com/static/wxshop/images/banner_list.png" alt="">'
	// 								+ '眼镜 ：<span>' + prodName[1] + '</span>'
	// 								+ '<span> + </span>'
	// 								+ '<span>' + prodName[2] + '</span>'
	// 							+ '</li>'
	// } else {
	// 	for(var i = 0; i < prodName.length; i++) {
	// 		strTop += 	'<li>'
	// 										+ '<img src="http://wx.bjysjglasses.com/static/wxshop/images/banner_list.png" alt="">'
	// 										+ '眼镜 ：<span>' + prodName[i][1] + '</span>'
	// 										+ '<span> + </span>'
	// 										+ '<span>' + prodName[i][2] + '</span>'
	// 									+ '</li>'
	// 	}
	// }

	// $('#glassesList').prepend(strTop)
	// $('#glassesList2').prepend(strTop)



	var flag = false;
	//	var b = localStorage.getItem("b");
	//	var aa = getUrlParam("orgNo");

	//	var opId = getUrlParam("id");
	//	console.log(aa)
	//	console.log(opId)
	//	function getUrlParam(aa) {
	//      var reg = new RegExp("(^|&)" + aa + "=([^&]*)(&|$)");
	//      var r = window.location.search.substring(1).match(reg);
	//      if (r != null) return unescape(r[2]); //decodeURL
	//      return null;
	//  }
	var flag = location.search.substring(1);
	console.log(flag)
	var optionId = sessionStorage.getItem("optionId");
	var optistname = sessionStorage.getItem("names");
	var geocitt = sessionStorage.getItem("geocityy");
	var lon = sessionStorage.getItem("lon"); //获取经度
	var lat = sessionStorage.getItem("lat"); //获取纬度
	//	var geocc = JSON.parse(geocitt);  //定位城市

	var newchild = sessionStorage.getItem("newchild"); //商户ID
	geoLontest = 222
	//	console.log(geocc);
	setCookie("name", optionId, 24 * 60 * 60);
	setCookie('optionId', optionId, 24 * 60 * 60)
	setCookie('optistname', optistname, 24 * 60 * 60)
	//console.log(optionId)
	var userID = getCookie('userId');
	var openid = getCookie('openid');
	var timestart, timeend;
	var c = getCookie('names');
	var opID = getCookie('crmId');
	console.log(opID);
	var shopIID = '';
	var shopIID2 = '';
	//sessionStorage.removeItem('names');
	$('#choice').val(optistname);

	var openId = getCookie('OPENIDCOOKIENAME');
	var dataId;
	var shopId;

	var shopName;
	setCookie("name", shopName, 24 * 60 * 60);
	var appointment = {
		init: function () {
			this.openId = jQuery.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.userName = $('#name');
			this.submit = $('#btn');
			this.userPhone = $('#phone');
			this.time = $('#picktime');
			this.userCity = $('#city');
			this.userAddress = $('#address');
			this.remark = $('#remark');
			//this.getUserId();
			this.fillAppointment();
			this.cityChoice();
			//			this.shopInfo();
			this.qq();
			this.jumpp() //点击跳转选择验光师
			setTimeout(appointment.shopInfo, 2000)

		},
		jumpp: function () {
			var a1 = sessionStorage.getItem("usna");
			var a2 = sessionStorage.getItem("usip");
			//				 var a3 = sessionStorage.getItem("usti"); 
			var a4 = sessionStorage.getItem("usci");
			$('#name').val(a1)
			$('#phone').val(a2)
			//				 $('#endTime').val(a3)
			$('#city').val(a4)
			$('#choice').click(function () {
				var usna = $('#name').val()
				var usip = $('#phone').val()
				//				var usti = $('#endTime').val()
				var usci = $('#city').val()
				sessionStorage.setItem("usna", usna);
				sessionStorage.setItem("usip", usip);
				//				 sessionStorage.setItem("usti", usti); 
				sessionStorage.setItem("usci", usci);
				window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/optometrist_select.html"
			})
		},
		qq: function () {
			if (flag) {

				$('#form1').removeClass('showbox');
				$('#form2').addClass('showbox');
				$('.content_top li:last-child').addClass('active')
				$('.content_top li:first-child').removeClass('active')
			} else {
				$('#form2').removeClass('showbox');
				$('#form1').addClass('showbox');
				$('.content_top li:first-child').addClass('active')
				$('.content_top li:last-child').removeClass('active')
			}
		},

		shopInfo: function () {
			var time_type;
			var chose_type;
			var toptype = $('#aBtn li:first').hasClass("active");
			if (toptype == true) {
				time_type = $("#selectshop1")
			} else {
				time_type = $('#selectshop')
				chose_type = $("#selectshop")
			}
			// time_type.change(function(){
			// 		var aa = time_type.find("option:selected").attr('id');
			// 		shopIID = aa;
			// 		console.log(shopIID)
			// 		sessionStorage.setItem("shopIID", shopIID);
			// 	});

		},
		user: function () {
			$.ajax({
				type: "post",
				url: global + "/v1.0/appointment_optometrist/tBespeak/queryUserIdByUserOpenId",
				dataType: "json",
				data: {
					"userOpenId": openid
				},
				successs: function (data) {
					dataId = data.data;
					tbs_userId = dataId;
					setCookie("userId", dataId, 24 * 60 * 60);
				}
			});
		},
		// 预约提交
		fillAppointment: function () {
			var that = this;
			this.submit.click(function (event) {
				if (!productId) {
					layer.alert(
						'请选择商品',
						{title:'温馨提示'}
					);  
					$('#layui-layer1 .layui-layer-btn0').click(function () {
						location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html';
					})
				}

				var temp = localStorage.getItem('prodName');

				that.checkMobile();
				sessionStorage.removeItem('names');
				console.log('触发提交按钮')
				console.log(flag)
				var b1 = $('#name').val()
				var b2 = $('#phone').val()
				var b3 = $('#endTime').val()
				var b4 = $('#city').val()
				if (b1 == '' || b2 == '' || b3 == '' || b4 == '') {
					alert('请填全信息')
				} else {

					if (flag == 'q' || flag == true) {
						sessionStorage.removeItem("usci");
						sessionStorage.removeItem("usip");
						sessionStorage.removeItem("usna");
						sessionStorage.removeItem("usti");

						var nameVal = that.userName.val();
						var userPhoneVal = that.userPhone.val();
						//获取
						var timea = that.time;
						var timeAppointment = $('#endTime').val()
						//console.log(timeAppointment)
						var arrTime = timeAppointment.split(' ');
						var date1 = arrTime[0];
						var time = arrTime[1];
						var time1 = time.split('-')[0];
						var time2 = time.split('-')[1];
						console.log(time1);
						console.log(time2);
						timestart = date1 + ' ' + time1;
						timeend = date1 + ' ' + time2;
						console.log(timestart);
						console.log(timeend);
						var cityAppointment = that.userCity.val();
						console.log(cityAppointment)
						var arrCity = cityAppointment.split(',');
						var province = arrCity[0];
						var city = arrCity[1];
						var town = arrCity[2];
						var addressDetails = $('#address').val();
						var remark = that.remark.val();
						var userIdTbs = getCookie('userId');
						var mooen = $('.timeb span').text();
						var shopIID = sessionStorage.getItem("shopIID");
						var sercont = $('#server').val()
						//服务项目
						var sertype;
						var server = $('#server').val();
						var serviceType;
						// if(server == "验光") {
						serviceType = 1;
						// } else if(server == "清洗") {
						// 	serviceType = 2;
						// } else if(server == "维修") {
						// 	serviceType = 3;
						// }			
						// if($('.serive').html()=="上门服务"){
						// 	var sertype = "上门服务"
						// }else if($('.serive').html()=="进店服务"){
						var sertype = "进店服务"
						// }
						console.log(301)
						var shopid = $("#selectshop option:selected").attr('id') - 0;
						var serive22 = $('.serive2').html()
						$.ajax({
							type: "POST",
							url: global + '/v1.0/bespeak/addBespeak',
							dataType: "json",
							async: false,
							data: {
								"userid": userID, //userID
								"identificationId": optionId, //验光师id   userIdTbs							
								"shopid": shopid, //商家Id
								//							"shopName": shopName, //商家名称
								"pcode": province,
								"ccode": city,
								"code": town,
								"bespeakaddress": addressDetails,
								"bespeaktimestart": timestart,
								"bespeaktimeend": timeend,
								"bespeakremake": remark,
								"username": nameVal, //用户姓名
								"phone": userPhoneVal, //手机号
								"serviceType": "进店服务", //服务类型
								"bespeakamount": 0, //价钱
								"servicetype": serive22,
								"servicecontent": sercont,
								"productJson": productId,
								// 订单状态默认为-1, 表示未付款， 0表示已付款
								"bespeakStatus":0
							},
							success: function (data) {
								console.log(data);
								var aa = console.log(data.code)
								var re = data.data;
								console.log(re)
								alert('预约成功');
								localStorage.clear();
								location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/index.html';
								$.ajax({
									type: "post",
									url: global + "/v1.0/WXPayController/H5Pay",
									dataType: "json",
									async: 'true',
									data: {
										"vo_body": "预约订单-" + re.bespeaknumber,
										"vo_openid": openid,
										//								"vo_openid":'o1K4o00ElLQB3r7DWZ8fF22lrhkU',
										"vo_total_fee": re.bespeakamount,
										"vo_out_trade_no": re.bespeaknumber,

									},
									success: function (data) {
										console.log(474, data)

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
										function (res) {
											if (res.err_msg == "get_brand_wcpay_request:ok") {
												alert('支付成功!')
												window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/my_reservation.html?' + userID
											} else if (res.err_msg == "total_fee") {
												alert('支付会话标识prepay_id已失效!')
											}
										}
									);
								}
								if (typeof WeixinJSBridge == "undefined") {
									if (document.addEventListener) {
										document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
									} else if (document.attachEvent) {
										document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
										document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
									}
								} else {
									onBridgeReady();
								}
							},
							error: function () {
								alert('出错啦')
							}
						});
					}
				}
			});
		},
		checkMobile: function () {
			//var phone = this.userPhone;
			var moblie = this.userPhone.val();
			var regMobile = /^(1[34578][0-9]{9})$/;
			if (moblie == "") {
				this.userPhone.attr({
					'placeholder': '*手机号不能为空'
				});
			} else if (regMobile.test(moblie) == false) {
				this.userPhone.val('');
				this.userPhone.attr({
					'placeholder': '*手机号码格式有误，请重新输入'
				});
			} else {
				flag = true;
			}
			//验证用户名
			//			var name = this.userName.val();
			//			var uPattern = /^[a-zA-Z0-9_-]{2,16}$/;
			//			if(name == "") {
			//				this.userName.attr({
			//					'placeholder': '*用户名不能为空'
			//				});				
			//			} else if(uPattern.test(name) == false) {
			//				this.userName.val('');
			//				this.userName.attr({
			//					'placeholder': '*用户名格式不对'
			//				});
			//				this.userName.css({})
			//			} else {
			//				flag = true;
			//			}
		},
		cityChoice: function () {
			var area2 = new LArea();
			area2.init({
				'trigger': '#city',
				'valueTo': '#value',
				'keys': {
					id: 'value',
					name: 'text'
				},
				'type': 2,
				'data': [provs_data, citys_data, dists_data]
			});
		}
	}
	appointment.init();




	$('.editSuccess').click(function () {
		location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html'
	})
})