$(function(){
	var flag = false;
	var account = getCookie("account");
	var add = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');
			//this.userId = '';
			this.getUserId();
			this.addAddress();
			this.choiceCity();
		},
		//获取userId
		getUserId: function(){
			$.ajax({
				url: global+'/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid" : add.openId
				},
				success: function(data){
					var res = data.data;
					add.userId = res.userId;
				}
			});
		},
		addAddress: function(){
			var that = this;
			$("#save").click(function(){
				var tel = $('#tel').val();
				var name = $('#name').val();
				var detail = $('#address').val();
				var addressCity = $('#city').val();
				var province = addressCity.split(',')[0];
				var city = addressCity.split(',')[1];
				var county = addressCity.split(',')[2];
				var num = '';
				var user = '1';
				console.log(typeof(user))
				if($('.anniu .cell-right span').hasClass("switch-on") ){					
					num = 'y';
				}else if($('.anniu .cell-right span').hasClass("switch-off")){
					num = 'n';
				}
				that.checkMobile();
				if(flag==true){
    				$.ajax({
			            type: "Post",
	            		url: glob + "/v1.0/address/addAddress",
			            dataType: "json",			            
			            data:{
			            	//"id":1,
			            	"account":account,			            	
						    "city": city,
						    "area": county,
						    "address": detail,
						    "mobile": tel,
						    "province": province,
						    "isdefault": num,						    
						    "name": name
						},
						success:function(data){
							console.log(data);

							window.location.href="http://wx.bjysjglasses.com/static/wxshop/html/Management_address.html"  
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
				$('.error').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/z_successed.png')
				$('.write').html('保存成功');
				setTimeout(function () {
    				$(".bigbox").hide();
      				window.location.href="http://wx.bjysjglasses.com/static/wxshop/html/Management_address.html"
				}, 2000);	
            	flag = true;
            }
		},
	}
	add.init();
})
