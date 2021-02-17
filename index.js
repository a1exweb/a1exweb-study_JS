'use strict';

const start = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
	periodАmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    textInputs = document.querySelectorAll('[type="text"]');


const isNumber = function(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
};

const isText = function(event) {
	event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
};

class AppData {
    constructor () {
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
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        console.log('Hello');
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
    }

    reset() {
        textInputs.forEach(function (item) {
            item.removeAttribute('disabled');
            item.value = '';
        });
        start.style.display = 'block';
        reset.style.display = 'none';
        incomePlus.removeAttribute('disabled');
        expensesPlus.removeAttribute('disabled');
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
    }

    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        this.validation();
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomePlus.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        this.validation();
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            
            const _this = this;
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    
            _this.validation();
            if (itemTitle !== '' && itemAmount !== '') {
                _this[startStr][itemTitle] = +itemAmount;
            }
        };

            expensesItems.forEach(count);
            incomeItems.forEach(count);
    }

    getAddExpenses() {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
        additionalIncomeItems.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        const _this = this;
        for (let key in this.expenses) {
            _this.expensesMonth += _this.expenses[key];
        }
    }

    getIncomeMonth() {
        const _this = this;
        for (let key in this.income) {
            _this.incomeMonth += _this.income[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) { return 'У вас высокий уровень дохода'; }
        else if (this.budgetDay >= 600 && this.budgetDay < 1200) { 
            return 'У вас средний уровень дохода'; 
        }
        else if (this.budgetDay < 600 && this.budgetDay >= 0) { 
            return 'К сожалению у вас уровень дохода ниже среднего'; 
        }
        else if (this.budgetDay < 0) { return 'Что то пошло не так'; }
    }

    getInfoDeposit() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    getExpensesSplit() {
        this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.trim().slice(1));

        console.log(this.addExpenses.join(', '));
    }

    validation() {
        const sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]'),
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

    eventListeners() {
        const _this = this;
        periodSelect.addEventListener('input', function() {
            periodАmount.textContent = periodSelect.value;
        });
        
        start.addEventListener('click', function() {
            if (salaryAmount.value === '') {
                alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            } else {
                _this.start();
            }
        });
        
        reset.addEventListener('click', _this.reset.bind(_this));
        
        expensesPlus.addEventListener('click', _this.addExpensesBlock.bind(_this));
        incomePlus.addEventListener('click', _this.addIncomeBlock.bind(_this));
        
        for (let key in _this) {
            const arr = key + ': ' + _this[key];
            console.log(arr.split(',').join(', '));
        }
    }
}


const appData = new AppData();

console.log(appData);



appData.validation();
appData.eventListeners();


