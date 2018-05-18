<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<script type="text/javascript">
function loginData(dataType){
	debugger;
	$.ajax({
		type : "get",
		async : false, // 同步请求
		url : ctx + "/index/getIndexPage",
		data:{dataType:dataType},

		success : function(data) {
			var panel = $(".bodeyMenu");
			panel.empty();
			panel.html(data);
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}
</script>
<div class="main-content" id="main-content">
	<div class="page-content">
		<div class="page-header">
			<h1>
				控制台 <small> <i class="icon-double-angle-right"></i> 查看</small>
			</h1>
		</div>
		<!-- /.page-header -->
		<div class="row">
			<div class="col-xs-12">
				<!-- PAGE CONTENT BEGINS -->
				<div class="alert alert-block alert-success">
					<button type="button" class="close" data-dismiss="alert">
						<i class="icon-remove"></i>
					</button>
					<i class="icon-ok green"></i> 欢迎使用 <strong class="green">好医生数字传播平台 <small>(v1.0)</small></strong> 管理系统。
				</div>


				<!-- ue-->

				<!-- 加载编辑器的容器 -->
				<div>
    <!-- <h1>完整demo</h1>
    <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script> -->
</div>






