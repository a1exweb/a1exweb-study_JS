'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        this.todoContainer = document.querySelector('.todo-container');
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.addToStorage();
        this.todoData.forEach(this.createItem, this);
    }

    createItem(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.setAttribute('key', item.key);
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (item.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim() !== '') {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('Поле "Какие планы?" должно быть заполнено!');
        }
        this.input.value = '';
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem) {
        const elemKey = elem.getAttribute('key');
        this.todoData.forEach((item, index) => {
            if (item.key === elemKey) {
                this.todoData.delete(index);
            }
        });
        this.render();
    }

    completedItem(elem) {
        const elemKey = elem.getAttribute('key');
        this.todoData.forEach(item => {
            if (item.key === elemKey) {
                item.completed = !item.completed;
            }
        });
        this.render();
    }

    handler() {
        this.todoContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('.todo-remove')) {
                this.deleteItem(target.closest('li'));
            } else if (target.matches('.todo-complete')) {
                this.completedItem(target.closest('li'));
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();