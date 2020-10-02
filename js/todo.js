'use strict';

var Todo = (function() {
  const TODO_LS = 'todo';
  var $todoForm, $input, $todoContainer;
  var todoAr = []; // an empty array

  function loadTodo() {
    var todo = localStorage.getItem(TODO_LS);

    if (todo !== null) {
      var parsedTodo = JSON.parse(todo);
      parsedTodo.forEach(function(todo) {
        paintTodo(todo.text);
      });
    }
  }

  function paintTodo(text) {
    var li, span, i;

    // <li id="?"></li>
    li = document.createElement('li');
    li.innerText = text;
    var newId = todoAr.length + 1;
    li.id = newId;

    // <span class="btn-delete"></span>
    span = document.createElement('span');
    span.className = 'btn-delete';

    // <i class="fas fa-backspace"></i>
    i = document.createElement('i');
    i.className = 'fas fa-backspace';
    i.addEventListener('click', deleteTodo);

    // append created DOM elements
    span.appendChild(i);
    li.appendChild(span);
    $todoContainer.appendChild(li);

    // create obj
    var todoObj = { id: newId, text };
    todoAr.push(todoObj);
    saveTodo();
  }

  function deleteTodo(evt) {
    var clickedTodo = evt.target;
    var span = clickedTodo.parentNode;
    var li = span.parentNode;

    $todoContainer.removeChild(li);

    var cleanedTodo = todoAr.filter(function(todoList) {
      console.log(li.id);
      return todoList.id !== parseInt(li.id);
    });

    console.log(cleanedTodo);

    todoAr = cleanedTodo;
    saveTodo();
  }

  function saveTodo() {
    localStorage.setItem(TODO_LS, JSON.stringify(todoAr));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    var currentText = $input.value;
    paintTodo(currentText);
    $input.value = null; // 초기화
  }

  function init() {
    $todoForm = document.querySelector('.todo-form');
    $input = $todoForm.querySelector('input');
    $todoContainer = document.querySelector('.todo-container');
    $todoForm.addEventListener('submit', handleSubmit);

    loadTodo();
  }

  return { init };
})();

Todo.init();
