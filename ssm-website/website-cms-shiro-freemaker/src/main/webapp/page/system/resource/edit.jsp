<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<!-- 模态框（Modal） -->
<div class="modal fade" id="resource_edit_modal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
            <h4 class="modal-title" id="myModalLabel">编辑菜单</h4>
         </div>
         <div class="modal-body">
	         <form class="form-horizontal" role="form">
				<div class="form-group">
				  <label  class="col-sm-3 control-label">父级菜单：</label>
				  <div class="col-sm-9">
					  <select class="form-control" id="resourceMenuOption" value="${parentId}"> 
						    <option value="0">顶级菜单</option> 
						    <c:forEach items="${menuList}" var="menu">
								<option value="${menu.id }"  <c:if test="${menu.id eq parentId}">selected</c:if> >${menu.permissionName }</option>
							</c:forEach>
					   </select>
				  </div>   
				</div>
				<div class="form-group">
				  <label  class="col-sm-3 control-label">资源类别：</label>
				  <div class="col-sm-9">
					  <select class="form-control" id="resourceMenuTypeOption" value="${resourcesType}" > 
						    <c:forEach items="${dictList}" var="dict">
									<option value="${dict.id }" <c:if test="${dict.id eq resourcesType}">selected</c:if>  >${dict.name }</option>
							</c:forEach>
					   </select>
				  </div>   
				</div>
				<div class="form-group">
			      <label  class="col-sm-3 control-label">资源编码：</label>
			      <div class="col-sm-9">
			         <input type="text" class="form-control" id="resourceMenuCode" value ="${permissionCode}" placeholder="请输入资源编码" maxlength="200" required="required">
			      </div>
			   </div>
				<div class="form-group">
			      <label  class="col-sm-3 control-label">菜单名称：</label>
			      <div class="col-sm-9">
			         <input type="text" class="form-control" id="resourceMenuName" value ="${permissionName}" placeholder="请输入菜单名称" maxlength="10" required="required">
			      </div>
			   </div>
   				<div class="form-group">
			      <label  class="col-sm-3 control-label">顺序：</label>
			      <div class="col-sm-9">
			         <input type="text" class="form-control" id="sortNum"  value ="${sortNum}" placeholder="请输入序号" maxlength="10" required="required">
			      </div>
			   </div>
			   <div class="form-group">
			      <label class="col-sm-3 control-label">链接地址：</label>
			      <div class="col-sm-9">
			         <input type="text" class="form-control" id="resourceMenuUrl" value ="${url}"  maxlength="200"  placeholder="请输入链接地址" required="required">
			      </div>
			   </div>
			   <input type="hidden" name="id" id ="sourcesMenuId" value="${id}"> 
			</form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" onclick ="editMenuInfo();">提 交</button>
         </div>
      </div>
</div>
