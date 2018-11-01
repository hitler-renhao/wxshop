/* 选项卡 */
var btn = document.getElementById('btn');
var aLi = btn.getElementsByTagName('li');
for(var i = 0;i<aLi.length;i++){
	aLi[i].index = i;
	aLi[i].onclick = function(){
		for(var i = 0;i<aLi.length;i++){
			aLi[i].className = '';
		}
		this.className = 'active';
	}				
}
//倒计时
window.onload = function() {
	//	function countTime() {
	//		//获取当前时间  
	//		var date = new Date();
	//		//alert(date)
	//		var now = date.getTime();
	//		//设置截止时间  
	//		var endDate = new Date("2018-8-29 23:59:59");
	//		var end = endDate.getTime();
	//		//时间差  
	//		var leftTime = end - now;
	//		//console.log(leftTime)
	//		//定义变量 d,h,m,s保存倒计时的时间  
	//		var d, h, m, s;
	//		if(leftTime >= 0) {
	//			//              d = Math.floor(leftTime/1000/60/60/24);  
	//			h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
	//			//console.log(h)
	//			m = Math.floor(leftTime / 1000 / 60 % 60);
	//			//console.log(m)
	//			s = Math.floor(leftTime / 1000 % 60);
	//			//console.log(s)
	//		}
	//		//将倒计时赋值到div中  
	//		//          document.getElementById("_d").innerHTML = d+"天";  
	//		document.getElementById("_h").innerHTML = toDub(h);
	//		document.getElementById("_m").innerHTML = toDub(m);
	//		document.getElementById("_s").innerHTML = toDub(s);
	//		//递归每秒调用countTime方法，显示动态时间效果  
	//		setTimeout(countTime, 1000);
	//	}
	//	function toDub(n) {
	//      return n < 10 ? "0" + n : "" + n;
	//  };
	//	setTimeout(countTime, 1000);	
}
$(function(){
	var car = {
		init: function(){
			this.addNum = $('.change_num .add');
			this.reduceNum = $('.change_num .reduce');
			this.num = $('.change_num .num');
			this.allCheckbox = $('input[type="checkbox"]');
			this.wholeChexbox = $('.whole_check');
			this.goodsCheck = $('.son_check'); 
			this.delete = $('#balance .right .delete'); 
			this.edit = $('header .edit'); 
			
			this.shopping();
		},
		shopping: function(){
			var that = this;
			/*选中状态*/
			this.allCheckbox.click(function() {
				if ($(this).is(':checked')) {
		            $(this).prev('label').addClass('mark');
		        } else {
		            $(this).prev('label').removeClass('mark');
		        }
		        that.totalMoney();
			});
			/*全选,反选*/
			this.wholeChexbox.click(function() {
		        if ($(this).is(':checked')) {
		            that.goodsCheck.prop("checked", true);
		            that.goodsCheck.prev('label').addClass('mark');
		        } else {
		            that.goodsCheck.prop("checked", false);
		            that.goodsCheck.prev('label').removeClass('mark');
		        }
		        that.totalMoney();
		    });
		    /*全选与单个商品选择的关系*/
		    this.goodsCheck.each(function () {
		        $(this).click(function () {
		            if ($(this).is(':checked')) {
		                //判断：所有单个商品是否勾选
		                var len = that.goodsCheck.length;
		                var num = 0;
		                that.goodsCheck.each(function () {
		                    if ($(this).is(':checked')) {
		                        num ++;
		                    }
		                });
		                if (num == len) {
		                    that.wholeChexbox.prop("checked", true);
		                    that.wholeChexbox.prev('label').addClass('mark');
		                }
		            } else {
		                //单个商品取消勾选，全局全选取消勾选
		                that.wholeChexbox.prop("checked", false);
		                that.wholeChexbox.prev('label').removeClass('mark');
		            }
		        })
		    });
		    /*增加商品数量*/
		    this.addNum.click(function () {
		        var iptVal = $(this).prev('input');
		        var count = parseInt(iptVal.val()) + 1;
		        var obj = $(this).parents('.change_num').find('.reduce');
		        var priceTotalObj = $(this).parents('.change_num').siblings('.infor').find('.sum_price');
		        var price = $(this).parents('.change_num').siblings('.infor').find('.price').html();
		        var priceTotal = count * parseInt(price.substring(1));
		        iptVal.val(count);
		        priceTotalObj.html(priceTotal);
		        if(iptVal.val() > 1 && obj.hasClass('reSty')){
		            obj.removeClass('reSty');
		        }
		        that.totalMoney();
		    });
		    /*减少商品数量*/
		    this.reduceNum.click(function () {
		        var iptVal = $(this).next('input');
		        var count = parseInt(iptVal.val()) - 1;
		        var priceTotalObj = $(this).parents('.change_num').siblings('.infor').find('.sum_price');
		        var price = $(this).parents('.change_num').siblings('.infor').find('.price').html();
		        var priceTotal = count * parseInt(price.substring(1));
		        if(iptVal.val() > 1){
		            iptVal.val(count);
		            priceTotalObj.html(priceTotal);
		        }
		        if(iptVal.val()==1 && !$(this).hasClass('reSty')){
		            $(this).addClass('reSty');
		        }
		        that.totalMoney();
		    });
		    this.edit.click(function(event) {
		    	$(this).hide();
		    	$('.finish').show();
		    	$('.pay').hide();
		    	$('.delect').show();
		    	$('#balance .center').hide();
		    });
		    $('.finish').click(function(event) {
		    	$('header .edit').show();
		    	$('.finish').hide();
		    	$('.pay').show();
		    	$('.delect').hide();
		    	$('#balance .center').show();
		    });
		    /*显示,隐藏模态框*/
		    this.delete.click(function() {
		    	$('#model').fadeIn();
		    });
		    $('#model .box .no').click(function() {
		    	$('#model').fadeOut();
		    });
		    /*确定按钮,删除商品*/
		    $('#model .box .yes').click(function() {
		    	that.goodsCheck.each(function() {
		    		if ($(this).is(':checked')) {
		    			$(this).parents('li').remove();
		    			$(this).parents('.goods_check').siblings('.infor').find('.sum_price').html('0');
		    			$('#model').fadeOut();
		    			that.wholeChexbox.prop("checked", false);
		                that.wholeChexbox.prev('label').removeClass('mark');
		                $('#balance .center p i').html('￥0.00');
	        			$('#balance .right p i').html('0');
		    		}
		    	});
		    	if ($('#items').children().length == 0) {
					$('#container').css({ display: 'none' });
					$('#kong').css({ display: 'block' });
    			}
		    });
		},
		totalMoney: function(){
			var total_money = 0;
	        var total_count = 0;
	        this.goodsCheck.each(function () {
	            if ($(this).is(':checked')) {
	                var goods = parseInt($(this).parents('.goods_check').siblings('.infor').find('.sum_price').html());
	                total_money += goods;
	            }
	        });
	        $('#balance .center p i').html('￥'+total_money);
	        $('#balance .right p i').html(total_money);
		}
	}
	car.init();
})