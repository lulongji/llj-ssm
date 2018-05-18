<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<script src="${ctx}/res/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx}/res/assets/js/jquery.nestable.min.js"></script>
<script src="${ctx}/res/assets/js/bootstrap.min.js"></script>
<script src="${ctx}/res/js/system/role.js"></script>
<script>
	var ctx = "${ctx}";
</script>
<style>
    .btn {
        border: 2px solid #FFF;
        border-radius:8px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 8px;
    }

</style>
<div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
                try {
                    ace.settings.check('breadcrumbs', 'fixed')
                } catch (e) {
                }
            </script>
            <ul class="breadcrumb">
                <li><i class="icon-home home-icon"></i> <a href="#">系统管理</a></li>
                <li class="active">角色管理</li>
            </ul>
            <!-- .breadcrumb -->
        </div>
        <div class="page-content">
            <!-- /.page-header -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="table-responsive">
                        <form  id="queryForm" action="${ctx}/role/getRole">
	                        <fieldset>
	                            <label contenteditable="true">角色名称</label>
	                            <input type="text" name="roleName"  value="${page.roleName}">
	                            <div class="btn btn-primary" id="queryBtn" contenteditable="true" type="button">查询</div>
	                            <shiro:hasPermission name="cms-system-role-add-role"> 
				           			<div class="btn btn-small btn-success" onclick="addRoleMode();" >新增</div>
				           		</shiro:hasPermission>	
	                        </fieldset>
                        </form>
                    </div>
                    <div class="table-responsive">
                        <table id="sample-table-1" class="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="center">
                                    <label>
                                        <input type="checkbox" class="ace" />
                                        <span class="lbl"></span>
                                    </label>
                                </th>
                                <th>序号</th>
                                <th>角色名称</th>
                                <th>更新时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${page.queryList}" var="role" varStatus="step">
                                <tr>
                                    <td class="center">
                                        <label>
                                            <input type="checkbox" class="ace" />
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td class='center' style="width: 60px;">${step.index+1}</td>
                                    <td>
                                        ${role.roleName}
                                    </td>
                                    <td><fmt:formatDate value="${role.updateTime}" pattern="yyyy-MM-dd"/></td>
                                    <td>
                                        <div class="visible-md visible-lg hidden-sm hidden-xs btn-group">
                                        	<shiro:hasPermission name="cms-system-role-add-edit"> 
                                            <button class="btn btn-xs btn-info" onclick="editRoleModal('${role.id}','${role.roleName}');" >
                                                编辑<i class="icon-edit bigger-120"></i>
                                            </button>
											</shiro:hasPermission>
											<shiro:hasPermission name="cms-system-role-del-role"> 
                                            <button class="btn btn-xs btn-danger" onclick="delRole('${role.id}');">
                                                删除<i class="icon-trash bigger-120"></i>
                                            </button>
                                            </shiro:hasPermission>
                                            <shiro:hasPermission name="cms-system-role-authorize-role"> 
                                             <button class="btn btn-xs btn-warning" onclick="authorizeRole('${role.id}');">
                                                授权<i class="icon-flag bigger-120"></i>
                                            </button>
                                            </shiro:hasPermission>
                                        </div>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                    <!-- PAGE CONTENT ENDS -->
                   <%@ include file="/page/common/compose/pager.jsp" %> 
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.page-content -->
    <!-- /.main-content -->
   	<div class="roleModelContextPanelAdd"></div>
	<div class="roleModelContextPanelEdit"></div>
	<div class="roleModelContextPanelAuthorize"></div>
