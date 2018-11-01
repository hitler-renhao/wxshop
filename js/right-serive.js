$(function () {

  var valav1 = sessionStorage.getItem('valav1');
  if (!valav1) {
    $('#serive9').val('选择服务内容');
  } else {
    $('#serive9').val(valav1);
  }

  var account = getCookie("account");
  $.ajax({
    url: global + '/v1.0/bespeak/currentOrderGoodsList',
    type: 'post',
    dataType: 'json',
    data: {
      "accountId": account
    },
    success: function (data) {
      console.log(data.data.length)
      var resle = data.data.length
      if (resle > 0) {
        localStorage.setItem("abc", "abc");
      }
    }
  });

  var area1 = new LArea();
  area1.init({
    'trigger': '#city2',
    'valueTo': '#value2',
    'keys': {
      id: 'value',
      name: 'text'
    },
    'type': 2,
    'data': [provs_data, citys_data, dists_data]
  });
});

//		var geoProvince,geoCity,geoAddress;
function supportsGeoLocation() {
  return !!navigator.geolocation;
}
// 单次位置请求执行的函数             
function getLocation() {
  navigator.geolocation.getCurrentPosition(mapIt, locationError);
}
// 定位失败时，执行的函数
function locationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      layer.msg("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      layer.msg("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      layer.msg("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      layer.msg("An unknown error occurred.");
      break;
  }
}
//定位成功时，执行的函数
function mapIt(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  alert("您位置的经度是：" + lon + " 纬度是：" + lat);
  //			var map = new BMap.Map("allmap");
  //			var point = new BMap.Point("" + lon + "", "" + lat + "");
  //			var gc = new BMap.Geocoder();
  //			var marker = new BMap.Marker(point);
  //			gc.getLocation(point, function(rs) {
  //				var addComp = rs.addressComponents;
  //				geoProvince = addComp.province;
  //				geoCity = addComp.city;
  //				console.log(geoCity,addComp,geoProvince)
  //				if(addComp.province !== addComp.city) {
  //					geoAddress = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
  //				} else {
  //					geoAddress = addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
  //				}
  //				$('#allmap').css('display',"none");
  //			});
}

$(function () {
  // $('#shopchose1').hide()
  // $('#shopchose2').hide()

  var userID = getCookie('userId');
  $('#beginTime').date({
    theme: "datetime"
  });
  $('#endTime').date({
    theme: "datetime"
  });
  $('.type a').on('click', function () {
    $(this).addClass('serive9').siblings().removeClass('serive9');
    if ($('.serive9').html() == "上门服务") {
      // console.log('1')
      // 	$('.timea span').html('20')
      // 	$('.address').show();
      // 	$('#shopchose1').hide()
      // 	$('#serive9').val('')
    } else if ($('.serive9').html() == "进店服务") {
      console.log('2')
      $('.timea span').html('50')
      $('.address').hide();
      $('#shopchose1').show();
      $('#serive9').val('')
    }
  })

  var serive9 = $('#serive9').val();
  var aradius = $('.word1 span img');
  var arr = [];
  $('#serive9').on('click', function () {
    // if ($('.type a').hasClass('serive9')) {
    $('.bigbox1').show();
    //$(this).parents().find('.word1 span img').on('click',function(){

    // if ($('.serive9').html() == "上门服务") {
    // $('.word1 span:nth-child(1) p').html('眼镜清洗,')
    // $('.word1 span:nth-child(2) p').html('眼镜维护,')
    // $('.word1 span:nth-child(3) p').html('视力健康规划,')
    // $('.word1 span:nth-child(4)').css("display",'none')

    // }else if($('.serive9').html()=="进店服务"){
    $('.word1 span:nth-child(4)').css("display", 'block')
    $('.word1 span:nth-child(1) p').html('验光配镜')
    // $('.word1 span:nth-child(2) p').html('视功能检查,')
    // $('.word1 span:nth-child(3) p').html('隐形眼镜评估,')
    // $('.word1 span:nth-child(4) p').html('青少年近视评估,')
    // }
    aradius.on('click', function () {
      //alert(1);
      $(this).attr('src', 'http://wx.bjysjglasses.com/static/wxshop/images/z_selected.png');
      $(this).next().addClass('inro');
      //							var textval =$(this).parents().find('.inro').text();
    })
    $('.sure1').on('click', function () {
      var arr = [];

      sessionStorage.setItem('valav1', $('.word1 p.iptttt').html());


      $('.bigbox1').hide();
      var textval = $(this).parents().find('.inro').text();
      var flag = localStorage.getItem('abc');
      if (!flag) {
        layer.alert(
          '规则不对，请前往购买商品',
          {title:'温馨提示'}
        );
        $('#layui-layer1 .layui-layer-btn0').click(function () {
          location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/index.html';
        })
      } else {
        layer.confirm(
          '1.如果您想购买商品后，进行预约服务，请在购买商品结算以后去”预约验光“界面预约<br/>2.预约商品类型为整套商品（即：镜片+镜框），后续还会有更多预约服务，敬请期待。<br/>3.所有您购买的商品发货时间为当日 早8：00-晚8：00（如有其他问题请联系客服）',
          {title:'温馨提示'}
        );
        $('#layui-layer1 .layui-layer-btn1').css({
          'visibility': 'hidden',
          'display': 'none'
        });
        $('#layui-layer1 .layui-layer-btn0').click(function () {
          location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html';
        })
      }
      arr.push(textval);
      $('#serive9').val(arr);
    })
    // } else {
    // 	//alert(2)

    // 	$('.typebox').show();
    // }

  })
  $('#close').on('click', function () {
    $('.bigbox1').hide();
  })
  $('.boxTop img').on('click', function () {
    $('.typebox').hide();
  })
  $('.bigs').on('click', function () {
    $('.typebox').hide();
  })
  // $('#sm').click(function () {

  //   var shopid = $("#selectshop1 option:selected").attr('id') - 0;
  //   // var shopIID = sessionStorage.getItem("shopIID");
  //   var userID = getCookie('userId');
  //   var username = $('#username').val();
  //   var userphone = $('#userphone').val();
  //   var gtime = $('#beginTime').val();
  //   var bigaddress = $('#city2').val();
  //   if (username == '' || userphone == '' || gtime == '' || bigaddress == '') {
  //     alert('请将信息填写齐全')
  //     console.log(username)
  //   } else {
  //     alert('预约成功');
  //     localStorage.clear();
  //     console.log(username)
  //     $('#btn').attr('disabled',true)
  //     $('#sm').attr('disabled',true)
  //   }
  //   var moneyy = $('.timea span').html();
  //   var smalladd = $('#smallcity').val()
  //   var servertype = $('.serive9').html() //服务类型
  //   var servercont = $('#serive9').val();
  //   var bespeakremake = $('.texta').val() //备注
  //   var arrTime = gtime.split(' ');
  //   var badd = bigaddress.split(',');
  //   var date1 = arrTime[0];
  //   var acc = userID;
  //   var time = arrTime[1];
  //   var time1 = time.split('-')[0];
  //   var time2 = time.split('-')[1];
  //   var stime = date1 + ' ' + time1
  //   var entime = date1 + ' ' + time2
  //   var pcode = badd[0]
  //   var ccode = badd[1]
  //   var code = badd[2]
  //   if ($('.serive9').html() == "上门服务") {
  //     var addres = smalladd
  //   } else if ($('.serive9').html() == "进店服务") {
  //     var addres = 123
  //   }
  //   var data = {
  //     "userid": userID, //用户ID
  //     "username": username, //用户名
  //     "phone": userphone, //电话		
  //     "bespeaktimestart": stime, //预约开始时间
  //     "bespeaktimeend": entime, //预约结束时间
  //     "pcode": pcode, //省
  //     "ccode": ccode, //市
  //     "code": code, //县
  //     "bespeakaddress": addres, //纤细地址
  //     "servicetype": servertype,
  //     "servicecontent": servercont,
  //     "bespeakremake": bespeakremake,
  //     "bespeakamount": moneyy,
  //     "shopid": shopid,
  //   }
  //   var datt = data.toString()

  //   $.ajax({
  //     url: globa + "/v1.0/bespeak/addImmediateBespeak",
  //     type: 'post',
  //     dataType: 'json',
  //     data: data,
  //     success: function (data) {
  //       console.log(data)
  //       var aa = console.log(data.code)
  //       var re = data.data;
  //       var openid = getCookie('openid');

  //       $.ajax({
  //         type: "post",
  //         url: global + "/v1.0/WXPayController/H5Pay",
  //         dataType: "json",
  //         async: 'true',
  //         data: {
  //           "vo_body": "预约订单-" + re.bespeaknumber,
  //           "vo_openid": openid,
  //           "vo_total_fee": re.bespeakamount,
  //           "vo_out_trade_no": re.bespeaknumber,

  //         },
  //         success: function (data) {
  //           console.log(474, data)
  //           var res = data.data;
  //           onBridgeReady(res);
  //         }
  //       });
  //     }
  //   });

  //   function onBridgeReady(res) {
  //     WeixinJSBridge.invoke(
  //       'getBrandWCPayRequest', {
  //         "appId": res.appId,
  //         "timeStamp": res.timeStamp,
  //         "nonceStr": res.nonceStr,
  //         "package": res.package,
  //         "signType": "MD5",
  //         "paySign": res.paySign
  //       },
  //       function (res) {
  //         if (res.err_msg == "get_brand_wcpay_request:ok") {
  //           alert('支付成功!')
  //           window.location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/my_reservation.html?' + acc
  //         } else if (res.err_msg == "total_fee") {
  //           alert('支付会话标识prepay_id已失效!')
  //         }

  //       }
  //     );
  //   }
  //   if (typeof WeixinJSBridge == "undefined") {
  //     if (document.addEventListener) {
  //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  //     } else if (document.attachEvent) {
  //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
  //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  //     }
  //   } else {
  //     onBridgeReady();
  //   }

  // })
})


var abtn = document.getElementById('aBtn');
var aLi = abtn.getElementsByTagName('li');
var content = document.getElementById('container');
var aDiv = content.getElementsByTagName('form');
for (var i = 0; i < aLi.length; i++) {
  aLi[i].index = i;
  aLi[i].onclick = function () {
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].className = '';
      aDiv[i].className = '';
    }
    this.className = 'active';
    aDiv[this.index].className = 'showbox';
  }
}


$(function () {
  $('#shopchose').hide()
  $('#server option:nth-child(4)').hide()
  var userID = getCookie('userId');
  $('#beginTime').date({
    theme: "datetime"
  });
  $('#endTime').date({
    theme: "datetime"
  });
  $('.type2 a').on('click', function () {
    // console.log('aaa')
    $(this).addClass('serive92').siblings().removeClass('serive92');
    // if ($('.serive92').html() == "上门服务") {
    // $('.timeb span').html('20');
    // $('.address').show();
    // $('#shopchose2').hide()
    // $('#server option:nth-child(1)').html('眼镜清洗,')
    // $('#server option:nth-child(2)').html('眼镜维护,')
    // $('#server option:nth-child(3)').html('视力健康规划,')
    // $('#server option:nth-child(4)').hide()
    // } else if ($('.serive92').html() == "进店服务") {
    $('.timeb span').html('50')
    $('.address').hide();
    $('#shopchose2').show()
    $('#server option:nth-child(4)').css("display", 'block')
    $('#server option:nth-child(1)').html('综合验光,')
    $('#server option:nth-child(2)').html('视功能检查,')
    $('#server option:nth-child(3)').html('隐形眼镜评估,')
    $('#server option:nth-child(4)').html('青少年近视评估,')
    // }
  })
  var serive92 = $('#serive92').val();

  var aradius = $('.word1 span img');
  var arr = [];
  $('#serive92').on('click', function () {
    // console.log('0')
    // if ($('.type2 a').hasClass('serive92')) {
    // console.log('1')
    $('.bigbox1').show();
    // if ($('.serive92').html() == "上门服务") {
    // 	$('.word1 span:nth-child(1) p').html('眼镜清洗,')
    // 	$('.word1 span:nth-child(2) p').html('眼镜维护,')
    // 	$('.word1 span:nth-child(3) p').html('视力健康规划,')
    // 	$('.word1 span:nth-child(4)').css("display", 'none')
    // 	$('.timeb span').html('20')
    // } else if ($('.serive92').html() == "进店服务") {
    $('.word1 span:nth-child(4)').css("display", 'block')
    $('.word1 span:nth-child(1) p').html('验光配镜')
    // $('.word1 span:nth-child(2) p').html('视功能检查,')
    // $('.word1 span:nth-child(3) p').html('隐形眼镜评估,')
    // $('.word1 span:nth-child(4) p').html('青少年近视评估,')
    // $('.timeb span').html('20')
    // }
    aradius.on('click', function () {
      //alert(1);
      $(this).attr('src', 'http://wx.bjysjglasses.com/static/wxshop/images/z_selected.png');
      $(this).next().addClass('inro');
    })
    $('.sure1').on('click', function () {
      var arr = [];

      sessionStorage.setItem('valav1', $('.word1 p.iptttt').html());

      $('.bigbox1').hide();
      var textval = $(this).parents().find('.inro').text();
      // var flag = localStorage.getItem('abc');
      var flag = '';
      if (!flag) {
        layer.alert(
          '规则不对，请前往购买商品',
          {title:'温馨提示'}
        );
        $('#layui-layer1 .layui-layer-btn0').click(function () {
          location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/index.html';
        })
      } else {
        layer.confirm(
          '1.如果您想购买商品后，进行预约服务，请在购买商品结算以后去”预约验光“界面预约<br/>2.预约商品类型为整套商品（即：镜片+镜框），后续还会有更多预约服务，敬请期待。<br/>3.所有您购买的商品发货时间为当日 早8：00-晚8：00（如有其他问题请联系客服）',
          {title:'温馨提示'}
        );
        $('#layui-layer1 .layui-layer-btn1').css({
          'visibility': 'hidden',
          'display': 'none'
        });
        $('#layui-layer1 .layui-layer-btn0').click(function () {
          location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html';
        })
      }
      arr.push(textval);
      $('#serive92').val(arr);
    })
    // } else {
    // 	console.log('2')
    // 	$('.typebox').show();
    // }

  })
  $('#close').on('click', function () {
    $('.bigbox1').hide();
  })
  $('.boxTop img').on('click', function () {
    $('.typebox').hide();
  })
  $('.bigs').on('click', function () {
    $('.typebox').hide();
  })
  //				$('#sm').click(function(){
  //					var userID = getCookie('userId');
  //					var username = $('#username').val();
  //					var userphone = $('#userphone').val();
  //					var gtime = $('#beginTime').val();
  //					var bigaddress = $('#city2').val();
  //					var smalladd = $('#smallcity').val()
  //					var servertype = $('.serive9').html()   //服务类型
  //					var servercont = $('#serive9').val();
  //					var bespeakremake = $('.texta').val()                   //备注
  //					var arrTime = gtime.split(' ');
  //					var badd = bigaddress.split(',');
  //					var date1 = arrTime[0];
  //					var time = arrTime[1];
  //					var time1 = time.split('-')[0];
  //					var time2 = time.split('-')[1];
  //					var stime = date1+' '+time1
  //					var entime = date1+' '+time2
  //					var pcode = badd[0]
  //					var ccode = badd[1]
  //					var code = badd[2]
  //					var data = {
  //						"userid":userID,                 //用户ID
  //						"username":username,       //用户名
  //						"phone":userphone,	       //电话		
  //						"bespeaktimestart":stime,  //预约开始时间
  //						"bespeaktimeend":entime,   //预约结束时间
  //						"pcode":pcode,			   //省
  //						"ccode":ccode,             //市
  //						"code":code,			   //县
  //						"bespeakaddress":smalladd,  //纤细地址
  //						"servicetype":servertype,
  //						"servicecontent":servercont,
  //						"bespeakremake":bespeakremake
  //					}
  //					var datt = data.toString()
  //					console.log(typeof(data))
  //					$.ajax({
  //				//				url: global+'/v1.0/address/queryDefaultAddress',
  //				//				url: global+'/v1.0/address/getAddressById',
  //				url: globa + "/v1.0/bespeak/addImmediateBespeak",
  //				type: 'post',
  //				dataType: 'json',
  //				data: data,
  //				success: function(data) {
  //					console.log(data)
  //					var aa = console.log(data.code)
  //					alert(data.msg)
  //				}
  //			});
  //					
  //					
  //					
  //				})
})