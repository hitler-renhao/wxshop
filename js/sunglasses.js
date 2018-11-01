$(function() {
	var shoplistId = location.search.substring(1).split('=')[1];
	//console.log(agument);
	
	console.log(shoplistId);
	
	//console.log(sunName);
	var sunName = getCookie('sunName');
	//console.log(sunName);
	$('.head_name').html(sunName);
	var Sun = {
		init: function() {
			this.isRefresh = true; //是否是刷新还是加载
			this.hasMore = true; //默认有更多数据
			this.currentType = 1; //标明当前状态，是人气还是价格
			this.nextpage = ''; //默认下一页有数据
			this.b = '0';
			this.res1 = '';
			this.res2 = '';
			this.scroll();
			this.params = {
				nowPrice: "", //价格区间
				frame: "",
				material: "", //材料
				brand: "",
				brand: "", //功能
				popularitySort: "", //人气排行
				nowPriceSort: "", //价格排行    升序 ASC 降序 DESC
				catalogId: shoplistId, //分类Id
				pageNum: 1,//页码
				pageSize:6 //每页显示数量
			};
			$('#popularBtn').click(function() {
				$('#screen_list').hide();
				$('.goods_list1').empty();
				$('.goods_list1').hide();
				$('.goods_list').show();
				Sun.currentType = 1;
				Sun.isRefresh = true;
				Sun.params.nowPrice = "";
				Sun.params.frame = "";
				Sun.params.material = "";
				Sun.params.brand = "";
				Sun.params.popularitySort = "DESC";
				Sun.params.nowPriceSort = "";
				Sun.params.catalogId = shoplistId;
				Sun.params.pageNum = 1;
//				if(Sun.res1 != '') {
//					console.log('数据不刷新1')
//					var str = '';
//					for(var i = 0; i < Sun.res1.length; i++) {
//							str += '<li id="' + Sun.res1[i].productId + '">' +
//								'<img style="width:3.2rem;height:2.12rem;" src="' + Sun.res1[i].images + '" />' +
//								'<p>' + Sun.res1[i].productName + '</p>' +
//								'<p class="price">¥' + Sun.res1[i].nowPrice + '</p>' +
//								'</li>'
//						}
//					return;
//				}
				console.log('数据刷新1')
				Sun.getList();
			}).click();
			var aaa = "DESC"
			
			$('#priceRank').click(function() {
//				$("#priceRank li").eq(0).addClass('.active').siblings().removeClass('.active')
				$('#screen_list').hide();
				$('.goods_list').empty();
				$('.goods_list').hide();
				$('.goods_list1').show();
				Sun.currentType = 2;
				Sun.params.nowPrice = "";
				Sun.params.frame = "";
				Sun.params.material = "";
				Sun.params.brand = "";
				Sun.params.popularitySort = "";
//				Sun.params.nowPriceSort = "DESC";
				var PriceSort = Sun.params.nowPriceSort;
				Sun.params.catalogId = shoplistId;
				Sun.params.pageNum = 1;
			
//				var ab = "17:00:00";
//				var ac = "23:59:59"
//				var date1 = new Date('17:00:00')
//				var date2 = new Date('23:59:59')
//				var s1 = date1.getTime();
//				var s2 = date2.getTime();
//				console.log(s1)
//				if( Sun.b == '0'){
//					var b = '1'
//					
//					console.log(b)
//				
//					Sun.params.nowPriceSort = "DESC";
////					console.log('ASC排序改变成DESC排序')
////					Sun.getList();
//					Sun.getList();
//				
//				} 
//            Sun.b  = '0' 
				console.log(Sun.b)
				if(Sun.b == '0'){
					Sun.params.nowPriceSort = "ASC";
					Sun.getList();
					Sun.b  = '1'
				}else if(Sun.b == '1'){
					Sun.params.nowPriceSort = "DESC";
					Sun.getList();
					Sun.b  = '0'
				}
				console.log('数据刷新2')
//				Sun.getList();
				if(Sun.params.nowPriceSort == 'DESC') {		
					$('#priceRank .down').addClass('current');
					$('.#priceRank .down').css({
						'borderColor': '#67a9fe transparent transparent'
					});
					$('#priceRank .up').css({
						'borderColor': 'transparent transparent #444'
					});
					$('#priceRank .up').addClass('current');
				} else if(Sun.params.nowPriceSort == 'ASC') {
					$('#priceRank .down').addClass('current');
					$('#priceRank .down').css({
						'borderColor': '#444 transparent transparent'
					});
					$('#priceRank .up').css({
						'borderColor': 'transparent transparent #67a9fe'
					});
				}
			});
			$('#shaiXuan').click(function(event) {
				$('#screen_list').show();								
				Sun.screen();				
			});
		},
		/* 获取数据 */
		getList: function() {

			$.ajax({
				url: glob + '/v1.0/goods/queryGoodsByCondition',
				type: 'post',
				dataType: 'json',
				async: true,
				data: this.params,
				success: function(data) {
					console.log(data);
					if(Sun.currentType == 1) {
						Sun.res1 = data.data.list;
						console.log(Sun.res1);
						var str = '';
						Sun.hasMore = Sun.res1.length;
						Sun.nextpage = data.data.hasNextPage;
						console.log(Sun.nextpage)
						if(Sun.res1.length == 0){
							this.hasMore= true;
						}
							//nextPage = true;
							for(var i = 0; i < Sun.res1.length; i++) {
							//$('.goods_list').remove();
								str += '<li id="' + Sun.res1[i].productId + '">' +
									'<img style="width:3.2rem;height:2.12rem;" src="' + Sun.res1[i].images + '" />' +
									'<p>' + Sun.res1[i].productName + '</p>' +
									'<p class="price">¥' + Sun.res1[i].nowPrice + '</p>' +
									'</li>'
							}
							if(Sun.isRefresh) {
								$('.goods_list').html(str);
							} else {
								$('.goods_list').append(str);
							}
							$('.goods_list li').click(function(event) {
								var goodsId = $(this).attr('id');
								window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
							});
						//}
						
						
					} else if(Sun.currentType == 2) {
						Sun.res2 = data.data.list;
						var str = '';
						Sun.hasMore = Sun.res2.length;
						var nextPage = data.data.hasNextPage;
						Sun.nextpage = data.data.hasNextPage;
						console.log(Sun.nextpage)
						if(Sun.res2.length == 0){
							this.hasMore= true;
						}	
						for(var i = 0; i < Sun.res2.length; i++) {
							//$('#popular').empty();
							//$('.goods_list1').remove();
							str += '<li id="' + Sun.res2[i].productId + '">' +
								'<img class="popular" src="' + Sun.res2[i].images + '" />' +
								'<p>' + Sun.res2[i].productName + '</p>' +
								'<p class="price">¥' + Sun.res2[i].nowPrice + '</p>' +
								'</li>'
						}
						if(Sun.isRefresh) {
							$('.goods_list1').html(str);
						} else {
							$('.goods_list1').append(str);
						}
						$('.goods_list1 li').click(function(event) {
							var goodsId = $(this).attr('id');
							console.log(goodsId);
							window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
						});
						
					}
					Sun.myscroll.refresh();
				},
				error: function() {
					console.log("出错了");
				}
			});
		},
		scroll: function() {
			Sun.myscroll = new iScroll("wrapper", {
				onScrollMove: function() {
					
					if(this.y < this.maxScrollY) {
						$("#wrapper .pull-loading").html("释放加载");
						$("#wrapper .pull-loading").addClass("loading");
					} else {
						$("#wrapper .pull-loading").html("上拉加载");
						$("#wrapper .pull-loading").removeClass("loading");
					}
				},
				onScrollEnd: function() {
					
					if($("#wrapper .pull-loading").hasClass('loading')) {
						$("#wrapper .pull-loading").html("上拉加载");
						Sun.pullOnLoad();
			
					}
				}
			});
		},
		pullOnLoad: function() {
			console.log(Sun.nextpage)
//			if(!this.hasMore) {
//				$("#wrapper .pull-loading").html("没有了哦");
//				return;
//			}
			if(Sun.nextpage == false) {
				$("#wrapper .pull-loading").html("没有了哦");
				return;
			}
			this.params.pageNum ++;		

			
			this.isRefresh = false;
				
			this.getList();//hasNextPage
			
		},
	    screen: function(){
            $('.items ul li').click(function(event) {
                $(this).addClass('active').siblings().removeClass('active');
            });
            $('.button_box button:first-child').click(function(){
                $('.flex li').removeClass('active');
            });
	          $('.button_box button:last-child').click(function(obj) {
	              $('#screen_list').hide();
	              var priceVal = $('#jiaGe li.active').html();	             
	              var borderVal = $('#bianKuang li.active').html();
	              var materialVal = $('#caiLiao li.active').html();
	              var brandVal = $('#pinPai li.active').html();
	              var nameVal = $('#pinPai li.active').html();
	              Sun.isRefresh = true;
	              Sun.params.nowPrice = priceVal;
	              Sun.params.frame = borderVal;
	              Sun.params.material = materialVal;
	              Sun.params.brand = brandVal;
	              Sun.params.functionName = nameVal;
	              Sun.params.pageNum = 1;
	              Sun.getList();
	          });
	             
	        
	      }
	}
	Sun.init();
})