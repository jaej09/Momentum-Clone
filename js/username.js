'use strict';

var Username = (function() {
  const USER_LS = 'currentUser';
  var $userContainer, $userForm, $userInput, $greetings;

  function askForUsername() {
    $userForm.classList.remove('is-hidden');
    $userForm.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    $userForm.classList.add('is-hidden');

    var username = $userInput.value;
    username = capitalizeString(username);
    paintGreetings(username);
    saveUsername(username);
  }

  function capitalizeString(str) {
    var words = str.split(' ').map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase());
    var sentence = words.join(' ');
    return sentence;
  }

  function paintGreetings(name) {
    $greetings.classList.remove('is-hidden');
    $greetings.innerText = `Have a nice day, ${name}.`;
  }

  function saveUsername(name) {
    localStorage.setItem(USER_LS, name);
  }

  function loadUsername() {
    var currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) askForUsername();
    else paintGreetings(currentUser);
  }

  function init() {
    $userContainer = document.querySelector('.page-main__user');
    $userForm = $userContainer.querySelector('form');
    $userInput = $userForm.querySelector('input');
    $greetings = $userContainer.querySelector('.greetings');

    loadUsername();
  }

  return { init };
})();

Username.init();
