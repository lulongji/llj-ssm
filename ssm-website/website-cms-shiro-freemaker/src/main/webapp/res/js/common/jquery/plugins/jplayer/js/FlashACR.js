(function(){
    var debugEnabled="true";
    var flashID="ContentForFlashACR";
    var partnerID="PartnerForFlashACR";
    var appName="FlashACR";
    var flashObject=null;
    var fnMap={};
    var Events={
        Ready:[],
        AudioReady:[],
        Seek:[],
        Loading:[],
        SoundComplete:[],
        LoadComplete:[],
        IOError:[],
        SecurityError:[]
    };
    ///////////////////////////////////////////////////////////////
    var 
    UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    ON_READY_STATE_CHANGE = "onreadystatechange",

    win = window,
    doc = document,
    nav = navigator,

    plugin = false,
    isDomLoaded = false,
    domLoadFnArr = [],
    listenersArr=[],
    //------------------------------------
    //
    // 浏览器与播放器信息
    //
    //------------------------------------
    ua = function() {
        var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
            u = nav.userAgent.toLowerCase(),
            p = nav.platform.toLowerCase(),
            windows = p ? /win/.test(p) : /win/.test(u),
            mac = p ? /mac/.test(p) : /mac/.test(u),
            webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
            ie = !+"\v1", 
            playerVersion = [0,0,0],
            d = null;
        if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
            d = nav.plugins[SHOCKWAVE_FLASH].description;
            if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
                plugin = true;
                ie = false; 
                d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
            }
        }
        else if (typeof win.ActiveXObject != UNDEF) {
            try {
                var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                if (a) { 
                    d = a.GetVariable("$version");
                    if (d) {
                        ie = true; 
                        d = d.split(" ")[1].split(",");
                        playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                    }
                }
            }
            catch(e) {}
        }
        return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
    }(),
    
    //----------------------------------------
    //
    // Dom 加载与页面初始化
    //
    //----------------------------------------
    
    onDomLoad = function() {
        if (!ua.w3) { return; }
        if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
            callDomLoadFunctions();
        }
        if (!isDomLoaded) {
            if (typeof doc.addEventListener != UNDEF) {
                doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
            }       
            if (ua.ie && ua.win) {
                doc.attachEvent(ON_READY_STATE_CHANGE, function() {
                    if (doc.readyState == "complete") {
                        doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
                        callDomLoadFunctions();
                    }
                });
                if (win == top) { 
                    (function(){
                        if (isDomLoaded) { return; }
                        try {
                            doc.documentElement.doScroll("left");
                        }
                        catch(e) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        callDomLoadFunctions();
                    })();
                }
            }
            if (ua.wk) {
                (function(){
                    if (isDomLoaded) { return; }
                    if (!/loaded|complete/.test(doc.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                    callDomLoadFunctions();
                })();
            }
            addLoadEvent(callDomLoadFunctions);
        }
    }();
    //---------var定义结束--------
    
    function callDomLoadFunctions() {
        if (isDomLoaded) { return; }
        try { 
            var t = doc.getElementsByTagName("body")[0].appendChild(doc.createElement("span"));
            t.parentNode.removeChild(t);
        }
        catch (e) { return; }
        isDomLoaded = true;
        var dl = domLoadFnArr.length;
        for (var i = 0; i < dl; i++) {
            domLoadFnArr[i]();
        }
    }
    function addDomLoadEvent(fn) {
        if (isDomLoaded) {
            fn();
        }
        else { 
            domLoadFnArr[domLoadFnArr.length] = fn; 
        }
    }
    function addLoadEvent(fn) {
        if (typeof win.addEventListener != UNDEF) {
            win.addEventListener("load", fn, false);
        }
        else if (typeof doc.addEventListener != UNDEF) {
            doc.addEventListener("load", fn, false);
        }
        else if (typeof win.attachEvent != UNDEF) {
            addListener(win, "onload", fn);
        }
        else if (typeof win.onload == "function") {
            var fnOld = win.onload;
            win.onload = function() {
                fnOld();
                fn();
            };
        }
        else {
            win.onload = fn;
        }
    }
    function addListener(target, eventType, fn) {
        target.attachEvent(eventType, fn);
        listenersArr[listenersArr.length] = [target, eventType, fn];
    }
    ////////////////////////////////////////////////////////////////////////
    //------------------------------------------------
    //
    // 嵌入SWF到网页中
    //
    //------------------------------------------------
    
    function generateSWF(attributes, params, flashVars) {
        var r=null, el = doc.createElement("div");
        el.id=attributes.id;
        doc.getElementsByTagName("body")[0].appendChild(el);
        
        if (flashVars && typeof flashVars === OBJECT) {
            for (var k in flashVars) { 
                if (typeof params.flashvars != UNDEF) {
                    params.flashvars += "&" + k + "=" + flashVars[k];
                }
                else {
                    params.flashvars = k + "=" + flashVars[k];
                }
            }
        }

if (ua.wk && ua.wk < 312) {
            return r;
        }
        if (!hasPlayerVersion('10.0.0')) {
            addLoadEvent(function() {
                el.innerHTML = '<a href="http://get.adobe.com/cn/flashplayer/?no_redirect">需要安装Flash播放器<a/>';
            });
            return r;
        }else {
            if (el) {
                if (ua.ie && ua.win) {
                    var att = "";
                    for (var i in attributes) {
                        if (attributes[i] != Object.prototype[i]) { 
                            if (i.toLowerCase() == "data") {
                                params.movie = attributes[i];
                            }
                            else if (i.toLowerCase() == "styleclass") { 
                                att += ' class="' + attributes[i] + '"';
                            }
                            else if (i.toLowerCase() != "classid") {
                                att += ' ' + i + '="' + attributes[i] + '"';
                            }
                        }
                    }
                    
                    var par = "";
                    for (var j in params) {
                        if (params[j] != Object.prototype[j]) { 
                            par += '<param name="' + j + '" value="' + params[j] + '" />';
                        }
                    }
                    
                    el.outerHTML = ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>');
                    r = doc.getElementById(attributes.id);
                    
                }else { 
                    var o = doc.createElement(OBJECT);
                    o.setAttribute("type", FLASH_MIME_TYPE);
                    for (var m in attributes) {
                        if (attributes[m] != Object.prototype[m]) {
                            if (m.toLowerCase() == "styleclass") { 
                                o.setAttribute("class", attributes[m]);
                            }
                            else if (m.toLowerCase() != "classid") { 
                                o.setAttribute(m, attributes[m]);
                            }
                        }
                    }
                    for (var n in params) {
                        if (params[n] != Object.prototype[n] && n.toLowerCase() != "movie") { 
                            createObjParam(o, n, params[n]);
                        }
                    }
                    el.parentNode.replaceChild(o, el);
                    r = o;
                }
            }
            
            return r;
        }

}
    function createObjParam(el, pName, pValue) {
        var p = doc.createElement("param");
        p.setAttribute("name", pName);  
        p.setAttribute("value", pValue);
        el.appendChild(p);
    }
    function hasPlayerVersion(rv) {
        var pv = ua.pv, v = rv.split(".");
        v[0] = parseInt(v[0], 10);
        v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
        v[2] = parseInt(v[2], 10) || 0;
        return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
    }
    
    function hasProp(target) {
         return typeof target != "undefined";

    }
    function getSWFURL() {
        var url=null;
        var items = doc.getElementsByTagName("script");
        var length = items.length;
        var src;
        for (var i = 0; i < length; i ++)
        {
            src = items[i].src;
            if (src.indexOf(appName+".js") != - 1)
            {
                src = src.slice(0, src.indexOf(appName+".js"));
                url = src + appName+".swf";
            }
        }
        
        if (hasProp(url))
            return url;
        else
			alert(appName+".swf")
    }
    ///////////////////////////////////////////////////////////////////

    //----------------------方法--------------------------
    //Audio start-----------
    //加载歌曲（不自动播放）
    function load(url){
        app().audioLoad(url);
    }
    //定位播放头（不改变播放/暂停状态）
    function seek(time){
        if(isNaN(time)||time<0)time=0;
        app().audioSeek(time);
    }
    //播放
    function play(startTime){
        if(isNaN(startTime)||startTime<0)startTime=0;
        app().audioPlay(startTime);
    }
    //暂停
    function pause(){
        app().audioPause();
    }
    //继续
    function proceed(){
        app().audioProceed();
    }
    //停止
    function stop(){
        app().audioStop();
    }
	//设置音量值：0~1
	function setVolume(value){
		app().setVolume(value);
	}
	//获取音量值：0~1
	function getVolume(){
		return app().getVolume();
	}
	//当前持续时间(随加载进度发生改变);
	function getCurrentDuration(){
		return app().getCurrentDuration();
	}
	//音乐加载过程中,根据当前持续时间和当前加载进度估算的实际总持续时间
	function getTotalDuration(){
		return app().getTotalDuration();
	}
	//当前播放头位置：单位秒
	function getPosition(){
		return app().getPosition();
	}
	//当前加载进度值：0~1
	function getDownloadProgress(){
		return app().getDownloadProgress();
	}
	//是否正在播放
	function getIsPlaying(){
		return app().getIsPlaying();
	}
	//是否正在加载
	function getIsLoading(){
		return app().getIsLoading();
	}
	//设置播放器类型：
	// 0-自动选择（默认值，根据文件后缀名自动选择合适的类型）；
	// 1-使用Flash中的Sound对象（只能播放mp3）；
	// 2-使用Flash中的Video对象（可以播放mp4或flv视频文件中的音频）；
	// 3-使用WMP插件（需额外导入AudioPlayer.js配合使用）；
	function setPlayerType(type){
		return app().setPlayerType(type);
	}
	//Audio end-------------
	//Cookie start----------
	// 获取本地共享对象
	function getLocal(name, localPath) {
		app().getLocal(name, localPath);
	}
	// 获取共享对象的当前大小
	function getSize() {
		return app().getSize();
	}
	// 读取数据
	function getProperty(key) {
		return app().getProperty(key);
	}
	// 写入数据
	function setProperty(key, value) {
		app().setProperty(key, value);
	}
	// 删除数据
	function delProperty(key) {
		app().delProperty(key);
	}
	// 清除数据
	function clear() {
		app().clear();
	}
	// 数据存盘
	function flush() {
		// "error"(出错)
		// "pending"(待定:等待用户允许或拒绝扩大存储空间)
		// "flushed"(成功)
		return app().flush();
	}
	// 关闭
	function close() {
		app().close();
	}
	//Cookie end------------
	//Remote start----------
	function request(type,url,vars,callback){
		app()[type](url,vars, fn2Id(callback));
	}
	function get(url,vars,callback){
		request("get",url,vars,callback);
	}
	//供JS调用
	function post(url,vars,callback){
		request("post",url,vars,callback);
	}
	//Remote end------------
	var eventDispatcher={};
	//查询事件监听
	eventDispatcher.indexofEventListener=function(type,fn){
		var arr=Events[type];
		for(var i=0;i<arr.length;i++){
			if(fn==arr[i])return i;
		}
		return -1;
	};
	//添加事件监听
	eventDispatcher.addEventListener =function(type,fn){
		if(eventDispatcher.indexofEventListener(type,fn)==-1)
			Events[type].push(fn);
	};
	//移除事件监听
	eventDispatcher.removeEventListener=function(type,fn){
		var i=eventDispatcher.indexofEventListener(type,fn);
		if(i!=-1)Events[type].splice(i,1);
	};
	//发布事件
	eventDispatcher.dispatchEvent=function(type,param){
		var arr=Events[type];
		for(var i=0;i<arr.length;i++){
			if(param!=null){
				arr[i](param);
			}else{
				arr[i]();
			}
		}
	};
	//--------------------事件--------------------------
	function onReady(){
		//flash初始化完成，添加对外API成功后触发
		eventDispatcher.dispatchEvent("Ready");
	}
	function onAudioReady(){
		//音频已准备好（使用ASVideo时必须监听此事件）
		eventDispatcher.dispatchEvent("AudioReady");
	}
	function onSeek(position){
		//播放头位置改变时触发，position为当前播放头位置
		eventDispatcher.dispatchEvent("Seek",position);
	}
	function onLoading(){
		//加载过程中不断触发
		eventDispatcher.dispatchEvent("Loading");
	}
	function onSoundComplete(){
		//播放完毕时触发
		eventDispatcher.dispatchEvent("SoundComplete");
	}
	function onLoadComplete(){
		//加载完毕时触发
		eventDispatcher.dispatchEvent("LoadComplete");
	}
	function onIOError(){
		//io错误（地址错误或网络问题）
		eventDispatcher.dispatchEvent("IOError");
	}
	function onSecurityError(){
		//安全错误（跨域，无资源访问权限）
		eventDispatcher.dispatchEvent("SecurityError");
	}
	function onFlushStatus(str) {
		// str="SharedObject.Flush.Success"(成功)
		// str="SharedObject.Flush.Failed"(失败)
	}
	function onData(fnid,data){
		//异步加载返回数据
		fnMap[fnid](data);
		delete fnMap[fnid];
	}
	//供AS调用
	window[partnerID]={
		onReady:onReady,
		//Audio
		onAudioReady:onAudioReady,
		onSeek:onSeek,
		onLoading:onLoading,
		onSoundComplete:onSoundComplete,
		onLoadComplete:onLoadComplete,
		onIOError:onIOError,
		onSecurityError:onSecurityError,
		//Cookie
		onFlushStatus:onFlushStatus,
		//Remote
		onData:onData
	};
	//----------------------APIs-------------------
	//供JS调用
	window[appName]={
		//Audio
		load:load,
		seek:seek,
		play:play,
		pause:pause,
		proceed:proceed,
		stop:stop,
		setVolume:setVolume,
		getVolume:getVolume,
		getCurrentDuration:getCurrentDuration,
		getTotalDuration:getTotalDuration,
		getPosition:getPosition,
		getDownloadProgress:getDownloadProgress,
		getIsPlaying:getIsPlaying,
		getIsLoading:getIsLoading,
		setPlayerType:setPlayerType,
		addEventListener:eventDispatcher.addEventListener,
		removeEventListener:eventDispatcher.removeEventListener,
		//Cookie
		getLocal:getLocal,
		getSize:getSize,
		getProperty:getProperty,
		setProperty:setProperty,
		delProperty:delProperty,
		clear:clear,
		flush:flush,
		close:close,
		//Remote
		get:get,
		post:post,
		request:request
	};
	
    //-----------------插入flash-----------------------
    (function init() {
        addDomLoadEvent(function() {
	        var attributes = {};
	        attributes.id = flashID;
	        attributes.name = attributes.id;
	        attributes.width = "1";
	        attributes.height = "1";
	        attributes.data = getSWFURL();
	        
	        var params = {};
	        params.allowscriptaccess = "always";
	        
	        var flashvars = {partner:partnerID,debugEnabled:debugEnabled};
	        flashObject = generateSWF(attributes, params, flashvars);
	    });
    })();
    //获取flash对象
    function app(){
        if (flashObject) {
            return flashObject;
        }else if (flashObject = document.getElementById(flashID)) {
            return flashObject;
        }else{
            alert("FlashACR.js>>找不到[" + flashID + "]");
            return false;
        }
    }
    //为回调函数生成一个id并存入回调函数Mpa中
    function fn2Id(fn){
        var fnid="fn_"+String(Math.random()).substr(2);
        fnMap[fnid]=fn;
        return fnid;
    }
})();