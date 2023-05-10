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