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

export default checkCyr;