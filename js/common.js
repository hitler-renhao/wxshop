(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var global = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
var globa = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
//10.0.232.197
var glob = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
var glo = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
var qqq = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';

//cookie
//var geoProvince,geoCity,geoAddress;
//var geoCity2 = geoCity1

////console.log('23',geoCity2)
//var t=setTimeout("console.log('23',geoCity2)",2000)
function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
// global = 'http://test.bjysjglasses.com:8084/app/ysj/app'  // 测试线

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}


//console.log(geocitt)
