$(function() {
	var shoplistId = location.search.substring(1).split('=')[1];
	//console.log(shoplistId);
	
	var Sun = {
		init: function() {
			this.isRefresh = true; //是否是刷新还是加载
			this.hasMore = true; //默认有更多数据
			this.currentType = 1; //标明当前状态，是人气还是价格
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
				pageSize: 6 //每页显示数量
			};
			Sun.getList()//页面进入加载的数据
			Sun.getElem()//处理点击事件
			
		},
		getElem:function(){
			var istrue;  //价格排序添加标记
			var that = this;
			$('.content_top ul li').click(function(){
				var num = $(this).index();
				if(num==0){
					//人气加载
					Sun.params.popularitySort = "DESC";
					Sun.getList();
				}else if(num==1){
					if(istrue == 'one'){
					
						Sun.getList()
						istrue=''; //改变价格排序添加标记
						
					}else{
						
						Sun.getList()
						istrue='one'; //改变价格排序添加标记
					}
				}else if(num == 2){
					//做第三个列表的处理
					that.screen();
				}
	
				
			})
			
		}
		,
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
						console.log(1);
						var str = '';
						Sun.hasMore = Sun.res1.length;
						
						for(var i = 0; i < Sun.res1.length; i++) {
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
						
					} else if(Sun.currentType == 2) {
						Sun.res2 = data.data.list;
						console.log(2);
						var str = '';
						Sun.hasMore = Sun.res2.length;

						for(var i = 0; i < Sun.res2.length; i++) {
							//$('#popular').empty();
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
			if(!this.hasMore) {
				$("#wrapper .pull-loading").html("没有了哦");
				return;
			}
			this.isRefresh = false;
			this.params.pageNum ++;
			this.getList();
		},
	    screen: function(){
//	        $('#jiaGe li').click(function(){
//				var priceInfo = $(this).html();
//				console.log(priceInfo);
//			})
//			$('#bianKuang li').click(function(){
//				var frameInfo = $(this).html();
//				console.log(frameInfo);		
//			})
//			$('#caiLiao li').click(function(){
//				var materialInfo = $(this).html();
//				console.log(materialInfo);	
//			})
//			$('#pinPai li').click(function(){
//				var bInfo = $(this).html();
//				console.log(materialInfo);	
//			})
//			$('#gn li').click(function(){
//				var gn = $(this).html();
//				console.log(gn);	
//			}) 
	                 
	                 
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