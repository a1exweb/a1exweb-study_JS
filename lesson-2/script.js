let money = 10000000,
    income = 'Фриланс',
    addExpenses = 'Интернет, такси, комуналка',
    deposit = true,
    mission = 1000000000,
    period = 12,
    budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);
console.log(budgetDay);