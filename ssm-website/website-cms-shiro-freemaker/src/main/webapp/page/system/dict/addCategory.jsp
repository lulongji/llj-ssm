<%--
  Created by IntelliJ IDEA.
  User: Li Lei
  Date: 2016/8/22
  Time: 10:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<!-- 模态框（Modal） -->
<div class="modal fade" id="category_add_modal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times; </button>
        <h4 class="modal-title" id="myModalLabel">添加字典分类</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="addCateFrm" role="form">
          <div class="form-group">
            <label for="firstname" class="col-sm-3 control-label">分类名称：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" name="categoryName" id="addCategoryName"  placeholder="请输入分类名" maxlength="20" required="required">
            </div>
          </div>
          <div class="form-group">
            <label for="firstname" class="col-sm-3 control-label">分类编码：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" name="categoryCode" id="addCategoryCode"  placeholder="请输入分类编码" maxlength="20" required="required">
            </div>
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <a type="button" class="btn btn-default"  data-dismiss="modal">关 闭</a>
        <a type="button" class="btn btn-primary" onclick ="saveCategory();">提 交</a>
      </div>
    </div>
  </div>

