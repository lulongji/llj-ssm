/**
 * 查询
 */
jQuery(function($) {
	$('#queryBtn').click(function() {
		submitForm();
	});

});

/**
 * 添加角色
 */
function addRoleMode() {
	$.ajax({
		type : "get",
		async : false,
		url : ctx + "/role/addRoleModal",

		success : function(data) {
			var panel = $(".roleModelContextPanelAdd");
			panel.empty();
			panel.html(data);
			var pane = $('#role_add_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

/**
 * 添加角色信息
 */
function addRoleInfo() {
	var roleName = $("#roleName").val();
	var roleStatus = $("#roleTypeOption").val();
	var dataInfo = {
		'roleName' : roleName,
		'roleStatus' : roleStatus
	};
	$.ajax({
		type : "post",
		async : false,
		data : dataInfo,
		url : ctx + "/role/addRole",

		success : function(data) {
			if (data.info == "success") {
				alert("添加角色数据成功！");
				$('#role_add_modal').modal('hide');
				$('#role_add_modal').on('hidden.bs.modal', function(e) {
					myMenu('/role/getRole');
				});
			} else {
				alert("增加角色数据失败！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

/**
 * 编辑角色页面
 * 
 * @param id
 * @param roleName
 */
function editRoleModal(id, roleName) {
	$.ajax({
		type : "post",
		async : false,
		data : {
			'id' : id,
			'roleName' : roleName
		},
		url : ctx + "/role/editRoleModal",

		success : function(data) {
			var panel = $(".roleModelContextPanelEdit");
			panel.empty();
			panel.html(data);
			var pane = $('#role_edit_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});

}

/**
 * 更新角色信息
 * 
 * @param id
 */
function updateRoleInfo(id) {
	var roleName = $("#roleName").val();
	var roleStatus = $("#roleTypeOption").val();
	var dataInfo = {
		'id' : id,
		'roleStatus' : roleStatus,
		'roleName' : roleName
	};
	$.ajax({
		type : "post",
		async : false,
		data : dataInfo,
		url : ctx + "/role/modifyRoleInfo",
		data : dataInfo,

		success : function(data) {
			if (data.info == "success") {
				alert("修改角色数据成功！");
				$('#role_edit_modal').modal('hide');
				$('#role_edit_modal').on('hidden.bs.modal', function(e) {
					myMenu('/role/getRole');
				});

			} else {
				alert("修改角色数据失败！");
			}
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
function delRole(id) {
	var dataInfo = {
		'id' : id
	};
	if (confirm("确认要删除？")) {
		$.ajax({
			type : "post",
			async : false,
			url : ctx + "/role/delRole",
			data : dataInfo,

			success : function(data) {
				if (data.info == "success") {
					alert("删除数据成功！");
					myMenu('/role/getRole');
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
 * 授权
 * 
 * @param id
 */
function authorizeRole(id) {
	$.ajax({
		type : "post",
		async : false,
		url : ctx + "/role/addAuthorizeRoleModal",
		data : {
			'id' : id
		},

		success : function(data) {
			var panel = $(".roleModelContextPanelAuthorize");
			panel.empty();
			panel.html(data);
			var pane = $('#authorize_role_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}
