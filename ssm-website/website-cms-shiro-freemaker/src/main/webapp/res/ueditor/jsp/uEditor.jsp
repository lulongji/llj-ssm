<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016-10-17
  Time: 10:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/page/common/taglibs.jsp" %>
<script>
  window.UEDITOR_HOME_URL = "${ctx}/res/ueditor/";
</script>
<script type="text/javascript" charset="utf-8" src="${ctx}/res/ueditor/third-party/jquery-1.10.2.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/res/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/res/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="${ctx}/res/ueditor/lang/zh-cn/zh-cn.js"></script>
<link href="${ctx}/res/ueditor/themes/default/css/ueditor.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript">
  var ue = UE.getEditor("container");
  ue.ready( function( container ) {
    ue.setContent($("#ue_msg").html());
  } );
</script>
