import animate from './animate';

const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popUpBtns = document.querySelectorAll('.popup-btn');

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

export default togglePopUp;