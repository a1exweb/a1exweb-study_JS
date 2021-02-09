'use strict';

const calcButton = document.getElementById('start'),
    plus1 = document.getElementsByTagName('button')[0],
    plus2 = document.getElementsByTagName('button')[1],
    checkboxDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('result-total')[0],
    budgetDay = document.getElementsByClassName('result-total')[1],
    expensesMonth = document.getElementsByClassName('result-total')[2],
    additionalIncome = document.getElementsByClassName('result-total')[3],
    additionalExpenses = document.getElementsByClassName('result-total')[4],
    incomePeriod = document.getElementsByClassName('result-total')[5],
    targetMonth = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');


const isNumber = function (n) {
    return !isNaN(parseFloat(n) && isFinite(n));
};

const isString = function (str) {
    if (!parseFloat(str) && str !== null && str.trim() !== '') {
        return true;
    } else {
        return false;
    }
};

let money;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?', 100000);
    } while (!isNumber(money));
}();

const appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (!isString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncome));

            this.income[itemIncome] = cashIncome;
        }

        let expenses = [],
            value,
            sum;
            
            do {
                this.addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую', 'Интернет, такси, коммунальные расходы');
            } while (!isString(this.addExpenses));

            this.addExpenses = this.addExpenses.toLowerCase().split(',');
            this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            do {
                expenses[i] = prompt('Введите обязательную статью расходов?');
            } while (!isString(expenses[i]));

            do {
                value = prompt('Во сколько это обойдется?');
            } while (!isNumber(value));    
            this.expenses[sum] = +value;
        }
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getBudget: function() {
		this.budgetMonth = money - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},
    getTargetMonth: function() {
        let result = Math.ceil(this.mission / this.budgetMonth);
        if (result > 0) {
            return `Цель будет достигнута за: ${result} месяцев`;
        } else {
            return 'Цель не будет достигнута';
        }
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) return 'У вас высокий уровень дохода';
        else if (this.budgetDay >= 600 && this.budgetDay < 1200) return 'У вас средний уровень дохода';
        else if (this.budgetDay < 600 && this.budgetDay >= 0) return 'К сожалению у вас уровень дохода ниже среднего';
        else if (this.budgetDay < 0) return 'Что то пошло не так';
    },
    getInfoDeposit: function() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * this.period;
    },
    getExpenses: function() {
        this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.trim().slice(1));

        console.log(this.addExpenses.join(', '));
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.getExpenses();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
	let arr = key + ': ' + appData[key];
    console.log(arr.split(',').join(', '));
}