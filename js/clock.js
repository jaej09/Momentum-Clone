'use strict';

var Clock = (function() {
  var $timeContainer, $time;

  function getTime() {
    var date, hours, minutes;

    date = new Date();
    hours = date.getHours() % 12;
    minutes = date.getMinutes();

    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    printTime(hours, minutes);
  }

  function printTime(hours, minutes) {
    $time.innerText = hours + ':' + minutes;
  }

  function init() {
    $timeContainer = document.querySelector('.page-main__time');
    $time = $timeContainer.querySelector('.text');

    setInterval(getTime, 1000);
  }

  return { init };
})();

Clock.init();
