//滚轮兼容事件
function addWheelEvent(obj, eFn) {
    document.addEventListener ? obj.addEventListener(document.createElement("div").onmousewheel === null ?
        "mousewheel" : "DOMMouseScroll", fn, false) : obj.attachEvent("onmousewheel", fn);

    function fn(e) {
        eFn.call(obj, e = e || window.event, e.wheelDelta / 120 || -e.detail / 3);
    }
}