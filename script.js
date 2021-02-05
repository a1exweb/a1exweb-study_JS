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

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
        let expenses = [],
            value,
            sum,
            addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую');

            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?');
            do {
                value = prompt('Во сколько это обойдется?');
            } while (!isNumber(value));    
            appData.expenses[sum] = +value;
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
		appData.budgetMonth = money - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
    getTargetMonth: function() {
        let result = Math.ceil(appData.mission / appData.budgetMonth);
        if (result > 0) {
            return `Цель будет достигнута за: ${result} месяцев`;
        } else {
            return 'Цель не будет достигнута';
        }
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) return 'У вас высокий уровень дохода';
        else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) return 'У вас средний уровень дохода';
        else if (appData.budgetDay < 600 && appData.budgetDay >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
        else if (appData.budgetDay < 0) return 'Что то пошло не так';
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
console.log(appData.getTargetMonth());

for (let key in appData) {
	console.log(key + ': ' + appData[key]);
}