$(function() {

	var account = getCookie("account");
	var openid = getCookie("openid");
	var car = {
		init: function() {
			this.getData();
			this.pay();
//			this.shopping();
			this.arr = [];
		},
		getData: function() {

			$.ajax({
				url: qqq + '/v1.0/car/getCarProd',
				type: 'post',
				dataType: 'json',
				data: {
					//					prodIds:'66',
					account: account
				},
				success: function(data) {

					var res = data.data;
					console.log(res)
					var str = '';
					var a = 0;
					if(res.length == 0) {
						$('#container').css('display', 'none');
						$('#kong').css('display', 'block');
					} else {
						for(var i = 0; i < res.length; i++) {

							var b = a++;
							var c = 0;
							var refVal = '';
							if(res[i].refraction == '') {
								//								
								refVal = '颜色:' + res[i].specColor;
							} else {
								refVal = '折射率:' + res[i].refraction;
							}

							str += '<li>' +
								'<div class="goods_check">' +
								'<label for="' + b + '"></label>' +
								'<input id="' + b + '" class="son_check" type="checkbox" prodPrice=\'' + res[i].prodPrice + '\' prodImgUrl=\'' + res[i].prodImgUrl + '\' specImgUrl=\'' + res[i].specImgUrl + '\' num=\'' + res[i].number + '\' color=\'' + refVal + '\' proname=\'' + res[i].prodName + '\' prodId=\'' + res[i].prodId + '\' specId=\'' + res[i].specId + '\' number=\'' + c + '\'/>' +
								'</div>' +
								'<div class="goodsImg">' +
								'<img src="' + res[i].specImgUrl + '">' +
								'</div>' +
								'<div class="infor">' +
								'<p class="name">' + res[i].prodName + '</p>' +
								'<p class="color">' + refVal + '</p>' +
								'<p class="price">￥' + res[i].prodPrice + '</p>' +
								'<p class="sum_price" style="display: none;">' + Number(res[i].number) * Number(res[i].prodPrice) + '</p>' +
								'</div>' +
								'<div class="change_num">' +
								'<input class="reduce reSty" type="submit" value="-"/>' +
								'<input class="num" type="text" value="' + res[i].number + '">' +
								'<input class="add" type="submit" value="+"/>' +
								'</div>' +
								'</li>';
						}
						$('#items').html(str);
					}
					car.shopping();
				}
			});
		},
		/* 去结算 */
		pay: function() {
			
			var that = this;
			$('#balance .right .pay').click(function(event) {
				
				var allMoney = $('#balance .center p i').html();
				var money = Number(allMoney.substring(1));
				var arrs = new Array();
				var arra = [];
				$('.son_check').each(function() {
					
					if($(this).is(':checked')) {
						var brrb ={
		    				prodId:$(this).attr('prodId'),
		    				specId:$(this).attr('specId'),
		    				prodName:$(this).attr('proname'),
		    				prodImgUrl:$(this).attr('prodImgUrl'),
		    				specColor:$(this).attr('color'),
		    				number:$(this).attr('num'),
		    				prodPrice:$(this).attr('prodPrice'),
		    				specImgUrl:$(this).attr('specImgUrl'),
		    				refraction: "",
		    				sumPrice:$(this).attr('prodPrice')*$(this).attr('num'),
		    			}
		    			arra.push(brrb);
		    			var crrc = JSON.stringify(arra);
		    			sessionStorage.setItem("carorder", crrc);
		    			sessionStorage.setItem("account", account);
						sessionStorage.setItem("openid", openid);
						window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/order_fill.html';
					}
				})
				console.log(arra)
			});
		},
		shopping: function() {
		
			var that = this;
			/*选中状态*/
			$('input[type="checkbox"]').click(function() {
				if($(this).is(':checked')) {
					$(this).prev('label').addClass('mark');
				} else {
					$(this).prev('label').removeClass('mark');
				}
				car.totalMoney();
			});
			/*全选,反选*/
			$('.whole_check').click(function() {
				if($(this).is(':checked')) {
					$('.son_check').prop("checked", true);
					$('.son_check').prev('label').addClass('mark');
				} else {
					$('.son_check').prop("checked", false);
					$('.son_check').prev('label').removeClass('mark');
				}
				car.totalMoney();
			});
			/*全选与单个商品选择的关系*/
			$('.son_check').each(function() {
				$(this).click(function() {
					if($(this).is(':checked')) {
						//判断：所有单个商品是否勾选
						var len = $('.son_check').length;
						var num = 0;
						$('.son_check').each(function() {
							if($(this).is(':checked')) {
								num++;
							}
						});
						if(num == len) {
							$('.whole_check').prop("checked", true);
							$('.whole_check').prev('label').addClass('mark');
						}
					} else {
						//单个商品取消勾选，全局全选取消勾选
						$('.whole_check').prop("checked", false);
						$('.whole_check').prev('label').removeClass('mark');
					}
				})
			});
			/*增加商品数量*/
			$('.change_num .add').click(function() {
				var iptVal = $(this).prev('input');
				var count = Number(iptVal.val()) + 1;
				var obj = $(this).parents('.change_num').find('.reduce');
				var priceTotalObj = $(this).parents('.change_num').siblings('.infor').find('.sum_price');
				var price = $(this).parents('.change_num').siblings('.infor').find('.price').html();
				var priceTotal = count * Number(price.substring(1));
				iptVal.val(count);
				priceTotalObj.html(priceTotal);
				if(iptVal.val() > 1 && obj.hasClass('reSty')) {
					obj.removeClass('reSty');
				}
				var goodsNum = $(this).parents('li').find('.son_check').attr('id');
				$.ajax({
					url: global + '/v1.0/cart/updateCartGoodsNum',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						"goodsNum": goodsNum,
						"num": count
					})
				});
				car.totalMoney();
			});
			/*减少商品数量*/
			$('.change_num .reduce').click(function() {
				var iptVal = $(this).next('input');
				var count = Number(iptVal.val()) - 1;
				var priceTotalObj = $(this).parents('.change_num').siblings('.infor').find('.sum_price');
				var price = $(this).parents('.change_num').siblings('.infor').find('.price').html();
				var priceTotal = count * Number(price.substring(1));
				if(iptVal.val() > 1) {
					iptVal.val(count);
					priceTotalObj.html(priceTotal);
				}
				if(iptVal.val() == 1 && !$(this).hasClass('reSty')) {
					$(this).addClass('reSty');
				}
				var goodsNum = $(this).parents('li').find('.son_check').attr('id');
				$.ajax({
					url: global + '/v1.0/cart/updateCartGoodsNum',
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						"goodsNum": goodsNum,
						"num": count
					})
				});
				car.totalMoney();
			});

			$('header .edit').click(function() {
				$(this).hide();
				$('.finish').show();
				$('.pay').hide();
				$('.delect').show();
				$('#balance .center').hide();
			});
			$('.finish').click(function() {
				$('header .edit').show();
				$('.finish').hide();
				$('.pay').show();
				$('.delect').hide();
				$('#balance .center').show();
			});
			/*显示,隐藏模态框*/
			$('#balance .right .delete').click(function() {
				$('#model').fadeIn();
			});
			$('#model .box .no').click(function() {
				
			$('#model').fadeOut();
			});
			/*确定按钮,删除商品*/
			$('#model .box .yes').click(function() {
				var arrs = [];
				$('.son_check').each(function(i) {
//		    		console.log(254,$(this))
		    		if ($(this).is(':checked')) {
		    			var brr ={
		    				prodId:$(this).attr('prodId'),
		    				specId:$(this).attr('specId'),
		    				number:$(this).attr('number'),
		    			}
		    			arrs.push(brr);
		    		}
				});
					$.ajax({
							url: glo + '/v1.0/car/delOrUpdateProdToCar',
							type: 'post',
							dataType: 'json',
							data:{
								'sp':JSON.stringify(arrs),
								'account':account,
							},
							success: function(data) {
								car.getData();
								
								$('#model').fadeOut();
								window.location.reload()
							}
						});
			
		 	
			});
		},
		totalMoney: function() {
			var total_money = 0;
			var total_count = 0;
			$('.son_check').each(function() {
				if($(this).is(':checked')) {
					var goods = parseFloat($(this).parents('.goods_check').siblings('.infor').find('.sum_price').html());
					total_money += goods;
				}
			});
			$('#balance .center p i').html('￥' + total_money);
		}
	}
	car.init();
})
