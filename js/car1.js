$(function () {
	var dataIds = [];
	var dataId = getCookie("dataId");

	// 获取li的length
	var ress = 0;
	setTimeout(function () {
		dataIds = dataId.split(',');
		for (var i = 0; i < ress; i++) {
			// console.log(document.querySelectorAll('#items li')[i].getAttribute('data-id'));			
			for (var j = 1; j < dataIds.length; j++) {
				if (dataIds[j] == document.querySelectorAll('#items li')[i].getAttribute('data-id')) {
					document.querySelectorAll('#items li')[i].style.display = "none";
				}
			}
		}
	}, 200)
	
	var account = getCookie("account");
	var openid = getCookie("openid");
	var length1 = ''
	var car = {
		init: function () {
			this.getData();
			this.pay();
			// this.shopping();
			this.arr = [];
		},
		getData: function () {
			$.ajax({
				url: global + '/v1.0/bespeak/currentOrderGoodsList',
				// url: 'http://10.0.235.173:8484/ysj/wxshop/admin/v1.0/bespeak/currentOrderGoodsList',
				type: 'post',
				dataType: 'json',
				data: {
					//					prodIds:'66',
					accountId: '_out_153751763585638419'
					// accountId: '_out_153746099854039883'
				},
				success: function (data) {
					length1 = data.data
					console.log(data);
					var res = data.data;
					ress = res.length;
					var str = '';
					var a = 0;

					if (ress == 0) {
						$('#items').html('<img src="http://wx.bjysjglasses.com/static/wxshop/images/alertshow.jpg" class="alertshow"><li class="res-btn"><button type="button" class="btn" style="background-color: #67a9fe; color: #fff;">去购买</button></li>');
						$('#items').on('click', 'button', function () {
							location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/index.html';
						})
						$('.chos').hide();
					} else {
						$('.chos').show();
						for (var i = 0; i < res.length; i++) {

							var b = a++;
							var c = 0;
							var refVal = '';
							if (res[i].refraction == '') {
								//								
								refVal = '颜色:' + res[i].specinfo;
							} else {
								refVal = '折射率:' + res[i].specinfo;
							}
							str += '<li data-id="aa' + i + '" class="liss touchid">' +
								'<div class="goods_check">' +
								'<label for="' + b + '"></label>' +
								'<input id="' + b + '" class="son_check" type="checkbox" catalogId=\'' + res[i].catalogId + '\' orderdetailId=\'' + res[i].id + '\' orderid=\'' + res[i].orderid + '\' specId=\'' + res[i].specId + '\'/>' +
								'</div>' +
								'<div class="goodsImg">' +
								// 没有图片
								'<img src="' + res[i].imageUrl + '">' +
								'</div>' +
								'<div class="infor">' +
								'<p class="name">' + res[i].productname + '</p>' +
								// 没有颜色
								'<p class="color">' + refVal + '</p>' +
								'<p class="price">￥' + res[i].total0 + '</p>' +
								'<p class="sum_price" style="display: none;">' + Number(res[i].number) * Number(res[i].total0) + '</p>' +
								'</div>' +
								'<div class="change_num">' +
								'<p class="num">' + 1 + '</p>'
							'</div>' +
							'</li>';
						}
						$('#items').html(str);
					}
					car.shopping();

					// 判断页面商品是否为空
					// if ($('#items').text().length == 0) {
					// 	let str = '	<li><button id="gotobuy">去购买</button></li>';
					// }
				}
			});
		},
		/* 去结算 */
		pay: function () {

			var that = this;
			$('#balance .right .pay').click(function (event) {

				var allMoney = $('#balance .center p i').html();
				var money = Number(allMoney.substring(1));
				var arrs = new Array();
				var arra = [];
				$('.son_check').each(function () {
					var brrb = {
						catalogId: $(this).attr('catalogId'),
					}
					arra.push(brrb);
					var crrc = JSON.stringify(arra);
					sessionStorage.setItem("carorder", crrc);
					sessionStorage.setItem("account", account);
					sessionStorage.setItem("openid", openid);
					// window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/order_fill.html';
					window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/order_fill.html';
				})
				console.log(arra)
			});
		},
		shopping: function () {

			var that = this;
			/*选中状态*/
			var list = $('#items li');

			for (var i = 0; i < list.length; i++) {
				console.log(list[i])

			};
			$('#items').on('click', 'li', function () {
				console.log($(this))
				// $(this).find('.son_check').prev('label').addClass('mark').parents('li').addClass('data-mark').removeClass('liss');
				if (!$(this).hasClass('data-mark')) {
				// if ($(this).find('.son_check').is(':checked')) {
					$(this).find('.son_check').prev('label').addClass('mark').parents('li').addClass('data-mark').removeClass('liss');
					$(this).find('.son_check').prop("checked",true);
				} else {
					$(this).find('.son_check').prev('label').removeClass('mark').parents('li').removeClass('data-mark').addClass('liss');
					$(this).find('.son_check').prop("checked",false);
				}

			})
			$('.btn-primary').click(function () {
				// 获取选中商品数量
				var lis = $('#items li.data-mark');
				// for(var i = 0; i < lis.length; i++) {
				// 获取所有商品
				// var totalNum = $('#items li');

				// var catalogId = lis.find('.son_check').attr('catalogId');
				var eyeglass = 0;
				var glassRim = 0;
				var eyeglassNum = 0;
				var glassRimNum = 0;
				var flag = 0;
				var ulStr = '';
				// 获取总数量
				$("#items li.data-mark").each(function (i, obj) {
					// 获取镜片镜架各自数量
					let catalogId = $(obj).find('.son_check').attr('catalogId') - 0;
					// alert(catalogId)
					// 判断镜片及镜架数量
					if (catalogId == 2) {
						eyeglass++;
					}
					if (catalogId == 4) {
						glassRim++;
					}
					if (catalogId == 1) {
						flag = 1;
					}
				});
				if (lis.length == 0) {
					layer.msg(
						'请选择商品！',
						{title:'温馨提示'}
					)
				} else if (lis.length == 1) {
//					layer.msg(
//						'至少勾选两种商品！',
//						{title:'温馨提示'}
//					)
					var tytee = $('#items li.data-mark input:checked').attr('catalogid')
					var itli = $('#items li')
					var crr = new Array()
					for(var i=0;i<itli.length;i++){
						console.log(190,$(itli).eq(i).find('.son_check').attr('catalogid'))
						console.log(typeof($(itli).eq(i).find('.son_check').attr('catalogid')))
						crr.push($(itli).eq(i).find('.son_check').attr('catalogid'))

					}
					
					
					if(tytee==2){
						if($.inArray('4', crr)==-1){
							layer.msg(
								'至少勾选两种商品,您列表内暂无镜架,请前去购买',
								{title:'温馨提示'}
							)
						}else if($.inArray('4', crr)!=-1){
							layer.msg(
								'至少勾选两种商品,请您勾选或前去购买',
								{title:'温馨提示'}
							)
						}					
					}else if(tytee==4){
						if($.inArray('2', crr)==-1){
							layer.msg(
								'至少勾选两种商品,您列表内暂无镜片,请前去购买',
								{title:'温馨提示'}
							)
						}else if($.inArray('2', crr)!=-1){
							layer.msg(
								'至少勾选两种商品,请您勾选或前去购买',
								{title:'温馨提示'}
							)
						}
						
					}
					
					
				} else {
					if (eyeglass == glassRim) {
						if (flag == 1) {
							layer.msg(
								'只可以选择镜片及镜框',
								{title:'温馨提示'}
							);
						} else {
							layer.msg(
								'可以购买',
								{title:'温馨提示'}
							);
							var dataMark = $('#items li.data-mark')
							dataMark.hide();
							var arr = [];
							var arry = [];
							var temp = [];
							var glass = {};
							var dataId = [];
							// 产品唯一id及订单id
							var orderdetailId = [];
							var orderid = [];
							var specId = [];
							var frameElement = {};
							var lensElement = {};
							var idArray = [];
							var totalArr = [];
							var allElement = {};
							var tmp = [];
							dataIds = getCookie('dataId');
							if (!!dataIds) {
								dataIds = dataIds.split(',');
							}
							dataId.push(dataIds);
							$("#items li.data-mark").each(function (i, obj) {

								// 讲产品名称存入cookie
								arry.push($(obj).find('.infor .name').text())
								// 获取商品名

								dataId.push($(this).attr('data-id'));

								// 获取产品唯一id及订单id
								// 产品id
								orderdetailId[i] = $(this).find('.son_check').attr('orderdetailId');
								// 订单id
								orderid[i] = $(this).find('.son_check').attr('orderid');
								// 规格id
								specId[i] = $(this).find('.son_check').attr('specId');

							});

							setCookie('dataId', dataId, 1);

							console.log(getCookie('dataId'));

							// 循环向local存数据
							$("#items li.data-mark").each(function (i, obj) {
								glass = {
									1: arry[0],
									2: arry[1]
								};
								let catalogId = $(obj).find('.son_check').attr('catalogId') - 0;
								console.log(catalogId);

								if (catalogId == 2) {
									lensElement = {
										orderdetailId: orderdetailId[i],
										orderid: orderid[i],
										specId: specId[i]
									}
								} else if (catalogId == 4) {
									frameElement = {
										orderdetailId: orderdetailId[i],
										orderid: orderid[i],
										specId: specId[i]
									};
								}
								// frameElement = {
								// 	orderdetailId:orderdetailId[i],
								// 	orderid:orderid[i],
								// 	specId:specId[i]
								// };
								console.log(frameElement);


								allElement = {
									frame: frameElement,
									lens: lensElement
								}
								// 每获取两次数据压入local中一次
								if (i % 2 == 1) {
									var tmp = localStorage.getItem('ids');
									tmp = JSON.parse(tmp);
									console.log(tmp);
									if (tmp == null) {
										totalArr.push(allElement);
										totalArr = JSON.stringify(totalArr);
										localStorage.setItem('ids', totalArr);
										totalArr = [];
									} else {
										totalArr.push(allElement);
										totalArr = totalArr.concat(tmp);
										totalArr = JSON.stringify(totalArr)
										localStorage.setItem('ids', totalArr);
										totalArr = [];
									}
								}

							})


							// glass = {
							// 	1:arry[0],
							// 	2:arry[1]
							// };
							// frameElement = {
							// 	orderdetailId:orderdetailId[0],
							// 	orderid:orderid[0],
							// 	specId:specId[0]
							// };
							// lensElement = {
							// 	orderdetailId:orderdetailId[1],
							// 	orderid:orderid[1],
							// 	specId:specId[1]
							// }
							// allElement = {
							// 	frame: frameElement,
							// 	lens: lensElement
							// }




							// var temp = localStorage.getItem('prodName');
							// temp = JSON.parse(temp);
							// console.log(temp);
							// if(temp == null) {
							// 	// arr.push(glass);
							// 	arr = JSON.stringify(glass)
							// 	localStorage.setItem('prodName',arr);
							// } else {
							// 	arr = arr.concat(temp);
							// 	arr.push(glass);
							// 	// arr = JSON.stringify(arr)
							// 	console.log('arr = ' + arr);
							// 	arr = JSON.stringify(arr)
							// 	localStorage.setItem('prodName',arr);
							// }
							var catalogNum1 = 0;
							var catalogNum2 = 0;
							$("#items li.liss").each(function (i, obj) {
								let catalogId = $(obj).find('.son_check').attr('catalogId') - 0;
								if(catalogId == 2) {
									catalogNum1++;
								} else if (catalogId == 4) {
									catalogNum2++;
								}
							})
								if (catalogNum1 >= 1 && catalogNum2 == 0) {
									layer.confirm(
										'剩余商品中还有剩余镜片，是否继续选购镜框？',
										{title:'温馨提示'}
									);
									$('.layui-layer-btn0').click(function () {
										location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/sunglasses.html?id=4';
									})
									$('.layui-layer-btn1').click(function () {
										location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res_infor.html';
									})
								} else if (catalogNum2 >= 1 && catalogNum1 == 0) {
									layer.confirm(
										'剩余商品中还有剩余镜框，是否继续选购镜片？',
										{title:'温馨提示'}
									);
									$('.layui-layer-btn0').click(function () {
										location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/sunglasses.html?id=2';
									})
									$('.layui-layer-btn1').click(function () {
										location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res_infor.html';
									})
								} else {
									$('#items li').removeClass('data-mark');
									location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res_infor.html';
								}
						}
					} else {
						layer.msg(
							'请选择相同数量的镜架及镜片！',
							{title:'温馨提示'}
						);
					}
				}
			})
		},
	}
	car.init();
})