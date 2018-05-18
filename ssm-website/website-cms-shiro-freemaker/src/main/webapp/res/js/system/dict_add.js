var zNodes=[

];
function treeMenu(a){
	this.tree=a||[];
	this.groups={};
}
treeMenu.prototype={
	init:function(parentId){
		this.group();
		return this.getDom(this.groups[parentId]);
	},
	group:function(){
		for(var i=0;i<this.tree.length;i++){
			if(this.groups[this.tree[i].parentId]){
				this.groups[this.tree[i].parentId].push(this.tree[i]);
			}else{
				this.groups[this.tree[i].parentId]=[];
				this.groups[this.tree[i].parentId].push(this.tree[i]);
			}
		}
	},
	getDom:function(a){
		if(!a){return ''}
		var html='\n<ol class=\"dd-list\">\n';
		for(var i=0;i<a.length;i++){

			//if(Number(a[i].parentId) == 0){
			//	html+='<li class=\"dd-item item-orange\" data-id=\"'+a[i].id+'\">';
			//}else{
			//	html+='<li class=\"dd-item item-orange\" style=\"display:none;\" data-id=\"'+a[i].id+'\">';
			//}
			html+='<li class=\"dd-item item-orange\" data-id=\"'+a[i].id+'\" data-level=\"'+a[i].dictLevel+'\">';
			html+='<div class=\"dd2-content\">';
			html+=a[i].name+'</div>';
			html+=this.getDom(this.groups[a[i].id]);
			html+='</li>\n';
        }
        html+='</ol>\n';
		return html;
	}
};

jQuery(function($){
	$("#openDictDialog").unbind('click').click(function(){
		$("#modal-table").addClass("in");
		$("#modal-table").css("display","block");

		$("#modal-table").attr("aria-hidden","false");
	});
	/** 设置是否可点击父项字典ID */
	if($("#categoryId").val()==''){
		$("#openSpan").hide();
		$("#parentNotice").show();
		$("#parentDict").attr("disabled", "disabled");
	}else{
		loadDictVal($("#categoryId").val());
		$("#openSpan").show();
		$("#parentNotice").hide();
	}
	$("#categoryId").change(function(){
		$("#parentName").val("");
		$("#parentDict").val("");
		$("#parentId").val("");

		if($(this).val() != ''){
			$("#parentDict").removeAttr('disabled');
			loadDictVal($(this).val());
			$("#openSpan").show();
			$("#parentNotice").hide();
		}else{
			$("#parentDict").attr("disabled", "disabled");
			$("#openSpan").hide();
			$("#parentNotice").show();
		}
	});
	//click save
	$("#saveDict").click(function(){
		saveDict(1);
	});
	$("#editDict").click(function(){
		saveDict(2);
	});

	//click cancel
	$("#cancelSave").click(function(){
		myMenu('/dict/queryDict');
	});
});

/** 保存字典信息 */
function saveDict(type){
	//字典名称
	if($("#dictName").val() ==''){
		alert("请填写字典名称");
		$("#dictName").focus();
		return false;
	}
	//所属分类
	if($("#categoryId").val() == ''){
		alert("请选择字典分类");
		return false;
	}
	//封装提交参数
	var category = $("#categoryId").val();
	var cateArr = category.split("-");
	var categoryId = cateArr[0];
	var categoryCode = cateArr[1];

	var subdata = {
		name:$("#dictName").val(),
		categoryId:categoryId,
		categoryCode:categoryCode,
		parentId:$("#parentId").val(),
		status:$("#valueStatus").val(),
		dictLevel:$("#dictLevel").val(),
        dictCode:$("#dictCode").val(),
        dictContent:$("#dictContent").val()
	};
	var subUrl = "";
	if(type == 1){
		subUrl = $("#saveDicForm").attr("action");
	}
	if(type == 2){
		subUrl = $("#editDicForm").attr("action");
		subdata.id=$("#dictId").val();
	}

	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : subUrl,
		data : subdata,

		success : function(result) {
			if(result.code=='200'){
				alert("保存成功");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
	myMenu('/dict/queryDict');
}

/** 根据范围，查询字典 */
function loadDictVal(categoryId){
	if(categoryId == ''){
		return false;
	}
	var cateArr = categoryId.split("-");
	if(cateArr[0] == ''){
		return false;
	}

	//封装提交参数
	var subdata = {
		categoryId:cateArr[0]
	};
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx + "/dict/getDictVals.do",
		data : subdata,

		success : function(result) {
			var str1 = result.result;
			zNodes = str1;
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
	var html=new treeMenu(zNodes).init(0);
	$("#nestable").html(html);
	//$('.dd').nestable();//取消十字按钮，原因JS报错
	$('.dd2-content').dblclick(function(){
		if($(this).parent().hasClass("dd-collapsed")){
			$(this).parent().removeClass("dd-collapsed");
			$(this).parent().find("ol").css("display","block");
		}else{
			$(this).parent().addClass("dd-collapsed");
			$(this).parent().find("ol").css("display","none");
		}
	});
	initDialog();
}
//初始化弹出框
function initDialog(){
	//点击树节点
	$("#nestable li div").each(function(){
		$(this).unbind('click').click(function(){
			var dataName = $(this).text();
			var dataId = $(this).parent().attr("data-id");
			var dictLevel = $(this).parent().attr("data-level");
			$("#nestable li div").removeClass("btn-info");
			$(this).addClass("btn-info");
			//父项ID赋值
			$("#parentId").val(dataId);
			//父项名称赋值
			$("#parentName").val(dataName);
			$("#dictLevel").val(dictLevel);
		});
	});
	//cancel select parent dict
	$("#cancelParent").bind('click', function(){
		//点击取消，将值清空
		$("#parentId").val("");
		$("#parentName").val("");
	});
	//choose on parent dict
	$("#saveParent").bind('click', function(){
		$("#parentDict").val($("#parentName").val());
	});

}

