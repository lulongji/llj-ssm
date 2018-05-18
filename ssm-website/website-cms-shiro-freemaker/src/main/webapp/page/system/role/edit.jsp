<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<!-- 模态框（Modal） -->
<div class="modal fade" id="role_edit_modal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
            <h4 class="modal-title" id="myModalLabel">修改角色</h4>
         </div>
         <div class="modal-body">
	         <form class="form-horizontal" role="form">
			   <div class="form-group">
			      <label for="firstname" class="col-sm-3 control-label">角色名称：</label>
			      <div class="col-sm-8">
			         <input type="text" class="form-control" id="roleName"  value ="${roleName}" placeholder="请输入角色名称" maxlength="15" required="required">
			      </div>
			   </div>
			   <div class="form-group">
			      <label for="lastname" class="col-sm-3 control-label">角色状态：</label>
   				  <div class="col-sm-8">
					  <select class="form-control" id="roleTypeOption"> 
						    <option value="1" selectd>启用</option> 
						    <option value="2" >停用</option> 
					   </select>
				  </div> 
			   </div>
			</form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" onclick="updateRoleInfo('${id}');">提 交</button>
         </div>
      </div>
</div>