$(function(){
	var shopname = getCookie('shopname');
	var dataId;
	var userId = getCookie('userId');
	var openid = getCookie('openid');
	var appointment = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.headImg = '';
			//this.getUserId();
			//this.appointmentList();		
			this.user();
			this.showOp();
		},	
		//获取userId
//		getUserId: function(){
//			$.ajax({
//				url: global+'/v1.0/user/queryUserByOpenid',
//				type: 'post',
//				dataType: 'json',
//				async: false,
//				data: {
//					"openid" : appointment.openId
//				},
//				success: function(data){
//					var res = data.data;
//					appointment.userId = res.userId;
//					appointment.headImg = res.userHead;
//				}
//			});
//		},
		user:function(){
			$.ajax({
				type: "post",
	            url: globa+"/v1.0/appointment_optometrist/tBespeak/queryUserIdByUserOpenId",
	            dataType: "json",
	            data:{
	            	"userOpenId":openid
	            },
				successs:function(data){
					
					dataId = data.data;
					console.log(dataId);
				}
			});
		},
		showOp:function(){
			
			$.ajax({
				type: "post",
	            url: glob+"/v1.0/bespeak/getUserBespeak",
	            dataType: "json",
	            async:true,
	            data:{
	            	"userId":userId            	
	            },
				success:function(data){
					console.log(data);
					var res = data.data;
	            	var str = '';       	
	            	for(var i = 0;i<res.length;i++){
	            		// var time = res[i].createtime;
	            		// var firstDate = new Date(time);
	            		// var times = firstDate.toLocaleTimeString().substring('2');
//	            		var date = res[i].updatetime.split('T')[0];
//	            		var time = res[i].updatetime.split('T')[1].split('.000+0000')[0];
//	            		//console.log(time);
//	            		var datetime = res[i].updatetime.split('-')[0];
//	            		//console.log(datetime);
//	            		var month = res[i].updatetime.split('-')[1];
//	            		var day = res[i].updatetime.split('-')[2].split('T')[0];
	            		//console.log(day)
	            		var reservetype = '';
	            		var word = '如有疑问请联系客服~';
	            		var btn = '取消预约';
	            		var style = '';
	            		var style1 = '';
	            		var timeend = res[i].bespeaktimeend.split(' ')[1];
//	            		//开始时间
	            		var orderstr1 = res[i].bespeaktimestart.split('T');
	            		var orderstr2 = orderstr1[1].split('.000+0000');
	            		var timmstart = orderstr1[0]+' '+orderstr2[0];
	            		//结束时间
	            		var orderend1 = res[i].bespeaktimeend.split('T');
	            		var orderend2 = orderend1[1].split('.000+0000');
	            		var timmend = orderend2[0];
	            		
	            		var endtime = timmstart + '-' + timmend
	            		//预约单状态 0取消预约 1待联系 2改签 3完成预约
	            		if(res[i].bespeakstatus == 0){
	            			reservetype = '预约未开始';
//	            			style = 'display:none;';
		            	}else if(res[i].bespeakstatus == 1){
		            		reservetype = '预约已接单';
//		            		style1 = 'display:none;';
		            	}else if(res[i].bespeakstatus == 2){
		            		reservetype = '预约待确认';
		            		style1 = 'display:none;';
		            	}else if(res[i].bespeakstatus == 3){
		            		reservetype = '预约售后中';
		            		style = 'display:none;';
		            	}else if(res[i].bespeakstatus == 4){
		            		reservetype = '预约拒绝';
		            		style = 'display:none;';
		            	}
	            		str += '<ul class="items">'
	            			+       '<input class="ipt" id="'+res[i].id+'" type="hidden" value="'+res[i].userid+'" />'
							+		'<li class="state">'
							//+			'<p class="fl">' + date + '&nbsp&nbsp' + time + '</p>'
							+			'<p class="fl">' +'订单号:'+ res[i].bespeaknumber + '</p>'			
							+			'<p class="fr">'+reservetype+'</p>'
							+		'</li>'
							+		'<li class="center">'
							//+			'<img class="head" src="'+ appointment.headImg +'">'
							+			'<p class="time">预约时间： '+ endtime +'</p>'
							+			'<p class="place">预约地点：' + res[i].pcode + res[i].ccode +res[i].code + res[i].bespeakaddress + '</p>'
							+		'</li>'
							+		'<li class="feedback">'
							+			'<p class="text" style="'+ style1 +'">'+ word +'</p>'							 			
							+    		'<p class="cancel" style="'+ style +'">' + btn + '</p>'
							+			'<a href="tel:01053933883"><p class="btn">联系客服</p></a>'
							+		'</li>'
							+	'</ul>'
	            	}
	            	$('#content').append(str);
	            	//取消预约单
	            	
	            	$('#content').delegate('.cancel', 'click', function() {	
						var that = this;
						var reserveId = $(this).parents('.items').find('.ipt').attr("id");	
						$(".alerttt").show()
						$('#sure').click(function(){
							$(".alerttt").hide()
							$('#model').show();
							
						})
						$('#canl').click(function(){
							$(".alerttt").hide()
						})
						$('.yes').click(function(){
							$('#model').hide();		
							
							$.ajax({
								type: "post",
					            url: global+"/v1.0/bespeak/cancelBespeak?bespeakId="+reserveId,
					            dataType: "json",
					            contentType: 'application/json;charset=UTF-8',
//					            data:{
//					            	"userId":appointment.userId,
//					            	"reserveId":reserveId
//					            },
					            success:function(result){
					            	$(that).parents('.items').find('.fr').html('预约取消');	
				            		$(that).siblings('.text').show();
				            		$(that).hide();	
					            }
					       });						       	
					    });							
						$('.no').unbind('click').click(function(event) {
							$('#model').hide();
						});
					});	
				}
			});
		}
//		appointmentList:function(){			
//			$.ajax({
//				type: "get",
//	            url: global+"/v1.0/optometry/queryOptometryList",
//	            dataType: "json",
//	            contentType: 'application/json;charset=UTF-8',
//	            data:{
//	            	"userId" : 6
//	            },
//	            success:function(data){	 
//	            	var res = data.data.data;
//	            	console.log(res);
//	            	var str = '';       	
//	            	for(var i = 0;i<res.length;i++){
//	            		// var time = res[i].createtime;
//	            		// var firstDate = new Date(time);
//	            		// var times = firstDate.toLocaleTimeString().substring('2');
//	            		var date = res[i].createtime.split('T')[0];
//	            		var time = res[i].createtime.split('T')[1].split('.000+0000')[0];
//	            		
//	            		var datetime = res[i].reserveDate.split('-')[0];
//	            		var month = res[i].reserveDate.split('-')[1];
//	            		var day = res[i].reserveDate.split('-')[2];
//	            		var reservetype = '';
//	            		var word = '如有疑问请联系客服~';
//	            		var btn = '取消预约';
//	            		var style = '';
//	            		var style1 = '';
//	            		//预约单状态 0取消预约 1待联系 2改签 3完成预约
//	            		if(res[i].reserveState == 0){
//	            			reservetype = '预约取消';
//	            			style = 'display:none;';
//		            	}else if(res[i].reserveState == 1){
//		            		reservetype = '等待联系';
//		            		style1 = 'display:none;';
//		            	}else if(res[i].reserveState == 2){
//		            		reservetype = '预约改期';
//		            		style1 = 'display:none;';
//		            	}else if(res[i].reserveState == 3){
//		            		reservetype = '预约成功';
//		            		style = 'display:none;';
//		            	}
//	            		str += '<ul class="items">'
//	            			+       '<input class="ipt" id="'+res[i].userId+'" type="hidden" value="'+res[i].reserveId+'" />'
//							+		'<li class="state">'
//							+			'<p class="fl">' + date + '&nbsp&nbsp' + time + '</p>'
//							+			'<p class="fr">'+reservetype+'</p>'
//							+		'</li>'
//							+		'<li class="center">'
//							+			'<img class="head" src="'+ appointment.headImg +'">'
//							+			'<p class="time">预约时间： '+datetime+'年'+month+'月'+day+'日' + '&nbsp&nbsp' + res[i].reserveTime+'</p>'
//							+			'<p class="place">预约地点：' + res[i].reserveProvince + res[i].reserveCity +res[i].reserveTown + res[i].reserveAddress + '</p>'
//							+		'</li>'
//							+		'<li class="feedback">'
//							+			'<p class="text" style="'+ style1 +'">'+ word +'</p>'							 			
//							+    		'<p class="cancel" style="'+ style +'">' + btn + '</p>'
//							+			'<a href="tel:01053933883"><p class="btn">联系客服</p></a>'
//							+		'</li>'
//							+	'</ul>'
//	            	}
//	            	$('#content').append(str);
//	            	//取消预约单
//	            	$('#content').delegate('.cancel', 'click', function() {	
//						var that = this;
//						var reserveId = $(this).parents('.items').find('.ipt').val();													
//						$('#model').show();
//						$('.yes').click(function(){
//							$('#model').hide();								
//							$.ajax({
//								type: "get",
//					            url: global+"/v1.0/optometry/deleteOptometry",
//					            dataType: "json",
//					            contentType: 'application/json;charset=UTF-8',
//					            data:{
//					            	"userId":appointment.userId,
//					            	"reserveId":reserveId
//					            },
//					            success:function(result){
//					            	$(that).parents('.items').find('.fr').html('预约取消');	
//				            		$(that).siblings('.text').show();
//				            		$(that).hide();	
//					            }
//					       });						       	
//					    });							
//						$('.no').unbind('click').click(function(event) {
//							$('#model').hide();
//						});
//					})
//				}	            
//			})			
//		},
//		openId:function(){
//			$.ajax({
//				type: "post",
//	            url: globa+"/v1.0/optometry/queryOptometryList",
//	            dataType: "json",
//	            async:true
//	            data:{
//	            	"offset" : 0,
//	            	"limit":10
//	            },
//				successs:function(){
//					
//				}
//			});
//		},
		
	}
	appointment.init();
})
