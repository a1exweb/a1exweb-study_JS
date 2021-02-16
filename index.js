'use strict';

const DomElement = function (height, width, bg, position) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.position = position;
};


DomElement.prototype.createElement = function () {
    let elem = document.createElement('div');
    
    if (elem) {
        elem.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;
        position: ${this.position};
        `;
        document.body.append(elem);
    }
};

DomElement.prototype.eventListeners = function () {
    const _this = this;
    document.addEventListener('DOMContentLoaded', function () {
        _this.createElement();
    });
    
    window.addEventListener('keydown', function (e) {
        let elem = document.querySelector('div');

        let elemStyle = getComputedStyle(elem);

        if (e.key === 'ArrowUp') {
            elem.style.top = (parseFloat(elemStyle.top) - 10) + 'px';
        } else if (e.key === 'ArrowDown') {
            elem.style.top = (parseFloat(elemStyle.top) + 10) + 'px';
        } else if (e.key === 'ArrowRight') {
            elem.style.left = (parseFloat(elemStyle.left) + 10) + 'px';
        } else if (e.key === 'ArrowLeft') {
            elem.style.left = (parseFloat(elemStyle.left) - 10) + 'px';
        }
    });
};

const domElement = new DomElement();
const box = new DomElement(100, 100, 'red', 'absolute').eventListeners();
