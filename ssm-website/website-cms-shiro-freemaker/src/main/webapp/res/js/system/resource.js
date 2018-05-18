/**
 * 添加菜单信息
 */
function addMenuInfo() {
	var parentId = $("#resourceMenuOption").val();
	var url = $("#resourceMenuUrl").val();
	var permissionName = $("#resourceMenuName").val();
	var resourcesType = $("#resourceMenuTypeOption").val();
	var permissionCode = $("#resourceMenuCode").val();
	var sortNum = $("#sortNum").val();
	if (parentId == 0) {
		url = "#";
	}
	var dataInfo = {
		'permissionName' : permissionName,
		'url' : url,
		'parentId' : parentId,
		'permissionCode' : permissionCode,
		'sortNum' : sortNum,
		'resourcesType' : resourcesType
	};
	$.ajax({
		type : "post",
		async : false,
		data : dataInfo,
		url : ctx + "/resource/addMenu",

		success : function(data) {
			if (data.info == "success") {
				alert("增加资源数据成功！");
				$('#resource_add_modal').modal('hide');
				$('#resource_add_modal').on('hidden.bs.modal', function(e) {
					myMenu('/resource/getMenu');
				});
			} else {
				alert("增加资源数据失败！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

/**
 * 添加数据页面
 */
function addMenuModal(id) {
	$.ajax({
		type : "post",
		async : false,
		url : ctx + "/resource/addMenuModal",
		data:{'id':id},

		success : function(data) {
			var panel = $(".resourceModelContextPanelAdd");
			panel.empty();
			panel.html(data);
			var pane = $('#resource_add_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});

}

/**
 * 编辑菜单信息
 */
function editMenuInfo() {
	var id = $("#sourcesMenuId").val();
	var parentId = $("#resourceMenuOption").val();
	var url = $("#resourceMenuUrl").val();
	var permissionName = $("#resourceMenuName").val();
	var resourcesType = $("#resourceMenuTypeOption").val();
	var sortNum = $("#sortNum").val();
	var permissionCode = $("#resourceMenuCode").val();
	if (parentId == 0) {
		url = "#";
	}
	var dataInfo = {
		'id' : id,
		'permissionName' : permissionName,
		'permissionCode' : permissionCode,
		'url' : url,
		'parentId' : parentId,
		'sortNum' : sortNum,
		'resourcesType' : resourcesType
	};
	$.ajax({
		type : "post",
		async : false,
		data : dataInfo,
		url : ctx + "/resource/modifyMenu",
		data : dataInfo,

		success : function(data) {
			if (data.info == "success") {
				alert("修改资源数据成功！");
				$('#resource_edit_modal').modal('hide');
				$('#resource_edit_modal').on('hidden.bs.modal', function(e) {
					myMenu('/resource/getMenu');
				});

			} else {
				alert("修改资源数据失败！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

/**
 * 编辑数据页面
 */
function editMenuModal(id, permissionName, url, permissionCode,parentId,resourcesType,sortNum) {
	$.ajax({
		type : "post",
		async : false,
		data : {
			'id' : id,
			'permissionName' : permissionName,
			'permissionCode' : permissionCode,
			'parentId' : parentId,
			'resourcesType' : resourcesType,
			'sortNum' : sortNum,
			'url' : url
		},
		url : ctx + "/resource/editMenuModal",

		success : function(data) {
			var panel = $(".resourceModelContextPanelEdit");
			panel.empty();
			panel.html(data);
			var pane = $('#resource_edit_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});

}

/**
 * 删除
 * 
 * @param id
 */
function delMenu(id) {
	var dataInfo = {
		'id' : id
	};
	if (confirm("确认要删除？")) {
		$.ajax({
			type : "get",
			async : false,
			url : ctx + "/resource/delMenu",
			data : dataInfo,

			success : function(data) {
				if (data.info == "success") {
					alert("删除数据成功！");
					myMenu('/resource/getMenu');
				} else {
					alert("删除数据失败，请检查网络后重试！");
				}
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	}
}

/**
 * 
 * @param menuId
 * @param curObj
 * @param trIndex
 */
function openClose(menuId,curObj,trIndex){
	var txt = $(curObj).text();
	if(txt=="展开"){
		$(curObj).text("折叠");
		$("#tr"+menuId).after("<tr id='tempTr"+menuId+"'><td colspan='5'>数据载入中</td></tr>");
		if(trIndex%2==0){
			$("#tempTr"+menuId).addClass("main_table_even");
		}
		var url = ctx+"/resource/getMenuTree?id="+menuId+"&guid="+new Date().getTime();
		$.get(url,function(data){
			if(data.result.length>0 && data.info=="success"){
				var html = "";
				$.each(data.result,function(i,item){
					html = "<tr style='height:24px;line-height:24px;' name='subTr"+menuId+"'  id='child"+item.id+"'>";
					html += "<td></td>";
					html += "<td  class='center'><span style='width:80px;display:inline-block;'></span>";
					if(i==data.result.length-1)
						html += "<img src='"+ctx+"/res/images/joinbottom.gif' style='vertical-align: middle;'/>";
					else
						html += "<img src='"+ctx+"/res/images/join.gif' style='vertical-align: middle;'/>";
					html += "<span  style='width:100px;text-align:left;display:inline-block;'>"+this.permissionName+"</span>";
					html += "</td>";
					html += "<td class='center'>"+this.permissionCode+"</td>";
					html += "<td  class='center'>"+this.url+"</td>";
					html += "<td  class='center'>"+this.sortNum+"</td>";
					if(true)
						html += "<td><a class='btn btn-mini btn-warning' onclick='openCloseChild(\""+item.id+"\",\""+menuId+"\",this,\""+trIndex+"\")'>展开</a>";
					else
						html +="<td>";
					html += "<a class='btn btn-mini btn-info' title='编辑' onclick='editMenuModal(\""+item.id+"\",\""+item.permissionName+"\",\""+item.url+"\",\""+item.permissionCode+"\",\""+item.parentId+"\",\""+item.resourcesType+"\",\""+item.sortNum+"\");'>编辑<i class='icon-edit'></i></a> <a class='btn btn-mini btn-danger' title='删除' onclick='delMenu(\""+item.id+"\")'>删除<i class='icon-trash'></i></a></td>";
					html += "</tr>";
					$("#tempTr"+menuId).before(html);
				});
				$("#tempTr"+menuId).remove();
				if(trIndex%2==0){
					$("tr[name='subTr"+menuId+"']").addClass("main_table_even");
				}
			}else{
				$("#tempTr"+menuId+" > td").html("没有相关数据");
			}
		},"json");
	}else{
		$("#tempTr"+menuId).remove();
		$("tr[name='subTr"+menuId+"']").remove();
		$(curObj).text("展开");
	}
}


/**
 * 三级菜单
 * 
 * @param menuId
 * @param curObj
 * @param trIndex
 * @param pId
 */
function openCloseChild(pId,menuId,curObj,trIndex){
	var txt = $(curObj).text();
	if(txt=="展开"){
		$(curObj).text("折叠");
		$("#child"+pId).after("<tr id='tempTr"+pId+"'><td colspan='5'>数据载入中</td></tr>");
		if(trIndex%2==0){
			$("#tempTr"+pId).addClass("main_table_even");
		}
		var url = ctx+"/resource/getMenuTree?id="+pId+"&guid="+new Date().getTime();
		$.get(url,function(data){
			if(data.result.length>0 && data.info=="success"){
				var html = "";
				$.each(data.result,function(i,item){
					html = "<tr style='height:24px;line-height:24px;' name='subTr"+pId+"' id='children"+item.id+"'>";
					html += "<td></td>";
					html += "<td class='center'><span style='width:80px;display:inline-block;'></span>";
					if(i==data.result.length-1)
						html += "&nbsp;&nbsp;&nbsp;&nbsp;<img src='"+ctx+"/res/images/joinbottom.gif' style='vertical-align: middle;'/>";
					else
						html += "&nbsp;&nbsp;&nbsp;&nbsp;<img src='"+ctx+"/res/images/join.gif' style='vertical-align: middle;'/>";
					html += "<span style='width:100px;text-align:left;display:inline-block;'>"+item.permissionName+"</span>";
					html += "</td>";
					html += "<td class='center'>"+item.permissionCode+"</td>";
					html += "<td>"+item.url+"</td>";
					html += "<td  class='center'>"+this.sortNum+"</td>";
					if(item.childrenList!="")
						html += "<td><a class='btn btn-mini btn-warning' onclick='openCloseChildren(\""+item.id+"\",\""+menuId+"\",this,\""+trIndex+"\")'>展开</a>";
					else
						html +="<td>";
					html += "<a class='btn btn-mini btn-info' title='编辑' onclick='editMenuModal(\""+item.id+"\",\""+item.permissionName+"\",\""+item.url+"\",\""+item.permissionCode+"\",\""+item.parentId+"\",\""+item.resourcesType+"\",\""+item.sortNum+"\");'>编辑<i class='icon-edit'></i></a> <a class='btn btn-mini btn-danger' title='删除' onclick='delMenu(\""+item.id+"\")'>删除<i class='icon-trash'></i></a></td>";
					html += "</tr>";
					$("#tempTr"+pId).before(html);
				});
				$("#tempTr"+pId).remove();
				if(trIndex%2==0){
					$("tr[name='subTr"+pId+"']").addClass("main_table_even");
				}
			}else{
				$("#tempTr"+pId+" > td").html("没有相关数据");
			}
		},"json");
	}else{
		$("#tempTr"+pId).remove();
		$("tr[name='subTr"+pId+"']").remove();
		$(curObj).text("展开");
	}
}


/**
 * 四级菜单
 * @param pId
 * @param menuId
 * @param curObj
 * @param trIndex
 */
 
function openCloseChildren(pId,menuId,curObj,trIndex){
	var txt = $(curObj).text();
	if(txt=="展开"){
		$(curObj).text("折叠");
		$("#children"+pId).after("<tr id='tempTr"+pId+"'><td colspan='5'>数据载入中</td></tr>");
		if(trIndex%2==0){
			$("#tempTr"+pId).addClass("main_table_even");
		}
		var url = ctx+"/resource/getMenuTree?id="+pId+"&guid="+new Date().getTime();
		$.get(url,function(data){
			if(data.result.length>0 && data.info=="success"){
				var html = "";
				$.each(data.result,function(i,item){
					html = "<tr style='height:24px;line-height:24px;' name='subTr"+pId+"'>";
					html += "<td></td>";
					html += "<td class='center'><span style='width:80px;display:inline-block;'></span>";
					if(i==data.result.length-1)
						html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='"+ctx+"/res/images/joinbottom.gif' style='vertical-align: middle;'/>";
					else
						html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='"+ctx+"/res/images/join.gif' style='vertical-align: middle;'/>";
					html += "<span style='width:100px;text-align:left;display:inline-block;'>"+item.permissionName+"</span>";
					html += "</td>";
					html += "<td class='center'>"+item.permissionCode+"</td>";
					html += "<td>"+item.url+"</td>";
					html += "<td  class='center'>"+this.sortNum+"</td>";
					html += "<td> <a class='btn btn-mini btn-info' title='编辑' onclick='editMenuModal(\""+item.id+"\",\""+item.permissionName+"\",\""+item.url+"\",\""+item.permissionCode+"\",\""+item.parentId+"\",\""+item.resourcesType+"\",\""+item.sortNum+"\");'>编辑<i class='icon-edit'></i></a> <a class='btn btn-mini btn-danger' title='删除' onclick='delMenu(\""+item.id+"\")'>删除<i class='icon-trash'></i></a></td>";
					html += "</tr>";
					$("#tempTr"+pId).before(html);
				});
				$("#tempTr"+pId).remove();
				if(trIndex%2==0){
					$("tr[name='subTr"+pId+"']").addClass("main_table_even");
				}
			}else{
				$("#tempTr"+pId+" > td").html("没有相关数据");
			}
		},"json");
	}else{
		$("#tempTr"+pId).remove();
		$("tr[name='subTr"+pId+"']").remove();
		$(curObj).text("展开");
	}
}


