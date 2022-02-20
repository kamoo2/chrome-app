const API_KEY = '238c47ac8bcc857fa5a3a853bc0eb929';
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = document.querySelector('.weather span:first-child');
      const city = document.querySelector('.weather span:last-child');
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      city.innerText = data.name;
    });
}
function onGeoError() {
  alert('날씨 정보를 가져올 수 없습니다.');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
