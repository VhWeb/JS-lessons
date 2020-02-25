let money = +prompt("Ваш бюджет на месяц?", ""),
    time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

for (let i = 0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
        b = prompt("Во сколько обойдется?", "");
    if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
        console.log("done");
        appData.expenses[a] = b;
    } else {
        i = i - 1; 
    }
}

// let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
//     b = prompt("Во сколько обойдется?", "");
// do {
//     console.log("done");
//     appData.expenses[a] = b;
// } while ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50);

appData.moneyPerDay = Math.round(appData.budget/30);

alert("Ежедневный бюджет: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
    console.log("Малый уровень достатка");
} else if ( appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ) {
    console.log("Средний уровень достатка");
} else if ( appData.moneyPerDay > 2000 ) {
    console.log("Высокий уровень достатка");
} else {
    console.log("Произошла ошибка");
}