$(function(){
	var shoplistId = location.search.substring(1).split('=')[1];
	//console.log(shoplistId);
    var Sun = {
        init: function(){
        	this.isRefresh = true;//是否是刷新还是加载
        	this.hasMore = true;//默认有更多数据
            this.scroll();
         	this.params = {
         		nowPrice:"",//价格区间
         		frame:"",
         		material:"",//材料
         		brand:"",
         		brand:"",//功能
         		popularitySort:"",//人气排行
         		nowPriceSort:"",//价格排行    升序 ASC 降序 DESC
         		catalogId:shoplistId,//分类Id
         		pageNum:1,
         		pageSize:6
         	};
         	
         	$('#btn li').click(function(){
 
         			$('#screen_list').hide();
         			Sun.isRefresh = true;         		
	         		Sun.params.nowPrice = "";
	         		Sun.params.frame = "";
	         		Sun.params.material = "";
	         		Sun.params.brand = "";
	         		
	         		Sun.params.nowPriceSort = "";
	         		Sun.params.catalogId = shoplistId;
	                Sun.params.pageNum = 1;
	                
	         		Sun.getList();

				    var names = $('#priceRank').attr('name')
	         		
	         		if(names == 'one'){
         				
         				//Sun.params.popularitySort = "DESC";
         				Sun.params.nowPriceSort = "ASC";   
         				console.log(1)
         				$(this).attr('name','');
         			}else {
         				$(this).attr('name','one');
         				Sun.params.nowPriceSort = "DESC"; 
         				  console.log(2)
	         			if (Sun.params.nowPriceSort == 'DESC') {
		                  $('.content_top li .down').css({
		                      borderColor: '#67a9fe transparent transparent'
		                  });
		                  $('.content_top li .up').css({
		                      borderColor: 'transparent transparent #444'
		                  });
		              } else if (Sun.params.nowPriceSort == ''){
		                  $('.content_top li .down').css({
		                      borderColor: '#444 transparent transparent'
		                  });
		                  $('.content_top li .up').css({
		                      borderColor: 'transparent transparent #67a9fe'
		                  });
		              }
	         		}
         			
         		
         	})
         	
         	
         	
//       	$('#popularBtn').click(function(){
//              
//       		Sun.isRefresh = true;         		
//       		Sun.params.nowPrice = "";
//       		Sun.params.frame = "";
//       		Sun.params.material = "";
//       		Sun.params.brand = "";
//       		Sun.params.popularitySort = "DESC";
//       		Sun.params.nowPriceSort = "";
//       		Sun.params.catalogId = shoplistId;
//              Sun.params.pageNum = 1;
//       		Sun.getList();
//          }) .click();
//       	$('#priceRank').click(function(){
//              $('#screen_list').hide();
//   	 		Sun.params.nowPrice = "";
//       		Sun.params.frame = "";
//       		Sun.params.material = "";
//       		Sun.params.brand = "";
//       		Sun.params.popularitySort = "";
//       		Sun.params.nowPriceSort = "ASC";
//       		Sun.params.catalogId = shoplistId;
//              Sun.params.pageNum = 1;
//   	 		Sun.getList();
//              if (Sun.params.nowPriceSort == 'DESC') {
//                  $('.content_top li .down').css({
//                      borderColor: '#67a9fe transparent transparent'
//                  });
//                  $('.content_top li .up').css({
//                      borderColor: 'transparent transparent #444'
//                  });
//              } else if (Sun.params.nowPriceSort == ''){
//                  $('.content_top li .down').css({
//                      borderColor: '#444 transparent transparent'
//                  });
//                  $('.content_top li .up').css({
//                      borderColor: 'transparent transparent #67a9fe'
//                  });
//              }
// 			});
//          $('#shaiXuan').click(function(event) {
//              $('#screen_list').show();
//              //Sun.screen();
//          });
        }, 
        /* 获取数据 */
        getList: function(){
            $.ajax({
                url: glob+'/v1.0/goods/queryGoodsByCondition',
                type: 'post',
                dataType: 'json',
                async:true,
                data : this.params, 
                success: function(data){
                	console.log(data);
                    var res = data.data.list;
                    console.log(res);
                    var str = '';
                 	Sun.hasMore = res.length;
                    for(var i=0;i<res.length;i++){
                        str +=  '<li id="'+ res[i].productId +'">'
                            +       '<img style="width:3.2rem;height:2.12rem;" src="'+res[i].images + '" />'
                            +       '<p>' + res[i].productName + '</p>'
                            +       '<p class="price">¥' + res[i].nowPrice + '</p>'
                            +   '</li>'
                    }
                    if(Sun.isRefresh){
                    	$('#popular').html(str);
                    }else {
                    	$('#popular').append(str);
                    }
                    $('.goods_list li').click(function(event) {
                        var goodsId = $(this).attr('id');
                        window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/goodsDetails_sunglasses.html?' + goodsId;
                    });
                    Sun.myscroll.refresh();
                },
                error: function () {
                    console.log("出错了");
                }
            });
        },
        scroll: function(){
            Sun.myscroll = new iScroll("wrapper", {
                onScrollMove: function () {
                    if (this.y < this.maxScrollY) {
                        $("#wrapper .pull-loading").html("释放加载");
                        $("#wrapper .pull-loading").addClass("loading");
                    } else {
                        $("#wrapper .pull-loading").html("上拉加载");
                        $("#wrapper .pull-loading").removeClass("loading");
                    }
                },
                onScrollEnd: function () {
                    if ($("#wrapper .pull-loading").hasClass('loading')) {
                        $("#wrapper .pull-loading").html("上拉加载");
                        Sun.pullOnLoad();
                    } 
                }
            });
        },
        pullOnLoad: function(){
        	if(!this.hasMore){
                $("#wrapper .pull-loading").html("没有了哦");
                return;
            } 
        	this.isRefresh = false;
        	this.params.pageNum++;
            this.getList(); 
        }
//      screen: function(){
//          $.ajax({
//              url: global+'/v1.0/mallHomePage/queryGlassesAndFrameScreening',
//              type: 'get',
//              dataType: 'json',
//              success: function(data){
//                  var res = data.data.data;
//                  console.log(res)
//                  /* 品牌 */
//                  var brandData = res.shopBrandsList;
//                  var str1 = '';
//                  for(var i=0;i<brandData.length;i++){
//                      str1 += '<li id="'+ brandData[i].brandId +'">'+ brandData[i].brandName +'</li>'
//                  }
//                  $('#pinPai').html(str1);
//                  /* 边框 */
//                  var cheekData = res.shopCheekList;
//                  var str2 = '';
//                  for(var j=0;j<cheekData.length;j++){
//                      str2 += '<li id="'+ cheekData[j].cheekId +'">'+ cheekData[j].cheekName +'</li>'
//                  }
//                  $('#bianKuang').html(str2);
//                  /* 材料 */
//                  var materialData = res.shopMaterialsList;
//                  var str3 = '';
//                  for(var m=0;m<materialData.length;m++){
//                      str3 += '<li id="'+ materialData[m].materialsId +'">'+ materialData[m].materialsName +'</li>'
//                  }
//                  $('#caiLiao').html(str3);
//                  $('.items ul li').click(function(event) {
//                      $(this).addClass('active').siblings().removeClass('active');
//                  });
//                  $('.button_box button:first-child').click(function(){
//                      $('.flex li').removeClass('active');
//                  });
//                  $('.button_box button:last-child').click(function(obj) {
//                      $('#screen_list').hide();
//                      var priceVal = $('#jiaGe li.active').html();
//                      var priceStart = priceVal.split('-')[0];
//                      var priceEnd = priceVal.split('-')[1];
//                      var borderVal = $('#bianKuang li.active').attr('id');
//                      var materialVal = $('#caiLiao li.active').attr('id');
//                      var brandVal = $('#pinPai li.active').attr('id');
//                      Sun.isRefresh = true;
//                      Sun.params.popularityFlag = '';
//                      Sun.params.priceDesc = '';
//                      Sun.params.priceAsc = '';
//                      Sun.params.priceStart = priceStart;
//                      Sun.params.priceEnd = priceEnd;
//                      Sun.params.border = borderVal;
//                      Sun.params.materialScience = materialVal;
//                      Sun.params.brand = brandVal;
//                      Sun.params.startRow = 1;
//                      Sun.getList();
//                  });
//              }
//          });
//      }
    }
    Sun.init();
})
