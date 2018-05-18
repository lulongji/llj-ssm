<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<%-- <link rel="stylesheet" type="text/css" href="${ctx}/res/css/bootstrap/default.css"> --%>
<script src="${ctx}/res/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx}/res/assets/js/jquery.nestable.min.js"></script>
<script src="${ctx}/res/assets/js/bootstrap.min.js"></script>
<script src="${ctx}/res/js/common/bootstrap/bootstrap-treeview.min.js"></script>
<script src="${ctx}/res/js/system/resource.js"></script>
<style>
	.btn {
		border: 2px solid #FFF;
		border-radius:8px;
	}
</style>
<script>
	var ctx = "${ctx}";
</script>
<div class="breadcrumbs" id="breadcrumbs">
	<script type="text/javascript">
		try {
			ace.settings.check('breadcrumbs', 'fixed')
		} catch (e) {
		}
	</script>
	<ul class="breadcrumb">
		<li><i class="icon-home home-icon"></i> <a href="#">系统管理</a></li>
		<li class="active">资源管理</li>
	</ul>
</div>
<div class="page-content">
	<div class="page_and_btn">
		<div>
		<shiro:hasPermission name="cms-system-sources-add"> 
			<a class="btn btn-small btn-success" onclick="addMenuModal(0);">新增</a>
		</shiro:hasPermission>
		</div>
	</div>

	<table id="table_report"
		class="table table-striped table-bordered table-hover">
		<thead>
			<tr>
				<th class="center" style="width: 50px;">序号</th>
				<th class='center'>资源名称</th>
				<th class='center'>资源编码</th>
				<th class='center'>资源路径</th>
				<th class='center'>排序</th>
				<th class='center'>操作</th>
			</tr>
		</thead>
		<c:choose>
			<c:when test="${not empty menuList}">
				<c:forEach items="${menuList}" var="menu" varStatus="vs">
					<tr id="tr${menu.id }">
						<td class="center">${vs.index+1}</td>
						<td class='center'><i class="icon-desktop">&nbsp;</i>${menu.permissionName}&nbsp;
							<c:if test="${menu.resourcesType == '1' }">
								<span class="label label-success arrowed">系统</span>
							</c:if>
							<c:if test="${menu.resourcesType != '1' }">
								<span class="label label-important arrowed-in">业务</span>
							</c:if>
						</td>
						<td class='center'><i class="">&nbsp;</i>${menu.permissionCode}&nbsp;</td>
						<td>${menu.url == '#'? '': menu.url}</td>
						<td>${menu.sortNum}</td>
						<td style="width: 25%;">
							<a class='btn btn-mini btn-warning' onclick="openClose('${menu.id }',this,${vs.index })">展开</a> 
							<a class='btn btn-mini btn-info' title="编辑" onclick="editMenuModal('${menu.id}','${menu.permissionName}','${menu.url}','${menu.permissionCode}','${menu.parentId}','${menu.resourcesType}','${menu.sortNum}');">
								编辑<i class='icon-edit'></i>
							</a> 
							<a class='btn btn-mini btn-danger' title="删除" onclick="delMenu('${menu.id}');">
								删除<i class='icon-trash'></i>
							</a>
						</td>
					</tr>
				</c:forEach>
			</c:when>
			<c:otherwise>
				<tr>
					<td colspan="100">没有相关数据</td>
				</tr>
			</c:otherwise>
		</c:choose>
	</table>
</div>
<div class="resourceModelContextPanelAdd"></div>
<div class="resourceModelContextPanelEdit"></div>