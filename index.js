'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
    let elem;

    console.log(this);
    console.log(this.selector);
    
    if (this.selector[0] === '.') {
        elem = document.createElement('div');
        elem.classList.add(this.selector.slice(1));
    } else if (this.selector[0] === '#') {
        elem = document.createElement('p');
        elem.setAttribute('id', `${this.selector.slice(1)}`);
    }

    if (elem) {
        elem.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;
        `;
        elem.textContent = prompt('Введите текст');
        document.body.append(elem);
    }
};

const domElement = new DomElement();

const div = new DomElement('.your-class', 150, 50, 'red', 14);
const p = new DomElement('#your-id', 150, 200, 'green', 16);
div.createElement();
p.createElement();