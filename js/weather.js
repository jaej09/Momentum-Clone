'use strict';

var Weather = (function() {
  const API_KEY = 'c714838e0e906a8d027e53c274279ab8';
  const COORDS_LS = 'coords';
  var $weather;

  function loadCoords() {
    var coords = localStorage.getItem(COORDS_LS);

    if (coords === null) {
      askForCoords();
    }
    else {
      var parsedCoords = JSON.parse(coords);
      getWeather(parsedCoords.lat, parsedCoords.lon);
    }
  }

  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }

  function handleGeoSuccess(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log(lat, lon);

    var coordsObj = { lat, lon };
    saveCoords(coordsObj);
    getWeather(lat, lon);
  }

  function handleGeoError() {
    console.log('Error');
  }

  function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
  }

  function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        var temp = json.main.temp; // 기온
        var place = json.name; // 위치
        $weather.innerText = `${place}, ${temp} Degree`;
      });
  }

  function init() {
    $weather = document.querySelector('.weather');

    loadCoords();
  }

  return { init };
})();

Weather.init();
