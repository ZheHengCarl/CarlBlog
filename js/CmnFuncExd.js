if (typeof (Cmn) == "undefined") { Cmn = {}; }
if (typeof (Cmn.Func) == "undefined") { Cmn.Func = {}; }
Cmn.Version.CmnFuncExd = "3.4.8"; (function () {
    Cmn.Func.BaiduMapKey = "9KAiuPrKKoy1soPCrBrmskPg"; Cmn.Func.GetAddrByLbs = function (callBackFunc, baiduMapKey) {
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(GetPositionCallBack, function () { callBackFunc(null); }); }
        else { callBackFunc(null); }
        function GetPositionCallBack(position) {
            var _badiduMapKey = baiduMapKey; if (_badiduMapKey == undefined || _badiduMapKey == "") { _badiduMapKey = Cmn.Func.BaiduMapKey; }
            $.ajax({
                type: "Post", url: "http://api.map.baidu.com/geocoder/v2/?ak=" + _badiduMapKey + "&location=" +
                    position.coords.latitude + "," + position.coords.longitude + "&output=json&pois=0", contentType: "application/x-www-form-urlencoded", dataType: "jsonp", jsonp: "callback", success: function (retData) {
                        if (retData.status == 0) { callBackFunc(retData.result.addressComponent); }
                        else { callBackFunc(null); }
                        return true;
                    }, error: function (httpRequest) { callBackFunc(null); return false; }
            });
        }
    }
    Cmn.Func.GetCurPosition = function (callBackFunc) {
        if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(callBackFunc, function () { callBackFunc(null); }); }
        else { callBackFunc(null); }
    }
    Cmn.Func.IsOrientationchangeByResize = false; var LastIsHorizontalScreen = null; var LastOrientation = null; var HasOrrentationchange = false; if (Cmn.Func.IsOrientationchangeByResize) { $(window).resize(function () { alert("windwos Resize"); HasOrrentationchange = true; }); }
    else { $(window).on("orientationchange", function () { HasOrrentationchange = true; }); }
    Cmn.Func.IsHorizontalScreen = function () {
        if (Cmn.Func.IsOrientationchangeByResize) {
            if (Cmn.Func.IsAndroid()) {
                if (window.orientation == 0 || window.orientation == 180) { LastIsHorizontalScreen = false; }
                else if (window.orientation == 90 || window.orientation == -90) { LastIsHorizontalScreen = true; }
            }
            else {
                if ($(window).width() > $(window).height()) { LastIsHorizontalScreen = true; }
                else { LastIsHorizontalScreen = false; }
            }
            return LastIsHorizontalScreen;
        }
        else {
            if (HasOrrentationchange == false && LastIsHorizontalScreen != null) { return LastIsHorizontalScreen; }
            if (LastIsHorizontalScreen == null && Cmn.Func.IsAndroid()) {
                if ($(window).width() > $(window).height()) { LastIsHorizontalScreen = true; }
                else { LastIsHorizontalScreen = false; }
            }
            else {
                if (window.orientation == 0 || window.orientation == 180) { LastIsHorizontalScreen = false; }
                else if (window.orientation == 90 || window.orientation == -90) { LastIsHorizontalScreen = true; }
            }
            LastOrientation = window.orientation; if (LastIsHorizontalScreen === null) { return false; }
            else { return LastIsHorizontalScreen; }
        }
    }
    Cmn.Func.GetHeightWidthRate = function () {
        if (Cmn.Func.IsIphone4() && Cmn.Func.IsWeiXin()) { if (Cmn.Func.IsHorizontalScreen()) { return 640 / 832; } else { return 832 / 640; } }
        else if (Cmn.Func.IsIphone5() && Cmn.Func.IsWeiXin()) { if (Cmn.Func.IsHorizontalScreen()) { return 640 / 1008; } else { return 1008 / 640; } }
        else if (Cmn.Func.IsIPad()) { if (Cmn.Func.IsHorizontalScreen()) { return 768 / 1024; } else { return 1024 / 768; } }
        else { return $(window).height() / $(window).width(); }
    }
    Cmn.Func.GetWindowsWidth = function () { return $("body").width(); }
    Cmn.Func.GetWindowsHeight = function () { return $("body").width() * Cmn.Func.GetHeightWidthRate(); }
    var _InitWindowWidth = null; var _InitWindowHeight = null; var _HasBindOrientationchange = false; var _HasTargetDensitydpi = false; var _MainViewPort = ""; var _LastSetViewPort = ""; Cmn.Func.MobileAdaptiveMode = { Width: "Width", WidthHeight: "WidthHeight", WidthCutOutHeight: "WidthCutOutHeight" }
    var ProcessAdviseVerticalImg = function (adviseVerticalImgUrl, mainViewIsHorizontal) {
        if (adviseVerticalImgUrl != undefined && adviseVerticalImgUrl != "" && Cmn.Func.IsString(adviseVerticalImgUrl)) {
            Cmn.DebugLog("有提示图片"); if ((Cmn.Func.IsHorizontalScreen() && mainViewIsHorizontal == false) || (Cmn.Func.IsHorizontalScreen() == false && mainViewIsHorizontal == true)) {
                var _width = $(window).width(); var _height = $(window).height(); $("body").css("width", "100%"); var _ajustImgPos = function () {
                    if ($(".AdviseVerticalImg img").height() != undefined && $(".AdviseVerticalImg img").height() > 0) { $(".AdviseVerticalImg img").css("margin-top", ($(".AdviseVerticalImg").height() - $(".AdviseVerticalImg img").height()) / 2 + "px"); }
                    else { setTimeout(_ajustImgPos, 100); }
                }
                if ($("body .AdviseVerticalImg").length <= 0) {
                    var _imgStyle = "style='margin-top:5%;' height='80%'"; if (Cmn.Func.IsHorizontalScreen() == false) { var _imgStyle = "style='margin-top:5%;' width='80%'"; }
                    $("body").append("<div class='AdviseVerticalImgBg' style='position:fixed;left:0px;top:0px;z-index:10000;background:#000000;width:100%;height:120%;'></div>" + "<div class='AdviseVerticalImg cg-DefaultImgHint' " + "style='position:fixed; left:0px;top:0px;z-index:10001;" + "background:rgba(00, 00, 00, 1) none repeat scroll 0 0 !important;filter:Alpha(opacity=100);" + "background:#000000;width:100%;height:100%;text-align:center;'> " + "<img " + _imgStyle + " src='" + adviseVerticalImgUrl + "' /></div>"); _ajustImgPos();
                }
                else { $(".AdviseVerticalImg,.AdviseVerticalImgBg").stop().fadeIn(100, function () { if ($(".cg-DefaultImgHint").length > 0) { _ajustImgPos(); } }); }
                $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart").on("touchstart", function (e) { e.preventDefault(); Cmn.DebugLog("触摸横屏提示层"); }); Cmn.DebugLog("ProcessAdviseVerticalImg::body width:" + $("body").width()); return true;
            }
            else {
                Cmn.DebugLog("ProcessAdviseVerticalImg 隐藏横竖屏提示" +
                    $(".AdviseVerticalImg,.AdviseVerticalImgBg").length); $(".AdviseVerticalImg,.AdviseVerticalImgBg").stop().hide(); $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart");
            }
        }
        Cmn.DebugLog("body width:" + $("body").width()); return false;
    }
    var SetViewPort = function (viewPortContent) { if (viewPortContent != _LastSetViewPort) { $("[name='viewport']").attr("content", viewPortContent); _MainViewPort = viewPortContent; _LastSetViewPort = viewPortContent; } }
    var SetTmpViewPort = function (viewPortContent) { if (viewPortContent != _LastSetViewPort) { $("[name='viewport']").attr("content", viewPortContent); _LastSetViewPort = viewPortContent; } }
    Cmn.Func.MobileAdaptive = function (mainContentWidth, mainContentHeight, adviseVerticalImgUrl, adaptiveMode, onOrientationchange, mainViewIsHorizontal) {
        Cmn.DebugLog("自适应版本3.3.7"); if (window.Cms && Cmn.Func.GetParamFromUrl("CmsState") == "IsCreateHtml") { return; }
        if (mainViewIsHorizontal == undefined) { mainViewIsHorizontal = false; }
        if (onOrientationchange == "" || onOrientationchange == null) { onOrientationchange = undefined; }
        if (adaptiveMode == undefined) { adaptiveMode = Cmn.Func.MobileAdaptiveMode.Width; }
        if (mainContentHeight && mainContentWidth) { if ((Cmn.Func.IsHorizontalScreen() && mainContentWidth < mainContentHeight) || (Cmn.Func.IsHorizontalScreen() == false && mainContentWidth > mainContentHeight)) { var _tmpInt = mainContentWidth; mainContentWidth = mainContentHeight; mainContentHeight = _tmpInt; } }
        ProcessAdviseVerticalImg(adviseVerticalImgUrl, mainViewIsHorizontal); if ((Cmn.Func.IsHorizontalScreen() && mainViewIsHorizontal == true) || (Cmn.Func.IsHorizontalScreen() == false && mainViewIsHorizontal == false)) {
            if (_MainViewPort != "") { SetViewPort(_MainViewPort); Cmn.DebugLog("ViewPort原先已经设置过"); return; }
            else { Cmn.DebugLog("ViewPort没有设置过，开始设置..."); }
            if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.Width || adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight) {
                $("body").width(mainContentWidth); if (Cmn.Func.IsIOS()) { Cmn.DebugLog("是IOS系统"); var _width = mainContentWidth; $("body").width(_width); SetViewPort("width=" + _width + ",user-scalable=no;"); }
                else if (navigator.userAgent.match(/Nexus/i) != null) { Cmn.DebugLog("操作系统Nexus"); $("body").css("zoom", $(window).width() / mainContentWidth * 100 + "%"); }
                else if (navigator.userAgent.match(/android\s*[\d\.]+/i) != null) {
                    Cmn.DebugLog("是安卓系统"); var _androidVersion = Cmn.Func.GetAndroidVersion(); _InitWindowWidth = $(window).width(); _InitWindowHeight = $(window).height(); var _multiple = _InitWindowWidth / mainContentWidth; Cmn.DebugLog("安卓版本小于4.4:.." + _androidVersion); Cmn.DebugLog("安卓版本 4.2.2,window.screen.width:" + window.screen.width + " window.devicePixelRatio:" + window.devicePixelRatio); var _densitydpi = mainContentWidth / window.screen.width * window.devicePixelRatio * 160; if (Cmn.Func.IsWeiXin() && _androidVersion >= 4.4 && _androidVersion < 5.0) { SetViewPort("width=device-width,initial-scale=" + _multiple + ",maximum-scale=" + _multiple + ",minimum-scale=" + _multiple + ",user-scalable=no;"); }
                    else {
                        if (_densitydpi <= 400) { SetViewPort("width=" + mainContentWidth + ", user-scalable=no, target-densitydpi=" + _densitydpi.toFixed(0) + ";"); }
                        else {
                            if (_androidVersion == 4.2) { SetViewPort("width=" + mainContentWidth + ", user-scalable=no, target-densitydpi=400;"); }
                            else { Cmn.DebugLog("window.Width:" + _InitWindowWidth + "window.Height:" + _InitWindowHeight); SetViewPort("width=device-width,initial-scale=" + _multiple + ",maximum-scale=" + _multiple + ",minimum-scale=" + _multiple + ",user-scalable=no;"); }
                        }
                    }
                }
                else if (navigator.userAgent.match(/Windows Phone/i) != null) { Cmn.DebugLog("Windows Phone"); }
                else { Cmn.DebugLog("是其他操作系统"); _InitWindowWidth = $(window).width(); _InitWindowHeight = $(window).height(); Cmn.DebugLog("window.Width:" + _InitWindowWidth + "window.Height:" + _InitWindowHeight); var _multiple = _InitWindowWidth / mainContentWidth; SetViewPort("width=device-width,initial-scale=" + _multiple + ",maximum-scale=" + _multiple + ",minimum-scale=" + _multiple + ",user-scalable=no;"); }
                if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight) {
                    Cmn.DebugLog("是WidthCutOutHeight  GetWindowsHeight:" + Cmn.Func.GetWindowsHeight() + " mainContentHeight：" + mainContentHeight + " bodyHeight:" + $("body").height()); if (Cmn.Func.GetWindowsHeight() > mainContentHeight) { Cmn.DebugLog("满足条件，需要隐藏滚动条"); if ($("body").height() > Cmn.Func.GetWindowsHeight()) { $("body").height(Cmn.Func.GetWindowsHeight()); $("body").css("overflow-y", "hidden"); } }
                    else { $("body").css("overflow-y", "scroll"); }
                }
            }
            else if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthHeight) {
                if (Cmn.Func.IsIOS()) {
                    var _width = mainContentWidth; if (Cmn.Func.IsIphone4()) {
                        Cmn.DebugLog("是Iphone4"); if (Cmn.Func.IsWeiXin()) {
                            if (Cmn.Func.IsHorizontalScreen()) { _width = 1120; }
                            else { if (mainContentWidth * Cmn.Func.GetHeightWidthRate() < mainContentHeight) { _width = mainContentHeight / Cmn.Func.GetHeightWidthRate(); } }
                        }
                        else {
                            if (mainViewIsHorizontal === true) {
                                if (Cmn.Func.IsHorizontalScreen()) { _width = mainContentWidth; }
                                else { _width = mainContentHeight; }
                            }
                            else {
                                if (Cmn.Func.IsHorizontalScreen()) { _width = mainContentHeight; }
                                else { if (mainContentWidth * Cmn.Func.GetHeightWidthRate() < mainContentHeight) { _width = mainContentHeight / Cmn.Func.GetHeightWidthRate(); } }
                            }
                        }
                    }
                    else if (Cmn.Func.IsIPad()) {
                        Cmn.DebugLog("ipad mainContentWidth:" + mainContentWidth + "  Cmn.Func.GetHeightWidthRate():" +
                            Cmn.Func.GetHeightWidthRate() + "  mainContentHeight:" + mainContentHeight); if (Cmn.Func.IsWeiXin()) { if (mainContentWidth * Cmn.Func.GetHeightWidthRate() < mainContentHeight) { _width = mainContentHeight / Cmn.Func.GetHeightWidthRate(); } }
                        else {
                            if (Cmn.Func.IsHorizontalScreen()) { _width = mainContentWidth; }
                            else { _width = mainContentHeight; }
                        }
                    }
                    else if (Cmn.Func.IsIphone5()) {
                        Cmn.DebugLog("是Iphone5"); if (Cmn.Func.IsWeiXin()) {
                            if (Cmn.Func.IsHorizontalScreen()) { _width = 1136; }
                            else { _width = mainContentWidth; }
                        }
                        else {
                            if (mainViewIsHorizontal === true) {
                                if (Cmn.Func.IsHorizontalScreen()) { _width = mainContentWidth; }
                                else { _width = mainContentHeight; }
                            }
                            else {
                                if (Cmn.Func.IsHorizontalScreen()) { _width = mainContentHeight; }
                                else { if (mainContentWidth * Cmn.Func.GetHeightWidthRate() < mainContentHeight) { _width = mainContentHeight / Cmn.Func.GetHeightWidthRate(); } }
                            }
                        }
                    }
                    else {
                        Cmn.DebugLog("是其他 ios 设备"); if (Cmn.Func.IsHorizontalScreen()) { _width = 1136; }
                        else { _width = mainContentWidth; }
                    }
                    $("body").width(_width); SetViewPort("width=" + _width + ",user-scalable=no;"); Cmn.DebugLog("windowWidth5:" + $(window).width() + " windowHeight:" + $(window).height() + " mainContentWidth:" + mainContentWidth);
                }
                else {
                    _InitWindowWidth = $(window).width(); _InitWindowHeight = $(window).height(); var _androidVersion = Cmn.Func.GetAndroidVersion(); if (_HasTargetDensitydpi && (_androidVersion < 4.4 || navigator.userAgent.indexOf("4.4.4") >= 0)) { Cmn.DebugLog(" 已经设置过_HasTargetDensitydpi "); $("body").width(_InitWindowWidth); }
                    else {
                        var _multiple = _InitWindowWidth / mainContentWidth; if (_InitWindowHeight / mainContentHeight < _multiple) { _multiple = _InitWindowHeight / mainContentHeight; }
                        $("body").width(_InitWindowWidth / _multiple); Cmn.DebugLog("window.Width:" + _InitWindowWidth + "window.Height:" + _InitWindowHeight + " _multiple：" + _multiple + "  body.width:" + $("body").width() + "  body.Height:" + $("body").height()); var _densitydpi = _InitWindowWidth / _multiple / window.screen.width * window.devicePixelRatio * 160; Cmn.DebugLog("_densitydpi:" + _densitydpi); if (_densitydpi <= 400) {
                            SetViewPort("width=" + (_InitWindowWidth / _multiple) + ", user-scalable=no, target-densitydpi=" +
                                _densitydpi.toFixed(0) + ";"); _HasTargetDensitydpi = true;
                        }
                        else {
                            var _lowerUserAgent = navigator.userAgent.toLowerCase(); if (_androidVersion == 4.2 || (_lowerUserAgent.indexOf("huawei") >= 0 && _androidVersion >= 4.4)) { SetViewPort("width=" + (_InitWindowWidth / _multiple) + ", user-scalable=no, target-densitydpi=400;"); _HasTargetDensitydpi = true; }
                            else { SetViewPort("width=device-width,initial-scale=" + _multiple + ",maximum-scale=" + _multiple + ",minimum-scale=" + _multiple + ",user-scalable=no,target-densitydpi=device-dpi;"); }
                        }
                    }
                }
            }
        }
        else {
            if (Cmn.Func.IsIOS()) { if (Cmn.Func.IsIphone5()) { Cmn.DebugLog("是Iphone5"); if (Cmn.Func.IsWeiXin()) { if (Cmn.Func.IsHorizontalScreen() && _LastSetViewPort != "") { SetTmpViewPort("width=1136,user-scalable=no;"); } } } }
            Cmn.DebugLog("不是主要显示的方向，不需要对ViewPort做任何处理。");
        }
        if (_HasBindOrientationchange == false) {
            _HasBindOrientationchange = true; ResetInoutOffset(); var _onOrientationchange = function (event) {
                $(".AdviseVerticalImg,.AdviseVerticalImgBg").hide(); var _widthBeforChange = $(window).width(); if (!Cmn.Func.IsIOS()) { }
                Cmn.DebugLog("旋转" + window.orientation + "  _widthBeforChange:" + _widthBeforChange + "  window.width:" + $(window).width() + "  IsHorizontalScreen:" + Cmn.Func.IsHorizontalScreen()); function AdaptiveAfterChange() {
                    if ((Cmn.Func.IsHorizontalScreen() && $(window).width() >= $(window).height()) || (Cmn.Func.IsHorizontalScreen() == false && $(window).width() <= $(window).height())) {
                        if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthHeight) {
                            if (Cmn.Func.IsHorizontalScreen()) { Cmn.Func.MobileAdaptive(mainContentHeight, mainContentWidth, adviseVerticalImgUrl, adaptiveMode, onOrientationchange, mainViewIsHorizontal); }
                            else { Cmn.Func.MobileAdaptive(mainContentWidth, mainContentHeight, adviseVerticalImgUrl, adaptiveMode, onOrientationchange, mainViewIsHorizontal); }
                        }
                        else { Cmn.Func.MobileAdaptive(mainContentWidth, mainContentHeight, adviseVerticalImgUrl, adaptiveMode, onOrientationchange, mainViewIsHorizontal); }
                        if (onOrientationchange != undefined) { onOrientationchange(); }
                    }
                    else { setTimeout(AdaptiveAfterChange, 10); }
                }
                AdaptiveAfterChange();
            }
            if (Cmn.Func.IsOrientationchangeByResize) { $(window).resize(_onOrientationchange); }
            else { $(window).on("orientationchange", _onOrientationchange); }
            if (onOrientationchange != undefined) { onOrientationchange(); }
            if ($("[name='viewport']").length < 1) { alert("页面上必须要加上默认的viewport。(<meta content='width=device-width,user-scalable=no;' name='viewport' />)"); }
            Cmn.DebugLog(navigator.userAgent + "  自适应方案：" + adaptiveMode); if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthHeight && Cmn.Func.IsHorizontalScreen()) { Cmn.Func.MobileAdaptive(mainContentHeight, mainContentWidth, adviseVerticalImgUrl, adaptiveMode, onOrientationchange, mainViewIsHorizontal); if (onOrientationchange != undefined) { onOrientationchange(); } }
        }
        Cmn.DebugLog("自适应后viewport:" + $("[name='viewport']").attr("content") + " _MainViewPort:" + _MainViewPort);
    }
    function ResetInoutOffset() { }
    Cmn.Func.GetAndroidVersion = function () {
        var _androidVersion = navigator.userAgent.match(/android\s*[\d\.]+/i); if (_androidVersion != null) { _androidVersion = _androidVersion[0].replace(/android\s*/i, ""); }
        else { return 0; }
        if (_androidVersion.indexOf(".") > 0) { _androidVersion = _androidVersion.match(/[\d]+\.[\d]+/i); }
        return _androidVersion;
    }
    Cmn.Func.GotoUrl = function (url) { $("body").hide(); setTimeout(function () { window.location.href = url; }, 200); }
    Cmn.Func.ChangeBrowserUrlTo = function (url) {
        if (url.indexOf("http:") < 0 && url.indexOf("https:") < 0) { url = Cmn.Func.GetAbsoluteUrl(url); }
        window.history.pushState({}, 0, url);
    }
    Cmn.Func.SaveImgToLocal = function (imgUrl) {
        imgUrl = Cmn.Func.GetAbsoluteUrl(imgUrl); if (Cmn.Func.IsWeiXin()) { var _list = new Array(); _list[0] = imgUrl; WeixinJSBridge.invoke('imagePreview', { 'current': $(this).attr('src'), 'urls': _list }); }
        else {
            var _oPop = window.open(imgUrl, "", "width=1, height=1, top=5000, left=5000"); for (; _oPop.document.readyState != "complete";) { if (_oPop.document.readyState == "complete") break; }
            _oPop.document.execCommand("SaveAs"); _oPop.close();
        }
    }
    Cmn.Func.Shake = function (threshold, fn) {
        var _self = this; _self.shakeCallbackFn = function () { }; if (arguments.length == 1) {
            if (typeof arguments[0] == "function") { _self.shakeCallbackFn = arguments[0]; }
            if (typeof arguments[0] == "boolean") { window.IsShake = true; return 'undefined'; }
        }
        else { _self.shakeCallbackFn = fn; }
        var SHAKE_THRESHOLD = threshold || 800; var lastUpdate = 0; var x, y, z, last_x, last_y, last_z; window.IsShake = true; window.IsBindShake = $("body").attr("shake"); function deviceMotionHandler(eventData) {
            if (IsShake == false) { return; }
            var acceleration = eventData.accelerationIncludingGravity; var curTime = new Date().getTime(); if ((curTime - lastUpdate) > 100) {
                var diffTime = (curTime - lastUpdate); lastUpdate = curTime; x = acceleration.x; y = acceleration.y; z = acceleration.z; var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; if (speed > SHAKE_THRESHOLD) { if (!!fn && IsShake) { IsShake = false; _self.shakeCallbackFn(); } }
                last_x = x; last_y = y; last_z = z;
            }
        }
        if (!window.IsBindShake) { window.addEventListener("devicemotion", deviceMotionHandler, false); $("body").attr("shake", "true"); }
    }
    Cmn.Func.ListenDeviceOrientation = function (deviceorientation) {
        if (!window.DeviceMotionEvent) { return; }
        var _self = this; if (!_self.deviceorientation) { _self.deviceorientation = function () { }; }
        if (typeof deviceorientation == "function") { _self.deviceorientation = deviceorientation; }
        _self.beforAlpha = ""; _self.beforBeta = ""; _self.beforGamma = ""; _self.zRotationOrientation = ""; var _curDeviceOrientation = "Vertical"; if (!_curDeviceOrientation) { _curDeviceOrientation = "Vertical"; }
        if (!_self.isBindListenDeviceOrientation) {
            window.addEventListener("deviceorientation", function (event) {
                var _beta = Math.ceil(event.beta); var _alpha = Math.ceil(event.alpha); var _gamma = Math.ceil(event.gamma); if (_self.beforAlpha == "") { _self.beforAlpha = _alpha }
                if (_self.beforBeta == "") { _self.beforBeta = _beta }
                if (_self.beforGamma == "") { _self.beforGamma = _gamma }
                if (Math.abs(_beta) < 60) { _curDeviceOrientation = "Horizontal"; }
                else { _curDeviceOrientation = "Vertical"; }
                if (_alpha && _self.beforAlpha != _alpha) {
                    var _alphaDiffe = _self.beforAlpha - _alpha; if (Math.abs(_alphaDiffe) > 4) { _alphaDiffe = _alphaDiffe / (Math.abs(_alphaDiffe)) * -1; }
                    _self.beforAlpha = _alpha; _self.deviceorientation(event, _alphaDiffe, _curDeviceOrientation);
                }
            }, true); _self.isBindListenDeviceOrientation = true;
        }
    }
    Cmn.Func.TouchSlide = function (selector, touchThreshold, moveFn, endFn, model, preventDefaultOrientation) {
        var _$touchSlideBox = $(selector); if (_$touchSlideBox.length < 1) { return false; }
        var _startX = null; var _startY = null; var _direction = ""; if (!preventDefaultOrientation) { preventDefaultOrientation = "all"; }
        var _eventType = { touchstart: ("createTouch" in document) ? "touchstart" : "mousedown", touchmove: ("createTouch" in document) ? "touchmove" : "mousemove", touchend: ("createTouch" in document) ? "touchend" : "mouseup" }
        _$touchSlideBox.off(_eventType.touchstart).on(_eventType.touchstart, function (e) { e.stopPropagation(); e = event.touches ? event.touches[0] : e; if (_startX == null && _startY == null) _startX = e.pageX; _startY = e.pageY; }); _$touchSlideBox.off(_eventType.touchmove).on(_eventType.touchmove, function (ev) {
            ev.stopPropagation(); var e = event.touches ? event.touches[0] : ev; if (_startX == null && _startY == null) { ev.preventDefault(); return; }
            var _transverseThreshold = Math.abs(e.pageX - _startX); var _vertical = Math.abs(e.pageY - _startY); if (_transverseThreshold > _vertical) {
                if (e.pageX - _startX > 0) {
                    if (Math.abs(e.pageX - _startX) > touchThreshold) {
                        _direction = "right"; if (!!moveFn) { moveFn(_direction, _transverseThreshold); }
                        if (!model || model == "1") { _startX = null; _startY = null; }
                        else { _startX = e.pageX; _startY = e.pageY; }
                    }
                }
                else if (e.pageX - _startX < 0) {
                    if (Math.abs(e.pageX - _startX) > touchThreshold) {
                        _direction = "left"; if (!!moveFn) { moveFn(_direction, _transverseThreshold); }
                        if (!model || model == "1") { _startX = null; _startY = null; }
                        else { _startX = e.pageX; _startY = e.pageY; }
                    }
                }
                if (preventDefaultOrientation != "vertical") ev.preventDefault();
            }
            else if (_transverseThreshold < _vertical) {
                if (e.pageY - _startY > 0) {
                    if (Math.abs(e.pageY - _startY) > touchThreshold) {
                        _direction = "down"; if (!!moveFn) { moveFn(_direction, _vertical); }
                        if (!model || model == "1") { _startX = null; _startY = null; }
                        else { _startX = e.pageX; _startY = e.pageY; }
                    }
                }
                else if (e.pageY - _startY < 0) {
                    if (Math.abs(e.pageY - _startY) > touchThreshold) {
                        _direction = "up"; if (!!moveFn) { moveFn(_direction, _vertical); }
                        if (!model || model == "1") { _startX = null; _startY = null; }
                        else { _startX = e.pageX; _startY = e.pageY; }
                    }
                }
                if (preventDefaultOrientation != "horizontal") ev.preventDefault();
            }
        }); _$touchSlideBox.off(_eventType.touchend).on(_eventType.touchend, function (e) {
            e.stopPropagation(); _startX = null; _startY = null; if (!!_direction && !!endFn) { endFn(_direction); }
            _direction = "";
        });
    }
    Cmn.Func.ImagePreload = function (selector, progressCallback, completeCallback, realUrlAttrName, loadCount) {
        if (!selector) { selector = "body"; }
        if (!realUrlAttrName) { realUrlAttrName = "lazypath"; }
        if (!loadCount) { loadCount = 3; }
        var _loadCount = 0; var _$arrImg = $(selector).find("img[" + realUrlAttrName + "]") || $(selector).find("img"); var _loadTotal = _$arrImg.length; if (_loadTotal == 0) { progressCallback && progressCallback(100, ""); completeCallback && completeCallback(_error); return false; }
        var _error = []; function _load(index) {
            var _count = index + loadCount; if (_count > _$arrImg.length) { _count = _$arrImg.length; }
            for (var _i = index; _i < _count; _i++) {
                var _item = _$arrImg[_i]; if ($(_item).attr(realUrlAttrName) !== undefined) { var _src = $(_item).attr(realUrlAttrName); if (_src) { _preload(_src, _item, _i); } }
                else { _loadCount++; }
            }
        }
        _load(0); function _preload(src, obj, index) {
            var _isComplete = false; obj.onload = function () { !_isComplete && _loadComplete(obj, src, false, index); }; obj.onerror = function () { !_isComplete && _loadComplete(obj, src, true, index); }
            obj.src = src; _isComplete = obj.complete; if (_isComplete) { _loadComplete(obj, src, false, index); }
        }
        function _loadComplete(obj, src, isErr, index) {
            if (!$(obj).attr(realUrlAttrName)) { return; }
            $(obj).removeAttr(realUrlAttrName); _loadCount++; var _progress = Math.ceil(_loadCount / _loadTotal * 100); _progress = (_loadCount == _loadTotal ? 100 : _progress >= 100 ? 100 : _progress); if (isErr) { _error.push(src); }
            else { $(obj).attr("src", src); }
            progressCallback && progressCallback(_progress, src); if (_loadCount >= _loadTotal) { completeCallback && completeCallback(_error); }
            else { if (_loadCount % loadCount == 0) { _load(_loadCount); } }
        }
    }
    Cmn.Func.ImageLazyLoading = function (selector, progressCallback, completeCallback, realUrlAttrName, loadCount) { this.ImagePreload(selector, progressCallback, completeCallback, realUrlAttrName, loadCount); }
    Cmn.Func.ImageLazyLoad = function (selector, realUrlAttrName) {
        if (!selector) { selector = "body"; }
        if (!realUrlAttrName) { realUrlAttrName = "lazypath"; }
        var _container = $(selector); var _images = _container.find("img[" + realUrlAttrName + "]").css({ "opacity": "0.1", "filter": "alpha(opacity=10)" }); var _containerTop = _container.offset().top; var _loadCount = -1; var _lastIndex = null; var _lastScrollTop = 0; var _scrollHeader = function () { if (_lastScrollTop < _container.scrollTop() || _lastScrollTop == 0) { _lastScrollTop = _container.scrollTop(); _lazyLoad(_loadCount + 1); } }; function _lazyLoad(index) {
            var _image = _images.eq(index); if ((index > 0 && _images.eq(index - 1).offset().top - _containerTop > _container.height()) || index > _images.length - 1 || !_image.attr(realUrlAttrName)) { }
            else {
                var _img = new Image(); _img.DOM = _image; _img.onload = function () { _loadComplete.call(this, _img); }; _img.onerror = function () { _loadComplete.call(this, _img); }; _img.src = _image.attr(realUrlAttrName); _image.removeAttr(realUrlAttrName); if (_img.complete) { _loadComplete.call(_img, _img); }
                _loadCount++;
            }
        }
        function _loadComplete(img) { this.DOM.attr("src", this.src); this.DOM.css({ "opacity": "1", "filter": "alpha(opacity=100)" }); if (_images.eq(_loadCount).offset().top - _containerTop <= _container.height() && _loadCount < _images.length - 1) { _lazyLoad(_loadCount + 1); } }
        _container.off("scroll", _scrollHeader).on("scroll", _scrollHeader); _scrollHeader();
    }
    Cmn.Func.HoldSaveImage = function (selector) { $(selector).on("touchstart", function (e) { e.stopPropagation(); if (Cmn.Func.IsQQBrowser() && !Cmn.Func.IsIOS()) { location.href = $(this).attr("src"); } }); }
    Cmn.Func.FrameAnimation = (function () {
        var _FrameAnimation = function (selector, speed, count, callback) { this.frames = $(selector); this.frames.eq(0).css({ "visibility": "visible" }).siblings().css({ "visibility": "hidden" }); this.index = 0; this.interval = 0; this.Play(speed, count, callback); }
        _FrameAnimation.prototype = {
            Run: function (speed, count, callback) {
                var _sefl = this; _sefl.frames.eq(_sefl.index).css({ "visibility": "visible" }).siblings().css({ "visibility": "hidden" }); _sefl.interval = setInterval(function () {
                    _sefl.frames.eq(_sefl.index).css({ "visibility": "visible" }).siblings().css({ "visibility": "hidden" }); _sefl.index++; if (_sefl.frames.length <= _sefl.index) {
                        count--; if (count <= 0) { _sefl.Stop(); _sefl.index = 0; callback && callback(); }
                        else { _sefl.index = 0; }
                    }
                }, speed);
            }, Play: function (speed, isLoop, callback) { this.index = 0; this.Run(speed, isLoop, callback); }, Stop: function () { window.clearInterval(this.interval); }
        }
        return function (selector, speed, count, callback) { return new _FrameAnimation(selector, speed, count, callback); }
    })(); Cmn.Func.AnimteQueue = (function () {
        var _AnimteQueue = function () { this.index = 0; this.queue = []; this.position = []; this.isStopQueue = true; }
        _AnimteQueue.prototype = {
            InitPostion: function (index) { this.index = index; for (var i = index; i < this.position.length; i++) { if (typeof this.position[i] == "function") { this.position[i].apply(this); } } }, Add: function (fun) { this.queue.push(fun); return this; }, Run: function (index) {
                var _self = this; _self.index = index; var callback = function () { _self.index++; if (_self.index < _self.queue.length && _self.isStopQueue) { _self.Run(_self.index); } }
                this.position.push(this.queue[_self.index].apply(this, [callback]));
            }, Start: function () { this.isStopQueue = true; this.Run(this.index); }, Stop: function () { this.isStopQueue = false; }
        }
        return function () { return new _AnimteQueue(); }
    })(); var WebsiteAdaptiveAdviseVerticalImg = function (adviseVerticalImgUrl, mainViewIsHorizontal) {
        if (adviseVerticalImgUrl != undefined && adviseVerticalImgUrl != "" && Cmn.Func.IsString(adviseVerticalImgUrl)) {
            Cmn.DebugLog("有提示图片"); if ((Cmn.Func.IsHorizontalScreen() && mainViewIsHorizontal == false) || (Cmn.Func.IsHorizontalScreen() == false && mainViewIsHorizontal == true)) {
                var _width = $(window).width(); var _height = $(window).height(); var _ajustImgPos = function () {
                    $(".AdviseVerticalImgBg,.AdviseVerticalImg").height($(window).height() * ($("body").width() / $(window).width()) + 2); $(".AdviseVerticalImgBg,.AdviseVerticalImg").width($("body").width()); $(".AdviseVerticalImgBg,.AdviseVerticalImg").css("top", ($(window).scrollTop() * ($("body").width() / $(window).width()) - 1) + "px"); if ($(".AdviseVerticalImg img").height() != undefined && $(".AdviseVerticalImg img").height() > 0) { $(".AdviseVerticalImg img").css("margin-top", ($(".AdviseVerticalImg").height() - $(".AdviseVerticalImg img").height()) / 2 + "px"); }
                    else { setTimeout(_ajustImgPos, 100); }
                }
                if ($("body .AdviseVerticalImg").length <= 0) {
                    var _imgStyle = "style='margin-top:5%;' height='80%'"; if (Cmn.Func.IsHorizontalScreen() == false) { var _imgStyle = "style='margin-top:5%;' width='80%'"; }
                    $("body").append("<div class='AdviseVerticalImgBg' style='position:fixed;left:0px;top:0px;z-index:10000;background:#000000;width:100%;height:120%;'></div>" + "<div class='AdviseVerticalImg cg-DefaultImgHint' " + "style='position:fixed; left:0px;top:0px;z-index:10001;" + "background:rgba(00, 00, 00, 1) none repeat scroll 0 0 !important;filter:Alpha(opacity=100);" + "background:#000000;width:100%;height:100%;text-align:center;'> " + "<img " + _imgStyle + " src='" + adviseVerticalImgUrl + "' /></div>"); _ajustImgPos(); if ($("body").height() / ($("body").width() / $(window).width()) > $(window).height()) { $(window).on("scroll", function () { $(".AdviseVerticalImgBg,.AdviseVerticalImg").css("top", ($(window).scrollTop() * ($("body").width() / $(window).width()) - 1) + "px"); }); }
                }
                else { $(".AdviseVerticalImg,.AdviseVerticalImgBg").show(); if ($(".cg-DefaultImgHint").length > 0) { _ajustImgPos(); } }
                $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart").on("touchstart", function (e) { e.preventDefault(); Cmn.DebugLog("触摸横屏提示层"); }); Cmn.DebugLog("ProcessAdviseVerticalImg::body width:" + $("body").width()); return true;
            }
            else {
                Cmn.DebugLog("ProcessAdviseVerticalImg 隐藏横竖屏提示" +
                    $(".AdviseVerticalImg,.AdviseVerticalImgBg").length); $(".AdviseVerticalImg,.AdviseVerticalImgBg").stop().hide(); $(".AdviseVerticalImg,.AdviseVerticalImgBg").off("touchstart");
            }
        }
        Cmn.DebugLog("body width:" + $("body").width()); return false;
    }
    Cmn.Func.WebsiteAdaptive = function (mainContentWidth, mainContentHeight, adviseVerticalImgUrl, adaptiveMode) {
        Cmn.DebugLog("Scale自适应版本1.1.3"); if (window.Cms && Cmn.Func.GetParamFromUrl("CmsState") == "IsCreateHtml") { return; }
        var _Self = this; var _bodyContainer = $(".cmn_BodyContainer"); if (_bodyContainer.length <= 0) { _bodyContainer = $("body"); }
        this.OnOrientationChange = new Cmn.Event(); this.MainViewIsHorizontal = false; this.VerticalSafeSize = { Width: mainContentWidth, height: mainContentHeight }; this.HorizontalSafeSize = { Width: mainContentWidth, height: mainContentHeight }; Cmn.Func.IsOrientationchangeByResize = true; if (adaptiveMode == undefined) { adaptiveMode = Cmn.Func.MobileAdaptiveMode.Width; }
        var SetScale = function (scaleVal) { _bodyContainer.css({ "-webkit-transform": "scale(" + scaleVal + ")", "-o-transform": "scale(" + scaleVal + ")", "-moz-transform": "scale(" + scaleVal + ")", "-ms-transform": "scale(" + scaleVal + ")", "transform": "scale(" + scaleVal + ")" }); _bodyContainer.css({ "-webkit-transform-origin": "0% 0%", "-o-transform-origin": "0% 0%", "-moz-transform-origin": "0% 0%", "-ms-transform-origin": "0% 0%", "transform-origin": "0% 0%" }); }; this.Recalculate = function () {
            Cmn.DebugLog("进入Recalculate,当前是:" + (Cmn.Func.IsHorizontalScreen() ? "横屏" : "竖屏")); if ((Cmn.Func.IsHorizontalScreen() && mainContentWidth < mainContentHeight) || (Cmn.Func.IsHorizontalScreen() == false && mainContentWidth > mainContentHeight)) { var _tmpInt = mainContentWidth; mainContentWidth = mainContentHeight; mainContentHeight = _tmpInt; }
            var _windowWidth = $(window).width(); var _windowHeight = $(window).height(); Cmn.DebugLog("$(window).width()的宽：" + $(window).width() + " window.innerWidth:" + window.innerWidth + " window.screen.width:" + window.screen.width + " window.screen.availWidth:" + window.screen.availWidth + " document.documentElement.clientWidth：" + document.documentElement.clientWidth); if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.Width || adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight) {
                var _multiple = _windowWidth / mainContentWidth; _bodyContainer.width(mainContentWidth); SetScale(_multiple); Cmn.DebugLog("body的宽：" + $("body").width() + "  _multiple:" + _multiple); if ($("body").height() < _windowHeight / _multiple) { _bodyContainer.height(_windowHeight / _multiple); }
                if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthCutOutHeight) {
                    Cmn.DebugLog("是WidthCutOutHeight  GetWindowsHeight:" + Cmn.Func.GetWindowsHeight() + " mainContentHeight：" + mainContentHeight + " bodyHeight:" + $("body").height()); if (Cmn.Func.GetWindowsHeight() > mainContentHeight) { Cmn.DebugLog("满足条件，需要隐藏滚动条"); if ($("body").height() > Cmn.Func.GetWindowsHeight()) { _bodyContainer.height(Cmn.Func.GetWindowsHeight()); _bodyContainer.css("overflow-y", "hidden"); } }
                    else { _bodyContainer.css("overflow-y", "scroll"); }
                }
            }
            else if (adaptiveMode == Cmn.Func.MobileAdaptiveMode.WidthHeight) {
                var _multiple = _windowWidth / mainContentWidth; if (_windowHeight / mainContentHeight < _multiple) { _multiple = _windowHeight / mainContentHeight; }
                _bodyContainer.width(_windowWidth / _multiple); _bodyContainer.height(_windowHeight / _multiple); SetScale(_multiple); Cmn.DebugLog("屏幕宽:" + _windowWidth + "高:" + _windowHeight + "，放大倍数：" + _multiple + " body宽:" + $("body").width() + " body高：" + $("body").height());
            }
            WebsiteAdaptiveAdviseVerticalImg(adviseVerticalImgUrl, _Self.MainViewIsHorizontal);
        }
        _Self.Recalculate(); var _lastIsHorizontalScreen = Cmn.Func.IsHorizontalScreen(); var _onOrientationchange = function (event) { _lastIsHorizontalScreen = Cmn.Func.IsHorizontalScreen(); _Self.Recalculate(); }
        $(window).resize(function () {
            if (Cmn.Func.IsAndroid() && Cmn.Func.IsHorizontalScreen() == false && $(window).width() > $(window).height()) { Cmn.DebugLog("可能是输入法导致尺寸变化，忽略"); return; }
            _onOrientationchange(); setTimeout(_onOrientationchange, 200);
        }); if ($("[name='viewport']").length < 1) { alert("页面上必须要加上默认的viewport。(<meta content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no;' name='viewport' />)"); }
        Cmn.DebugLog(navigator.userAgent + "  自适应方案：" + adaptiveMode);
    };
})(); (function ($, window) {
    $.extend($.fn, {
        Cg: function () {
            var _SlefContext = $(this), _CgFormJqeryExt = {
                On: function (types, selector, data, fn, one) {
                    var _types = types, _selector = selector, _data = data, _fn = fn, _one = one, _origFn = null; if (data === undefined && fn === undefined && one === undefined) { _fn = _selector; _selector = undefined; }
                    else if (Cmn.IsType(selector, "string") && Cmn.IsType(data, "function")) { _fn = _data; _data = undefined; }
                    _types = _types.split(" "); for (var _key in _types) {
                        if (_types[_key] === "click" || _types[_key] === "tap") {
                            _origFn = _fn; _fn = function (event) { var _curTime = new Date().getTime(); if (!_SlefContext["__StartTime__"] || _curTime - _SlefContext["__StartTime__"] > 500) { _origFn.apply(this, arguments); _SlefContext["__StartTime__"] = new Date().getTime(); } }; if (!Cg.Func.IsMobile()) { _types[_key] = "click"; }
                            else { _types[_key] = "tap"; }
                        }
                        _SlefContext.on(_types[_key], _selector, _data, _fn, _one);
                    }
                }
            }; return _CgFormJqeryExt;
        }
    }); (function _GestureEventExd() {
        var __GestureEventTypes = "tap", __OrinEventTypes = Cmn.Func.IsMobile() ? "touchstart touchmove touchend touchcancel" : "mouseup mousedown mousemove mouseout", __TouchStart = false, __StartTime = 0, __Utils = {
            Pos: { Start: null, Move: null, End: null }, GetDistance: function (pos1, pos2) { var _x = pos2.x - pos1.x, _y = pos2.y - pos1.y; return Math.sqrt((_x * _x) + (_y * _y)); }, GetFingers: function (ev) { return ev.touches ? ev.touches.length : 1; }, CalScale: function (pstart, pmove) {
                if (pstart.length >= 2 && pmove.length >= 2) { var _disStart = this.GetDistance(pstart[1], pstart[0]); var _disEnd = this.GetDistance(pmove[1], pmove[0]); return _disStart / _disEnd; }
                return 1;
            }, GetAngle: function (p1, p2) { return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI; }, GetAngle180: function (p1, p2) { var _agl = Math.atan((p2.y - p1.y) * -1 / (p2.x - p1.x)) * (180 / Math.PI); return (_agl < 0 ? (_agl + 180) : _agl); }, GetDirectionFromAngle: function (agl) {
                var _directions = { up: agl < -45 && agl > -135, down: agl >= 45 && agl < 135, left: agl >= 135 || agl <= -135, right: agl >= -45 && agl <= 45 }; for (var key in _directions) { if (_directions[key]) return key; }
                return null;
            }, GetXYByElement: function (el) {
                var _left = 0, _top = 0; while (el.offsetParent) { _left += el.offsetLeft; _top += el.offsetTop; el = el.offsetParent; }
                return { left: _left, top: _top };
            }, GetPosOfEvent: function (ev) {
                if (Cmn.Func.IsMobile() && ev.originalEvent.touches) {
                    var _posi = []; var _src = null; for (var t = 0, len = ev.originalEvent.touches.length; t < len; t++) { src = ev.originalEvent.touches[t]; _posi.push({ x: src.pageX, y: src.pageY }); }
                    return _posi;
                } else { return [{ x: ev.pageX, y: ev.pageY }]; }
            }, Reset: function () { }, IsTouchMove: function (ev) { return (ev.type === 'touchmove' || ev.type === 'mousemove'); }, IsTouchEnd: function (ev) { return (ev.type === 'touchend' || ev.type === 'mouseup' || ev.type === 'touchcancel'); }
        }, __Tap = function (ev, ele) { var __now = Date.now(); var __touchTime = __now - __StartTime; var __movePoint = __Utils.Pos.Move.length ? __Utils.Pos.Move : __Utils.Pos.Start; var __distance = __Utils.GetDistance(__Utils.Pos.Start[0], __movePoint[0]); if (10 < __distance) return; if (650 > __touchTime && __Utils.GetFingers(ev) <= 1) { __tapTimer = setTimeout(function () { $(ele).trigger("tap", { fingersCount: __Utils.GetFingers(ev), position: __Utils.GetPosOfEvent(ev) }); }, 150); } }; var __GestureEventhandle = function (ev) { var __eventTarget = ev.target; switch (ev.type) { case 'touchstart': case 'mousedown': __TouchStart = true; __StartTime = new Date().getTime(); if (!__Utils.Pos.Start || __Utils.Pos.Start.length < 2) { __Utils.Pos.Start = __Utils.GetPosOfEvent(ev); }; break; case 'touchmove': case 'mousemove': if (!__TouchStart || !__Utils.Pos.Start) return; __Utils.Pos.Move = __Utils.GetPosOfEvent(ev); break; case 'touchend': case 'touchcancel': case 'mouseup': case 'mouseout': if (!__TouchStart) { return false; }; __Utils.Pos.Move = __Utils.GetPosOfEvent(ev); __TouchStart = false; __Tap.call(this, ev, __eventTarget); break; } }; $.each(__GestureEventTypes.split(" "), function (i, eventName) { jQuery.event.special[eventName] = { setup: function (data, namespaces, eventHandle) { var _self = this; $.each(__OrinEventTypes.split(" "), function (i, eventName) { $(_self).on(eventName, __GestureEventhandle); }); }, teardown: function (namespaces) { var _self = this; $.each(__OrinEventTypes.split(" "), function (i, eventName) { $(_self).off(eventName, __GestureEventhandle); }); } }; });
    })();
})(jQuery, window, undefined);