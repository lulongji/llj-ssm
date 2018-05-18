jQuery(function($) {
	// query
	$('#queryBtn').click(function() {
		submitForm();
	});

	// addMode
	$('#addUserMode').click(function() {
		$.ajax({
			type : "post",
			async : false, // 同步请求
			url : ctx + "/user/addUserPage",

			success : function(data) {
				var panel = $(".ModelContextPanelAdd");
				panel.empty();
				panel.html(data);
				var pane = $('#user_add_modal');
				pane.modal('show');
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});

	});

});

// editMode
function editUserModal(username) {
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx + "/user/editUserPage",
		data : {
			'userName' : username
		},

		success : function(data) {
			var panel = $(".ModelContextPanelEdit");
			panel.empty();
			panel.html(data);
			var pane = $('#user_edit_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});

}

// add
function addUserInfo() {
	var username = $("#sys_username").val();
	var password = $("#sys_password").val();
	var dataInfo = {
		'username' : username,
		'password' : password
	};
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx + "/user/addUser",
		data : dataInfo,

		success : function(data) {
			if (data.info == "success") {
				alert("增加用户数据成功！");
				$('#user_add_modal').modal('hide');
				$('#user_add_modal').on('hidden.bs.modal', function(e) {
					myMenu('/user/getUser');
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
// 修改密码
function updateUserInfo(username) {
	var password = $("#edit_password").val();
	var dataInfo = {
		'username' : username,
		'password' : password
	};
	$.ajax({
		type : "post",
		async : false, // 同步请求
		url : ctx + "/user/modifyUser",
		data : dataInfo,

		success : function(data) {
			if (data.info == "success") {
				alert("修改密码成功！");
				$('#user_edit_modal').modal('hide');
				$('#user_edit_modal').on('hidden.bs.modal', function(e) {
					myMenu('/user/getUser');
				});
			} else {
				alert("更新数据失败，请重试！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

// del
function delUser(username) {
	var dataInfo = {
		'username' : username
	};
	if (confirm("确认要删除？")) {
		$.ajax({
			type : "post",
			async : false, // 同步请求
			url : ctx + "/user/delUser",
			data : dataInfo,

			success : function(data) {
				if (data.info == "success") {
					alert("删除数据成功！");
					submitForm();
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
 * 用户授权
 * 
 * @param roleName
 */
function authorizeModal(userName, userId, roleId) {
	$.ajax({
		type : "post",
		async : false,
		data : {
			'userName' : userName,
			'roleId' : roleId,
			'userId' : userId
		},
		url : ctx + "/user/authorizeModal",

		success : function(data) {
			var panel = $(".ModelContextPanelAuthorize");
			panel.empty();
			panel.html(data);
			var pane = $('#user_authorize_modal');
			pane.modal('show');
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});
}

/**
 * 保存授权
 * 
 * @param id
 */
function authorizeSave(userId) {
	var roleId = $("#roleMenuOption").val();

	var dataInfo = {
		'roleId' : roleId,
		'userId' : userId
	};
	$.ajax({
		type : "post",
		async : false,
		url : ctx + "/user/addUserRole",
		data : dataInfo,

		success : function(data) {
			if (data.info == "success") {
				alert("授权成功！");
				$('#user_authorize_modal').modal('hide');
			} else {
				alert("授权失败，请重试！");
			}
		},
		error : function() {
			alert("请求失败，网络错误，请稍后再试！");
		}
	});

}
