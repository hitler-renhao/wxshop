$(function(){
	var openId = getCookie('openid');
	var userHead = getCookie("userHead");
	var nickName = getCookie("nickName");
	sessionStorage.removeItem('valav1');
	sessionStorage.removeItem('valav');
	$('.head_portrait img').attr("src",userHead);
	//console.log(nickName);
	$('.info').html(nickName);
//	Personal = {
//		init: function(){
//			this.openId = $.cookie('OPENIDCOOKIENAME');//o1K4o06zzK-V4ItZZ4AIsvLxG5J4
//			this.PersonalInfor();
//		},
//		PersonalInfor: function(){
//			$.ajax({
//				url: global+'/v1.0/user/queryUserByOpenid',
//				type: 'post',
//				dataType: 'json',
//				data: {
//					"openid" : openId
//				},
//				success: function(data){
//					var res = data.data;
//					console.log(res);
//					var userHead = res.userHead;
//					var userName = res.userName;
//					var str = '<div class="head_portrait">'
//							+	'<img src="'+ userHead +'" alt="头像" />'
//							+  '</div>'
//							+  '<span class="info">'
//							+	 '<p>'+ userName +'</p>'
//							+  '</span>';
//					$('.content_top').html(str);
//				}
//			});
//		}
//	}
//	Personal.init();
})