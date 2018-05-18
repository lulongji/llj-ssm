<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<!-- 模态框（Modal） -->
<div class="modal fade" id="user_edit_modal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
            <h4 class="modal-title" id="myModalLabel">修改用户</h4>
         </div>
         <div class="modal-body">
	         <form class="form-horizontal" role="form">
			   <div class="form-group">
			      <label for="firstname" class="col-sm-2 control-label">用户名：</label>
			       <div class="col-sm-10" id="edit_userName">${userName}</div>
			   </div>
			   <div class="form-group">
			      <label for="lastname" class="col-sm-2 control-label">密码：</label>
			      <div class="col-sm-10">
			         <input type="text" class="form-control" id="edit_password"  placeholder="请输入密码"  maxlength="20"   required="required">
			      </div>
			   </div>
			</form>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" onclick="updateUserInfo('${userName}');">提 交</button>
         </div>
      </div>
</div>