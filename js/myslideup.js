(function($){
	$.fn.extend({
		"slideUp":function(value){
			var docthis = this;
			//默认参数
			value = $.extend({
				 "time":3000,
				 "movetime":2000
			},value)
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":"-0.7rem"},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".line");
				})
			}
			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
			//悬停时停止滑动，离开时继续执行
			$(docthis).children("li").hover(function(){
				clearInterval(anifun);
			},function(){
				anifun = setInterval(autoani,value.time);	
			})
		}	
	})
})(jQuery)