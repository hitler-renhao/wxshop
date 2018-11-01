$(function() {
	var sckill = {
		init: function() {
			this.sckillList();
		},
		sckillList: function() {
			var that1 = this;
			var timer = null;
			$.ajax({
				type: "post",
				url: glob + "/v1.0/secKill/secKillGoodListName",
				async: true,
				success: function(data) {
					console.log(data);
					var res = data.data.allName;
					var str = '';
					var that = $(this);
					for(var i = 0; i < res.length; i++) {
						var time = res[i].startTime.split(':');
						//console.log(time);
						str += '<li class="swiper-slide" id="' + res[i].stageId + '">' +
							'<span>' +
							'<time>' + time[0] + ':' + time[1] + '</time>' +
							'<p id="timera">已开抢</p>' +
							'</span>' +
							'</li>'
					}
					$('#btn').append(str);
					var btn = document.getElementById('btn');
					var aLi = btn.getElementsByTagName('span');
					for(var i = 0; i < aLi.length; i++) {
						aLi[i].index = i;
						aLi[i].onclick = function() {
							for(var i = 0; i < aLi.length; i++) {
								aLi[i].className = '';								
							}
							this.className = 'active';

							that1.seckillGoods();
							color();

							function color() {

								var date = new Date();
								var year = date.getFullYear(); //得到年份
								var month = date.getMonth() + 1; //得到月份
								var datea = date.getDate(); //得到日期
								var GetDatea = year + "-" + month + "-" + datea;
								var month = toDub(date.getMonth() + 1); //月
								var day = toDub(date.getDate()); //日
								var hour = toDub(date.getHours()); //时
								var minute = toDub(date.getMinutes()); //分
								var second = toDub(date.getSeconds()); //秒 
								//当前时间
								singleTime = $(this).find("time").html();
								var curTime = date.getFullYear() + "-" + month + "-" + day +
									" " + hour + ":" + minute + ":" + second;
								var endDate = new Date(GetDatea + " " + singleTime);
								var timestamp = Date.parse(curTime)
								var end = endDate.getTime();
								var last = endDate.getTime() + 3600000;
								var now = date.getTime();

								if(end <= now && now <= last) {

									//1536033600000
									//1536037200000
									//1536040800000
									/*console.log(end)*/
									//时间差  
									var leftTime = last - now;
									//console.log(leftTime)
									//定义变量 d,h,m,s保存倒计时的时间  
									var d, h, m, s;
									if(leftTime >= 0) {
										//              d = Math.floor(leftTime/1000/60/60/24);  
										h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
										//console.log(h)
										m = Math.floor(leftTime / 1000 / 60 % 60);
										//console.log(m)
										s = Math.floor(leftTime / 1000 % 60);
										//console.log(s)
									}
									var IHTML = '距本场结束剩余 : ' + toDub(h) + " : " + toDub(m) + " : " + toDub(s)
									//将倒计时赋值到div中  
									that.parents('.downList').find(".show .time").css("display", "block");
									that.parents('.downList').find(".show #text").html(IHTML);

									//递归每秒调用countTime方法，显示动态时间效果  

									//递归每秒调用countTime方法，显示动态时间效果  
								} else {
									that.parents('.downList').find(".show .time").css("display", "none")

								}
								clearInterval(timer)
								timer = setInterval(color, 1000);
							}
							clearInterval(timer)
							timer = setInterval(color, 1000);

							function toDub(n) {
								return n < 10 ? "0" + n : "" + n;
							};

						}
					}
				}
			});
		},
		seckillGoods: function() {
			$('#btn li').on('click',function(){
			//var stageId = $('#btn li .active').attr('id');
			var stageId = $(this).attr('id');
			console.log(stageId);
			var strList = '';
			$.ajax({
				type: "post",
				url: glob + "/v1.0/secKill/secKillGoodsList",
				async: true,
				data: {
					"secKillStageId": stageId
				},
				success: function(data) {
					console.log(data);
					var res = data.data;
					for(var i = 0; i < res.length; i++) {
						/*private Integer restrictCount; 没人限购多少个
									    private Integer allCount; 一共多少个
									    private Integer restCount;  剩余多少个*/
						var yqnum = res[i].allCount - res[i].restCount; //已枪数量

						var ANum = "&nbsp;已抢<b>" + yqnum + "</b>副"
						var Progres = document.getElementById("Pstyle").offsetWidth; //总的宽度     //1% 的宽度	
						var num = parseInt((res[i].restCount) / res[i].allCount * 100);
						var Aextent = Progres / res[i].allCount * yqnum
						$('#popular li').remove();
						strList += '<li>' +
							'<input class="ipt1" id="' + res[i].productId + '" value="' + res[i].productId + '" type="hidden" />' +
							'<img src="' + res[i].images + '" />' +
							'<span class="seckbox">' +
							'<h3>' + res[i].productName + '</h3>' +
							'<span class="progress-bar" id="progress-bar">' +
							'<span class="progress-bar-content" id="progress-bar-content" style="background:red;width:' + Aextent + 'px"></span>' +
							'<span class="progress-bar-left">' + ANum + '</span>' +
							'<span class="progress-bar-right">还剩<b>' + num + '%</b>&nbsp;</span>' +
							'</span>' +
							'<p>¥' + res[i].price + '&nbsp;' +
							'<s>¥399.00</s>' +
							'<a href="javascript:;" class="rob">已开抢</a>' +
							'</p>' +
							'</span>' +
							'</li>'
					}
					$('#popular').append(strList);
				}
			});
			})

		}

	}
	sckill.init();
})