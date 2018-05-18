// 菜单状态切换
function myMenu(menu_url) {
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx + menu_url,

		success : function(data) {
			$("#main-content").empty();
			$("#main-content").html(data);// 要刷新的div
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}
