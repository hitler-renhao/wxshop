$(function(){
	sessionStorage.clear()
	var userId = getCookie('userId');
	var account = getCookie("account");
	var openid = getCookie("openid");
	var goodsDetails = {
		init: function(){
			this.goodsId = parseInt(location.search.substring(1));
			//console.log(this.goodsId)
			this.tabBtn();
			this.banner();			
			this.goodsParameter();
			this.goodSpec();
		},
		tabBtn: function(){
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
		banner: function(){
			$.ajax({
				type: 'get',
				url: globa+'/v1.0/goods/queryGoods',
				dataType: "json",				
	            //contentType: 'application/json;charset=UTF-8',
				data:{
	            	"productId": goodsDetails.goodsId
	            },
				success: function(data){
					console.log(data);
					//banner+info
					var result = data.data.goodsInfoList[0];
					var res = data.data.goodsInfoList[0].images.split(',');
					console.log(res);
					
					for(var i=0;i<res.length;i++){
						var strImg = '<div class="swiper-slide"><img src="'+ res[i] +'"></div>';
					}
					$('.swiper-wrapper').html(strImg);
					$('#goodsInfor .name').html(result.productName);
					$('#goodsInfor .price').html('￥'+ result.nowPrice);
					var mySwiper = new Swiper ('.swiper-container', {
						direction: 'horizontal',
						autoplay: false,
						loop: true,
					    pagination: {
					      	el: '.swiper-pagination',
					    },
					});
					//详情
					var strBigImg = '<img src="'+ result.productHTML5 +'">';
					$('#detailsImg').html(strBigImg);
				}
			});
		},
		/* 商品参数 */
		goodsParameter: function(){
			$('.canShu').click(function(event) {
				$('#goodsCan').show();
				$.ajax({
					type: 'GET',
					url: globa+'/v1.0/goods/queryGoods',
					dataType: "json",
		            //contentType: 'application/json;charset=UTF-8',
					data:{
		            	"productId": goodsDetails.goodsId
		            },
					success: function(data){
						var parameterinfo = data.data.goodsParamList;
						console.log(parameterinfo);
						var strPara="";
						for(var i=0;i<parameterinfo.length;i++){
							//console.log(parameterinfo[i]);
							var arguments = parameterinfo[i];
							console.log(arguments);
							strPara+=	'<li>'
										+		'<p>'+arguments.paramName+'</p>'
										+		'<p>'+ arguments.paramValue +'</p>'
										+	'</li>';
						}						
						$('.parameter ul').html(strPara);
					}
				});
			});
			$('.parameter .cancel').click(function(event) {
				$('#goodsCan').hide();
			});
			$("#goodsCan").on("click",function(){
		        $(this).hide();
		    });
		    $("#goodsCan .parameter").on("click",function(e){
		        e.stopPropagation();
		    })
		},
		/* 商品规格 */
		goodSpec: function(){
			var colorList;
			$('.comBtn').click(function(event) {
				$('#ref').show();
		
//						console.log($('.flex li').eq(0).addClass('style'))
			});
			$('.choiceRef').click(function(event) {
				$('#ref').show();
			});
			$.ajax({
				type: 'GET',
				url: globa+'/v1.0/goods/queryGoods',
				dataType: "json",
	            // contentType: 'application/json;charset=UTF-8',
				data:{
	            	"productId": goodsDetails.goodsId
	            },
				success: function(data){
				
					var res = data.data;
					var price = res.goodsSpecList[0].specPrice
					colorList = res.goodsSpecList;
					console.log(price);
					var strColor = '';
					var strInfor = 	'<img class="goodsImg" src="'+ res.goodsInfoList[0].images +'">'
								+	'<p class="name">'+ res.goodsInfoList[0].productName +'</p>'
								+	'<p class="price">￥'+ res.goodsInfoList[0].nowPrice +'</p>';
					for(var i=0;i<colorList.length;i++){
						strColor += '<li liindex=\''+i+'\' catalogId=\''+colorList[i].catalogId+'\' specPrice=\''+colorList[i].specPrice+'\' specId=\''+colorList[i].specId+'\' imgurl=\''+colorList[i].imgUrl+'\'>'+ colorList[i].specColor+'</li>'
					}
					$('.chooseCon .goodsInfor').html(strInfor);
					$('.chooseCon .ref ul').append(strColor);
					
					$('.chooseCon .ref ul li').click(function(event) {
						$(this).addClass('style').siblings().removeClass('style');
						var liindex=$(this).attr('liindex');
						$('.goodsImg').attr("src",colorList[liindex].imgUrl);
						
						$('.chooseCon .goodsInfor .price').text(colorList[liindex].specPrice);
					});
					$('#addCar').click(function(event) {
						
						var goodsNum = res.sunglassNum;
						var typeId = res.typeId;
						var num = $('.change_num .num').val();
						var colorId = '';
						if($('.chooseCon .ref ul li').hasClass('style')){
						var colorName = $('.chooseCon .ref ul li.style').text();
						
						var colorId =$('.chooseCon .ref ul li.style').attr('specId');
							console.log($('.chooseCon .ref ul li.style').text())
							console.log('顏色ID'+colorId)
							var pruidd = goodsDetails.goodsId
							var ab = 11;
							var ab = colorId
							var ac = account
							var bc = parseInt(pruidd);
//							console.log(bc)
							var obj = {
									"prodId" : bc,
									"specId" : ab,
									"num" : num,
									"account": ac
							}
							$.ajax({
//								url:'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin/v1.0/car/addProdToCar',			 
								url:globa+'/v1.0/car/addProdToCar',
								type: 'post',
								dataType: 'json',
								 data: {
									"prodId" : bc,
									"specId" : colorId,
									"number" : num,
									"account": account
								},
								success: function(res){
									console.log(res.msg)
									alert(res.msg);
									$('#ref').hide();									
								},
								error:function() {
									alert('数据有误,加入失败!');
									$('#ref').hide();
								}
							});
						} else {
							alert('请选择商品规格');
						}
					});
					$('#payNow').click(function(event) {
						var brr =[];
						var goodsNum = res.sunglassNum;
						var typeId = res.typeId;
						var num = $('.change_num .num').val();
						var money = Number(res.sunglassPrice)*num;
						var prodImgUrl = res.goodsInfoList[0].picture
						var colorName = $('.chooseCon .ref ul li.style').text();
						var pr =$('.chooseCon .ref ul li.style').attr('specPrice');
						var specId =$('.chooseCon .ref ul li.style').attr('specId');
						var specImgUrl =$('.chooseCon .ref ul li.style').attr('imgUrl');	
						var catid = $('.chooseCon .ref ul li.style').attr('catalogid');
						var prodName = $('#goodsInfor .name').text();
						var arr = {
		    				prodId:goodsDetails.goodsId,
		    				specId:specId,
		    				number:$('.change_num .num').val(),
		    				prodName:prodName,
		    				prodImgUrl:res.goodsInfoList[0].picture,
		    				prodPrice:pr,
		    				specColor:colorName,
		    				refraction: "",
		    				specImgUrl:specImgUrl,
		    				sumPrice:pr*$('.change_num .num').val()
		    			}
						brr.push(arr)
						var goods = JSON.stringify(brr);
						sessionStorage.setItem("goodsorder", goods);
						sessionStorage.setItem("catalogid", catid);
						sessionStorage.setItem("account", account);
						sessionStorage.setItem("openid", openid);
//						sessionStorage.setItem("specImgUrl", specImgUrl);
//						sessionStorage.setItem("prodName", prodName);
//						sessionStorage.setItem("specId", specId);
//						sessionStorage.setItem("color", colorName);
//						sessionStorage.setItem("prodId", goodsDetails.goodsId);
//						sessionStorage.setItem("prodImgUrl", prodImgUrl);
//						sessionStorage.setItem("num", $('.change_num .num').val());
//						sessionStorage.setItem("price", pr);
//						var spid = sessionStorage.getItem("specId");
//						var col = sessionStorage.getItem("color");
//						console.log(spid)
//						
						
						if($('.flex li').is(".style")){
							window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/order_fill.html';
						}else{
							alert('请选择规格')
						}
//						if($('.chooseCon .ref ul li').hasClass('style')){
//							colorId = $('.chooseCon .ref ul li.style').attr('id');
//							
//							$.ajax({
//								url: globaal+'/v1.0/cart/saveToCart',
//								type: 'post',
//								dataType: 'json',
//								data: {
//									"goodsNum" : goodsNum,
//									"typeId" : typeId,
//									"colorId" : colorId,
//									"num" : num
//								},
//								success: function(){
//								},
//								error:function() {
//									alert('数据有误,加入失败!');
//									$('#ref').hide();
//								}
//							});
//						} else {
//							alert('请选择商品规格');
//						}
					});
				}
			});
			$('#ref .cancel').click(function(event) {
				$('#ref').hide();
			});
			$("#ref").on("click",function(){
		        $(this).hide();
		    });
		    $("#ref .chooseCon").on("click",function(e){
		        e.stopPropagation();
		    })
			/*增加商品数量*/
		    $('.add').click(function () {
		        var iptVal = $(this).prev('input');
		        var count = parseInt(iptVal.val()) + 1;
		        var obj = $(this).parents('.change_num').find('.reduce');
		        iptVal.val(count);
		        if(iptVal.val() > 1 && obj.hasClass('reSty')){
		            obj.removeClass('reSty');
		        }
		    });
		    /*减少商品数量*/
		    $('.reduce').click(function () {
		        var iptVal = $(this).next('input');
		        var count = parseInt(iptVal.val()) - 1;
		        if(iptVal.val() > 1){
		            iptVal.val(count);
		        }
		        if(iptVal.val()==1 && !$(this).hasClass('reSty')){
		            $(this).addClass('reSty');
		        }
		    });
		}
	}
	goodsDetails.init();
})