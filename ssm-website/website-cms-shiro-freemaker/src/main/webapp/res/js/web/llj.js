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


/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");


/**
 * 进度条
 * @param attribute
 */
function creatjdt(attribute) {
    var jdt = $('<div class="popup" style="width:100%;height:100%;background:rgba(0,0,0,0.6);position:absolute;top:0;left:0;z-index:9999;">' +
        '<div class="votebox" style="margin:70% auto 0;width:50%;position:relative;z-index:66;">' +
        '<dl class="barbox">' +
        '<dd class="barline" style="float:left;width:100%;background:#eee;border-radius:50px;height:30px;overflow:hidden;display:inline;margin-left:0;">' +
        '<div w="90" style="width:0px;height:30px;overflow:hidden;background:#22a1ef;border-radius:50px;" class="charts"></div>' +
        '</dd>' +
        '</dl>' +
        '</div>' +
        '<div>');
    jdt.appendTo($('body'));
    $(".charts").each(function (i, item) {
        var a = parseInt($(item).attr("w"));
        $(item).animate({
            width: a + "%"
        }, 4000);
    });
    var d_sTop = $(document).scrollTop();
    if (attribute == true) {
        $('.popup').css({'display': 'block', 'top': d_sTop});
        $('body').css('overflow', 'hidden');
    } else {
        $('.popup').css('display', 'none');
        $('body').css('overflow', 'scroll');
    }
    ;
}
//creatjdt(true);


/**
 *
 * @constructor
 */
function StringBuffer() {
    this.__strings__ = new Array();
}
StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
    return this;    //方便链式操作
}
StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
}

function htmlData(data) {
    var htmlData = new StringBuffer();
    htmlData.append(data);
    return htmlData;
}


function isFlag(data, v) {
    var isFlag = false;
    var arr = data.split(',');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == v) {
            isFlag = true;
        }
    }
    return isFlag;
}


/**
 * 弹出加载框
 */
function isJzz() {
    $('body').loading({
        loadingWidth: 240,
        title: '加载中...',
        name: 'test',
        discription: '正在加载中,请稍后！',
        direction: 'column',
        type: 'origin',
        // originBg:'#71EA71',
        originDivWidth: 40,
        originDivHeight: 40,
        originWidth: 6,
        originHeight: 6,
        smallLoading: false,
        loadingMaskBg: 'rgba(0,0,0,0.2)'
    });
}

/*****************************************************************
 表单校验工具类
 *****************************************************************/

/**
 * 判断整数num是否等于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntEqZero(num) {
    return num == 0;
}

/**
 * 判断整数num是否大于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntGtZero(num) {
    return num > 0;
}

/**
 * 判断整数num是否大于或等于0
 *
 * @param num
 * @return
 * @author jiqinlin
 */
function isIntGteZero(num) {
    return num >= 0;
}

/**
 * 判断浮点数num是否等于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
function isFloatEqZero(num) {
    return num == 0;
}

/**
 * 判断浮点数num是否大于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
function isFloatGtZero(num) {
    return num > 0;
}

/**
 * 判断浮点数num是否大于或等于0
 *
 * @param num 浮点数
 * @return
 * @author jiqinlin
 */
function isFloatGteZero(num) {
    return num >= 0;
}

/**
 * 匹配Email地址
 */
function isEmail(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (result == null)return false;
    return true;
}

/**
 * 判断数值类型，包括整数和浮点数
 */
function isNumber(str) {
    if (isDouble(str) || isInteger(str)) return true;
    return false;
}

/**
 * 只能输入数字[0-9]
 */
function isDigits(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^\d+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配money
 */
function isMoney(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^(([1-9]\d*)|(([0-9]{1}|[1-9]+)\.[0-9]{1,2}))$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配phone
 */
function isPhone(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配mobile
 */
function isMobile(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^((\(\d{2,3}\))|(\d{3}\-))?((13\d{9})|(15\d{9})|(18\d{9}))$/);
    if (result == null)return false;
    return true;
}

/**
 * 联系电话(手机/电话皆可)验证
 */
function isTel(text) {
    if (isMobile(text) || isPhone(text)) return true;
    return false;
}
/**
 * 匹配qq
 */
function isQq(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[1-9]\d{4,12}$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配english
 */
function isEnglish(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[A-Za-z]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配integer
 */
function isInteger(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配double或float
 */
function isDouble(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[-\+]?\d+(\.\d+)?$/);
    if (result == null)return false;
    return true;
}


/**
 * 匹配邮政编码
 */
function isZipCode(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[0-9]{6}$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配URL
 */
function isUrl(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
 */
function isPwd(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[a-zA-Z]\\w{6,12}$/);
    if (result == null)return false;
    return true;
}

/**
 * 判断是否为合法字符(a-zA-Z0-9-_)
 */
function isRightfulString(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[A-Za-z0-9_-]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配english
 */
function isEnglish(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[A-Za-z]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配身份证号码
 */
function isIdCardNo(num) {
    //　 if (isNaN(num)) {alert("输入的不是数字！"); return false;}
    var len = num.length, re;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
    else {
        alert("输入的数字位数不对。");
        return false;
    }
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            alert("输入的身份证号 " + a[0] + " 里出生日期不对。");
            return false;
        }
    }
    if (!re.test(num)) {
        alert("身份证最后一位只能是数字和字母。");
        return false;
    }

    return true;
}

/**
 * 匹配汉字
 */
function isChinese(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[\u4e00-\u9fa5]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 匹配中文(包括汉字和字符)
 */
function isChineseChar(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[\u0391-\uFFE5]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 字符验证，只能包含中文、英文、数字、下划线等字符。
 */
function stringCheck(str) {
    if (str == null || str == "") return false;
    var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
    if (result == null)return false;
    return true;
}

/**
 * 过滤中英文特殊字符，除英文"-_"字符外
 */
function stringFilter(str) {
    var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 判断是否包含中英文特殊字符，除英文"-_"字符外
 */
function isContainsSpecialChar(str) {
    if (str == null || str == "") return false;
    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return reg.test(str);
}


/**
 * 手机端拍照处理角度问题
 * @param fileObj
 */
function selectFileImage(fileObj, myImage) {
    var file = fileObj.files['0'];
    //图片方向角 added by lzk
    var Orientation = null;

    if (file) {
        console.log("正在上传,请稍后...");
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
        if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
        }
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function () {
            // alert(EXIF.pretty(this));
            EXIF.getAllTags(this);
            //alert(EXIF.getTag(this, 'Orientation'));
            Orientation = EXIF.getTag(this, 'Orientation');
            //return;
        });

        var oReader = new FileReader();
        oReader.onload = function (e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                //修复ios
                if (navigator.userAgent.match(/iphone/i)) {
                    console.log('iphone');
                    //alert(expectWidth + ',' + expectHeight);
                    //如果方向角不为1，都需要进行旋转 added by lzk
                    if (Orientation != "" && Orientation != 1) {
                        switch (Orientation) {
                            case 6://需要顺时针（向左）90度旋转
                                //alert('需要顺时针（向左）90度旋转');
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3://需要180度旋转
                                // alert('需要180度旋转');
                                rotateImg(this, 'right', canvas);//转两次
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }

                    /*var mpImg = new MegaPixImage(image);
                     mpImg.render(canvas, {
                     maxWidth: 800,
                     maxHeight: 1200,
                     quality: 0.8,
                     orientation: 8
                     });*/
                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                } else if (navigator.userAgent.match(/Android/i)) {// 修复android
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                } else {
                    //alert(Orientation);
                    if (Orientation != "" && Orientation != 1) {
                        //alert('旋转处理');
                        switch (Orientation) {
                            case 6://需要顺时针（向左）90度旋转
                                //alert('需要顺时针（向左）90度旋转');
                                rotateImg(this, 'left', canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                // alert('需要顺时针（向右）90度旋转');
                                rotateImg(this, 'right', canvas);
                                break;
                            case 3://需要180度旋转
                                //alert('需要180度旋转');
                                rotateImg(this, 'right', canvas);//转两次
                                rotateImg(this, 'right', canvas);
                                break;
                        }
                    }

                    base64 = canvas.toDataURL("image/jpeg", 0.8);
                }
                //uploadImage(base64);
                $("#" + myImage).attr("src", base64);
            };
        };
        oReader.readAsDataURL(file);
    }
}

//对图片旋转处理 added by lzk www.bcty365.com
function rotateImg(img, direction, canvas) {
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    var height = img.height;
    var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //img.setAttribute('step', step);
    /*var canvas = document.getElementById('pic_' + pid);
     if (canvas == null) {
     img.style.display = 'none';
     canvas = document.createElement('canvas');
     canvas.setAttribute('id', 'pic_' + pid);
     img.parentNode.appendChild(canvas);
     }  */
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}
