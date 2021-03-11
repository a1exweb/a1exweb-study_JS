const sendForm = form => {
    const errorMessage = 'Что то пошло не так...',
        succesMessage = 'Спасибо! Мы скоро с Вами свяжемся';

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('thanks-message');
    statusMessage.style.cssText = `
        font-size: 1.2rem;
        color: #fff;
    `;

    const successValidation = elem => {
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
        elem.style.border = 'none';
    };

    const errorValidation = elem => {
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        elem.style.cssText = 'border: 1px solid tomato';
        const errorValid = document.createElement('div');
        errorValid.classList.add('validator-error');

        if (elem.type === 'tel') {
            errorValid.insertAdjacentHTML('afterbegin', 'Введите номер в формате <br> +7 (800) 900-77-66'); 
        } else if (elem.type === 'email') {
            errorValid.insertAdjacentHTML('afterbegin', 'Введите email в формате <br> email@domain.ru');
        }

        errorValid.style.cssText = `
                color: tomato;
                font-size: 1.2rem;
            `;
        elem.insertAdjacentElement('afterend', errorValid);
    };

    const postData = body =>
            fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

    form.addEventListener('submit', event => {
        const telInput = form.querySelector('[type="tel"]'),
            emailInput = form.querySelector('[type="email"]'),
            telPatern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/,
            emailPatern = /^\w+@\w+\.\w{2,}$/;

        event.preventDefault();
        form.append(statusMessage);

        const formData = new FormData(form);

        const body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        if (telPatern.test(telInput.value)) {
            successValidation(telInput);
        } else {
            errorValidation(telInput);
        }
        if (emailPatern.test(emailInput.value)) {
            successValidation(emailInput);
        } else {
            errorValidation(emailInput);
        }
        if (telPatern.test(telInput.value) && emailPatern.test(emailInput.value)) {
            statusMessage.innerHTML = `
            <div class="container-box">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
            </div>
            `;

            postData(body)
                .then(response => {
                    if(response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    form.reset();
                    statusMessage.innerHTML = succesMessage;
                })
                .catch(error => {
                    statusMessage.innerHTML = errorMessage;
                    console.error(error);
                });
                setTimeout(() => {
                    statusMessage.parentNode.removeChild(statusMessage);
                }, 7000);
            }
    });

    const validate = form => {
        const tel = form.querySelector('[type="tel"]'),
            email = form.querySelector('[type="email"]'),
            name = form.querySelector('[type="text"]'),
            text = form.querySelector('[placeholder="Ваше сообщение"]');

        tel.addEventListener('input', e => {
            const target = e.target;
            target.value = target.value.replace(/[^+0-9]/g, '');
        });

        email.addEventListener('input', e => {
            const target = e.target;
            target.value = target.value.replace(/[^@a-zA-Z0-9.-_]/g, '');
        });

        name.addEventListener('input', e => {
            const target = e.target;
            target.value = target.value.replace(/[^а-яА-Я ]/g, '');
        });

        if (text) {
            text.addEventListener('input', e => {
                const target = e.target;
                target.value = target.value.replace(/[^а-яА-Я ,.!]/g, '');
            });
        }
    };

    validate(form);
};

export default sendForm;