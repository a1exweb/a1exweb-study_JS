const checkPhone = () => {
    const phone = document.querySelectorAll('[name="user_phone"]');
    phone.forEach((item) => {
        item.addEventListener('input', (e) => {
            const target = e.target;
            target.value = target.value.replace(/[^\-()\d]/g , '');
        });
    });
};

export default checkPhone;