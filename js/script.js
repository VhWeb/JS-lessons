//чтобы вопросы не выводились просто так пишем для этого функцию

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
    //проверка данных на число, пустую строку, или ничего введенных в поле
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

function chooseExpences() {
    for (let i = 0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
            b = prompt("Во сколько обойдется?", "");
        //проверка данных на строку и на то что в полях ничего не будет, и на то что в полях не будет пустых строк, и на количество символов введенных данных
        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
        } else {
            // повторяет цикл если неправильно введены данные
            i = i - 1;
        }
    }
}
chooseExpences();
// let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
//     b = prompt("Во сколько обойдется?", "");
// do {
//     console.log("done");
//     appData.expenses[a] = b;
// } while ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50);

function detectDayBudget() {
    appData.moneyPerDay = Math.round(appData.budget / 30);
    alert("Ежедневный бюджет: " + appData.moneyPerDay);
}

detectDayBudget();

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log("Малый уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Произошла ошибка");
    }
}
detectLevel();

//функция высчитывает накопления с депозита если он есть
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");

        appData.monthIncome = save / 100 / 12 * percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
}

checkSavings();

function chooseOptExpenses() {
    for (let i = 1; i < 4; i++) {
        let qr = prompt("Статья необязательных расходов?");
        if ((typeof (qr)) === 'string' && (typeof (qr)) != null && qr != '' && qr.length < 50) {
            appData.optionalExpenses[i] = qr;
        } else {
            // повторяет цикл если неправильно введены данные
            i = i - 1;
        }
    }
}
chooseOptExpenses()
console.log(appData);