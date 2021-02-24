window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Таймер
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }
        
        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            }
            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            }
            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            }
            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
        }

        if (getTimeRemaining().timeRemaining > 0) {
            updateClock();
            setInterval(updateClock, 1000);
        } else {
            clearInterval(2);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    };
    countTimer('23 feb 2021');


    // Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', (e) => {
            const target = e.target;
            if(target === closeBtn || target.closest('.active-menu ul')) {
                handlerMenu();
            } else if (target.closest('.menu')) {
                handlerMenu();
            } else if (target !== menu) {
                menu.classList.remove('active-menu');
            }
        });

        // const menuBtn = document.querySelector('.menu');
        // menuBtn.addEventListener('click', handlerMenu);
        // menu.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     let target = e.target;
        //     if (target.classList.contains('close-btn')) {
        //         handlerMenu();
        //     } else {
        //         if (target.matches('ul>li>a')) {
        //             handlerMenu();
        //         }
        //     }
        // });
    };
    toggleMenu();


    // popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtns = document.querySelectorAll('.popup-btn');

        function animate({timing, draw, duration}) {
            const start = performance.now();

            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }

                const progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }

        popUpBtns.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (window.innerWidth > 768) {
                    animate({
                        duration: 500,
                        timing(timeFraction) {
                            return timeFraction;
                        },
                        draw(progress) {
                            popUp.style.opacity = progress;
                        }
                    });
                    popUp.style.visibility = 'visible';
                }
            });
        });

        const popUpClose = () => {
            if (window.innerWidth > 768) {
                window.setTimeout(() => popUp.style.visibility = 'hidden', 500);
                animate({
                    duration: 500,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        popUp.style.opacity = 1 - progress;
                    }
                });
            } else {
                popUp.style.display = 'none';
            }
        };

        popUp.addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('popup-close')) {
                popUpClose();
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUpClose();
                }
            }
        });
    };
    togglePopUp();

    // скрипт плавной прокрутки страницы
    const scroll = () => {
        const anchors = document.querySelectorAll('a[href*="#"');

        for (const anchor of anchors) {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const blockId = anchor.getAttribute('href'),
                    idElem = document.querySelector(blockId);
                if (idElem) {
                    const idElemY = idElem.offsetTop;
                    window.scrollTo({
                        top: idElemY,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };
    scroll();

    // табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');
                if (target) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                }

        });
    };
    tabs();
});