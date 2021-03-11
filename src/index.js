'use strict';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scroll from './modules/scroll';
import slider from './modules/slider';
import tabs from './modules/tabs';
import changeImage from './modules/changeImage';
import calculator from './modules/calculator';
import checkCyr from './modules/checkCyr';
import checkMail from './modules/checkMail';
import checkPhone from './modules/checkPhone';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import maskPhone  from './modules/maskPhone';

countTimer('1 sep 2021');
toggleMenu();
togglePopUp();
scroll();
tabs();
slider();
changeImage();
calculator();
checkCyr();
checkMail();
checkPhone();
calc(100);

const forms = document.querySelectorAll('form');

forms.forEach(item => {
    sendForm(item);
});

maskPhone('input[type=tel]');