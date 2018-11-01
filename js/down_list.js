$(function() {
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				"offset": 0,
				"limit": 5,
				"data": singleTime
			};
			var btn = document.getElementById('btn');
			var aLi = btn.getElementsByTagName('span');
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].index = i;
				aLi[i].onclick = function() {
					for(var i = 0; i < aLi.length; i++) {
						aLi[i].className = '';
						/*aText[i].className = '';*/
					}
					this.className = 'active';
					/*aText[this.index].className = 'show';*/
					singleTime = $(this).find("time").html();
					var that = $(this);
					var timer = null;
					Sun.isRefresh = true;
					Sun.params.data = singleTime;
					Sun.params.offset = 0;
					Sun.params.limit = 5;
					Sun.getList();
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
							that.parent().parent().parent().parent().parent().find(".show .time").css("display", "block")
							that.parent().parent().parent().parent().parent().find(".show #text").html(IHTML)

							//递归每秒调用countTime方法，显示动态时间效果  

							//递归每秒调用countTime方法，显示动态时间效果  
						} else {
							that.parent().parent().parent().parent().parent().find(".show .time").css("display", "none")

						}
						clearInterval(timer)
						timer = setInterval(color, 1000);
					}
					clearInterval(timer)
					timer = setInterval(color, 1000);
				}
			}

			function getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			}
			var GetDate = getNowFormatDate()
			this.getList()
		},
		/* 获取数据 */
		getList: function() {
			$.ajax({
				url: globa + '/v1.0/seckill/seckillCommodityList',
				type: 'post',
				dataType: 'json',
				data: this.params,
				success: function(data) {
					console.log(data)
					var res = data.data.rows;
					console.log(res);
					Sun.hasMore = res.length;
					var date = new Date(); //当前时间
					var month = zeroFill(date.getMonth() + 1); //月
					var day = zeroFill(date.getDate()); //日
					var hour = zeroFill(date.getHours()); //时
					var minute = zeroFill(date.getMinutes()); //分
					var second = zeroFill(date.getSeconds()); //秒
					
					//当前时间
					var curTime = date.getFullYear() + "-" + month + "-" + day +
						" " + hour + ":" + minute + ":" + second;
					/**
					 * 补零
					 */
					function zeroFill(i) {
						if(i >= 0 && i <= 9) {
							return "0" + i;
						} else {
							return i;
						}
					}
					var timestamp1 = Date.parse(curTime);

					var str = '';
					for(var i = 0; i < res.length; i++) {
						var timestamp2 = Date.parse(res[i].startTime)
						var timestamp3 = Date.parse(res[i].endTime)

						if(timestamp2 <= timestamp1 && timestamp3 >= timestamp1) {
							startTime = "马上抢"
						} else if(timestamp2 >= timestamp1) {
							startTime = "提醒我"
						} else if(timestamp3 <= timestamp1) {
							startTime = "已下架"
						}

						var ANum = "&nbsp;已抢<b>" + res[i].miaoshaCount + "</b>副"

						var Progres = document.getElementById("Pstyle").offsetWidth; //总的宽度     //1% 的宽度

						var num = parseInt((res[i].restCount - res[i].miaoshaCount) / res[i].restCount * 100);

						var Aextent = Progres / res[i].restCount * res[i].miaoshaCount

						/*console.log(num)*/
						str += '<li>' +
							'<input class="ipt1" id="' + res[i].productId + '" value="'+res[i].productId+'" type="hidden" />' +
							'<img src="'+res[i].picture+'" />' +
							'<span class="seckbox">' +
							'<h3>' + res[i].productName + '</h3>' +
							'<span class="progress-bar" id="progress-bar">' +
							'<span class="progress-bar-content" id="progress-bar-content" style="background:red;width:' + Aextent + 'px"></span>' +
							'<span class="progress-bar-left">' + ANum + '</span>' +
							'<span class="progress-bar-right">还剩<b>' + num + '%</b>&nbsp;</span>' +
							'</span>' +
							'<p>¥' + res[i].miaoshaprice + '&nbsp;' +
							'<s>¥399.00</s>' +
							'<a href="javascript:;" class="rob">已开抢</a>' +
							'</p>' +
							'</span>' +
							'</li>'
					}
					if(Sun.isRefresh) {
						$('#popular').html(str);
					} else {
						$('#popular').append(str);
					}
					$('.seckillList li').on('click', function() {
						var infoId = $(this).find('.ipt1').attr('id');
						console.log(infoId);
						window.location.href = "seckill_info.html?" + infoId;
					})
					Sun.myscroll.refresh();
				},
				error: function() {
					console.log("出错了");
				}
			});
		},
		scroll: function() {
			Sun.myscroll = new iScroll("wrapper", {
				onScrollMove: function() {
					if(this.y < this.maxScrollY) {
						$("#wrapper .pull-loading").html("释放加载");
						$("#wrapper .pull-loading").addClass("loading");
					} else {
						$("#wrapper .pull-loading").html("上拉加载");
						$("#wrapper .pull-loading").removeClass("loading");
					}
				},
				onScrollEnd: function() {
					if($("#wrapper .pull-loading").hasClass('loading')) {
						$("#wrapper .pull-loading").html("上拉加载");
						Sun.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			if(!this.hasMore) {
				$("#scroller .pull-loading").html("没有了哦");
				return;
			}
			this.isRefresh = false;
			this.params.offset+=5;
			this.params.limit+=5
			this.getList();
		}
	}
	Sun.init();
})