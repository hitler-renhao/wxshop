$(function() {
	var sunNmae = '';
	sessionStorage.removeItem('valav1');
	sessionStorage.removeItem('valav');
	var Index = {
		init: function() {
			this.banner();
			this.foott();
			this.mintu = '';
			
			this.sortAbout();
			
			//this.newProduct();
			//this.popularGoods();	
			this.down();
			setTimeout(Index.down,1000);
//			setTimeout(Index.banner, 500);
			
			
			//			}
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
//						sunNmae = ;	
						console.log(sunNmae);
						str += '<a href="javascript:;">' +
							'<li id="' + res[i].id + '"  name="'+res[i].name+'">' +
							'<div class="com"><img src="' + res[i].smailimageurl + '" /></div>' +
							'<p>' + res[i].name + '</p>' +
							'</li>' +
							'</a>'
											
					}
					$('#tab').append(str);
					//跳转商品列表
					$('#tab a').on("click", function() {
						var shopListId = $(this).find('li').attr('id');
						//console.log(shopListId);
						var sunName =  $(this).find('li').attr('name');
						console.log(sunName);
						setCookie("sunName",sunName,24*60*60);
						window.location.href = "http://wx.bjysjglasses.com/static/wxshop/html/sunglasses.html?id=" + shopListId;
					})
				}
			});
		},

		foott: function() {
			$.ajax({
				type: "get",
				url: glob + "/v1.0/homePage/queryHomePage",
				dataType: "json",
				//contentType: 'application/json;charset=UTF-8',	            
				async: true,
				success: function(data) {
					console.log(data);
					console.log(data.data.secKillGoods[0].endTime)
					var myDate = new Date();
					var mytime=myDate.toLocaleTimeString();
					var mytime2 = mytime.slice(2,10)
					var startkill = mytime2
					var endkill = data.data.secKillGoods[0].endTime
					
					var hour = startkill.split(':')[0];
					var min =  startkill.split(':')[1];
        			var sec =  startkill.split(':')[2];
        			
        			var hour2 = endkill.split(':')[0];
					var min2 =  endkill.split(':')[1];
        			var sec2 =  endkill.split(':')[2];
        			s1 = Number(hour*3600) + Number(min*60) + Number(sec);
        			s2 = Number(hour2*3600) + Number(min2*60) + Number(sec2);
					var s3 = s2-s1
					Index.mintu = s3
//					console.log(s3)
//					alert(s3)
//					console.log(Index.mintu)
//					
//					console.log(data.data.guessGoods);
					var foott = data.data.guessGoods;
					console.log(foott)
					var foot = '';
					for(var i = 0; i < foott.length; i++) {
						foot += '<li class="likeli" id="' + foott[i].productId + '">' 
							+'<img class="goods_img" src="' + foott[i].images + '" />'
							//+'<p class="likep">' + foott[i].productName + '</p>' 
							+'<span class="likebox">'
							+'<p class="likeTitle">' + foott[i].productName + '</p>' 
							+'<p class="likePrice">¥' + foott[i].nowPrice + '</p>' 
							'</span>'
							
							+'</li>';
					};
					$('.like .likeList').html(foot);
								$('.likeli').on('click', function() {
	
						var goodsId = $(this).attr('id');
						window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
				})	
				}
			});

		},

		down: function() {
				console.log(Index.mintu)
				var intDiff = Index.mintu
				window.setInterval(function() {
					var day = 0,
						hour = 0,
						minute = 0,
						second = 0; //时间默认值		
					if(intDiff > 0) {
						day = Math.floor(intDiff / (60 * 60 * 24));
						hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
						minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
						second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					}
					if(minute <= 9) minute = '0' + minute;
					if(second <= 9) second = '0' + second;
					$('#day_show').html(day + "天");
					$('#hour_show').html('<s id="h"></s>' + hour);
					$('#minute_show').html('<s></s>' + minute);
					$('#second_show').html('<s></s>' + second);
					intDiff--;
				}, 1000);
			},
		
		banner: function() {
			//					console.log(111)

			var that = this;
			$.ajax({
				type: "get",
				url: glo + "/v1.0/homePage/queryHomePage",
				success: function(data) {
					//								console.log(data.data.guessGoods[0].productName);
					/* 秒杀商品数据 */
					//								console.log(data.data.newGoods)
					
					var goodsImg = data.data.topBanner;
					//console.log(goodsImg)

					var str = '';
					//banner
					for(var i = 0; i < goodsImg.length; i++) {
						str += '<div class="swiper-slide">' +
							'<img src="' + goodsImg[i] + '">' +
							'</div>'
					};
					$('#banner .swiper-container .swiper-wrapper').html(str);

					//banner跳转
//					$('#banner .swiper-wrapper .swiper-slide').on('click', function() {
//						var bannerId = $(this).attr('id');
//						console.log(bannerId);
//						window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + bannerId;
//					})
//				
//					var swiper = new Swiper('#banner .swiper-container', {
//				        pagination: '.swiper-pagination',
//				        speed: 2000,
//				        slidesPerView: 1,
//				        paginationClickable: true,				        
//				        loop: true,				        
//				        centeredSlides: true,
//				        autoplay: 2500,
//				        autoplayDisableOnInteraction: false
//				    });
					var mySwiper = new Swiper(" #banner .swiper-container",{
					       	direction:"horizontal",/*横向滑动*/
	        				loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
	        				pagination:".swiper-pagination",
						    effect:"coverflow",/*轮播的效果：（1）fade:淡入淡出；（2）cube:立方体；（3）coverflow:立体照片*/
						   	slidesPerView:1,/*网格分布：1为在容器区域出现一张图；2：在容器区域出现两张图；3：在容器区域出现三张图*/
						    centeredSlides:true,/*默认第一块居左，设置为true后则是居中显示*/
						    autoplay: 2500,
					        autoplayDisableOnInteraction: false	,	
					       
					    })
					//新品推荐
					var newGoods = data.data.newGoods;
					console.log(newGoods);
					var poImg = data.data.newGoodsImage;
					$('.popular').attr('src', poImg);
					//console.log(newGoods);
					var newStr = '';
					for(var i = 0; i < newGoods.length; i++) {
						newStr += '<li id="' + newGoods[i].productId + '">'
								+	'<img src="' + newGoods[i].images + '"/>'						
								+	'<p class="goods_name">' + newGoods[i].productName + '</p>'
								+	'<p class="goods_price">¥' + newGoods[i].nowPrice + '</p>'
								+'</li>'
					}
					$('#new_product .good').html(newStr);
					$('#new_product .good li').click(function(event) {
						var goodsId = $(this).attr('id');
						//console.log(goodsId)
						window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
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
//					for(var i = 0; i < popularList.length; i++) {
//						popularStr += '<div class="swiper-slide" id="' + popularList[i].productId + '">' +
//							'<img src="' + popularList[i].images + '" class="person" />' +
//							'<span class="sunbox">' +
//							'<h3>' + popularList[i].productName + '</h3>'
//							//+		'<h3 class="aa">圆框潮流近视眼镜</h3>'
//							+
//							'<p>¥' + popularList[i].nowPrice + '&nbsp;</p>' +
//							'</span>' +
//							'</div>'
//					}
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
					$('.tabbox .swiper-wrapper').prepend(popularStr);
					var swiper = new Swiper('.tabbox .swiper-container', {
						slidesPerView: 3,
						spaceBetween: 20,
						freeMode: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						}
					});
					$('.tabbox .swiper-wrapper .swiper-slide').on('click', function() {
						var goodsId = $(this).attr('id');
						//console.log(goodsId)
						window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
					})
					//秒杀图片
					//													var resImgs = data.data.secKillImage;
					//													var resImg = ''
					//													for(var i = 0; i < resImgs.length; i++) {
					//														resImg += '<img src="' + resImgs[i].mobileImage + '" />';
					//													}
					//													var startTime = new Date(resImgs[0].startTime)
					//													var endTime = new Date(resImgs[0].endTime)
					//													var leftTime = endTime - startTime;
					//													$('.seckill').html(resImg);
					//													that.seckill();
					//					定义变量 d,h,m,s保存倒计时的时间  
					//							            var d,h,m,s;  
					//							            if (leftTime>=0) {  
					//							                d = Math.floor(leftTime/1000/60/60/24);  
					//							                h = Math.floor(leftTime/1000/60/60%24);  
					//							                m = Math.floor(leftTime/1000/60%60);  
					//							                s = Math.floor(leftTime/1000%60);                     
					//							            }  
					//							   
					//将倒计时赋值到div中  
					//						            document.getElementById("_d").innerHTML = d+"天";  
					//					            document.getElementById("_h").innerHTML = h+"时";  
					//						            document.getElementById("_m").innerHTML = m+"分";  
					//					            document.getElementById("_s").innerHTML = s+"秒";  
					//递归每秒调用countTime方法，显示动态时间效果  
					//							            setTimeout(countTime,1000);  
					//										function countTime(){
					//									var d,h,m,s;  
					//						            if (leftTime>=0) {  
					//						                d = Math.floor(leftTime/1000/60/60/24);  
					//						                h = Math.floor(leftTime/1000/60/60%24);  
					//						                m = Math.floor(leftTime/1000/60%60);  
					//						                s = Math.floor(leftTime/1000%60);                     
					//						            }  

					//	            //将倒计时赋值到div中  
					//					            document.getElementById("_d").innerHTML = d+"天";  
					//						            document.getElementById("_h").innerHTML = h+"时";  
					//						            document.getElementById("_m").innerHTML = m+"分";  
					//						            document.getElementById("_s").innerHTML = s+"秒";  
					//	            //递归每秒调用countTime方法，显示动态时间效果  
					//						            setTimeout(countTime,1000); 

					//console.log(leftTime)
					//秒杀大图
//					var seckill = data.data.secKillImage;
//					seckillImage = '<img src="'+seckill.mobileImage+'" alt="秒杀banner" />'
//					$('.seckill').html(seckillImage);

					
					//秒杀列表
					var res = data.data.secKillGoods;
					console.log(res);
					var str = '';
					var stageId=res[0].secKillStageId;
					for(var i = 0; i < res.length; i++) {
						//进度条
						/*`allCount-restCount`  '已抢',
						`restCount`  '剩余',
						`allCount`   '总数',*/
						
						
						
						var Progres = document.getElementById("Pstyle").offsetWidth; //总的宽度     //1% 的宽
						var anum = res[i].allCount;
						var qnum = res[i].allCount - res[i].restCount;//已抢数量
						var snum = res[i].restCount / anum * 100;    //剩余百分比
//						var Aextent = Progres - snum;
						var Aextent = Progres / res[i].allCount * qnum
						console.log(Aextent);
						
//						var ANum = "&nbsp;已抢<b>" + res[i].miaoshaCount + "</b>副"
//
//						var Progres = document.getElementById("Pstyle").offsetWidth; //总的宽度     //1% 的宽度
//
//						var num = parseInt(qnum / res[i].allCount * 100);
//
//						var Aextent = Progres / res[i].restCount * res[i].miaoshaCount;
						str += '<li>' +
							'<input class="ipt1" id="' + res[i].productId + '" value="' + res[i].productId + '" type="hidden" />' +
							'<input class="ipt2" id1="' + res[i].productId + '" value="' + res[i].secKillPrice + '" type="hidden" />' +
							'<img src="' + res[i].images + '" />' +
							'<span class="seckbox">' +
							'<h3>' + res[i].productName + '</h3>' +
							'<span class="progress-bar" id="progress-bar">' +
							'<span class="progress-bar-content" id="progress-bar-content" style="background:red;width:' + Aextent + 'px"></span>' +
							'<span class="progress-bar-left">' + qnum + '</span>' +
							'<span class="progress-bar-right">还剩<b style="color:#fff">' + snum + '%</b>&nbsp;</span>' +
							'</span>' +
							'<p>¥' + res[i].secKillPrice + '&nbsp;' +
							'<s>¥' + res[i].price + '</s>' +
							'<a href="javascript:;" class="rob">马上抢</a>' +
							'</p>' +
							'</span>' +
							'</li>'
					}
					$('.seckillList').html(str);
					$('.seckillList li').click(function(event) {
						var seckillId = $(this).find('.ipt1').attr('id');
						//console.log(seckillId)
						var seckillP = $(this).find('.ipt2').attr('value');
						//console.log(seckillP)
						window.location.href = 'seckill_info.html?id=' + seckillId + '&miaoshaPrice=' + stageId;
					});

				}
			});

		},
				//倒计时
			
		//秒杀
		//			seckill: function() {
		//				//function countTime(){
		//				var d, h, m, s;
		//				if(leftTime >= 0) {
		//					d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
		//					h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
		//					m = Math.floor(leftTime / 1000 / 60 % 60);
		//					s = Math.floor(leftTime / 1000 % 60);
		//				}
		//
		//				//将倒计时赋值到div中  
		//				// document.getElementById("_d").innerHTML = d+"天";  
		//				document.getElementById("_h").innerHTML = h + "时";
		//				document.getElementById("_m").innerHTML = m + "分";
		//				document.getElementById("_s").innerHTML = s + "秒";
		//				//递归每秒调用countTime方法，显示动态时间效果  
		//				setTimeout(countTime, 1000);
		//				//}
		//
		//			},

	}
	Index.init();
})