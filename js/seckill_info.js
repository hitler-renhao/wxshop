$(function() {
	$('#car').on('click', function() {
//		 setCookie("loginUserOptistname",loginObj.optistname,30);
//		var optistname=getCookie("loginUserOptistname");
	})
	var aa = location.search.substring(1).split('&');
	//console.log(aa);
	var sckillId = aa[0].split('=')[1];
	//console.log(sckillId)
	var miaoshaP = aa[1].split('=')[1];
	//console.log(miaoshaP);
	var goodsDetails = {
		init: function() {
			//this.openId = $.cookie('CARTCOOKIENAME');
			//this.goodsId = parseInt(location.search.substring(1));
			//console.log(this.goodsId)
			this.tabBtn();
			this.banner();
			//this.bigImg();
			//this.goodsParameter();
			this.goodSpec();
		},
		tabBtn: function() {
			$('.tab p').click(function(event) {
				$(this).addClass('active').siblings().removeClass('active');
			});
			$('.tab .jieShao').click(function(event) {
				$('#banner').show();
				$('#goodsInfor').show();
				$('#choice').show();
				$('#detailsImg').hide();
			});
			$('.tab .xiangQing').click(function(event) {
				$('#banner').hide();
				$('#goodsInfor').hide();
				$('#choice').hide();
				$('#detailsImg').show();
			});
		},
		banner: function() {
			$.ajax({
				type: 'post',
				url: glob + '/v1.0/secKill/secKillGoodsDetails',
				dataType: "json",
				//contentType: 'application/json;charset=UTF-8',
				async: false,
				data: {
					"productId": sckillId,
					"secKillStageId":miaoshaP
				},
				success: function(data) {
					console.log(data);
					var res = data.data.goodsSpecList;
					var des=data.data.goodsInfoList;
					//判断空
					if(res.length == 0) {
						$('#goodsInfor .price').html('');
					} else if(res.length > 0) {
						$('#goodsInfor .price').html('￥' + res[0].nowPrice);
					}
					
					var strName = des[0].productName;
					var strPrice = des[0].nowPrice;
					var imgData = des[0].images.split(',');
					var strImg="";
					//console.log(imgData)					
					for(var i = 0; i < imgData.length; i++) {
						strImg += '<div class="swiper-slide"><img src="' + imgData[i] + '"></div>';
					}
					$('.swiper-wrapper').html(strImg);
					$('#goodsInfor .name').html(strName);
					$('#goodsInfor .price').html('￥'+ strPrice);
					var mySwiper = new Swiper('.swiper-container', {
						direction: 'horizontal',
						autoplay: false,
						loop: true,
						pagination: {
							el: '.swiper-pagination',
						},
					});
					var strBigImg = '<img src="' + des[0].maxPicture + '">';
					$('#detailsImg').html(strBigImg);
				}
			});
		},
//		bigImg: function() {
//			$.ajax({
//				type: 'post',
//				url: globa + '/v1.0/seckill/getProductDetailByProductId',
//				dataType: "json",
//				async: false,
//				data: {
//					"productId": sckillId
//				},
//				success: function(data) {
//					var res = data.data.brandAndCatalog[0];
//					var strBigImg = '<img src="' + res.maxPicture + '">';
//					$('#detailsImg').html(strBigImg);
//				}
//			});
//		},
		/* 商品参数 */
		goodsParameter: function() {
			$('.canShu').click(function(event) {
				$('#goodsCan').show();
				$.ajax({
					type: 'post',
					url: globa + '/v1.0/seckill/getProductDetailByProductId',
					dataType: "json",
					async: false,
					data: {
						"productId": sckillId
					},
					success: function(data) {
						$('.parameter ul li').remove()
						console.log(data);
						var res = data.data.productAttribute;
						var res_one = data.data.brandAndCatalog[0];
						var str = ''
						var strPara = '<li>' +
							'<p>商品编号</p>' +
							'<p>' + res_one.productNo + '</p>' +
							'</li>' +
							'<li>' +
							'<p>品牌</p>' +
							'<p>' + res_one.brandName + '</p>' +
							'</li>'
						////								
						$('.parameter ul').append(strPara);
						for(var i = 0; i < res.length; i++) {
							str += '<li>' +
								'<p>' + res[i].name + '</p>' +
								'<p>' + res[i].value + '</p>' +
								'</li>';
						}
						$('.parameter ul').append(str);
					}
				});
			});
			$('.parameter .cancel').click(function(event) {
				$('#goodsCan').hide();
			});
			$("#goodsCan").on("click", function() {
				$(this).hide();
			});
			$("#goodsCan .parameter").on("click", function(e) {
				e.stopPropagation();
			})
		},
		/* 商品规格 */
		goodSpec: function() {
			$('.comBtn').click(function(event) {
				$('#ref').show();
			});
			$('.choiceRef').click(function(event) {
				$('#ref').show();
			});
			$.ajax({
				type: 'post',
				url: globa + '/v1.0/secKill/secKillGoodsDetails',
				dataType: "json",
				async: false,
				data: {
					"productId": sckillId,
					"secKillStageId":miaoshaP
				},
				success: function(data) {
					console.log(data)
					var res = data.data;
					var colorList = res.goodsSpecList;
					console.log(colorList)
					var strColor = '';
					var payPrice='';
					var paySpecId='';
					for(var i = 0;i<colorList.length;i++){
						//console.log(colorList[j].refraction);
						var strInfor = '<img class="goodsImg" src="' + colorList[i].imgUrl + '">' +
								'<p class="name">' + colorList[i].specColor + '</p>' +
								'<p class="price">￥' + colorList[i].specPrice + '</p>';
							$('.chooseCon .goodsInfor').html(strInfor);
								$('.chooseCon .ref ul li').remove();
								strColor += '<li price=\"'+colorList[i].specPrice+'\" specId=\"'+colorList[i].specId+'\">' + colorList[i].specColor + '</li>'
						/*if(colorList[j].refraction == null || colorList[j].refraction =="") {						
							var strInfor = '<img class="goodsImg" src="' + res.brandAndCatalog[0].picture + '">' +
								'<p class="name">' + res.brandAndCatalog[0].productName + '</p>' +
								'<p class="price">￥' + miaoshaP + '</p>';
							$('.chooseCon .goodsInfor').html(strInfor);
								$('.chooseCon .ref ul li').remove();
								strColor += '<li>' + colorList[j].specColor + '</li>'
								// id="'+ colorList[i].sunglassColorId +'"																					
						}else{							
							var strInfor = '<img class="goodsImg" src="' + res.brandAndCatalog[0].picture + '">' +
								'<p class="name">' + res.brandAndCatalog[0].productName + '</p>' +
								'<p class="price">￥' + miaoshaP + '</p>';						
								strColor += '<li>' + colorList[j].refraction + '</li>'
								// id="'+ colorList[i].sunglassColorId +'"														
							$('.chooseCon .goodsInfor').html(strInfor);
						
					}*/
					}
					$('.chooseCon .ref ul').html(strColor);
					

//					if(colorList.specColor == "") {
//						var strInfor = '<img class="goodsImg" src="' + colorList.imgUrl + '">' +
//							'<p class="name">' + res.brandAndCatalog[0].productName + '</p>' +
//							'<p class="price">￥' + miaoshaP + '</p>';
//						for(var i = 0; i < colorList.length; i++) {
//							strColor += '<li>' + colorList[i].refraction + '</li>'
//							// id="'+ colorList[i].sunglassColorId +'"							
//						}
//						$('.chooseCon .goodsInfor').html(strInfor);
//					}
					//$('.chooseCon .ref ul').append(strColor);
					$('.chooseCon .ref ul li').click(function(event) {
						$(this).addClass('style').siblings().removeClass('style');
						stra = '￥' + $(this).attr("price");//$(this).index()
						$('.price').html(stra);
						payPrice=$(this).attr("price");
						paySpecId=$(this).attr("specId");
					});

					//添加购物车
					/*$('#addCar').click(function(event) {
						var goodsNum = res.brandAndCatalog[0].productNo;
						var typeId = res.brandAndCatalog[0].catalogID;
						var productName = res.brandAndCatalog[0].productName;
						var productPicture = res.brandAndCatalog[0].picture;
						//数量
						var num = $('.change_num .num').val();						
						if($('.chooseCon .ref ul li').hasClass('style')) {														
							$.ajax({
								url: globa + '/v1.0/cart/saveToCart2',
								type: 'post',
								dataType: 'json',
								data: {
									"goodsNum": goodsNum,
									"typeId": typeId,
									"productName":productName,
									"productPirce":miaoshaP,
									"productPicture":productPicture,
									"num": num
								},
								success: function(data) {
									console.log(data);
									var res = data.data
									alert('添加成功');
									$('#ref').hide();
									var localcookieStr=getCookie("cartInfoCookie");
									console.log(localcookieStr);
									var cookieCart;
									if(localcookieStr!=""){
										cookieCart=JSON.parse(localcookieStr);
										if(cookieCart.length>0){
											cookieCart[cookieCart.length]=res;
										}else{
											cookieCart=[];
											cookieCart[0]=res;
										}
										
									}else{
										var cookieCart=[];
										cookieCart[0]=res;
									}
									setCookie("cartInfoCookie",JSON.stringify(cookieCart));
//									setCookie("name",res,30);
//									var optistname=getCookie("name");
//									var cdata=getCookie("optistname");
//									console.log("cdata:"+cdata); 
									//console.log(optistname)
									//console.log($.cookie(CARTCOOKIENAME));
									localStorage.img = res.goodsImg;
									localStorage.goodsName = res.goodsName;
									localStorage.goodsNum = res.goodsNum;
									localStorage.goodsPrice = res.goodsPrice;
									localStorage.num = res.num;
									var arr = [];
									var obj= new Object();
									obj.push()
									arr.push()
									
									window.location.href = '../html/car.html?id=' + goodsNum;
								},
								error: function() {
									alert('数据有误,加入失败!');
									$('#ref').hide();
								}
							});
						} else {
							alert('请选择商品规格');
						}
					});*/
					//立即购买
					$('#payNow').click(function(event) {
						var goodsNum = res.goodsInfoList[0].productNo;
						var typeId = res.goodsInfoList[0].catalogID;
						var productName = res.goodsInfoList[0].productName;
						var productPicture = res.goodsInfoList[0].picture;
						var productId=res.goodsInfoList[0].productId;
						//数量
						var num = $('.change_num .num').val();
						var money = payPrice*num;
						var openid=getCookie('openid');
						var account=getCookie('account');
						//var account='_out_153724797876872624';
						//var openid='o1K4o02kqucfbz7kinVVo5npzs38';
						console.log(money);
						setCookie('stageId'+openid,miaoshaP,60*60);
						setCookie('number'+openid,1,60*60);
						setCookie('paySpecId'+openid,paySpecId,60*60);
						setCookie('money'+openid,money,60*60);
						setCookie('productNo'+openid,goodsNum,60*60);
						setCookie('productId'+openid,productId,60*60);
						if($('.chooseCon .ref ul li').hasClass('style')) {
							
							$.ajax({
								//url: globa + '/v1.0/cart/saveToCart2',
								url:globa + '/v1.0/car/addProdToCar',
								type: 'post',
								dataType: 'json',
								data: {
									"prodId": productId,
									"specId":paySpecId,
									"account":account,
									"number": num
								},
								success: function() {
									window.location.href = '../html/seckill_order.html?' + goodsNum + '&' + money;
								},
								error: function() {
									alert('数据有误,加入失败!');
									$('#ref').hide();
								}
							});
						} else {
							alert('请选择商品规格');
						}
					});
				}
			});
			$('#ref .cancel').click(function(event) {
				$('#ref').hide();
			});
			$("#ref").on("click", function() {
				$(this).hide();
			});
			$("#ref .chooseCon").on("click", function(e) {
				e.stopPropagation();
			})
			/*增加商品数量*/
			$('.add').click(function() {
				var iptVal = $(this).prev('input');
				var count = parseInt(iptVal.val()) + 1;
				var obj = $(this).parents('.change_num').find('.reduce');
				iptVal.val(count);
				if(iptVal.val() > 1 && obj.hasClass('reSty')) {
					obj.removeClass('reSty');
				}
			});
			/*减少商品数量*/
			$('.reduce').click(function() {
				var iptVal = $(this).next('input');
				var count = parseInt(iptVal.val()) - 1;
				if(iptVal.val() > 1) {
					iptVal.val(count);
				}
				if(iptVal.val() == 1 && !$(this).hasClass('reSty')) {
					$(this).addClass('reSty');
				}
			});
		}
	}
	goodsDetails.init();
})