<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<script src="${ctx}/res/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx}/res/assets/js/jquery.nestable.min.js"></script>
<script src="${ctx}/res/assets/js/bootstrap.min.js"></script>
<script src="${ctx}/res/js/system/user.js"></script>
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
                <li class="active">系统用户</li>
            </ul>
            <!-- .breadcrumb -->
        </div>
        <div class="page-content">
            <!-- /.page-header -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="table-responsive">
                        <form  id="queryForm" action="${ctx}/user/getUser">
	                        <fieldset>
	                            <label contenteditable="true">用户名</label>
	                            <input type="text" name="userName"  value="${page.userName}">
	                            <div class="btn btn-primary" id="queryBtn" contenteditable="true" type="button">查询</div>
	                           	<shiro:hasPermission name="cms-system-user-add-user">  
					           		   <div class="btn btn-small btn-success" id="addUserMode" >新增</div>
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
                                <th>用户名</th>
                                <th>更新时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${page.queryList}" var="user" varStatus="step">
                                <tr>
                                    <td class="center">
                                        <label>
                                            <input type="checkbox" class="ace" />
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td class='center' style="width: 60px;">${step.index+1}</td>
                                    <td>
                                        ${user.userName}
                                    </td>
                                    <td><fmt:formatDate value="${user.updateTime}" pattern="yyyy-MM-dd"/></td>
                                    <td>
                                        <div class="visible-md visible-lg hidden-sm hidden-xs btn-group">
	                                	    <shiro:hasPermission name="cms-system-user-edit-user">  
	                           	                 <button class="btn btn-xs btn-info" onclick="editUserModal('${user.userName}');" >
	                                                编辑<i class="icon-edit bigger-120"></i>
	                                             </button>
						           			</shiro:hasPermission>
											<shiro:hasPermission name="cms-system-user-del-user">  
	                                            <button class="btn btn-xs btn-danger" onclick="delUser('${user.userName}');">
	                                                删除<i class="icon-trash bigger-120"></i>
	                                            </button>
                                            </shiro:hasPermission>
                                            <shiro:hasPermission name="cms-system-user-authorize-user">  
	                                             <button class="btn btn-xs btn-warning" onclick="authorizeModal('${user.userName}','${user.id}','${user.roleId}');">
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
   	<div class="ModelContextPanelAdd"></div>
	<div class="ModelContextPanelEdit"></div>
	<div class="ModelContextPanelAuthorize"></div>
	
