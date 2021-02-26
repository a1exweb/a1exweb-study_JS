'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, container) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.container = document.querySelector(container);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addStorage();
    }

    createItem(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`);
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
            this.form.reset();
        } else {
            alert('Поле "Какие планы?" должно быть заполнено!');
        }
        this.input.value = '';
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem){
        let count = 0;
        let int = setInterval(() => {
            count += 5;
            elem.parentNode.style.zoom = count + '%';
            if (count > 100){
                clearInterval(int);
                this.todoData.delete(elem.parentElement.key);
                this.render();
            }
        }, 10);
    }

    completedItem(elem) {
        let count = 0;
        let int = setInterval(() => {
            count += 5;
            elem.parentNode.style.zoom = count + '%';
            if (count > 100){
                clearInterval(int);
    
                this.todoData.forEach((val, key) => {
                    if (key === elem.parentElement.key) {
                        val.completed = !val.completed;
                    }
                });
                this.render();
            }
        }, 10);
    }

    edit(elem){
        elem.parentElement.children[0].contentEditable = "true";
        elem.parentElement.children[0].focus();
        elem.parentElement.children[0].style = `
            padding: 5px;
            background: #fff;
        `;

        elem.parentElement.children[0].addEventListener('blur', () => {
            if (elem.parentElement.children[0].textContent){
                this.todoData.forEach((val, key) => {
                    if (key === elem.parentElement.key){
                        val.value = elem.parentElement.children[0].textContent;
                    }
                });
                elem.parentElement.children[0].contentEditable = "false";
                this.render();
            } else {
                alert('Дело должно быть заполнено!');
                elem.parentElement.children[0].style.outlineColor = 'red';
                elem.parentElement.children[0].focus();
            }
        });
    }

    handler(){
        this.container.addEventListener('click', (e)=> {
            let target = e.target;
            if (target.classList.contains('todo-remove')) {
                this.deleteItem(target.parentElement);
            } else if (target.classList.contains('todo-complete')) {
                this.completedItem(target.parentElement );
            } else if (target.classList.contains('todo-edit')) {
                this.edit(target.parentElement);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();