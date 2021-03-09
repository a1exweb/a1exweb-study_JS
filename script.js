'use strict';

const convert = () => {
    const inputMoney = document.getElementById('input-money'),
        currency1 = document.getElementById('currency-1'),
        currency2 = document.getElementById('currency-2'),
        result = document.getElementById('result'),
        convert = document.getElementById('convert');

    const addToSelect = data => {
        const currencyValues = (select) => {
            select.insertAdjacentHTML(
                'beforeend',
                `<option value="${data.USDUSD}">USD</option>
                <option value="${data.USDEUR}">EUR</option>
                <option value="${data.USDRUB}">RUB</option>`
            );
        };
        currencyValues(currency1);
        currencyValues(currency2);
    };

    const doConvert = () => {
        convert.addEventListener('click', () => {
            if (currency1.value !== '') {
                result.value = (inputMoney.value / currency1.value * currency2.value).toFixed(2);
            }
        });
    };

    fetch('http://api.currencylayer.com/live?access_key=c59b3d7c628f1b7b5f3b04ac49453a47&format=1&currencies=USD,EUR,RUB')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data.quotes;
        })
        .then(data => {
            addToSelect(data);
            doConvert();
        });
};

convert();