$(function() {
	
	var Index = {
		init: function() {
			this.sortAbout();
			this.banner();
			//this.newProduct();
			//this.popularGoods();
			this.seckill();
			this.foott()
		},
		//		分类查询
		sortAbout: function() {
			$.ajax({
				type: "get",
				url: glob + "/v1.0/goods/queryCatalog",
				dataType: "json",
				//contentType: 'application/json;charset=UTF-8',	            
				async: true,
				success: function(data) {
					//console.log(data);
					var res = data.data;
					var str = '';
					for(var i = 0; i < res.length; i++) {
						str += '<a href="javascript:;">' +
							'<li id="' + res[i].id + '">' +
							'<div class="com"><img src="' + res[i].imageurl + '" /></div>' +
							'<p>' + res[i].name + '</p>' +
							'</li>' +
							'</a>'
					}
					$('#tab').append(str);
					//跳转商品列表
					$('#tab a').on("click", function() {
						var shopListId = $(this).find('li').attr('id');
						//console.log(shopListId);
						window.location.href = "../html/sunglasses.html?id=" + shopListId;
					})
				}
			});
		},
		banner: function() {
			var that = this;
			$.ajax({
				type: "get",
				url: glob + "/v1.0/homePage/queryHomePage",
				success: function(data) {
					console.log(data);
					var goodsImg = data.data.topBanner;
					//console.log(goodsImg)
					var str = '';
					//banner
					for(var i = 0; i < goodsImg.length; i++) {
						str += '<div class="swiper-slide">' +
							'<img src="' + goodsImg[i].bannerImg + '">' +
							'</div>'
					};
					$('#banner .swiper-wrapper').html(str);
					//banner跳转
					$('#banner .swiper-wrapper .swiper-slide').on('click', function() {
						var bannerId = $(this).attr('id');
						alert(bannerId);
					})
					that.swiper();
					//新品推荐
					var newGoods = data.data.newGoods;
					console.log(newGoods);
					var newStr = '';
					for(var i = 0; i < newGoods.length; i++) {
						newStr += '<li id="' + newGoods[i].productId + '">' +
							'<p class="goods_name">' + newGoods[i].productName + '</p>' +
							'<p class="goods_price">¥' + newGoods[i].nowPrice + '</p>' +
							'<img class="goods_img" src="' + newGoods[i].images + '" />' +
							'</li>';
					}
					$('#new_product .goods').html(newStr);
					$('#new_product .goods li').click(function(event) {
						var goodsId = $(this).attr('id');
						//console.log(goodsId)
						window.location.href = '../html/goodsDetails_sun.html?' + goodsId;
					});
					//人气推荐
					var popularImg = data.data.popularityGoodsImage[0];
					var popularImage = '';
					//大图
					popularImage = '<img class="ad" src="' + popularImg + '" />'
					$('.populerImg').html(popularImage);
					//人气列表
					var popularList = data.data.popularityGoods;
					var popularStr = '';
					for(var i = 0; i < popularList.length; i++) {
						popularStr += '<div class="swiper-slide" id="' + popularList[i].productId + '">' +
							'<img src="' + popularList[i].images + '" class="person" />' +
							'<span class="sunbox">' +
							'<h3>' + popularList[i].productName + '</h3>'
							//+		'<h3 class="aa">圆框潮流近视眼镜</h3>'
							+
							'<p>¥' + popularList[i].nowPrice + '&nbsp;</p>' +
							'</span>' +
							'</div>'
					}
					$('.tabbox .swiper-wrapper').append(popularStr);
				}
			});
		},
		
		//		newProduct: function() {
		//			$.ajax({
		//				type: "get",
		//				url: global + "/v1.0/mallHomePage/queryNewArrivalsFrame",
		//				success: function(res) {
		//					var goodsData = res.data.data;
		//					var str = '';
		//					for(var i = 0; i < goodsData.length; i++) {
		//						str += '<li id="' + goodsData[i].frameId + '">' +
		//							'<p class="goods_name">' + goodsData[i].frameName + '</p>' +
		//							'<p class="goods_price">¥' + goodsData[i].framePrice + '</p>' +
		//							'<img class="goods_img" src="' + goodsData[i].shopFrameColorList[0].frameImg + '" />' +
		//							'</li>';
		//					}
		//					$('#new_product .goods').html(str);
		//					$('#new_product .goods li').click(function(event) {
		//						var goodsId = $(this).attr('id');
		//						window.location.href = '../html/goodsDetails_jingkuang.html?' + goodsId;
		//					});
		//				}
		//			});
		//		},
		//		popularGoods: function() {
		//			$.ajax({
		//				type: "get",
		//				url: global + "/v1.0/mallHomePage/queryPopularityFrame",
		//				success: function(res) {
		//					var goodsData = res.data.data;
		//					console.log(goodsData);
		//					var str = '';
		//					for(var i = 0; i < goodsData.length; i++) {
		//						str += '<li id="' + goodsData[i].frameId + '">' +
		//							'<img class="goods_img" src="' + goodsData[i].frameImg + '" />' +
		//							'<p class="color">颜色可选</p>' +
		//							'<p class="goods_name">' + goodsData[i].shopFrame.frameName + '</p>' +
		//							'<p class="goods_price">¥' + goodsData[i].shopFrame.framePrice + '</p>' +
		//							'</li>'
		//					}
		//					$('#popular_goods .goods').html(str);
		//					$('#popular_goods .goods li').click(function(event) {
		//						var goodsId = $(this).attr('id');
		//						window.location.href = '../html/goodsDetails_jingkuang.html?' + goodsId;
		//					});
		//				}
		//			});
		//		},


		//秒杀
		seckill: function() {
			var date = new Date();
			//alert(date)
			var now = date.getTime();
			//设置截止时间  
			var endDate = new Date("2018-9-3 23:59:59");

			var end = endDate.getTime();
			$.ajax({
				type: "post",
				url: globa + "/v1.0/seckill/seckillCommodityList",
				data: {
					"offset": 0,
					"limit": 3,
					"data": now
				},
				success: function(data) {
					var res = data.data.rows;
					var singleTime, Numa
					//console.log(data.data.rows)
					var date = new Date();
					var year = date.getFullYear(); //得到年份
					var month = date.getMonth() + 1; //得到月份
					var datea = date.getDate(); //得到日期
					var GetDatea = year + "-" + month + "-" + datea;
					var month = toDub(date.getMonth() + 1); //月
					var day = toDub(date.getDate()); //日
					var hour = toDub(date.getHours()); //时
					var minute = toDub(date.getMinutes()); //分
					var second = toDub(date.getSeconds()); //秒 
					//当前时间
					var curTime = date.getFullYear() + "-" + month + "-" + day +
						" " + hour + ":" + minute + ":" + second;
					var timestampA = Date.parse(new Date(GetDatea + " 12:00:00"))
					var timestampB = Date.parse(new Date(GetDatea + " 13:00"))
					var timestampC = Date.parse(new Date(GetDatea + " 14:00"))
					var timestampD = Date.parse(new Date(GetDatea + " 15:00"))
					var timestampE = Date.parse(new Date(GetDatea + " 16:00"))
					var timestampF = Date.parse(new Date(GetDatea + " 17:00"))
					var timestampG = Date.parse(new Date(GetDatea + " 18:00"))
					var timestamp = Date.parse(curTime)

					if(timestampA <= timestamp && timestampB > timestamp) {
						singleTime = "12:00";
						Numa = 1;
					} else if(timestampB <= timestamp && timestampC > timestamp) {
						singleTime = "13:00";
						Numa = 2;
					} else if(timestampC <= timestamp && timestampD > timestamp) {
						singleTime = "14:00";
						Numa = 3;
					} else if(timestampD <= timestamp && timestampE > timestamp) {
						singleTime = "15:00";
						Numa = 4;
					} else if(timestampE <= timestamp && timestampF > timestamp) {
						singleTime = "16:00";
						Numa = 5;
					} else if(timestampF <= timestamp && timestampG > timestamp) {
						singleTime = "17:00";
						Numa = 6;
					} else {
						Numa = 7;
					}
					$(".more").click(function() {
						window.location.href = "down_list.html?" + Numa
					})

					var timer = null;

					$(".time").css("display", "block")
					countTime()
					clearInterval(timer)
					timer = setInterval(countTime, 1000);

					function countTime() {

						var date = new Date();

						var year = date.getFullYear(); //得到年份
						var month = date.getMonth() + 1; //得到月份
						var datea = date.getDate(); //得到日期
						var GetDatea = year + "-" + month + "-" + datea;

						var month = toDub(date.getMonth() + 1); //月
						var day = toDub(date.getDate()); //日
						var hour = toDub(date.getHours()); //时
						var minute = toDub(date.getMinutes()); //分
						var second = toDub(date.getSeconds()); //秒 
						//当前时间
						var curTime = date.getFullYear() + "-" + month + "-" + day +
							" " + hour + ":" + minute + ":" + second;
						//alert(date)
						var now = date.getTime();
						//设置截止时间  

						var endDate = new Date(GetDatea + " " + singleTime);
						var endDateA = new Date(GetDatea + " 12:00:00");
						var endDateB = new Date(GetDatea + " 13:00");
						var endDateC = new Date(GetDatea + " 14:00");
						var endDateD = new Date(GetDatea + " 15:00");
						var endDateE = new Date(GetDatea + " 16:00");
						var endDateF = new Date(GetDatea + " 17:00");
						var endDateG = new Date(GetDatea + " 18:00");

						var timestampA = Date.parse(endDateA)
						var timestampB = Date.parse(endDateB)
						var timestampC = Date.parse(endDateC)
						var timestampD = Date.parse(endDateD)
						var timestampE = Date.parse(endDateE)
						var timestampF = Date.parse(endDateF)
						var timestampG = Date.parse(endDateG)
						var timestamp = Date.parse(curTime)

						if(timestamp < endDateA) {
							$("#timera").html("即将开抢")
						} else if(timestamp >= endDateA && timestamp < endDateB) {
							$("#timera").html("正在开抢")
						} else if(timestamp > endDateB) {
							$("#timera").html("已开抢")
						}

						if(timestamp < endDateB) {
							$("#timerb").html("即将开抢")
						} else if(timestamp >= endDateB && timestamp < endDateC) {
							$("#timerb").html("正在开抢")
						} else if(timestamp > endDateC) {
							$("#timerb").html("已开抢")
						}

						if(timestamp < endDateC) {
							$("#timerc").html("即将开抢")
						} else if(timestamp >= endDateC && timestamp < endDateD) {
							$("#timerc").html("正在开抢")
						} else if(timestamp > endDateD) {
							$("#timerc").html("已开抢")
						}

						if(timestamp < endDateD) {
							$("#timerd").html("即将开抢")
						} else if(timestamp >= endDateD && timestamp < endDateE) {
							$("#timerd").html("正在开抢")
						} else if(timestamp > endDateE) {
							$("#timerd").html("已开抢")
						}

						if(timestamp < endDateE) {
							$("#timere").html("即将开抢")
						} else if(timestamp >= endDateE && timestamp < endDateF) {
							$("#timere").html("正在开抢")
						} else if(timestamp > endDateF) {
							$("#timere").html("已开抢")
						}

						if(timestamp < endDateF) {
							$("#timerf").html("即将开抢")
						} else if(timestamp >= endDateF && timestamp < endDateG) {
							$("#timerf").html("正在开抢")
						} else if(timestamp > endDateG) {
							$("#timerf").html("已开抢")
						}

						var end = endDate.getTime();
						var last = endDate.getTime() + 3600000;

						if(end <= timestamp && timestamp <= last) {

							//时间差  
							var leftTime = last - timestamp;
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
							$(".time").css("display", "block")
							document.getElementById("_h").innerHTML = toDub(h);
							document.getElementById("_m").innerHTML = toDub(m);
							document.getElementById("_s").innerHTML = toDub(s);

							//递归每秒调用countTime方法，显示动态时间效果  

							//递归每秒调用countTime方法，显示动态时间效果  
						} else {
							$(".time").css("display", "none")
						}

						if(timestampA <= timestamp && timestampB > timestamp) {
							singleTime = "12:00"
						} else if(timestampB <= timestamp && timestampC > timestamp) {
							singleTime = "13:00"
						} else if(timestampC <= timestamp && timestampD > timestamp) {
							singleTime = "14:00"
						} else if(timestampD <= timestamp && timestampE > timestamp) {
							singleTime = "15:00"
						} else if(timestampE <= timestamp && timestampF > timestamp) {
							singleTime = "16:00"
						} else if(timestampF <= timestamp && timestampG > timestamp) {
							singleTime = "17:00"
						}

						clearInterval(timer)
						timer = setInterval(countTime, 1000);
					}

					function toDub(n) {
						return n < 10 ? "0" + n : "" + n;
					};
					var res = data.data.rows;
					console.log(res);
					var str = '';
					for(var i = 0; i < res.length; i++) {
						//进度条
						/*`Miaoshacount`  '秒杀数量',
						`restCount`  '剩余商品数量',
						`RestrictCount`   '总数',*/
						var ANum = "&nbsp;已抢<b>" + res[i].miaoshaCount + "</b>副"

						var Progres = document.getElementById("Pstyle").offsetWidth; //总的宽度     //1% 的宽度

						var num = parseInt((res[i].restCount - res[i].miaoshaCount) / res[i].restCount * 100);

						var Aextent = Progres / res[i].RestrictCount * res[i].miaoshaCount;
						
						
						/*console.log(num)*/
						str += '<li>' +
							'<input class="ipt1" id="' + res[i].productId + '" value="' + res[i].productId + '" type="hidden" />' +
							'<input class="ipt2" id1="' + res[i].productId + '" value="' + res[i].miaoshaprice + '" type="hidden" />' +
							'<img src="' + res[i].picture + '" />' +
							'<span class="seckbox">' +
							'<h3>' + res[i].productName + '</h3>' +
							'<span class="progress-bar" id="progress-bar">' +
							'<span class="progress-bar-content" id="progress-bar-content" style="background:red;width:' + Aextent + 'px"></span>' +
							'<span class="progress-bar-left">' + ANum + '</span>' +
							'<span class="progress-bar-right">还剩<b>' + num + '%</b>&nbsp;</span>' +
							'</span>' +
							'<p>¥' + res[i].miaoshaprice + '&nbsp;' +
							'<s>¥399.00</s>' +
							'<a href="javascript:;" class="rob">马上抢</a>' +
							'</p>' +
							'</span>' +
							'</li>'
					}
					alert(Aextent)
					$('.seckillList').append(str);
					$('.seckillList li').click(function(event) {
						var seckillId = $(this).find('.ipt1').attr('id');
						//console.log(seckillId)
						var seckillP = $(this).find('.ipt2').attr('value');
						//console.log(seckillP)
						window.location.href = 'seckill_info.html?id=' + seckillId + '&miaoshaPrice=' + seckillP;
					});
				}
			});
		},
		swiper: function() {
			var mySwiper = new Swiper('#banner .swiper-container', {
				direction: 'horizontal',
				autoplay: {
					delay: 3000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				speed: 1000,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
				},
			});
		}
	}
	Index.init();
})