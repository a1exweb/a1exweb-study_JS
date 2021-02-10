const booksWrapper = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    banner = document.querySelector('.adv'),
    titles = document.querySelectorAll('.books h2 a'),
    listItems2 = books[0].children[1].children,
    listItems5 = books[5].children[1].children,
    listItems6 = books[2].children[1],
    elemLi = document.createElement('li');

booksWrapper.insertAdjacentElement('afterbegin', books[1]);
books[2].replaceWith(books[4]);
booksWrapper.insertAdjacentElement('beforeend', books[2]);

body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

titles[4].textContent = 'Книга 3. this и Прототипы Объектов';

banner.remove();

listItems2[1].after(listItems2[3]);
listItems2[2].after(listItems2[6]);
listItems2[3].after(listItems2[8]);
listItems2[4].after(listItems2[6]);
listItems2[9].after(listItems2[6]);

listItems5[1].after(listItems5[9]);
listItems5[2].after(listItems5[4]);
listItems5[3].after(listItems5[5]);
listItems5[4].after(listItems5[6]);
listItems5[8].after(listItems5[5]);

elemLi.textContent = 'Глава 8: За пределами ES6';
listItems6.children[8].after(elemLi);
