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
    var mon = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var you = new Date().getDay();
    var youbi = new Array("日", "月", "火", "水", "木", "金", "土");
    var hour = new Date().getHours();
    var min = set2fig(new Date().getMinutes());
    var s = mon + "月" + day + "日" + " (" + youbi[you] + ")　" + hour + ":" + min;
    document.getElementById("view_time").innerHTML = s;
    if (hour <= 11) {
        document.getElementById("greet").textContent ="おはようございます。";
    } else if (hour <= 17) {
        document.getElementById("greet").textContent ="こんにちは。";
    } else {
        document.getElementById("greet").textContent ="こんばんは。";
    }
}
setInterval('getNow()', 1000);