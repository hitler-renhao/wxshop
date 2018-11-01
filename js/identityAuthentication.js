$(function(){
	layui.use(['form','upload'],function(data){
		var form = layui.form,
	    layedit = layui.layedit;
	    upload = layui.upload;
		var optistId = getCookie("loginUserId");
		var value_attr1 = $('.formImg1');
		var value_attr2 = $('.formImg2');
		var value_attr3 = $('.formImg3');
		$('.back').click(function(){
			window.history.go(-1);
		})
		$.ajax({
			type:'post',
			url:locats+"/v1.0/LoginRegister/getByOptistNum",
			data:{
				optistNum:optistId,
			},
			success:function(data){
				var data = data.data;
				$('.optistname').val(data[0].optistname);
				$('.optistidcard').val(data[0].optistidcard);
				$('.optistidcardjob').val(data[0].jobname);
				$('#faces').attr('src',data[0].image1);
				$('#backs').attr('src',data[0].image2);
				$('#photos').attr('src',data[0].image3);
			}
		})
		//图片上传
	    var uploadInst = upload.render({
		    elem: '#faces',
		    url:locats +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#faces').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
		      	value_attr1.val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});
		var uploadInst = upload.render({
		    elem: '#backs',
		    url:locats +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#backs').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
		      	value_attr2.val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});
		var uploadInst = upload.render({
		    elem: '#photos',
		    url:locats +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#photos').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
		      	value_attr3.val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});
		$('.btn').click(function(){
			var value_attr4=[];
            var value_str = ''; 
            var image1=$('.formImg1').val();
            var image2=$('.formImg2').val();
            var image3=$('.formImg3').val();
			var optistname=$('.optistname').val();
			var optistidcard=$.trim($('.optistidcard').val());
			var optistidjob=$('.optistidcardjob').val();
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if(!optistname){
				layer.msg('请输入姓名，不能为空');
				return false;
			}
			if(!optistidcard){
				layer.msg('请输入身份证号码，不能为空');
				return false;
			}else if (!reg.test(optistidcard)) {
				layer.msg('请输入有效的身份证号码');
				return false;
			}
			$.ajax({
				type:"post",
				url:locats+"/v1.0/LoginRegister/updateIdentification",
				data:{
					id:optistId,
					optistidcard:optistidcard,
					optistname:optistname,
					jobname:optistidjob,
					status:1,
					image1:image1,
					image2:image2,
					image3:image3
				},
				success:function(data){
					if(data.code==200){
						layer.msg('提交成功！');
						window.location.href = "/static/app/html/perfectInformation.html?type=0";
					}
				}
			});
		})
	})
})
