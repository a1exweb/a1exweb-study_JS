'use strict';

let start = document.getElementById('start'),
    reset = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkboxDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total')[0],
    budgetDayValue = document.getElementsByClassName('result-total')[1],
    expensesMonthValue = document.getElementsByClassName('result-total')[2],
    additionalIncomeValue = document.getElementsByClassName('result-total')[3],
    additionalExpensesValue = document.getElementsByClassName('result-total')[4],
    incomePeriodValue = document.getElementsByClassName('result-total')[5],
    targetMonthValue = document.getElementsByClassName('result-total')[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
	periodАmount = document.querySelector('.period-amount'),
    textInputs = document.querySelectorAll('[type="text"]');


const isNumber = function(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
};

const isText = function(event) {
	event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
};

const appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        textInputs = document.querySelectorAll('[type="text"]');
        textInputs.forEach(function (item) {
            item.setAttribute('disabled', 'true');
        });
        start.style.display = 'none';
        reset.style.display = 'block';
        incomePlus.setAttribute('disabled', 'true');
        expensesPlus.setAttribute('disabled', 'true');
        periodSelect.setAttribute('disabled', 'true');
    },
    reset: function () {

        textInputs.forEach(function (item) {
            item.removeAttribute('disabled');
            item.value = '';
        });
        start.style.display = 'block';
        reset.style.display = 'none';
        incomePlus.removeAttribute('disabled');
        expensesPlus.removeAttribute('disabled');
        periodSelect.removeAttribute('disabled');
        periodSelect.value = 1;
        periodАmount.textContent = periodSelect.value;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;

        incomeItems.forEach(function (item) {
			incomeItems = document.querySelectorAll('.income-items');
			if (incomeItems.length > 1) {
				item.remove();
			} else if (incomeItems.length < 3) {
				incomePlus.style.display = 'block';
			}

		});
		expensesItems.forEach(function (item) {
			expensesItems = document.querySelectorAll('.expenses-items');
			if (expensesItems.length > 1) {
				item.remove();
			} else if (expensesItems.length < 3) {
				expensesPlus.style.display = 'block';
			}
		});
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        appData.validation();
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomePlus.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        appData.validation();
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItems.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncomeMonth: function () {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getBudget: function() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},
    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
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
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    getExpensesSplit: function() {
        this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.trim().slice(1));

        console.log(this.addExpenses.join(', '));
    },
    validation: function () {
        let sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]'),
            textPlaceholders = document.querySelectorAll('[placeholder="Наименование"]'),
            namePlaceholder = document.querySelectorAll('[placeholder="название"]');
        sumPlaceholders.forEach((item) => {
            item.addEventListener('input', isNumber);
        });
        textPlaceholders.forEach((item) => {
			item.addEventListener('input', isText);
		});
		namePlaceholder.forEach((item) => {
			item.addEventListener('input', isText);
		});
    }
};

appData.validation();

periodSelect.addEventListener('input', function() {
	periodАmount.textContent = periodSelect.value;
});

start.addEventListener('click', function() {
    if (salaryAmount.value === '') {
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
    } else {
        appData.start();
    }
});

reset.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

for (let key in appData) {
	let arr = key + ': ' + appData[key];
    console.log(arr.split(',').join(', '));
}