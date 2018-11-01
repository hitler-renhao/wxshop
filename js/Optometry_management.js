$(function(){
	var openid = getCookie('openid');
	var userId = getCookie('userId');
	var bespeakId;
	var Optometrynum = 1;
	var bigacc = ''
	var Optometry = {
		init: function(){
			this.geturl();
			this.optometryShow();			
			this.isRefresh = true; //是否是刷新还是加载
			this.hasMore = true; //默认有更多数据
			this.hasNextPage = ''; //默认下一页有数据
			this.scroll();
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';		
			this.params = {
				"userOpenId":"o1K4o0_Sa7JaH-C3MLYcGSVxSUtI",
				"pageNum":1,
	            "pageSize":8
			};		
			this.choos();
		},
		//获取url 截取openId
		geturl: function(){
			var requestParamsTemp = location.href.substring(location.href.indexOf("?") + 1);			
			var requestParams = requestParamsTemp.split("?");
			var acco = requestParams[0];
			var aurl = acco.substr(0,4).toLowerCase()
			if(aurl=='http'){
				console.log('http')
				console.log(acco)
	//			bigacc = account
			}else{
				console.log('url')
				console.log(acco)
	//			bigacc = acco
				}
		},
		//订单跳转选取验光单
		choos:function(){
			var chooseval = sessionStorage.getItem("Optometry"); 
			var liss = $('.list li').length
			console.log(liss)
			if(chooseval == 1){
				console.log('选择验光单')
				$('.back').click(function(){
					window.location.href = '../html/main.html';
				});
				for(var i=0; i<liss.length; i++){
					console.log(liss[i])
				}
				$('.list').on('click','li',function (e){
			        var name = $(this).find('.name').text();
			        var time = $(this).find('.time').text()
			        var cid  = $(this).find('.ipt').attr('id')
			        if(name=='' && time==''){
			        	alert('请选择验光单')
			        }else{		        	
			           sessionStorage.setItem("ordname", name);
			           sessionStorage.setItem("ordtime", time);
			           sessionStorage.setItem("ordId", cid);
			           sessionStorage.removeItem('Optometry');
			           window.location.href = '../html/order_fill.html';
			        }

			    });
			}
		},
//		geturl: function(){
//			var requestParamsTemp = location.href.substring(location.href.indexOf("?") + 1);			
//			var requestParams = requestParamsTemp.split("?");
//			var acco = requestParams[0];
//			var aurl = acco.substr(0,4).toLowerCase()
//			if(aurl=='http'){
//				console.log('1')
//				console.log(acco)
////				bigacc = account
//			}else{
//				console.log(2)
////				bigacc = acco
//				}
//		},
		//验光单列表
		optometryShow: function(){	
			//alert(1);
			var that = this;
			$.ajax({
	            type: "post",
	            url: globa+"/v1.0/prescription/selectPrescription",
	            dataType: "json",
	            //contentType: 'application/json;charset=UTF-8',	
	            data:{
	            	"userOpenId":"o1K4o0_Sa7JaH-C3MLYcGSVxSUtI",//openId
	            	"pageNum":Optometrynum,
	           		"pageSize":8
	            },
	            success: function(data){
	            	console.log(data);
	             	var res = data.data.list;
	             	console.log(data.data.hasNextPage);
	             	Optometry.hasNextPage = data.data.hasNextPage
	             	var str = '';	
	             	
	             	for(var i = 0;i<res.length;i++){
	             		bespeakId = res[i].bespeakid;
	             		var a = res[i].createTime
	             		var test = new Date(a);  
	             		var year = test.getFullYear();
	             		var month = test.getMonth()+1;
	             		var day = test.getDate();
	             		var time = test.getHours();
	             		var minte = test.getMinutes();
	             		var second = test.getSeconds()
	             		
						var orderTime = res[i].createTime.split('T');
	             		var ordermin = orderTime[1].split('.000+0000');
			
						var b = year +'.'+ month+'.'+day+ '&nbsp'+'&nbsp'
						
						var c = time+':'+minte+':'+second
//						console.log(year)
//	             		var optometryDate = res[i].createTime.split("T");
	             		//console.log(optometryDate);
//	             		var time = optometryDate[1].split('.000+0000');   
	             		if(bespeakId == null || bespeakId == ""){
	             			str += '<li>'
								+	'<input class="ipt" id="'+res[i].id+'" type="hidden" />'
								+	'<span class="box_left">'
								+		'<h3 class="name">当前用户</h3>'
								+		'<p class="time">' + orderTime[0] +'&nbsp&nbsp'+ ordermin[0] + '</p>'
								+	'</span>'
								+	'<span class="box_right">'
								+	'<a href="javascript:;" class="ediT">'
								+		'<img src="../images/edit.png" />'
								+		'<p>编辑</p>'
								+	'</a>'
								+	'<a href="javascript:;">'
								+		'<img src="../images/delete.png" />'
								+		'<p>删除</p>'
								+	'</a>'
								+	'</span>'				
								+'</li>'
	             		}else{
	             			str += '<li>'
								+	'<input class="ipt" id="'+res[i].id+'" type="hidden" />'
								+	'<span class="box_left">'
								+		'<h3 class="name">'+res[i].optistName+'</h3>'
								+		'<p class="time>' + orderTime[0] +'&nbsp&nbsp'+ ordermin[0] + '</p>'
								+	'</span>'
								+	'<span class="box_right">'
								+	'<a href="javascript:;" class="ediT">'
								+		'<img src="../images/edit.png" />'
								+		'<p>编辑</p>'
								+	'</a>'
								+	'<a href="javascript:;">'
								+		'<img src="../images/delete.png" />'
								+		'<p>删除</p>'
								+	'</a>'
								+	'</span>'				
								+'</li>'
	             		}
						
	             	}
	             	//$('.list').append(str);
					if(Optometry.isRefresh) {
						$('.list').prepend(str);
					} else {
						$('.list').prepend(str);
					}          			
	             	that.removeOptometry();
	             	that.editOptometry()
					Optometry.myscroll.refresh();
	            }
	            
	        });
		},
		scroll: function() {
			Optometry.myscroll = new iScroll("wrapper", {
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
						Optometry.pullOnLoad();
						console.log(128,'触发')
					}
				}
			});
		},
		pullOnLoad: function() {
			
			if(Optometry.hasNextPage == false) {
				$("#wrapper .pull-loading").html("没有了哦");
				return;
			}
			
			this.isRefresh = false;			
			Optometry.params.pageNum++;
			Optometrynum++
			console.log(Optometrynum)
			this.optometryShow();
		},
		//删除验光单
		removeOptometry:function(){			
			$('.box_right a:nth-child(2)').click(function(){
				if(bespeakId == null || bespeakId == ""){
					alert('当前用户不能删除');
				}else{
					var that = this;				
					$('.bigbox').show();
					var visualId = $(this).parent().parent().find('.ipt').attr('id');
					console.log(visualId);
					$('.word a:first-child').click(function(){										
						$.ajax({
							type:"Post",
							url:glob+"/v1.0/prescription/deletePrescription",
							dataType: "json",
				            data:{
							    "id": visualId						  
							}
						})
						$('.bigbox').hide();	
						$(that).parents('li').remove();
					})
					$('.word a:nth-child(2)').click(function(){
						$('.bigbox').hide();
					})
				}
				
			})
		},
		//编辑验光单
		editOptometry:function(){
			$('.ediT').click(function(){
				var editId = $(this).parents('li').find('.ipt').attr('id');
				window.location.href = '../html/edit_optometry.html?' + editId;
			})
		}
//		addOptometry:function(){
//			$(".add_box").click(function(){
//				var addId = $(this).parents('li').find('.ipt').attr('id');
//				
//				window.location.href = '../html/edit_optometry.html?' + addId;
//			})
//		}
	}
	Optometry.init();
})
