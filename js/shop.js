$(function(){
	var sunNmae = '';
	sessionStorage.removeItem('valav1');
	sessionStorage.removeItem('valav');
	var shop = {
		init:function(){
			this.shopType();
		},
		shopType:function(){
			$.ajax({
	            type: "get",
	            url: glob + "/v1.0/goods/queryCatalog",
	            dataType: "json",
	            //contentType: 'application/json;charset=UTF-8',	            
	            async:true,
	            success:function(data){
	            	console.log(data);
	            	var res = data.data;
	            	var str = '';
	            	for(var i=0;i<res.length;i++){
	            		str +='<div class="shop_mesu" id="sunglasses" name="'+res[i].name+'">'
	            			+   '<input type="hidden" class="ipt" id="'+ res[i].id +'" value="'+ res[i].id +'"/>'
							+	'<a href="javascirpt:;" class="shop_img">'
							+		'<img src="'+ res[i].imageurl +'" />'
							+	'</a>'
							+	'<span class="shop_title">'
							+		'<span>'
							+			'<p>'+ res[i].name +'</p>'
							+			'<p>'+ res[i].introduce +'</p>'
							+		'</span>'						
							+	'</span>'
							+'</div>'
	            	}
	            	$('.content').append(str);
	            	//跳转商品列表
	            	$('.content div').on("click",function(){
	            		var shopListId = $(this).find('.ipt').attr('id');
	            		//console.log(shopListId);
	            		var sunName =  $(this).attr('name');
						console.log(sunName);
						setCookie("sunName",sunName,24*60*60);
	            		window.location.href="http://wx.bjysjglasses.com/static/wxshop/html/sunglasses.html?id="+ shopListId;
	            	})
	            }
		    });
		}
	}
	shop.init();
})
