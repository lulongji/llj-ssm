<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp"%>
<script src="${ctx}/res/assets/js/ace-extra.min.js"></script>

<script type="text/javascript">
	if("ontouchend" in document) document.write("<script src='${ctx}/res/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>

<link href="${ctx}/res/assets/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${ctx}/res/assets/css/font-awesome.min.css" />
<link rel="stylesheet" href="${ctx}/res/assets/css/font-awesome-ie7.min.css" />
<link rel="stylesheet" href="${ctx}/res/assets/css/ace.min.css" />
<link rel="stylesheet" href="${ctx}/res/assets/css/ace-rtl.min.css" />
<link rel="stylesheet" href="${ctx}/res/assets/css/ace-skins.min.css" />
<link rel="stylesheet" href="${ctx}/res/assets/css/ace-ie.min.css" />
<script src="${ctx}/res/assets/js/ace-extra.min.js"></script>
<script src="${ctx}/res/assets/js/html5shiv.js"></script>
<script src="${ctx}/res/assets/js/respond.min.js"></script>


<div class="breadcrumbs" id="breadcrumbs">
	<script type="text/javascript">
		try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
	</script>

	<ul class="breadcrumb">
		<li>
			<i class="icon-home home-icon"></i>
			<a href="#">首页</a>
		</li>

		<li>
			<a href="javascript:void(0);" onclick="myMenu('/dict/queryDict');" >字典管理</a>
		</li>
		<li class="active">字典详情</li>
	</ul><!-- .breadcrumb -->

</div>

<div class="page-content">
	<div class="page-header">
		<h1>
			字典详情信息
		</h1>
	</div>

	<div class="row">
		<div class="col-xs-12">
			<!-- PAGE CONTENT BEGINS -->
			<form class="form-horizontal" id="editDicForm" onkeypress="if(event.keyCode==13||event.which==13){return false;}" role="form" action="${ctx}/dict/editDictValue.do">
				<input type="hidden" name="id" id="dictId" value="${dictValue.id}"/>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" >字典名称</label>
					<div class="col-sm-3">
						<input id="dictName"  name="name" type="text" class="width-95" value="${dictValue.name}"/>
					</div>
					<div class="col-sm-2 col-xs-20" style="margin-left: 0px;padding-left: 0px;" >
						<span class="lighter red">*</span>
					</div>
				</div>

				<div class="space-4"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" >所属分类</label>
					<div class="col-sm-3">
						<select name="categoryId" id="categoryId" class="width-95">
							<option value="">请选择</option>
							<c:forEach items="${categoryList}" var="category" varStatus="stat">
								<option value="${category.id}-${category.categoryCode}" <c:if test="${dictValue.categoryId == category.id}">selected</c:if>>${category.categoryName}</option>
							</c:forEach >
						</select>
					</div>
				</div>
				<div class="space-4"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right">父项字典</label>
					<div class="col-sm-3">
						<span class="block input-icon input-icon-right">
							<input id="parentName" name="parentName" class="width-95" value="${dictValue.parentName}" readonly type="text">
							<input type="hidden" id="parentId" name="parentId" value="${dictValue.parentId}"/>
							<input type="hidden" id="parentDict" name="parentDict" value="${dictValue.parentName}"/>
						</span>
					</div>
					<div class="col-sm-2 col-xs-20" style="margin-left: 0px;padding-left: 0px;" >
						<span class="block input-icon input-icon-right">
							<a href="#modal-table" class="green" data-toggle="modal" id="openSpan" hidden>
								<i title="指定上级字典" class="icon-zoom-in icon-on-right bigger-110" id="openDictDialog">选择上级字典</i>
							</a>
							<span id="parentNotice" class="lighter red" hidden>选择范围后可选父项</span>
						</span>
					</div>
				</div>
				<div class="space-4"></div>
				<div class="form-group">
					<label class="col-sm-3 control-label no-padding-right" >字典状态</label>
					<div class="col-sm-3">
						<select class="width-95" id="valueStatus" name="status">
							<option <c:if test="${dictValue.status == 1}">selected</c:if> value="1">启用</option>
							<option <c:if test="${dictValue.status == 2}">selected</c:if> value="2">停用</option>
						</select>
					</div>
				</div>
				<div class="space-4"></div>

                <div class="form-group">
                    <label class="col-sm-3 control-label no-padding-right" >字典编码</label>
                    <div class="col-sm-3">
                        <input id="dictCode"  name="dictCode" type="text" class="width-95" value="${dictValue.dictCode}"/>
                    </div>
                    <div class="col-sm-2 col-xs-20" style="margin-left: 0px;padding-left: 0px;" >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label no-padding-right" >字典内容</label>
                    <div class="col-sm-3">
                        <input id="dictContent"  name="dictContent" type="text" class="width-95" value="${dictValue.dictContent}"/>
                    </div>
                    <div class="col-sm-2 col-xs-20" style="margin-left: 0px;padding-left: 0px;" >
                    </div>
                </div>


				<div class="hr hr-18 dotted hr-double"></div>
				<div id="modal-table" class="modal fade" style="height: auto;" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header no-padding">
								<div class="table-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
										<span class="white">&times;</span>
									</button>
									字典分类值
								</div>
							</div>
							<div class=" modal-body no-padding">
								<div class="col-sm-6 table no-margin-bottom no-border-top" style="min-height:350px;overflow-y:auto;max-height:450px;">
									<div class="dd" id="nestable" >

									</div>
								</div>
							</div>

							<div class="modal-footer no-margin-top">
								<button class="btn btn-sm btn-danger pull-left" id="cancelParent" data-dismiss="modal">
									<i class="icon-reply"></i>
									取消
								</button>
								<button class="btn btn-sm btn-success pull-right" id="saveParent" data-dismiss="modal">
									<i class="icon-ok"></i>
									确定
								</button>
							</div>
						</div><!-- /.modal-content -->
					</div><!-- /.modal-dialog -->
				</div><!-- PAGE CONTENT ENDS -->


				<div class="clearfix form-actions">
					<div class="col-md-offset-3 col-md-9">
						<button id="editDict" class="btn btn-info" type="button">
							<i class="icon-ok bigger-110"></i>
							更新
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="cancelSave" class="btn" type="reset">
							<i class="icon-reply bigger-110"></i>
							取消
						</button>
					</div>
				</div>
			</form>
		</div><!-- /.col -->
	</div><!-- /.row -->
</div><!-- /.page-content -->
<script src="${ctx}/res/js/system/dict_add.js"></script>
