<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<div class="navbar navbar-default" id="navbar">
	<input type="hidden" id="pageContext" value="${ctx}">
	<script type="text/javascript">
		try {
			ace.settings.check('navbar', 'fixed')
		} catch (e) {
		}
		var ctx = $("#pageContext").val();
		// 登出
		function logout() {
			$.ajax({
				type : "get",
				async : false, // 同步请求
				url : ctx + "/login/logout",

				success : function(datas) {
					if (datas.info == "success") {
						top.location = ctx;
					} else if (datas.info == "failure") {
						alert("退出失败！");
					} else {
						alert("系统错误！");
					}

				},
				error : function() {
					alert("请求失败，网络错误，请稍后再试！");
				}
			});

		}
	</script>

	<div class="navbar-container" id="navbar-container">
		<div class="navbar-header pull-left">
			<a href="#" class="navbar-brand"> <small> <i
					class="icon-leaf"></i> 病例征集管理系统
			</small>
			</a>
			<!-- /.brand -->
		</div>
		<!-- /.navbar-header -->

		<div class="navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">
				<%-- <li class="light-blue"><a data-toggle="dropdown" href="#"
					class="dropdown-toggle"> <img class="nav-user-photo"
						src="${ctx}/res/assets/avatars/user.jpg" alt="Jason's Photo" /> <span
						class="user-info"> <small>欢迎光临,</small> Jason
					</span> <i class="icon-caret-down"></i>
				</a>

					<ul
						class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
						<li><a href="#"> <i class="icon-cog"></i> 设置
						</a></li>

						<li><a href="#"> <i class="icon-user"></i> 个人资料
						</a></li>

						<li class="divider"></li>

						<li><a onclick="logout();"> <i class="icon-off"></i> 退出
						</a></li>
					</ul></li> --%>
					<li><a onclick="logout();"> <i class="icon-off"></i> 退出</a></li>
			</ul>
			<!-- /.ace-nav -->
		</div>
		<!-- /.navbar-header -->
	</div>
	<!-- /.container -->
</div>
<script type="text/javascript">
	$(function() {
		$.ajax({
			type : "get",
			async : false,
			url : ctx + "/resource/getMenuTreeAll",

			success : function(data) {
				var panel = $(".leftMenu");
				panel.html(data);
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	});

	//展开按钮
	function openClass(classId) {
		var flag = $("#classSelect").val();
		var flag1 = $("#classSelect1").val();

		if (flag1 != "") {
			if (flag1 == classId) {
				if (flag != "") {
					$("#" + classId).removeAttr("class");
					$("#classSelect").val("");
					$("#classSelect1").val(classId);
				} else {
					$("#" + classId).attr("class", "active open");
					$("#classSelect").val(classId);
					$("#classSelect1").val(classId);
				}
			} else {
				$("#" + classId).attr("class", "active open");
				$("#classSelect").val(classId);
				$("#classSelect1").val(classId);

			}

		} else {
			if (flag != "") {
				$("#" + classId).removeAttr("class");
				$("#classSelect").val("");
				$("#classSelect1").val(classId);
			} else {
				$("#" + classId).attr("class", "active open");
				$("#classSelect").val(classId);
				$("#classSelect1").val(classId);
			}
		}

	}
</script>