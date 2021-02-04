'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n) && isFinite(n));
};

let money;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}();

let income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses = [],
    mission = 1000000000,
    period = 12;

const getExpensesMonth = function () {
    let value;
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        do {
            value = prompt('Во сколько это обойдется?');
        } while (!isNumber(value));

        sum += +value;
    }
    return sum;
};

let expensesMonth = getExpensesMonth();

const getAccumulatedMonth = function () {
    return money - expensesMonth;
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
    let result = Math.ceil(mission / accumulatedMonth);
    if (result > 0) {
        return `Цель будет достигнута за: ${result} месяцев`;
    } else {
        return 'Цель не будет достигнута';
    }
};
const showTypeOf = function(data) {
    return typeof data;
};

let budgetDay = Math.floor( accumulatedMonth / 30);

const getStatusIncome = function () {
    if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
    else if (budgetDay >= 600 && budgetDay < 1200) return 'У вас средний уровень дохода';
    else if (budgetDay < 600 && budgetDay >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
    else if (budgetDay < 0) return 'Что то пошло не так';
};


addExpenses = addExpenses.toLowerCase().split(', ');


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(`Расходы за месяц: ${expensesMonth}`);
console.log(`Возможные расходы: ${addExpenses}`);
console.log(getTargetMonth());
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());