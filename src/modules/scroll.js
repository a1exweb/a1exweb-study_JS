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

export default scroll;