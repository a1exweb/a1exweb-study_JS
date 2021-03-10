const calculator = () => {
    const calcBlock = document.querySelector('.calc-block');
    calcBlock.addEventListener('input', (e) => {
        const target = e.target;
        if (target.matches('[type="text"]')) {
            target.value = target.value.replace(/\D/g, '');
        }
    });
};

export default calculator;