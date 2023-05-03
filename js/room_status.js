let BASE_URL = "https://edu-iot.iniad.org/api/v1";

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

function getRoomStatus() {
  let userid = 's1F102102762@iniad.org';
  let userpw = 'RionINIAD276';
  let url = BASE_URL + '/sensors/' + roomNum;
  callRoomStatusAPI(url, 'GET', userid, userpw, displayRoomStatus)
}