$(function() {
	var openId = getCookie('OPENIDCOOKIENAME')
	var opInfo = {
		init: function() {
			this.getUserId();
			this.info();
			this.openId = $.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			
		},
		//获取userId
		getUserId: function() {
			$.ajax({
				url: globa + '/v1.0/user/queryUserByOpenid',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"openid": $.cookie('OPENIDCOOKIENAME')
				},
				success: function(data) {
					var res = data.data;
					edit.userId = res.userId;
				}
			});
		},
		info: function() {
			//根据id获取
			//alert('123')
			var kk = location.search.split('?')[1].split('&');
			var infoId = kk[0].split('=')[1];
			//console.log(infoId);			
			//获取评分
			var score = kk[1].split('=')[1];
			console.log(score);
			$.ajax({
				url: globa + '/v1.0/optometrist/getOptometristInfo',
				type: 'post',
				dataType: 'json',
				async: false,
				data: {
					"id": infoId
				},
				success: function(data) {
					var str1 = '';
					var aaa = "";
					var fours;
					console.log(data)
					var res = data.data;
					console.log(res);
					var job;
					if(res.job == 0) {
						job = '验光师'
					}
					//星级判断					
					if(parseInt(score) >= 0 && parseInt(score) <= 20) {
						aaa = "http://wx.bjysjglasses.com/static/wxshop/images/star.png";
						fours = 1;
						$('.star').css('marginLeft', '3.2rem')
					} else if(parseInt(score) > 20 && parseInt(score) <= 40) {
						aaa = "http://wx.bjysjglasses.com/static/wxshop/images/two.png";
						fours = 2;
						$('.star').css('marginLeft', '3rem')
					} else if(parseInt(score) > 40 && parseInt(score) <= 60) {
						aaa = "http://wx.bjysjglasses.com/static/wxshop/images/three.png";
						fours = 3;
						$('.star').css('marginLeft', '2.8rem')
					} else if(parseInt(score) > 60 && parseInt(score) <= 80) {
						aaa = "http://wx.bjysjglasses.com/static/wxshop/images/four.png";
						fours = 4;
						$('.star').css('marginLeft', '2.6rem')
					} else if(parseInt(score) > 80 && parseInt(score) <= 100) {
						aaa = "http://wx.bjysjglasses.com/static/wxshop/images/wu.png";
						fours = 5;
						$('.star').css('marginLeft', '2.5rem')
					} else if(score == 'null') {
						aaa = "";
						fours = 0;
						$('.star').css('marginLeft', '3.5rem')
					}
					var crmId = res.id;
					var names = res.optistname;
					//console.log(names);
					//console.log(crmId);
					
					var str1 = '<img src="' + aaa + '"  />' +
						'<span>' + fours + '分</span>'
					$('.star').html(str1);
					var str = '';
					$('.name').html(res.optistname);
					$('.userinfo span').html(job);
					$('.begoodat').html(res.begoodat);
					$('.createby').html(res.createby);
					$('.price').html(res.chargestandard) //收费
					$('#sure').on('click', function() {
						sessionStorage.setItem("optionId", crmId);
						sessionStorage.setItem("names", names);
						url = "http://wx.bjysjglasses.com/static/wxshop/html/res_infor.html?"+'q';
						window.location.href = url;
						//localStorage.setItem("b",names);//设置b为"isaac"
//						setCookie("names",names,24*60*60);
//						setCookie("crmId",crmId,24*60*60);
					})
					
				}
			});
		},
		
	}
	opInfo.init();
})