'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const toLocalStorage = function () {
    const jsonTodoData = JSON.stringify(todoData);
    localStorage.setItem('data', jsonTodoData);
};

const fromLocalStorage = function () {
    if (localStorage.getItem('data')) {
        todoData = localStorage.getItem('data');
        todoData = JSON.parse(todoData);
    }
};

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            const elem = this.closest('li');
            let elemIndex;
            for (let i in todoData) {
                if (todoData[i].value === elem.querySelector('.text-todo').textContent) {
                    elemIndex = i;
                }
            }
            todoData.splice(elemIndex, 1);
            render();
        });
    });
    toLocalStorage();
};

todoControl.addEventListener('submit', function (e) {
    e.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (newTodo.value === '') {
        alert('Введите текст, поле не может быть пустым!');
    } else {
        todoData.push(newTodo);
        headerInput.value = '';
        toLocalStorage();
        render();
    }
});

fromLocalStorage();
render();