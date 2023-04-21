function makeBasicAuth(userid, userpw) {
  let token = userid + ':' + userpw;
  let hash = btoa(token);
  return "Basic " + hash;
}

function callLockerPositionAPI(url, method, userid, userpw, callback) {
  $.ajax({
	    type : method,
	    url : url,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : 'Succeeded getting locker information',
          lockerAddress : data.name,
          lockerFloor : data.floor
        });
	    },
	    error : function(xhr, status, error) {
        if (xhr.status === 503) {
          callback({
            status : 'success',
            description : 'Below is dummy data for test purposes',
            lockerAddress : "32XXXX",
            lockerFloor : "3"
          });
        } else {
          let err = JSON.parse(xhr.responseText);
          let errorMsg = '[' + err.status + '] '  + err.description ;
          callback({
            status : 'fail',
            description : errorMsg,
            lockerAddress : null,
            lockerFloor : null
          });
        }
	    }
	});
}

function callRegisteredIccardAPI(url, method, userid, userpw, callback) {
  $.ajax({
	    type : method,
	    url : url + '/1',
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : 'Succeeded getting IC card information',
          iccardId : data.uid,
          iccardComment : data.comment
        });
	    },
	    error : function(xhr, status, error) {
        if (xhr.status === 503) {
          callback({
            status : 'success',
            description : 'Below is dummy data for test purposes',
            iccardId : "XXXXXXXXXXXXXXXX",
            iccardComment : "dummy comment"
          });
        } else {
          let err = JSON.parse(xhr.responseText);
          let errorMsg = '[' + err.status + '] '  + err.description ;
          callback({
            status : 'fail',
            description : errorMsg,
            iccardId : null,
            iccardComment : null
          });          
        }
	    }
	});
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
          description : 'Succeeded getting room status',
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
            description : 'Below is dummy data for test purposes',
            illuminance : 100,
            humidity : 55.5,
            airpressure : 1006,
            temperature : 30.9
          });          
        } else {
          let err = JSON.parse(xhr.responseText);
          let errorMsg = '[' + err.status + '] '  + err.description ;
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

function callIccardAPI(url, method, data, userid, userpw, callback) {
  let newUrl = url;
  let successMsg = 'Succeeded registering IC card';
  if (method == 'DELETE') {
    newUrl += '/1';
    successMsg = 'Succeeded deleting IC card';
  }
  $.ajax({
	    type : method,
	    url : newUrl,
      data : data,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : successMsg,
        });
	    },
	    error : function(xhr, status, error) {
        if (xhr.status === 503) {
          if ((method.toUpperCase() === "POST") && data.uid && data.comment) {
            callback({
              status : 'success',
              description : "This is a dummy message for registering IC card",
            });            
          } else if (method.toUpperCase() === "DELETE") {
            callback({
              status : 'success',
              description : "This is a dummy message for deleting IC card",
            });               
          } else {
            callback({
              status : 'fail',
              description : "[Error] Bad or Invalid Request",
            });              
          }
        } else {
          let err = JSON.parse(xhr.responseText);
          let errorMsg = '[' + err.status + '] '  + err.description ;
          callback({
            status : 'fail',
            description : errorMsg,
          });
        }
	    }
	});
}
