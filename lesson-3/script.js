let money = prompt('Ваш месячный доход?'),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за расчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдётся?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдётся?'),
    budgetMonth = money - (amount1 + amount2),
    mission = 1000000000,
    period = 12,
    budgetDay = Math.floor( budgetMonth / 30);


addExpenses = addExpenses.toLowerCase().split(', ');

if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
else if (budgetDay >= 600 && budgetDay < 1200) console.log('У вас срдний уровень дохода');
else if (budgetDay < 600 && budgetDay >= 0) console.log('К сожалению у вас уровень дохода ниже среднего');
else if (budgetDay < 0) console.log('Что то пошло не так');

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(addExpenses);
console.log(budgetDay);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(`Бюджет на месяц ${budgetMonth}`);
console.log(`За сколько месяцев будет достигнута цель ${mission} — за ${Math.ceil(mission / budgetMonth)} месяцев`);