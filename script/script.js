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
            if (anchor.href.split('#')[1].length > 0) {
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

    // слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');
        let currentSlide = 0,
            interval,
            dots;

        const newDots = () => {
            slide.forEach(() => {
                const newElem = document.createElement('li');
                newElem.classList.add('dot');
                portfolioDots.append(newElem);
            });
            dots = document.querySelectorAll('.dot');
            dots[currentSlide].classList.add('dot-active');
        };
        newDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        
        slider.addEventListener('click', (e) => {
            e.preventDefault();
            
            let target = e.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();

    // наша команда
    const changeImage = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach((item) => {
            item.addEventListener('mouseover', (e) => {
                const target = e.target;
                [target.src, target.dataset.img] = [target.dataset.img, target.src];
            });
        });

        commandPhoto.forEach((item) => {
            item.addEventListener('mouseout', (e) => {
                const target = e.target;
                [target.dataset.img, target.src] = [target.src, target.dataset.img];
            });
        });
    };
    changeImage();

    // калькулятор
    const calculator = () => {
        const calcBlock = document.querySelector('.calc-block');
        calcBlock.addEventListener('input', (e) => {
            const target = e.target;
            if (target.matches('[type="text"]')) {
                target.value = target.value.replace(/\D/g, '');
            }
        });
    };
    calculator();

    // регулярные выражения
    const checkCyr = () => {
        const yourName = document.querySelectorAll('[name="user_name"]'),
            yourMessage = document.querySelectorAll('[name="user_message"]');
            const check = (e) => {
                const target = e.target;
                target.value = target.value.replace(/[^а-я-ё\-\s]/ig, '');
            };
            yourName.forEach((item) => {
                item.addEventListener('input', check);
                item.addEventListener('blur', (e) => {
                    const target = e.target;
                    target.value = target.value.replace(/ +/g, ' ').trim();
                    target.value = target.value.replace(/([А-ЯЁ])/g, x => x.toLowerCase());
                    target.value = target.value.replace(/(( |^)[а-яё])(?=[а-яё])/g, x => x.toUpperCase());
                });
            });
            yourMessage.forEach((item) => {
                item.addEventListener('input', check);
                item.addEventListener('blur', (e) => {
                    const target = e.target;
                    target.value = target.value.replace(/^[ -]*|( |-)(?=\1)|[ -]*$/g, '').replace(/ +/g, ' ').trim();
                });
            });
    };
    checkCyr();

    const checkMail = () => {
        const mail = document.querySelectorAll('[name="user_email"]');
        mail.forEach((item) => {
            const checkThis = (e) => {
                const target = e.target;
                target.value = target.value.replace(/[^a-z@\-_.!~*']/ig, '');
            };
            item.addEventListener('input', checkThis);
            item.addEventListener('keypress', (e) => {
                if (e.code === 'Space') {
                    e.preventDefault();
                }
            });
            item.addEventListener('blur', (e) => {
                const target = e.target;
                // target.value = target.value.replace(/ +/g, ' ').trim(); без keypress если
                target.value = target.value.replace(/^[ -]*|( |-)(?=\1)|[ -]*$/g, '').replace(/ +/g, ' ').trim();
            });
        });
    };
    checkMail();

    const checkPhone = () => {
        const phone = document.querySelectorAll('[name="user_phone"]');
        phone.forEach((item) => {
            item.addEventListener('input', (e) => {
                const target = e.target;
                target.value = target.value.replace(/[^\-()\d]/g , '');
            });
        });
    };
    checkPhone();

    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSqure = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSqure.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };
        
        calcBlock.addEventListener('change', (e) => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
            
        });
    };
    calc(100);
});