
jQuery(function($) {
	$('#queryBtn').click(function() {
		//点击查询，页码从第一页开始
		$("input[name='pageNo']").val(1);
		submitForm();
	});
});
function chagePage(dictId, type){
	var data = "";
	var url= "";
	if(type == 'add'){
		url = ctx+"/dict/toAddDict";
	}
	if(type == 'edit'){
		url = ctx+"/dict/toDetail.do";
		data = {
			id:dictId
		};
	}
	if(type == 'delete'){
		url = ctx+"";
	}

	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : url,
		data: data,

		success : function(data) {
			$("#main-content").empty();
			$("#main-content").html(data);// 要刷新的div
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}
//删除字典
function delDictVal(dictId){
	if(!confirm("删除字典将会将下级一同删除，确认删除？")){
		return false;
	}
	//封装提交参数
	var subdata = {
		id:dictId
	};

	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx+"/dict/removeDict.do",
		data : subdata,

		success : function(result) {
			if(result.code=='200'){
				alert("删除成功");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
	myMenu('/dict/queryDict');

}