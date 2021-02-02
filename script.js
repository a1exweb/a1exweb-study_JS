'use strict';

let money = +prompt('Ваш месячный доход?'),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдётся?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдётся?'),
    mission = 1000000000,
    period = 12;
const getExpensesMonth = function () {
        return amount1 + amount2;
    },
    getAccumulatedMonth = function () {
        return money - getExpensesMonth();
    },
    accumulatedMonth = getAccumulatedMonth(),
    getTargetMonth = function () {
        return Math.ceil(mission / accumulatedMonth);
    },
    showTypeOf = function(data) {
		return typeof data;
    },
    budgetDay = Math.floor( accumulatedMonth / 30),
    getStatusIncome = function () {
        if (budgetDay >= 1200) return 'У вас высокий уровень дохода';
        else if (budgetDay >= 600 && budgetDay < 1200) return 'У вас срдний уровень дохода';
        else if (budgetDay < 600 && budgetDay >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
        else if (budgetDay < 0) return 'Что то пошло не так';
    };


addExpenses = addExpenses.toLowerCase().split(', ');


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log(`Расходы за месяц: ${getExpensesMonth()}`);
console.log(`Возможные расходы: ${addExpenses}`);
console.log(`Цель будет достигнута за: ${getTargetMonth()} месяцев`);
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());