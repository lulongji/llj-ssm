<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<script src="${ctx}/res/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx}/res/assets/js/jquery.nestable.min.js"></script>
<input id="pageCtx" type="hidden" value="${ctx}"/>
<style>
    .btn.btn-app.btn-xs {
        width: 84px;
        font-size: 15px;
        border-radius: 8px;
        padding-bottom: 7px;
        padding-top: 8px;
        line-height: 1.45;
        margin-left: 15px;
    }
</style>
<script type="text/javascript">
    var ctx =$("#pageCtx").val();
</script>
        <div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
                try {
                    ace.settings.check('breadcrumbs', 'fixed')
                } catch (e) {
                }
            </script>
            <ul class="breadcrumb">
                <li><i class="icon-home home-icon"></i> <a href="#">首页</a></li>
                <li class="active">字典管理</li>
            </ul>
            <!-- .breadcrumb -->
        </div>

        <div class="page-content">
            <%--<div class="page-header">--%>
                <%--<h1>--%>
                    <%--字典管理--%>
                    <%--<small><i class="icon-double-angle-right"></i> 字典列表--%>
                    <%--</small>--%>
                <%--</h1>--%>
            <%--</div>--%>
            <div class="nav-search">

            </div>
            <!-- /.page-header -->
            <div class="row">

                <div class="col-xs-12">
                    <div class="table-responsive">
                        <form id="queryForm" action="${ctx}/dict/queryDict">
                        <fieldset>
                            <label contenteditable="true">字典名称</label>
                            <input class="input-medium search-query" type="text" name="name" id="dictName" value="${page.name}">
                            <label style="margin-left: 5px;" contenteditable="true">所属分类</label>
                            <select class="input-sm width-20" id="categoryId" name="categoryId">
                                <option value="">请选择</option>
                                <c:forEach items="${categoryList}" var="item">
                                    <option <c:if test="${item.id == page.categoryId}">selected</c:if> value="${item.id}">${item.categoryName}</option>
                                </c:forEach>
                            </select>
                            <a id="queryBtn" class="btn btn-app btn-primary btn-xs">
                                查询
                            </a>
                            <shiro:hasPermission name="cms-system-dict-add">
                                <a onclick="chagePage('','add');" class="btn btn-app btn-success btn-xs">
                                    新增字典
                                </a>
                            </shiro:hasPermission>
                        </fieldset>
                        </form>

                    </div>
                    <div class="space-4"></div>
                    <div class="table-responsive">
                        <table id="sample-table-1" class="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="center" width="7%">
                                    <label>
                                        序号
                                        <span class="lbl"></span>
                                    </label>
                                </th>
                                <th width="12%">字典名称</th>
                                <th width="10%">所属分类</th>
                                <th width="10%">父项字典</th>
                                <th width="10%">字典编码</th>
                                <th width="10%">字典内容</th>
                                <th width="10%">更新时间</th>
                                <th width="10%">状态</th>
                                <th ></th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${page.queryList}" var="dictValue" varStatus="step">
                                <tr>
                                    <td class="center">
                                        <label>
                                            ${step.count}
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <a href="#">${dictValue.name}</a>
                                    </td>
                                    <td>${dictValue.categoryName}</td>
                                    <td class="hidden-480">
                                        <c:if test="${not empty dictValue.parentName}">
                                            ${dictValue.parentName}
                                        </c:if>
                                        <c:if test="${empty dictValue.parentName}">
                                            <span class="label label-warning">
                                            无父项字典
                                            </span>
                                        </c:if>
                                    </td>
                                    <td>${dictValue.dictCode}</td>
                                    <td>${dictValue.dictContent}</td>
                                    <td><fmt:formatDate value="${dictValue.updateTime}" pattern="yyyy-MM-dd"/></td>

                                    <td class="hidden-480">
                                        <c:if test="${dictValue.status == 1}">
                                            <span class="label label-sm label-success">启用</span>
                                        </c:if>
                                        <c:if test="${dictValue.status != 1}">
                                            <span class="label label-sm label-warning">停用</span>
                                        </c:if>
                                    </td>

                                    <td>
                                        <div class="visible-md visible-lg hidden-xs btn-group">
                                            <shiro:hasPermission name="cms-system-dict-edit">
                                                <button onclick="chagePage(${dictValue.id},'edit');" class="btn btn-xs btn-info">
                                                    <i class="icon-edit bigger-120">编辑</i>
                                                </button>
                                            </shiro:hasPermission>
                                            <shiro:hasPermission name="cms-system-dict-del">
                                                <button onclick="delDictVal(${dictValue.id});" class="btn btn-xs btn-danger">
                                                    <i class="icon-trash bigger-120">删除</i>
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
    <script src="${ctx}/res/js/system/dict.js"></script>
