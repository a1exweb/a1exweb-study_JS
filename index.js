'use strict';

const start = document.getElementById('start'),
    reset = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
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

    isNumber(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }

    isText(e) {
        e.target.value = e.target.value.replace(/[^а-яА-Я ,]/g, '');
    }

    getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURI(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {

		options = {
			path: '/',
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURI(name) + "=" + encodeURI(value);

		for (const optionKey in options) {
			updatedCookie += "; " + optionKey;
			const optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}

		document.cookie = updatedCookie;
		localStorage.setItem(name, value);
	}

    deleteCookie(name) {
		const cookieDate = new Date();
		cookieDate.setTime(cookieDate.getTime() - 1);
		document.cookie = name += "=; expires=" + cookieDate.toGMTString();
	}

    cookiesNames() {
		const cookiesNames = document.cookie.split("; ").map(item => {
			const to = item.search('=');
			const newstr = item.substring(0, to);
			return newstr;
		});
		return cookiesNames;
	}

    showLocalResult() {

		const localNames = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			localNames.push(key);
		}
		console.log(this.cookiesNames());
		localNames.forEach(item => {
			console.log(item);
			if (!this.cookiesNames().includes(item) && this.cookiesNames().length >= 1) {
				this.cookiesNames().forEach(item => {
					this.deleteCookie(item);
				});
				localStorage.clear();
			}
		});

		if (localStorage.length !== 0) {
			textInputs.forEach(item => {
				item.setAttribute("disabled", "true");
			});
			start.style.display = 'none';
			reset.style.display = 'block';
			incomePlus.setAttribute("disabled", "true");
			expensesPlus.setAttribute("disabled", "true");
			depositCheck.setAttribute("disabled", "true");
			depositBank.setAttribute("disabled", "true");
		}

		budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
		budgetDayValue.value = localStorage.getItem('budgetDayValue');
		expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
		additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
		additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
		targetMonthValue.value = localStorage.getItem('targetMonthValue');
		incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
	}

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
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
        depositCheck.setAttribute('disabled', 'true');
        depositBank.setAttribute('disabled', 'true');

        this.setCookie('budgetMonthValue', budgetMonthValue.value);
		this.setCookie('budgetDayValue', budgetDayValue.value);
		this.setCookie('expensesMonthValue', expensesMonthValue.value);
		this.setCookie('additionalIncomeValue', additionalIncomeValue.value);
		this.setCookie('additionalExpensesValue', additionalExpensesValue.value);
		this.setCookie('incomePeriodValue', incomePeriodValue.value);
		this.setCookie('targetMonthValue', targetMonthValue.value);
		this.setCookie('isLoad', true);
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
        depositCheck.removeAttribute('disabled');
		depositBank.removeAttribute('disabled');
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

        depositCheck.checked = false;
        this.depositHandler();
        this.cookiesNames().forEach(item => {
			this.deleteCookie(item);
		});
		localStorage.clear();
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

    addExpIncBlock(button) {
        const startStr = button.closest('div').className;
        let items = document.querySelectorAll(`.${startStr}-items`);
        const cloneItem = items[0].cloneNode(true);
        cloneItem.querySelector(`.${startStr}-title`).value = '';
        cloneItem.querySelector(`.${startStr}-amount`).value = '';
        button.before(cloneItem);
        items = document.querySelectorAll(`.${startStr}-items`);
        this.validation();
        if (items.length === 3) {
            button.style.display = 'none';
        }
    }

    getExpInc() {
        incomeItems = document.querySelectorAll('.income-items');
		expensesItems = document.querySelectorAll('.expenses-items');

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    
            this.validation();
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

            expensesItems.forEach(count);
            incomeItems.forEach(count);
    }

    getAddExpInc() {
        const addExpensesItems = additionalExpensesItem.value.split(',');
		const addIncomeItems = [];

        additionalIncomeItems.forEach((item) => {
            addIncomeItems.push(item.value);
        });

        const count = (item, index, arr) => {
            item.trim();
            if (item !== '') {
                if (arr === addExpensesItems) {
                    this.addExpenses.push(item);
                } else if (arr === addIncomeItems) {
                    this.addIncome.push(item);
                }
            }
        };
        addExpensesItems.forEach(count);
        addIncomeItems.forEach(count);
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.removeAttribute('disabled');
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    checkPercent() {
        if (depositPercent.value > 100 || depositPercent.value < 1) {
            alert('Веденное число должно быть от 1 до 100');
            depositPercent.value = '';
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            this.validation();
            depositBank.addEventListener('change', this.changePercent);
            depositPercent.addEventListener('input', this.isNumber);
            depositPercent.addEventListener('input', this.checkPercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
            depositPercent.removeEventListener('input', this.isNumber);
            depositPercent.removeEventListener('input', this.checkPercent);
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
            item.addEventListener('input', this.isNumber);
        });
        textPlaceholders.forEach((item) => {
            item.addEventListener('input', this.isText);
        });
        namePlaceholder.forEach((item) => {
            item.addEventListener('input', this.isText);
        });
    }

    eventListeners() {
        const _this = this;
        _this.validation();
        _this.showLocalResult();
        depositCheck.addEventListener('change', _this.depositHandler.bind(_this));

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
        
        expensesPlus.addEventListener('click', () => {
            this.addExpIncBlock(expensesPlus);
        });
        incomePlus.addEventListener('click', () => {
            this.addExpIncBlock(incomePlus);
        });
        
        for (let key in _this) {
            const arr = key + ': ' + _this[key];
            console.log(arr.split(',').join(', '));
        }
    }
}


const appData = new AppData();
appData.eventListeners();