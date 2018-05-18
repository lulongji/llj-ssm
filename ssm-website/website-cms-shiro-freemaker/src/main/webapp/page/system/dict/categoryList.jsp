<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<script src="${ctx}/res/assets/js/jquery-2.0.3.min.js"></script>
<script src="${ctx}/res/assets/js/jquery.nestable.min.js"></script>
<script src="${ctx}/res/assets/js/bootstrap.min.js"></script>
<input id="pageCtx" type="hidden" value="${ctx}"/>

<style>
    .btn.btn-app.btn-xs {
        width: 84px;
        font-size: 15px;
        border-radius: 8px;
        padding-bottom: 5px;
        padding-top: 8px;
        line-height: 1.45;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 8px;
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
            <div class="nav-search">

            </div>
            <!-- /.page-header -->
            <div class="row">

                <div class="col-xs-12">
                    <div class="table-responsive">
                        <form id="queryForm" action="${ctx}/dict/queryCategory">
                        <fieldset>
                            <label contenteditable="true">分类名称</label>
                            <input class="input-medium search-query" type="text" name="categoryName" id="categoryName" value="${page.categoryName}">
                            <label contenteditable="true">分类编码</label>
                            <input class="input-medium search-query" type="text" name="categoryCode" id="categoryCode" value="${page.categoryCode}">
                            <a id="queryBtn" class="btn btn-app btn-primary btn-xs">
                                查询
                            </a>
                            <shiro:hasPermission name="cms-system-dict-category-add">
                                <a id="addCategory" class="btn btn-app btn-success btn-xs">
                                    新增分类
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
                                <th width="18%">分类名称</th>
                                <th width="18%">分类编码</th>
                                <th width="15%">创建时间</th>
                                <th width="15%">更新时间</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach items="${page.queryList}" var="category" varStatus="step">
                                <tr>
                                    <td class="center">
                                        <label>
                                            ${step.count}
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <input id="${category.id}_input_name" style="display: none;" type="text" name="id" value="${category.categoryName}" role="textbox" class="editable">
                                        <span id="${category.id}_span_name">${category.categoryName}</span>
                                    </td>
                                    <td>
                                        <input id="${category.id}_input_code" style="display: none;" type="text" name="id" value="${category.categoryCode}" role="textbox" class="editable">
                                        <span id="${category.id}_span_code">${category.categoryCode}</span>
                                    </td>
                                    <td><fmt:formatDate value="${category.createTime}" pattern="yyyy-MM-dd"/></td>
                                    <td><fmt:formatDate value="${category.updateTime}" pattern="yyyy-MM-dd"/></td>
                                    <td>
                                        <div class="visible-md visible-lg hidden-sm hidden-xs btn-group">
                                            <shiro:hasPermission name="cms-system-dict-category-edit">
                                                <a data-value="${category.id}" style="display: none;" class="btn btn-xs btn-success mybtn">
                                                    <i class="icon-ok bigger-120">保存</i>
                                                </a>
                                                <a data-value="${category.id}" class="btn btn-xs btn-info mybtn">
                                                    <i class="icon-edit bigger-120">编辑</i>
                                                </a>
                                            </shiro:hasPermission>
                                            <shiro:hasPermission name="cms-system-dict-category-del">
                                                <a onclick="delCategory(${category.id});" class="btn btn-xs btn-danger">
                                                    <i class="icon-trash bigger-120">删除</i>
                                                </a>
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
    <script src="${ctx}/res/js/system/dictCategory.js"></script>
