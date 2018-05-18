<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<link rel="stylesheet" href="${ctx}/res/js/common/zTree/3.5/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${ctx}/res/js/common/zTree/3.5/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="${ctx}/res/js/common/zTree/3.5/jquery.ztree.excheck.min.js"></script>
<!-- 模态框（Modal） -->
<div class="modal fade" id="authorize_role_modal" tabindex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
            <h4 class="modal-title" id="myModalLabel">角色授权</h4>
         </div>
        <div class="zTreeDemoBackground left">
			<ul id="treeRole" class="ztree"></ul>
		</div>
		<input type="hidden" id ="roleId" value="${roleId}">
		<div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" onclick="saveZtree('${roleId}');">提 交</button>
         </div>
      </div>
</div>
<script type="text/javascript">

//树结构
var setting = {
	view : {
		selectedMulti : false
	},
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		beforeCheck : beforeCheck,
		onCheck : onCheck
	}
};
var simpleNodes = [];
var zNodes = [];
var selectNodes=[];


var code, log, className = "dark";
function beforeCheck(treeId, treeNode) {
	className = (className === "dark" ? "" : "dark");
	showLog("[ " + getTime() + " beforeCheck ]&nbsp;&nbsp;&nbsp;&nbsp;"
			+ treeNode.name);
	return (treeNode.doCheck !== false);
}
function onCheck(e, treeId, treeNode) {
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getCheckedNodes(true);
	var nodes5 = treeObj.getNodes();
	var nodes1 = treeObj.transformToArray(treeObj.getNodes());
	var nodes2 = treeObj.transformTozTreeNodes(simpleNodes);
	var nodes3 = treeObj.getSelectedNodes();
	var nodes = treeObj.getCheckedNodes(true);
	selectNodes=[];
	for (var i = 0; i < nodes.length; i++) {
		selectNodes.push(nodes[i].id);
	/* 	selectNodes.pId =nodes[i].pId;
		selectNodes.name =nodes[i].name; */
	/* 	alert(nodes[i].id); //获取选中节点的值
		alert(nodes[i].pId); //获取选中节点的值
		alert(nodes[i].name); //获取选中节点的值 */
	}
	showLog("[ " + getTime() + " onCheck ]&nbsp;&nbsp;&nbsp;&nbsp;"
			+ treeNode.name);
	}
	function showLog(str) {
		if (!log)
			log = $("#log");
		log.append("<li class='" + className + "'>" + str + "</li>");
		if (log.children("li").length > 6) {
			log.get(0).removeChild(log.children("li")[0]);
		}
	}
	function getTime() {
		var now = new Date(), h = now.getHours(), m = now.getMinutes(), s = now
				.getSeconds(), ms = now.getMilliseconds();
		return (h + ":" + m + ":" + s + " " + ms);
	}

	$(document).ready(function() {
	var roleId = $("#roleId").val();
	$.ajax({
			type : "get",
			async : false,
			url : ctx + "/resource/getMenuAll",
			data : {
				'roleId' : roleId
			},

			success : function(data) {
				if (data.info == "success") {
					zNodes = data.result;
				} else {
					alert("查询树节点失败！");
				}
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
		$.fn.zTree.init($("#treeRole"), setting, zNodes);
	});

	//保存权限节点信息
	function saveZtree(roleId) {
		var dataInfo = {
			'roleId' : roleId,
			'permissions' : selectNodes.toString()
		};
		$.ajax({
			type : "post",
			async : false,
			data : dataInfo,
			url : ctx + "/role/addAuthorizeRole",
			data : dataInfo,

			success : function(data) {
				if (data.info == "success") {
					alert("权限设置成功！");
					$('#authorize_role_modal').modal('hide');
				} else {
					alert("权限设置失败！");
				}
			},
			error : function() {
				alert("请求失败，网络错误，请稍后再试！");
			}
		});
	}
</script>
