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
import SliderCarousel from './modules/SliderCarousel';

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

const carousel = new SliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
        breakpoint: 1024,
        slideToShow: 3
    },
    {
        breakpoint: 768,
        slideToShow: 2
    },
    {
        breakpoint: 576,
        slideToShow: 1
    }
]
});

carousel.init();


maskPhone('input[type=tel]');