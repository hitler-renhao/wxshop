$(function(){	
	var str = location.search;			
	var editId = parseInt(str.substring(1));
	console.log(editId)
	var optometry = {
		init: function(){
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.getUserId();
			this.waitEdit();
			this.editOptometry();
		},
		//获取userId
		getUserId: function(){
			$.ajax({
				url: global+'/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid" : optometry.openId
				},
				success: function(data){
					var res = data.data;
					optometry.userId = res.userId;
				}
			});
		},
		//根据id获取单个验光单
		waitEdit: function(){				
			$.ajax({
	            type: "post",
	            url: glob+"/v1.0/prescription/selectPrescription",
	            dataType: "json",
	            data:{
	            	"id": editId,
	            	"pageNum":1,
	            	"pageSize":1
	            },
	            success: function(data){
	            	console.log(data);
	            	var res = data.data.list[0];
	            	$('#rp1RightQiujing').val(res.rp1RightQiujing);
	            	$('#rp1RightZhujing').val(res.rp1RightZhujing);
	            	$('#rp1RightZhouwei').val(res.rp1RightZhouwei);
	            	$('#rp1LeftQiujing').val(res.rp1LeftQiujing);
	            	$('#rp1LeftZhujing').val(res.rp1LeftZhujing);
	            	$('#rp1LeftZhouwei').val(res.rp1LeftZhouwei);
	            	$('#rp1RightTongju').val(res.rp1RightTongju);
	            	$('#rp1LeftTongju').val(res.rp1LeftTongju);
	            	$('#rp1RightTonggao').val(res.rp1RightTonggao);
	            	$('#rp1LeftTonggao').val(res.rp1LeftTonggao);
	            	$('#rp1RightJiaozhengshili').val(res.rp1RightJiaozhengshili);
	            	$('#rp1Jiaozhengshili').val(res.rp1Jiaozhengshili);
	            	$('#rp1LeftJiaozhengshili').val(res.rp1LeftJiaozhengshili);
	            	$('#rp1RightAdd').val(res.rp1RightAdd);
	            	$('#rp1LeftAdd').val(res.rp1LeftAdd);
					//that.editOptometry()				
	            }
	        });
		},
		//编辑验光单
		editOptometry:function(){	
			$('.add_box').click(function(){ 
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
//				if(rp1LeftQiujing == '' || rp1RightQiujing == '' || rp1LeftZhujing == '' || leftcyl == ''|| rightcyl == ''|| leftaxis == ''|| rightaxis == ''||eysPd=='') {
//					$(".bigbox").show();
//					$('.write').html('信息不能为空');
//					setTimeout(function() {
//						$(".bigbox").hide();
//					}, 2000);
//				}
				$.ajax({
					type: "post",
		            url: glob+"/v1.0/prescription/updatePrescription",
		            dataType: "json",		            
		            //contentType: 'application/json;charset=UTF-8',
		            data:{
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
					    "rp1LeftAdd":rp1LeftAdd,
					    "id":editId
		            },
		            success:function(){
		            	$(".bigbox").show();
						$('.error').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/z_successed.png')
						$('.write').html('保存成功');
						setTimeout(function () {
		    				$(".bigbox").hide();
		    				window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/Optometry_management.html';
						}, 2000);			            	
		            }	            
				})				
			})
		}	
	}
	optometry.init();
})
