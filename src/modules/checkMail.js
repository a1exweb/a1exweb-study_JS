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
            target.value = target.value.replace(/^[ -]*|( |-)(?=\1)|[ -]*$/g, '').replace(/ +/g, ' ').trim();
        });
    });
};

export default checkMail;