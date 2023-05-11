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

function makeBasicAuth(userid, userpw) {
  let token = userid + ':' + userpw;
  let hash = btoa(token);
  return "Basic " + hash;
}

function callRoomStatusAPI(url, method, userid, userpw, callback) {
  let requestSensorType = ['temperature', 'humidity', 'illuminance', 'airpressure'];
  let requestUrl = url + '?sensor_type=';
  for (i=0; i<requestSensorType.length; i++) {
    requestUrl += requestSensorType[i] + '+';
    if (i == requestSensorType.length - 1) {
      requestUrl += requestSensorType[i];
    }
  }
  $.ajax({
	    type : method,
	    url : requestUrl,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        let retrievedSensors = {};
        let results = {};
        for (i=0; i<data.length; i++) {
          retrievedSensors[data[i].sensor_type] = data[i].value;
        }
        requestSensorType.forEach(function(type){
          if (retrievedSensors[type] == null) {
            results[type] = 'none';
          } else {
            results[type] = retrievedSensors[type];
          }
        });
        callback({
          status : 'success',
          description : '受講場所のセンサー情報取得に成功しました。\nSucceeded getting room status.',
          illuminance : results.illuminance,
          humidity : results.humidity,
          airpressure : results.airpressure,
          temperature : results.temperature
        });
	    },
	    error : function(xhr, status, error) {
        if (xhr.status === 503) {
          callback({
            status : 'success',
            description : '受講場所のセンサー情報取得に失敗しました。\nFailed getting room status.',
          });
        } else {
          let err = JSON.parse(xhr.responseText);
          let errorMsg = 'エラー\n[' + err.status + '] '  + err.description ;
          callback({
            status : 'fail',
            description : errorMsg,
            illuminance : null,
            humidity : null,
            airpressure : null,
            temperature : null
          });
        }
	    }
	});
}

function displayRoomStatus(result) {
  let temperature = document.getElementById('room-temperature')
  let humidity = document.getElementById('room-humidity')
  let airpressure = document.getElementById('room-airpressure')
  let illuminance = document.getElementById('room-illuminance')
  alert(result.description);

  if (result.status == 'success') {
    temperature.textContent = result.temperature;
    humidity.textContent = result.humidity;
    airpressure.textContent = result.airpressure;
    illuminance.textContent = result.illuminance;
  } else {
    temperature.textContent = '--';
    humidity.textContent = '--';
    airpressure.textContent = '--';
    illuminance.textContent = '--';
  }
}

function getRoomStatus(roomNum) {
  let url = 'https://edu-iot.iniad.org/api/v1' + '/sensors/' + roomNum;
  callRoomStatusAPI(url, 'GET', userid, userpw, displayRoomStatus)
}

function cafeteria() {
  alert('営業時間: 平日 11:00~14:00');
}