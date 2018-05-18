
jQuery(function($) {
	$('#queryBtn').click(function() {
		//点击查询，页码从第一页开始
		$("input[name='pageNo']").val(1);
		submitForm();
	});

	// addMode
	$('#addCategory').click(function() {
		$.ajax({
			type : "get",
			async : false, // 同步请求
			url : ctx + "/dict/toAddCategory",

			success : function(data) {
				var panel = $(".ModelContextPanelAdd");
				panel.empty();
				panel.html(data);
				var pane = $('#category_add_modal');
				pane.modal('show');
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	});
	$(".mybtn").each(function(){
		$(this).click(function(){
			var dataId = $(this).attr("data-value");
			if($(this).hasClass("btn-success")){
				//更新校验
				if(!checkCategory(dataId,$("#"+dataId+"_input_code").val())){
					return false;
				}
				/**点击保存*/
				$.ajax({
					type : "post",
					async : false, // 同步请求
					url : ctx + "/dict/editCategory",
					data : {
						'id' : dataId,
						'categoryName' : $("#"+dataId+"_input_name").val(),
						'categoryCode' : $("#"+dataId+"_input_code").val()
					},

					success : function(data) {
						if(data.code=='200'){
							myMenu('/dict/queryCategory');
						}
					},
					error : function() {
						alert("请求失败，网络错误，请稍后再试！");
					}
				});
				$(this).hide();
				$(this).next().show();
				$("#"+dataId+"_input_name").hide();
				$("#"+dataId+"_span_name").show();
				$("#"+dataId+"_input_code").hide();
				$("#"+dataId+"_span_code").show();

			}
			if($(this).hasClass("btn-info")){
				/**点击编辑*/
				$.ajax({
					type : "get",
					async : false, // 同步请求
					url : ctx + "/dict/findCategory",
					data : {
						'id' : dataId
					},

					success : function(data) {
						if(data.code=='200'){
							$("#"+dataId+"_input_name").val(data.result.categoryName);
							$("#"+dataId+"_input_code").val(data.result.categoryCode);
						}
					},
					error : function() {
						//alert("请求失败，网络错误，请稍后再试！");
					}
				});
				$(this).hide();
				$(this).prev().show();
				$("#"+dataId+"_input_name").show();
				$("#"+dataId+"_span_name").hide();
				$("#"+dataId+"_input_code").show();
				$("#"+dataId+"_span_code").hide();
			}
		});
	});


});

//插入新分类
function saveCategory(){
	var cateName = $("#addCategoryName").val();
	if(cateName == ''){
		alert("请输入分类名");
		$("#addCategoryName").focus();
		return false;
	}
	var cateCode = $("#addCategoryCode").val();
	if(cateCode == ''){
		alert("请输入分类编码");
		$("#addCategoryCode").focus();
		return false;
	}

	if(!checkCategory(0,cateCode)){
		//校验
		return false;
	}

	//封装提交参数
	var subdata = $("#addCateFrm").serialize();
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx+"/dict/saveCategory.do",
		data : subdata,

		success : function(result) {
			if(result.code=='200'){
				alert("增加分类数据成功！");
				$('#category_add_modal').modal('hide');
				$('#category_add_modal').on('hidden.bs.modal', function(e) {
					myMenu('/dict/queryCategory');
				});
			} else {
				alert("增加用户数据失败,用户已存在！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

//删除字典
function delCategory(id){
	if(!confirm("确认删除此分类？")){
		return false;
	}
	//封装提交参数
	var subdata = {
		id:id
	};
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx+"/dict/removeCategory.do",
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
	myMenu('/dict/queryCategory');
}

function checkCategory(categoryId, categoryCode){
	var data = {
		categoryCode:categoryCode
	};
	if(categoryId != 0){
		//id:categoryId,
		data.id = categoryId;
	}
	var rtnFlag = true;
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx+"/dict/checkCategory.do",
		data : data,

		success : function(result) {
			if(result.code!='200'){
				alert("分类名已存在！");
				rtnFlag = false;
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
			rtnFlag = false;
		}
	});
	return rtnFlag;
}