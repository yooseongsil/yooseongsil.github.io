import { getLocalStorage, getRandomNumber, setLocalStorage, getTimeNow } from './constants.js';
import { clock } from './clock.js';
import { IMAGE_MAX_NUMBER, paintImage } from './bg.js';

const $body = document.querySelector("body");
const $nameForm = document.querySelector("#name-form");
const $nameInput = $nameForm.querySelector("#name-input");
const $userName = document.querySelector(".user-name");
const $todoForm = document.querySelector("#todo-form");
const $todoInput = $todoForm.querySelector("#todo-input");
const $todoList = $todoForm.querySelector(".todo-wrapper");

let todos = [];

const NAME = 'name';
const TODOS = 'todos';

function handleNameSubmit(event) {
  event.preventDefault();
  const currentValue = $nameInput.value;
  paintName(currentValue);
  $nameInput.value = "";
}

function paintName(value) {
  $userName.innerText = value;
  setLocalStorage(NAME, value);
  hideNameForm();
  showTodoList();
}

function showNameForm() {
  $nameForm.style.display = 'block';
}

function hideNameForm() {
  $nameForm.style.display = "none";
}

function handleLoad() {
  const loadedName = getLocalStorage(NAME);
  if (loadedName) {
    loadName(loadedName);
    hideNameForm();
    showTodoList();
    loadTodos();
  } else {
    showNameForm();
  }
}

function loadName(value) {
  $userName.innerText = value;
}

function showTodoList() {
  $todoForm.style.display = 'block';
}

function loadTodos() {
  const loadedTodos = getLocalStorage(TODOS);
  if (loadedTodos) {
    const sortedArray = loadedTodos.sort((a,b) => a.finished - b.finished);
    sortedArray.forEach(function ({id, value, finished}) {
      paintTodo(value, id, finished);
    });
  }
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const currentValue = $todoInput.value;
  paintTodo(currentValue);
  $todoInput.value = "";
}

function paintTodo(value, id, finished) {
  const li = document.createElement("li");
  li.innerHTML = `
    <button type="button" class="check-button ${finished && 'checked'}"></button>
    ${finished ? '<del>' + value + '</del>' : value}
    <button type="button" class="delete-button"></button>
  `;
  const itemId = id ? id : getTimeNow();
  li.id = itemId;

  if (finished) {
    $todoList.appendChild(li);
  } else {
    $todoList.prepend(li);
  }

  const todoItem = {
    id: itemId,
    value,
    finished: finished || false
  };

  todos.push(todoItem);
  setLocalStorage(TODOS, todos);
}

function handleChangeFinished(todoItem) {
  const { id, value, finished } = todos.find(item => {return item.id === parseInt(todoItem.id)}) || {};
  handleDeleteTodo(todoItem);
  paintTodo(value, id, !finished);
}

function handleDeleteTodo(todoItem) {
  todoItem.remove();
  const newTodos = todos.filter(item => {
    return item.id !== parseInt(todoItem.id)
  });
  todos = newTodos;
  setLocalStorage(TODOS, todos);
}

function init() {
  clock();
  setInterval(clock, 1000);

  const randomNumber = getRandomNumber(IMAGE_MAX_NUMBER);
  paintImage($body, randomNumber);

  handleLoad();

  $nameForm.addEventListener("submit", handleNameSubmit);
  $todoForm.addEventListener("submit", handleTodoSubmit);

  $todoList.addEventListener("click", function(event) {
    const className = event.target.className;

    if (className.includes('check-button')) {
      if (className.includes('checked')) {
        const $li = event.target.parentElement;
        handleChangeFinished($li);
      } else {
        const $li = event.target.parentElement;
        handleChangeFinished($li);
      }
    }
    if (className === 'delete-button') {
      const $li = event.target.parentElement;
      handleDeleteTodo($li);
    }
  });
}

init();
