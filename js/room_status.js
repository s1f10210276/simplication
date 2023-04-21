let BASE_URL = "https://edu-iot.iniad.org/api/v1";

function displayRoomStatus(result) {
  let monitoringResult = document.getElementById('monitoring-result')
  let temperature = document.getElementById('room-temperature')
  let humidity = document.getElementById('room-humidity')
  let airpressure = document.getElementById('room-airpressure')
  let illuminance = document.getElementById('room-illuminance')
  monitoringResult.textContent = result.description;

  if (result.status == 'success') {
    temperature.textContent = result.temperature;
    humidity.textContent = result.humidity;
    airpressure.textContent = result.airpressure;
    illuminance.textContent = result.illuminance;
  } else {
    temperature.textContent = 'none';
    humidity.textContent = 'none';
    airpressure.textContent = 'none';
    illuminance.textContent = 'none';
  }
}

function getRoomStatus() {
  let userid = document.getElementById('iniad-id').value;
  let userpw = document.getElementById('iniad-pw').value;
  let roomNum = document.getElementById('room-number').value;
  let url = BASE_URL + '/sensors/' + roomNum;
  callRoomStatusAPI(url, 'GET', userid, userpw, displayRoomStatus)
}