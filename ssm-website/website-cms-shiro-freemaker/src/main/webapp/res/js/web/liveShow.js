jQuery(function ($) {
    $('#queryBtn').click(function () {
        submitForm();
    });
});

// add
function addLiveShow() {
    var roomid = $("#roomid").val();
    var userid = $("#userid").val();
    var chinalId = $("#chinalId").val();
    var dataInfo = {
        'roomid' : roomid,
        'userid' : userid,
        'chinalId' : chinalId
    };
    $.ajax({
        type : "post",
        async : false, // 同步请求
        url : ctx + "/liveShow/addLiveShow",
        data : dataInfo,
        success : function(data) {
            if (data.info == "success") {
                $('#live_add_modal').modal('hide');
                $('#live_add_modal').on('hidden.bs.modal', function(e) {
                    myAlert("添加数据成功！", function (f) {
                    }, false);
                    myMenu('/liveShow/queryLiveShow');
                });
            } else {
                alert("增加用户数据失败,用户已存在！");
            }
        },
        error : function() {
            alert("请求失败，网络错误，请稍后再试！");
        }
    });
}
function addLiveShowPage() {
    $.ajax({
        type : "post",
        async : false, // 同步请求
        url :ctx + "/liveShow/addLiveShowPage",
        success : function(data) {
            var panel = $(".ModelContextPanelAdd");
            panel.empty();
            panel.html(data);
            //要弹出的页面
            var pane = $('#live_add_modal');
            pane.modal('show');
        },
        error : function() {
            alert("请求失败，网络错误，请稍后再试！");
        }
    });
}

//编辑
function editLiveShow(id) {
    $.ajax({
        type: "post",
        async: false, // 同步请求
        url: ctx + "/liveShow/editLiveShow",
        data: {
            'id': id
        },
        success: function (data) {
            $("#main-content").empty();
            $("#main-content").html(data);// 要刷新的div
        },
        error: function () {
            alert("请求失败，网络错误，请稍后再试！");
        }
    });

}
//删除
function delLiveShow(id) {
    var dataInfo = {'id' : id };
    $.ajax({
        type : "post",
        async : false, // 同步请求
        url : ctx+"/liveShow/delLiveShow",
        data : dataInfo,

        success : function(result) {
            if(result.code=='200'){
                myAlert("删除数据成功！", function (f) {
                }, false);
                myMenu('/liveShow/queryLiveShow');
            }
        },
        error : function() {
            alert("请求失败，网络错误，请稍后再试！");
        }
    });
}


// 修改
function modify(id) {
    var roomid = $("#roomid").val();
    if (roomid == '') {
        alert("请输入房间ID！");
        return false;
    }
    var userid = $("#userid").val();
    if (userid == '') {
        alert("请输入用户ID！");
        return false;
    }
    var chinalId = $("#chinalId").val();
    if (chinalId == '') {
        alert("请输入渠道！");
        return false;
    }



    var dataInfo = new FormData();
    dataInfo.append('roomid', roomid);
    dataInfo.append('userid', userid);
    dataInfo.append('chinalId', chinalId);
    dataInfo.append('id', id);

    $.ajax({
        type: "post",
        async: false, // 同步请求
        url: ctx + "/liveShow/modifyLiveShow",
        data: dataInfo,
        // 下面三个参数要指定，如果不指定，会报一个JQuery的错误
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.info == "success") {
                myAlert("修改数据成功！", function (f) {
                }, false);
                myMenu('/liveShow/queryLiveShow');
            } else {
                alert("修改数据失败,或者此数据已存在！");
            }
        },
        error: function () {
        }
    });
}

