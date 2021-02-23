window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Таймер
    function countTimer(deadline) {
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
    }
    countTimer('23 feb 2021');


    // Меню
    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        menuBtn.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();


    // popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtns = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

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

        popUpClose.addEventListener('click', () => {
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
        });
    };
    togglePopUp();
});