'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const getToDoData = () => {
  toDoData = JSON.parse(window.localStorage.getItem("toDoData")) || [];
};

const checkValue = function () {
  let isError = false;
  if (headerInput.value.trim() === '' && headerInput.value !== null) {
    isError = true;
  }
  if (!isError) {
    render();
  } else {
    alert('Заполните пустое значение');
  }
};


const render = function () {
  getToDoData();
  console.log(toDoData);
  todoCompleted.innerHTML = '';
  todoList.innerHTML = '';
  toDoData.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }


    li.querySelector('.todo-complete').addEventListener('click', () => {
      item.completed = !item.completed;
      localStorage.setItem('toDoData', JSON.stringify(toDoData));
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', () => {
      toDoData.splice(index, 1);
      localStorage.setItem('toDoData', JSON.stringify(toDoData));
      render();
    });
  });
};

todoControl.addEventListener('submit', (e) => {
  e.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false
  };

  if (headerInput.value.trim() === '') {
    checkValue();
  } else {
    toDoData.push(newToDo);
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
    headerInput.value = '';
  }


  render();

});

render();
