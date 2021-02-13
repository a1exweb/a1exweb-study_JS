'use strict';

const userName = document.querySelector('#username'),
    registerUser = document.querySelector('#registerUser'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list');

let userDate = [];

const toLocalStorage = function () {
    const jsonUserDate = JSON.stringify(userDate);
    localStorage.setItem('date', jsonUserDate);
};
const fromLocaleStorage = function () {
    if (localStorage.getItem('date')) {
        userDate = localStorage.getItem('date');
        userDate = JSON.parse(userDate);
    }
};

const render = function () {
    list.textContent = '';
    userDate.forEach(function (item) {
        let newElem = document.createElement('li');
        newElem.innerHTML = `Имя: <span class='firstname'>${item.firstName}</span>, 
        Фамилия: ${item.lastName}, 
        Зарегестрирован: ${item.date} <button id="delete" class="btn delete">удалить</button>`;
        list.append(newElem);

        let deleteBtn = newElem.querySelector('#delete');
        deleteBtn.addEventListener('click', function () {
        let elem = this.closest('li');
        let elemIndex;
        for (let i in userDate) {
            if (userDate[i].firstName === elem.querySelector('.firstname').textContent) {
            elemIndex = i;
            }
        }
        userDate.splice(elemIndex, 1);
        render();
        });
    });
    toLocalStorage();
};

registerUser.addEventListener('click', function () {
    let newUser = {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        date: ''
    },
    date = new Date(),
    day = date.getDate(),
    months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
    'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    month = months[date.getMonth()],
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    firstAndLastName;
    
    if (hours < 10) {
        hours = '0' + hours;
    } else if (minutes < 10) {
        minutes = '0' + minutes;
    } else if (seconds < 10) {
        seconds = '0' + seconds;
    }

    do {
        firstAndLastName = prompt('Введите имя и фамилию через пробел');
    } while (firstAndLastName.split(' ').length - 1 > 1 || firstAndLastName.split(' ').length - 1 < 1);

    firstAndLastName = firstAndLastName.split(' ');
    newUser.firstName = firstAndLastName[0];
    newUser.lastName = firstAndLastName[1];

    newUser.login = prompt('Введите логин');
    newUser.password = prompt('Введите пароль');
    newUser.date = `${day} ${month} ${year} г., ${hours}:${minutes}:${seconds}`;
    userDate.push(newUser);
    render();
    toLocalStorage();
});

login.addEventListener('click', function () {
    let login = prompt('Введите логин'),
        password = prompt('Введите пароль');
    userDate.forEach(function (item) {
        if (item.login === login && item.password === password) {
            userName.textContent = item.firstName;
        } else {
            alert('Такого пользователя не существует');
            userName.textContent = 'Аноним';
        }
    });
});

fromLocaleStorage();
render();
