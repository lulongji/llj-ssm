// JavaScript Document
(function($) {
	$.fn.date = function(options) {
		var opts = $.extend( {}, $.fn.date.defaults, options);
		var toDay = new Date();
		var deYear = toDay.getFullYear();
		var deMonth = toDay.getMonth() + 1;
		var deDate = toDay.getDate();
		var _this = $(this);
		var flag = 0;
		//获取使用date的区域
		$("div[option='date']")
				.each(function(index, element) {
					//初始化显示内容
						//补齐年份菜单
						for (i = toDay.getFullYear(); i >= 1970; i--) {
							$(element).find(".year ul").append(
									"<li>" + i + "年</li>");
						}
						//补齐月份菜单
						for (i = 1; i <= 12; i++) {
							$(element).find(".month ul").append(
									"<li>" + i + "月</li>");
						}
						//补齐备注日期列表
						/*for(i=0;i<opts.data.length;i++) {
							$(element).find(".mydateList").append("<li date='"+opts.data[i].dates+"'><span>"+opts.data[i].dates+"</span><br><font>"+opts.data[i].reback+"</font></li>"); 
						}*/
						date(element, deYear, deMonth, deDate);

						/*选择年份*/
						$(element).find(".year").on("click", function() {
							//						$(this).find("ul").toggle();
								if (flag == 0) {
									$(this).find("ul").show();
								} else if (flag == 1) {
									flag = 0;
									$(this).find("ul").hide();
								}
							});
						$(element).find(".year li").on("click", function() {
							flag = 1;
							$(element).find(".year span").html($(this).html());
							deYear = $(this).text().slice(0, -1);
							//						$(this).parent().hide();
								date(element, deYear, deMonth, deDate);
							});

						/*选择月份*/
						$(element)
								.find(".month")
								.on(
										"click",
										function(e) {
											if (e.clientX
													- $(this).offset().left <= 22) {
												if (deMonth != 1) {
													deMonth--;
													$(this).find("span").html(
															deMonth + "月");
													date(element, deYear,
															deMonth, deDate);
												} else {
													alert("已到最小月")
												}
											} else if (e.clientX
													- $(this).offset().left <= 81) {
												//							$(this).find("ul").toggle();	
												if (flag == 0) {
													$(this).find("ul").show();
												} else if (flag == 1) {
													flag = 0;
													$(this).find("ul").hide();
												}
											} else {
												if (deMonth != 12) {
													deMonth++;
													$(this).find("span").html(
															deMonth + "月");
													date(element, deYear,
															deMonth, deDate);
												} else {
													alert("已到最大月")
												}
											}
										});
						/*选择月份*/
						$(element).find(".month li").on("click", function(e) {
							flag = 1;
							$(element).find(".month span").html($(this).html());
							deMonth = Number($(this).text().slice(0, -1));
							date(element, deYear, deMonth, deDate);
						});

						/*备注列表选择*/
						$(element).on(
								"click",
								".mydateList li",
								function() {
									var d = $(this).attr("date").split("-");
									deYear = d[0];
									deMonth = Number(d[1]);
									deDate = d[2];
									date(element, deYear, deMonth, deDate);
									var date2 = new Date();
									date2.setFullYear(deYear, deMonth - 1, 1);
									var i = Number(deDate)
											+ Number(date2.getDay()) - 2;
									$(element).find(".dateList span").eq(i)
											.addClass("OK").siblings()
											.removeClass("OK");
									$(this).addClass("active").siblings()
											.removeClass("active");
									$("#date").val($(this).attr("date"))
								});

						//返回今天
						$(element).find(".todate").on(
								"click",
								function(e) {
									date(element, toDay.getFullYear(), toDay
											.getMonth() + 1, toDay.getDate());
									deDate = toDay.getDate();
								});

						/*显示备注*/
						$(element)
								.on(
										{
											mouseenter : function() {
												$(this).find("div").css(
														"display", "block");
											},
											mouseleave : function() {
												$(this).find("div").css(
														"display", "none");
											},
											click : function() {
												$(this).addClass("OK")
														.siblings()
														.removeClass("OK");
												var nowDay = $(this).find("em")
														.html();
												var nowMon = deMonth;
												if (nowDay < 10)
													nowDay = "0" + nowDay;
												if (nowMon < 10)
													nowMon = "0" + nowMon;
												var nowDate = deYear + "-"
														+ nowMon + "-" + nowDay;
												$("#date").val(nowDate);
												$(element)
														.find(".mydateList li")
														.each(
																function(index,
																		element) {
																	if ($(
																			element)
																			.attr(
																					"date") == nowDate) {
																		$(
																				element)
																				.addClass(
																						"active")
																				.siblings()
																				.removeClass(
																						"active");
																		$(
																				".mydateList")
																				.scrollTop(
																						(index - 1) * 48)
																	}
																});
											}
										}, "span");
						/*选择日期*/
						$(element)
								.on(
										{
											click : function() {
												var moth = $(
														".selectDate .month span")
														.html().split("月")[0];
												if (moth < 10) {
													moth = ("0" + moth)
												}
												var year = $(
														".selectDate .year span")
														.html().split("年")[0];
												if ($(this).html().indexOf(
														"div") > 0) {
													var d = $(this).find("em")
															.html();
													if (d < 10) {
														d = ("0" + d);
													}
													$("#beiwangData").val(
															year + "-" + moth
																	+ "-" + d);
													$("#beiwangText").val(
															$(this).find("div")
																	.html());
												} else {
													var d = $(this).html();
													if (d < 10) {
														d = ("0" + d);
													}
													$("#beiwangData").val(
															year + "-" + moth
																	+ "-" + d);
													$("#beiwangText").val("");
												}
											}
										}, ".dateList span:not('.mb')");
					});
		/*日期函数*/
		function date(element, year, month, day) {
			$(element).find(".year span").html(year + "年");
			$(element).find(".month span").html(month + "月");
			var date1 = new Date();
			date1.setFullYear(year, month - 1, 1);
			$(element).find(".week .dateList").html("");
			if (date1.getDay() > 0) {
				week = date1.getDay()
			} else {
				week = 7
			}
            var j = 1;
			var mdlong = mDay(month, year), lastdlong = mDay(month - 1, year);
			for ( var i = 1; i <= Math.ceil((week + mdlong - 1) / 7) * 7; i++) {
				if (i >= week && i - week < mdlong) {
					$(element).find(".week .dateList").append(
							"<span>" + ((i - week + 1)) + "</span>");
				} else if (i <= week) {
					$(element).find(".week .dateList").append(
							"<span class='mb'>" + (lastdlong - week + i + 1)
									+ "</span>");
				} else {
					$(element).find(".week .dateList").append(
							"<span class='mb'>" + (j++) + "</span>")
				}
                /*周末显红*/
				if (i < 7) {
					if (i % 6 == 0 || i % 7 == 0) {
						$(element).find(".week .dateList span").eq(i - 1)
								.addClass("red");
					}
				} else {
					if (i % 7 == 6 || i % 7 == 0) {
						$(element).find(".week .dateList span").eq(i - 1)
								.addClass("red");
					}
				}
				/*高显今天日期*/
				if (i == day + week - 1) {
					$(element).find(".week .dateList span").eq(i - 1).addClass(
							"today");
				}
			}
			for (i = 0; i < opts.data.length; i++) {
				var d = opts.data[i].dates.split("-");
				if (year == d[0] && month == d[1]) {
					$(element).find(".week .dateList span").eq(
							Number(d[2]) + week - 2).addClass("remark").html(
							"<em>"
									+ $(element).find(".week .dateList span")
											.eq(Number(d[2]) + week - 2).html()
									+ "</em>").append(
							"<div>" + opts.data[i].reback + "</div>");
				}
				if (year == d[0] && month - 1 == d[1]) {
					var lastDay = week - (lastdlong - d[2]) - 2;
					if (i < week - 1 && lastDay >= 0) {

					}
				}
				if (year == d[0] && month + 1 == d[1]) {
					//下个月
				}
			}
		}

		function mDay(i, year) {
			if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10
					|| i == 12) {
				return 31;
			} else if (i == 4 || i == 6 || i == 9 || i == 11) {
				return 30;
			} else {
				if ((year % 4 == 0 && year % 100 != 0)
						|| (year % 100 == 0 && year % 400 == 0)) {
					return 29;
				} else {
					return 28;
				}
			}

		}

	}

})(jQuery);