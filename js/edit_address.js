$(function(){
	var account = getCookie('account');
	var openid = getCookie('openid');
	var flag = false; 
	var edit = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.getUserId();
			this.waitEdit();
			this.editAddress();			
		},
		//获取userId
		getUserId: function(){
			$.ajax({
				url: global+'/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid" : openid
				},
				success: function(data){
					var res = data.data;
					edit.userId = res.userId;
				}
			});
		},
		//根据id获取
		waitEdit: function(){
			var that = this;
			var str = location.search;
			var editID = parseInt(str.substring(1));
			console.log(editID)
			$.ajax({
	            type: "post",
	            url: glo+"/v1.0/address/getAddressById",
	            dataType: "json",
	            //contentType: 'application/json;charset=UTF-8',
	            data:{
	            	"id": editID
	            },
	            success: function(data){
	            	console.log(data);
	             	var res = data.data;
	             	console.log(res);	
	             	var num = '';
	             	if(res.isdefault == 'y'){
	             		$('.anniu .cell-right span').attr('className','switch-on')
	             	}else if(res.isdefault == 'n'){
	             		$('.anniu .cell-right span').attr('className','switch-off')
	             	}
			
	             	$('#name').val(res.name);	             	
	             	$('#tel').val(res.mobile);	             	
					$('#city').val(res.province + res.city + res.area);					
					$('#address').val(res.address);
					that.choiceCity();
					that.editAddress();
	            }
	        });
		},
		//编辑地址
		editAddress: function(){
			var that = this;
			var str = location.search;
			var editID = parseInt(str.substring(1));
			$("#save").click(function(){
				var tel = $('#tel').val();
				var name = $('#name').val();
				var detail = $('#address').val();
				var addressCity = $('#city').val();
				var province = addressCity.split(',')[0];
				var city = addressCity.split(',')[1];
				var county = addressCity.split(',')[2];
				var num = '';
				if($('.anniu .cell-right span').hasClass("switch-on") ){
					num = 'y';
				}else if($('.anniu .cell-right span').hasClass("switch-off")){
					num = 'n';
				}
				that.checkMobile();
				//that.choiceCity();
				if(flag==true){
    				$.ajax({
			            type: "post",
			            url: glo+"/v1.0/address/updateAddress",
			            dataType: "json",
			            //contentType: 'application/json;charset=UTF-8',
			            data:{
			            	"id": editID,
			            	"account": account,
						    "city": city,
						    "area": county,
						    "address": detail,						    
						    "mobile": tel,
						    "province": province,
						    "isdefault": num,						    
						    "name": name
						},
						success:function(data){
							console.log(data)
						}
				    });
				}				
			})			
		},
		choiceCity: function(){
			var area2 = new LArea();
 			area2.init({
		        'trigger': '#city',
		        'valueTo': '#value',
		        'keys': {id: 'value',name: 'text'},
		        'type': 2,
		        'data': [provs_data, citys_data, dists_data]
		    });
		},
		checkMobile: function(){
			var moblie = $('#tel').val();
        	var regMobile = /^(1[34578][0-9]{9})$/;
			if(moblie == "") {
        		$(".bigbox").show();
				setTimeout(function () {
    				$(".bigbox").hide();
				}, 2000);  
        	}else if(regMobile.test(moblie) == false){
        		$(".bigbox").show();
				setTimeout(function () {
    				$(".bigbox").hide();
				}, 2000);  
            }else {
            	$(".bigbox").show();
				$('.error').attr('src','../images/z_successed.png')
				$('.write').html('保存成功');
				setTimeout(function () {
    				$(".bigbox").hide();
    				window.location.href="../html/Management_address.html"
				}, 2000);	
            	flag = true;
            }
		},
	}
	edit.init();
})
