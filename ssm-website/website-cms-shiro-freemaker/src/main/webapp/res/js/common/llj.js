/**
 * 弹出框封装
 * @param str
 * @param click
 * @param useCancel
 */
function myAlert(str, click, useCancel) {
    var overflow = "";
    var $hidder = null;
    var clickHandler = click || $.noop;
    var myClickHandler = function () {
        $hidder.remove();
        $("body").css("overflow", overflow);
        clickHandler($(this).html() == "确定");
    };
    var init = function () {
        $hidder = $("<div style='width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;text-align: center;position:fixed;left:0;top:0;'></div>");
        var $myalert = $("<div style='width:270px;position:absolute;top:40%;left:50%;margin-left:-150px;padding:20px;background:#fff;border-radius:5px;'>" +
            "<div style='padding-bottom:10px;border-bottom:1px solid #e5e5e5;font-size:20px;color:#f83;'>温馨提示</div></div>")
            .appendTo($hidder);
        $("<div style='padding:10px 0;color:#333;border-bottom:1px solid #e5e5e5;'>" + str + "</div>").appendTo($myalert);
        var $myalert_btn_div = $("<div style='padding-top:10px;'></div>").appendTo($myalert);
        var $okBtn = $("<div style='float:left;width:100%;color:#D52;border-radius:2px;padding:7px 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;' class='bluebg1'>确定</div>")
            .appendTo($myalert_btn_div).click(myClickHandler);
        if (useCancel) {
            $okBtn.css({"width": "50%", "border-right": "5px solid #fff"});
            $("<div style='float:left;width:50%;border-left:5px solid #fff;border-radius:2px;padding:7px 0;color:#fff;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background:#ccc;'>取消</div>")
                .appendTo($myalert_btn_div).click(myClickHandler);
        }
        overflow = $("body").css("overflow");
        $("body").css("overflow", "hidden").append($hidder);
    };
    init();
}

//调用
// myAlert("是否跳转到百度页面?", function (f) {
//     if (f) {
//         window.open("http://www.baidu.com");
//     }
// }, true);


