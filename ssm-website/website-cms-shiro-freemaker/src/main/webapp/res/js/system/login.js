$(function () {
    document.onkeydown = function (event) {
        e = event ? event : (window.event ? window.event : null);
        if (e.keyCode == 13) {
            keyDown(e);
        }
    };
    $('#login').click(function () {
        gosubmit();
    });

});

// login
function idFormatter(value) {
    return value + 100;
}

function ok_or_errorBylogin(l) {
    var content = $(l).val();
    if (content != "") {
        $(l).parent().next().next().css("display", "none");
    }
}

function barter_btn(bb) {
    $(bb).parent().parent().fadeOut(1000);
    $(bb).parent().parent().siblings().fadeIn(2000);
}

// 登录验证
function login(data) {
    $.ajax({
        type: "get",
        async: false, // 同步请求
        url: ctx + "/login/login.do",
        data: data,
        success: function (datas) {
            if (datas.code == "200") {
                top.location = ctx + "/page/system/index.jsp";
            } else {
                alert("登录名或者密码错误，请重新输入！");
            }

        },
        error: function () {
            alert("请求失败，网络错误，请稍后再试！");
        }
    });

}

function gosubmit() {
    // login 密码验证
    var name_state = $('#name');
    var psd_state = $('#psd');
    var name = $('#name').val();
    var psd = $('#psd').val();
    if (name == '') {
        name_state.parent().next().next().css("display", "block");
        return false;
    } else if (psd == '') {
        name_state.parent().next().next().css("display", "none");
        psd_state.parent().next().next().css("display", "block");
        return false;
    } else {
        name_state.parent().next().next().css("display", "none");
        psd_state.parent().next().next().css("display", "none");
        var data = {
            "username": name,
            "password": psd
        };
        login(data);
    }

}

// 执行键盘按键命令
function keyDown(e) {
    var keycode = 0;
    // IE浏览器
    if (CheckBrowserIsIE()) {
        keycode = event.keyCode;
    } else {
        // 火狐浏览器
        keycode = e.which;
    }
    if (keycode == 13) // 回车键是13
    {
        gosubmit();
    }
}
// 判断访问者的浏览器是否是IE
function CheckBrowserIsIE() {
    var result = false;
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        result = true;
    }
    return result;
}
