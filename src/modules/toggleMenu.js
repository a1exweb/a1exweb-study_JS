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

export default toggleMenu;