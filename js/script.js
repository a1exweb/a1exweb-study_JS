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
        this.todoData.delete(elem.parentElement.key);
        setTimeout(() => {
            this.render();
        }, 10);
    }

    completedItem(elem) {
        this.todoData.forEach((val, key) => {
            if (key === elem.parentElement.key) {
                val.completed = !val.completed;
            }
        });
        setTimeout(() => {
            this.render();
        }, 10);
    }

    animDel(elem) {
        let count = 100;
        const step = 5;
        const del = () => {
            count -= step;
            elem.parentNode.style.zoom = count / 100;
            if (count > 0) {
                setTimeout(() => {
                    requestAnimationFrame(del);
                }, 50);
            }
        };
        requestAnimationFrame(del);
    }

    animAdd(elem) {
        let count = 0;
        const step = 5;
        const add = () => {
            count += step;
            elem.parentNode.style.zoom = count / 100;
            if (count < 100) {
                setTimeout(() => {
                    requestAnimationFrame(add);
                }, 50);
            }
        };
        requestAnimationFrame(add);
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
            const target = e.target,
                elem = target.parentElement;
            if (target.classList.contains('todo-remove')) {
                this.animDel(elem);
                setTimeout(() => {
                    this.deleteItem(elem);
                }, 500);
            } else if (target.classList.contains('todo-complete')) {
                setTimeout(() => {
                    this.completedItem(elem);
                }, 500);
                setTimeout(() => {
                    this.animAdd(elem);
                }, 0);

            } else if (target.classList.contains('todo-edit')) {
                this.edit(elem);
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