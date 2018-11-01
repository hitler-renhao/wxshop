$(function(){
	var openid = getCookie('openid');
	var add = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.getUserId();
			this.addOptometry();
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
		addOptometry: function(){
			$(".add_box").click(function(){
				var rp1LeftQiujing = $('#rp1LeftQiujing').val();
				var rp1RightQiujing = $('#rp1RightQiujing').val();
				var rp1LeftZhujing = $('#rp1LeftZhujing').val();
				var rp1RightZhujing = $('#rp1RightZhujing').val();
				var rp1LeftZhouwei = $('#rp1LeftZhouwei').val();
				var rp1RightZhouwei = $('#rp1RightZhouwei').val();
				var rp1LeftJiaozhengshili = $('#rp1LeftJiaozhengshili').val();
				var rp1RightJiaozhengshili = $('#rp1RightJiaozhengshili').val();
				var rp1Jiaozhengshili = $('#rp1Jiaozhengshili').val();
				var rp1LeftTongju = $('#rp1LeftTongju').val();
				var rp1RightTongju = $('#rp1RightTongju').val();
				var rp1LeftTonggao = $('#rp1LeftTonggao').val();
				var rp1RightTonggao = $('#rp1RightTonggao').val();
				var rp1LeftAdd = $('#rp1LeftAdd').val();
				var rp1RightAdd = $('#rp1RightAdd').val();
//				if(name == '' || leftsph == '' || rightsph == '' || leftcyl == ''|| rightcyl == ''|| leftaxis == ''|| rightaxis == ''||eysPd=='') {
//					$(".bigbox").show();
//					$('.write').html('信息不能为空');
//					setTimeout(function() {
//						$(".bigbox").hide();
//					}, 1000);
//				}
				$.ajax({
		            type: "POST",
		            url: glob+"/v1.0/prescription/savePrescription",
		            dataType: "json",
		            //contentType: 'application/json;charset=UTF-8',
		            data:{
		            	"createBy":openid,//openId
					    "rp1LeftQiujing":rp1LeftQiujing,
					    "rp1RightQiujing":rp1RightQiujing,
					    "rp1LeftZhujing":rp1LeftZhujing,
					    "rp1RightZhujing":rp1RightZhujing,
					    "rp1LeftZhouwei":rp1LeftZhouwei,
					    "rp1RightZhouwei":rp1RightZhouwei,
					    "rp1LeftJiaozhengshili":rp1LeftJiaozhengshili,
					    "rp1RightJiaozhengshili":rp1RightJiaozhengshili,
					    "rp1Jiaozhengshili":rp1Jiaozhengshili,
					    "rp1LeftTongju":rp1LeftTongju,
					    "rp1RightTongju":rp1RightTongju,
					    "rp1LeftTonggao":rp1LeftTonggao,
					    "rp1RightTonggao":rp1RightTonggao,
					    "rp1RightAdd":rp1RightAdd,
					    "rp1LeftAdd":rp1LeftAdd
					    
					},
					success:function(data){
						$(".bigbox").show();
						$('.error').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/z_successed.png')
						$('.write').html('保存成功');
						setTimeout(function () {
		    				$(".bigbox").hide();
		    				//window.location.href = 'Optometry_management.html';
						}, 1000);						
					},
					error: function(){
						console.log('出错啦');
					}
				});							
			})			
		}		
	}
	add.init();
})
