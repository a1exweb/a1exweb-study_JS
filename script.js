'use strict';

let preview = document.querySelector('body'),
    code = document.querySelector('#code'),
    
    change = function(){
      let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      preview.style.background = color;
      code.textContent = color;
    };

document.querySelector('#button').addEventListener('click', change);