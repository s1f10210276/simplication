document.getElementById("view_time").innerHTML = getNow();

function set2fig(num) {
    var ret;
    if (num < 10) {
        ret = "0" + num;
    } else {
        ret = num;
    }
    return ret;
}

function getNow() {
    var now = new Date();
    var mon = now.getMonth() + 1;
    var day = now.getDate();
    var you = now.getDay();
    var youbi = new Array("日", "月", "火", "水", "木", "金", "土");
    var hour = now.getHours();
    var min = set2fig(now.getMinutes());
    var s = mon + "月" + day + "日" + " (" + youbi[you] + ")　" + hour + ":" + min;
    return s;
}