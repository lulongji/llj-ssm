<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/page/common/taglibs.jsp"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
    <title>登录</title>  
        <script type="text/javascript">
			var ctx = "${ctx}";
		</script>
    <link rel="stylesheet" href="${ctx}/res/css/system/login/pintuer.css">
    <link rel="stylesheet" href="${ctx}/res/css/system/login/admin.css">
    <script src="${ctx}/res/js/system/login/jquery.js"></script>
    <script src="${ctx}/res/js/system/login/pintuer.js"></script>  
	<script src="${ctx}/res/js/system/login.js" type="text/javascript"></script>
</head>
<body>
<div class="bg"></div>
<div class="bg"></div>
<div class="container">
    <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">           
            </div>         
            <div class="panel loginbox">
                <div class="text-center margin-big padding-big-top"><h1>TCP登记研究后台管理系统</h1></div>
                <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="text" class="input input-big" name="name" id="name" placeholder="登录账号" data-validate="required:请填写账号" />
                            <span class="icon icon-user margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="password" class="input input-big" name="password" id="psd" placeholder="登录密码" data-validate="required:请填写密码" />
                            <span class="icon icon-key margin-small"></span>
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                        <%--<div class="field">--%>
                            <%--<input type="text" class="input input-big" name="code" id="code" placeholder="填写右侧的验证码" data-validate="required:请填写右侧的验证码" />--%>
                          	<%--<img src="images/passcode.jpg" alt="" width="100" height="32" class="passcode" style="height:43px;cursor:pointer;" onclick="this.src=this.src+'?'">  --%>
                        <%--</div>--%>
                    <%--</div>--%>
                </div>
                <div style="padding:30px;"><input  class="button button-block bg-main text-big input-big" value="登  录" id="login" ></div>
            </div>
        </div>
    </div>
</div>

</body>
</html>