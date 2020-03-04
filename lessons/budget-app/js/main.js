let startBtn = document.body.querySelector('#start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    
    expensesItems = document.querySelectorAll('.expenses-item'),
    buttons = document.getElementsByTagName('button'),
    approveExpences = buttons[0],
    approveOptionalExpences = buttons[1],
    calculate = buttons[2],
    optionalExpensesInputs = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInput = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('#percent');

for(let i = 0; i < 3; i++) {
    buttons[i].disabled = true;
}
//чтобы вопросы не выводились просто так пишем для этого функцию

let money, time;

startBtn.addEventListener('click', function(e) {
    time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?", "");
    //проверка данных на число, пустую строку, или ничего введенных в поле
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    //передаем введенные данные в объект
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    for(let i = 0; i < 3; i++) {
        buttons[i].disabled = false;
    }
});

approveExpences.addEventListener('click', function() {
    //утвердить сумму всех ценников
    let sum = 0;
    //получаем количество полей из верстки через переменную
    for (let i = 0; i < expensesItems.length; i++) {
        //получить данные из полей через переменную
        let a = expensesItems[i].value,
            b = expensesItems[++i].value;
        //проверка данных на строку и на то что в полях ничего не будет, и на то что в полях не будет пустых строк, и на количество символов введенных данных
        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            // повторяет цикл если неправильно введены данные
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

approveOptionalExpences.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesInputs.length; i++) {
        let qr = optionalExpensesInputs[i].value;
        appData.optionalExpenses[i] = qr;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

calculate.addEventListener('click', function() {
    if(appData.budget != undefined) {
        if (expensesValue.innerHTML != null && expensesValue.innerHTML != '') {
            appData.moneyPerDay = Math.round((appData.budget-expensesValue.innerHTML) / 30);
            dayBudgetValue.textContent = appData.moneyPerDay;
        } else {
            appData.moneyPerDay = Math.round(appData.budget / 30);
            dayBudgetValue.textContent = appData.moneyPerDay;
        }

    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Малый уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});

chooseIncomeInput.addEventListener('input', function() {
    let items = chooseIncomeInput.value;
    //ложим ответ пользователя в массив income предварительно превратив ответ из строки в массив 
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

//два связанных события

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value, percent = +choosePercent.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value, percent = +choosePercent.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
