$(function(){
//	var account = location.search.substring(1);
	console.log(account);
	var account = getCookie('account');
	var openid = getCookie('openid');
	var bigacc;
	var address = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');//o1K4o06zzK-V4ItZZ4AIsvLxG5J4
			this.userId = '';
//			this.listShow();
			this.geturl();
			this.changeState();
			this.setDefault();
			this.removeAddress();
			this.biga;
			this.editAddress()
			setTimeout(address.listShow,800)
		},
		//获取userId
		geturl: function(){
			var requestParamsTemp = location.href.substring(location.href.indexOf("?") + 1);			
			var requestParams = requestParamsTemp.split("?");
			var acco = requestParams[0];
			var aurl = acco.substr(0,4).toLowerCase()
			console.log(26,account)
			if(aurl=='http'){
				console.log('http')
				console.log(acco)
				address.biga = account
				console.log(address.biga)
			}else{
				console.log('url')
				console.log(acco)
				address.biga = acco
				console.log(address.biga)
				}
		},
		listShow: function(){
			
			var that = this;
			$.ajax({
	            type: "Post",
	            url: glo + "/v1.0/address/getAddress",
	            dataType: "json",	            
	            data:{
	            	"account":address.biga
	            },
	            success: function(data){
	            	console.log(data);
	             	var res = data.data;
	             	var str = '';
	             	var defaultState =''
	             	var defaulttitle = '';
	             	for(var i=0;i<res.length;i++){
	             		//默认判断-------
	             		
//	             		if(res[i].isdefault == 'n'){
//	             			$('.leftone img').attr({src:'http://wx.bjysjglasses.com/static/wxshop/images/moren.png'});
//	             			$('.default').show();
//	             			console.log('原始数据'+res[i].isdefault)
//	             			console.log('y')
//	             		}else if(res[i].isdefault == 'y'){
//	             			console.log('原始数据'+res[i].isdefault)
//	             			console.log('n')
//	             			$('.default').hide(); 
//	             			$('.leftone img').attr({src:'http://wx.bjysjglasses.com/static/wxshop/images/z_check.png'});
//	             			
//	             		}
	             		str += 	'<li>'
	             			+		'<input class="ipt1" id="userID" type="hidden" value="'+res[i].account+'" />'
	             			+       '<input class="ipt2" id="'+res[i].id+'" type="hidden" value="'+res[i].isdefault+'"/>'
							+		'<span class="li_box">'
							+			'<span class="li_top">'
							+				'<p>' + res[i].name + '</p>'
							+				'<div class="default">默认</div>'
							+				'<p>' + res[i].mobile + '</p>'
							+			 '</span>'
							+ 			 '<text class="address">'
							+			 	'<b>'+res[i].province+'</b><b>'+res[i].city+'</b><b>'+res[i].area+'</b>'
							+				'<b>'+res[i].address+'</b>'
							+			 '</text>'
							+		'</span>'
							+		'<span class="li_bottombox">'
							+			'<text class="leftone">'
							+				'<img src="http://wx.bjysjglasses.com/static/wxshop/images/z_check.png" class="default_click" />'
							+				'<p>默认地址</p>'
							+			'</text>'
							+			'<ul class="li_right">'
							+				'<text class="z_edit">'
							+					'<a href="javascript:;" class="bianji">编辑</a>'
							+				'</text>'
							+				'<text class="del">'
							+					'<a href="javascript:;" class="delete">删除</a>'
							+				'</text>'
							+			'</ul>'
							+		'</span>'
							+	'</li>'
	             	}
	             	$('.list').append(str); 
	             	address.changeState();
	             	address.setDefault();
	             	address.removeAddress();
	             	address.editAddress();
	
	            }
	        });
		},
		changeState: function(){
			$('#list').find('li').each(function() {
				var stateVal = $(this).find('.ipt2').val();
				if(stateVal == 'y'){
					$(this).find('img').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/moren.png');
					$(this).find('.default').css('display', 'block');
				}else if(stateVal == 'n') {
					$(this).find('img').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/z_check.png')
			        $(this).find('.default').css('display', 'none');
				}
			});
		},
		setDefault: function(){
			$("#list").find("li .default_click").click(function(event) {				
				//alert(1);
				$(this).attr({src:'http://wx.bjysjglasses.com/static/wxshop/images/moren.png'});
				$(this).parents('li').siblings().find('.default_click').attr({src:'http://wx.bjysjglasses.com/static/wxshop/images/z_check.png'});
				$(this).parents('.li_bottombox').siblings('.li_box').find('.default').css('display', 'block');
				$(this).parents('li').siblings().find('.default').css('display', 'none');
				var userId = $(this).parents('.li_bottombox').siblings('.ipt1').val();
				var addressId = $(this).parents('.li_bottombox').siblings('.ipt2').attr('id');
				$(this).parents('.li_bottombox').siblings('.ipt2').val(1);
				$(this).parents('li').siblings().find('.ipt2').val(0);
				var addressState = $(this).parents('.li_bottombox').siblings('.ipt2').val();
				$.ajax({
					type: "post",
		            url: glo+"/v1.0/address/updateAddress",
		            dataType: "json",
		            //contentType: 'application/json;charset=UTF-8',
		            data:{
					  	"id": addressId,
					  	"account": accountt,
					  	"isdefault":"y"
					  	
					},
					success:function(data){
						console.log(data);
					}
				});
				
			});
		},
		removeAddress:function(){			
			$('.li_right .del').click(function(){	
				var that = this;
				var removeId = $(this).parents('li').find('.ipt2').attr('id');
				console.log(removeId)
				$('.bigbox').show();
				$('.word .yes').click(function() {
					$.ajax({
						type: "post",
			            url: glo+"/v1.0/address/delAddress",
			            dataType: "json",
			            //contentType: 'application/json;charset=UTF-8',
			            data:{
						    "id": removeId
						}
					})
					$('.bigbox').hide();	
					$(that).parents('li').remove();
				});
			})
			$('.word .no').unbind('click').click(function() {
				$('.bigbox').hide();
			})
		},
		editAddress: function(){
			$('.z_edit').click(function(event) {
				var editId = $(this).parents('li').find('.ipt2').attr('id');
				//console.log(editId)
				window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/edit_address.html?' + editId;
			});
		}
	}
	address.init();
})
