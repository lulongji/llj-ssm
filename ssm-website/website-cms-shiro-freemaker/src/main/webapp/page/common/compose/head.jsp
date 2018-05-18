<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/page/common/taglibs.jsp" %>
<meta charset="utf-8"/>
<title>好医生后台</title>
<meta name="keywords" content="好医生"/>
<meta name="description" content="好医生"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<!-- basic styles -->
<link href="${ctx}/res/css/bootstrap/bootstrap.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="${ctx}/res/css/bootstrap/font-awesome.min.css"/>

<!--[if IE 7]>
<link rel="stylesheet" href="${ctx}/res/css/bootstrap/font-awesome-ie7.min.css" />
<![endif]-->


<!-- ace styles -->

<link rel="stylesheet" href="${ctx}/res/css/ace/ace.min.css"/>
<link rel="stylesheet" href="${ctx}/res/css/ace/ace-rtl.min.css"/>
<link rel="stylesheet" href="${ctx}/res/css/ace/ace-skins.min.css"/>

<!--[if lte IE 8]>
<link rel="stylesheet" href="${ctx}/res/css/ace/ace-ie.min.css" />
<![endif]-->


<!-- ace settings handler -->

<script src="${ctx}/res/js/common/ace/ace-extra.min.js"></script>

<!--[if lt IE 9]>
<script src="${ctx}/res/js/common/ace/html5shiv.js"></script>
<script src="${ctx}/res/js/common/ace/respond.min.js"></script>
<![endif]-->

<!--[if !IE]> -->
<script src="${ctx}/res/js/common/jquery/jquery-2.0.3.min.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script src="${ctx}/res/js/common/jquery/jquery-1.10.2.min.js"></script>
<![endif]-->

<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='${ctx}/res/js/common/jquery/jquery-2.0.3.min.js'>" + "<" + "script>");
</script>
<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
window.jQuery || document.write("<script src='${ctx}/res/js/common/jquery/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->

<script type="text/javascript">
    if ("ontouchend" in document)
        document.write("<script src='${ctx}/res/js/common/jquery/jquery.mobile.custom.min.js'>" + "<" + "script>");
</script>
<script src="${ctx}/res/js/common/bootstrap/bootstrap.min.js"></script>
<script src="${ctx}/res/js/common/ace/typeahead-bs2.min.js"></script>


<!--[if lte IE 8]>
<script src="${ctx}/res/js/common/ace/excanvas.min.js"></script>
<![endif]-->

<script src="${ctx}/res/js/common/jquery/jquery-ui-1.10.3.custom.min.js"></script>
<script src="${ctx}/res/js/common/jquery/jquery.ui.touch-punch.min.js"></script>
<script src="${ctx}/res/js/common/jquery/jquery.slimscroll.min.js"></script>
<script src="${ctx}/res/js/common/jquery/jquery.easy-pie-chart.min.js"></script>
<script src="${ctx}/res/js/common/jquery/jquery.sparkline.min.js"></script>
<script src="${ctx}/res/js/common/jquery/flot/jquery.flot.min.js"></script>
<script src="${ctx}/res/js/common/jquery/flot/jquery.flot.pie.min.js"></script>
<script src="${ctx}/res/js/common/jquery/flot/jquery.flot.resize.min.js"></script>

<!-- ace scripts -->

<script src="${ctx}/res/js/common/ace/ace-elements.min.js"></script>
<script src="${ctx}/res/js/common/ace/ace.min.js"></script>
<script type="text/javascript">
    var ctx = "${ctx}";
</script>

<!-- 图片预览 -->
<script type="text/javascript" src="${ctx}/res/js/common/jquery/plugins/jquery.form.js"></script>
<script src="${ctx}/res/js/common/uploadPreview.js"></script>



