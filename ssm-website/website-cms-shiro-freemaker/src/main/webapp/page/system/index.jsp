<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<%@ include file="/page/common/compose/head.jsp"%>
</head>
<body>
	<div id="wrapper">
		<%@ include file="/page/common/compose/top.jsp"%>
		<div class="leftMenu"></div>
		<div class="bodeyMenu"></div>
		<%-- <%@ include file="/page/common/compose/body.jsp"%> --%>
		<%@ include file="/page/common/compose/footer.jsp"%>
	</div>
</body>
<script type="text/javascript">
	$(function() {
		$.ajax({
			type : "get",
			async : false, // 同步请求
			url : ctx + "/index/getIndexPage",
			data:{dataType:1},

			success : function(data) {
				var panel = $(".bodeyMenu");
				panel.empty();
				panel.html(data);
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	});
</script>
</html>
