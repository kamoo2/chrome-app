const myApp = document.querySelector('.app');
const clock = document.querySelector('.clock');
const infoText = document.querySelector('.info__text');
const loginForm = document.querySelector('.login__form');
const loginName = document.querySelector('.login__name');
const loginBtn = document.querySelector('.login__btn');
const todoForm = document.querySelector('.todo__form');
const todoText = document.querySelector('.todo__text');
const todoList = document.querySelector('.todo__list');

const bg = [
  'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
  'https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
];

let toDos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToDos() {
  localStorage.setItem('todos', JSON.stringify(toDos));
}

function removeClassName(element, className) {
  element.classList.remove(className);
}

function addClassName(element, className) {
  element.classList.add(className);
}

function randomBackground() {
  const random = Math.floor(Math.random() * bg.length);
  myApp.style.backgroundImage = `url(${bg[random]})`;
  myApp.style.backgroundSize = `cover`;
}

function login(name) {
  localStorage.setItem('name', name);
  infoText.innerText = `Hello ${name}`;
  addClassName(loginForm, 'none');
  removeClassName(todoForm, 'none');
  todoText.focus();
}

function getCurrentTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  return {
    hour,
    min,
    sec,
  };
}

function paintTodo(newTodo) {
  const li = document.createElement('li');
  const todoText = document.createElement('div');
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'delete__btn');
  li.setAttribute('id', newTodo.id);
  todoText.innerText = newTodo.text;
  deleteBtn.innerText = '🗑';
  li.appendChild(todoText);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

setInterval(() => {
  const { hour, min, sec } = getCurrentTime();
  clock.innerText = `${hour} : ${min} : ${sec}`;
}, 1000);

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = loginName.value;
  login(name);
  loginName.value = '';
});

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const todo = todoText.value;
  todoText.value = ``;
  const newToDoObj = {
    text: todo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintTodo(newToDoObj);
  saveToDos();
});

todoList.addEventListener('click', event => {
  if (event.target.nodeName === 'BUTTON') {
    const li = event.target.parentNode;
    toDos = Array.from(toDos).filter(todo => String(todo.id) !== li.id);
    saveToDos();
    li.remove();
  } else {
    return;
  }
});

function app() {
  randomBackground();
  const nameKey = localStorage.getItem('name');
  const toDosKey = localStorage.getItem('todos');
  if (nameKey) {
    login(nameKey);
  }
  if (toDosKey) {
    const toDos = Array.from(JSON.parse(toDosKey));
    toDos.forEach(item => {
      paintTodo(item);
    });
  }
}

app();
