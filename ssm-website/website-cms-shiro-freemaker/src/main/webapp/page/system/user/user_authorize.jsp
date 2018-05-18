<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<!-- 模态框（Modal） -->
<div class="modal fade" id="user_authorize_modal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
            <h4 class="modal-title" id="myModalLabel">用户授权</h4>
         </div>
         <div class="modal-body">
	         <form class="form-horizontal" role="form">
			   <div class="form-group">
			      <label for="lastname" class="col-sm-3 control-label">选择角色：</label>
			      <div class="col-sm-8">
					  <select class="form-control" id="roleMenuOption" value="${roleId}"> 
						    <c:forEach items="${roleList}" var="role">
								<option value="${role.id }" <c:if test="${role.id eq roleId}">selected</c:if> >
									${role.roleName }
								</option>
							</c:forEach>
					   </select>
				   </div>
			   </div>
			</form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" onclick ="authorizeSave('${userId}');">提 交</button>
         </div>
      </div>
</div>
