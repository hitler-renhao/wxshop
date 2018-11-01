$(function(){	
	var orderTracking = {
		init: function(){
			this.logisticsIfon();			
		},
		logisticsIfon: function(){
			var that = this;	
			var str = location.search;
			var orderNum = parseInt(str.substring(1));
			//console.log(orderNum);
			$.ajax({
	            type: "post",
	            url: glob+"/v1.0/logistics/huntInfo",
	            dataType: "json",
	            //contentType: 'application/json;charset=UTF-8',
	            data:{					    
					"number": orderNum,  //214203242882  快递单号
					//"company":'yuantong'
				},
				success:function(data){
					console.log(data);
					//var data = JSON.parse(data.msg);
					var res = data.data.data;
					var str = '';
					var html = '';
					html += '<img class="logo" src="http://wx.bjysjglasses.com/static/wxshop/images/logo.png">'
						 +  '<p>配送企业：圆通快递</p>'
						 +	'<p>快递单号：'+ data.data.nu +'</p>'
						 +	'<p>联系电话：95338</p>'
					$('#express').append(html)
					for(var i=0;i<res.length;i++){
						str += '<li>'
							+  		'<img class="cir" src="http://wx.bjysjglasses.com/static/wxshop/images/cir1.png">'
							+  		'<i></i>'
							+  		'<p class="text">' + res[i].context + '</p>'
							+  		'<p class="time">' + res[i].time + '</p>'
							+  '</li>'
					}
					$('.con').append(str);
					$('.con li:first-child').find('.cir').attr('src','http://wx.bjysjglasses.com/static/wxshop/images/cir.png')
				}						
		    });														
		}		
	}
	orderTracking.init();
})
