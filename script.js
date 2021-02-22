'use strict';

const input = document.querySelector('input'),
    text = document.querySelector('p');

function inputText() {
    text.textContent = input.value;
}

function throttle(func, ms) {
    let isTrotled = false,
        savedArgs,
        savedThis;

    const wrapper = () => {
        if(isTrotled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);
        isTrotled = true;

        setTimeout(() => {
            isTrotled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    };
    return wrapper;
}

let hold = throttle(inputText, 300);

input.addEventListener('input', hold);