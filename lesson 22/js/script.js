window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Рабочие Табы
    //получаем кнопки таба, родительского элемента кнопок, и контент табов
    let tab = document.querySelectorAll('.info-header-tab'), info = document.querySelector('.info-header'), tabContent = document.querySelectorAll('.info-tabcontent');
    //пишем функцию которая будет скрывать наши табы которая будет принимать один технический аргумент
    function hideTabConent(a) {
        //где a -это индекс псевдомассива с блоком контента
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabConent(1);
    //пишем функцию которая будет показывать определенный табКонтент
    function showTabContent(b) {
        //где b - это параметр кторый должен показывать какой контент нам нужен
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    //используя делегирование на родительском элементе для кнопок назначаем обработчик события на каждую из кнопок
    info.addEventListener('click', function(event){
        //мы прописали в аргументах event затем чтобы потом сравнивать цели на кликах
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                //здесь мы проверяем является ли цель определенным табом, и если является то прячем лишние контенты и показываем нужный
                if(target == tab[i]) {
                    hideTabConent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    //Таймер
    //задаем дедлайн
    let deadline = '2020-04-01';
    //узнаем разницу между сегодняшней даты и дедлайном
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000)%60),
            minutes = Math.floor((t/1000/60)%60),
            hours = Math.floor((t/(1000*60*60)));
        return {
            'total':t,
            'hours':hours,
            'minutes':minutes,
            'seconds':seconds
        };
    }
    //превращаем статичную верстку в динамичную
    //создаем функцию которая будет принимать 2 параметра (где мы его устанавливаем, и дедлайн)
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        //прописываем интервал с которым будет обновлятся наш таймер
        //прописываем функцию которая будет обновлять наш таймер
        function updateClock() {
            //получаем нашу функцию путем создания переменной
            let t = getTimeRemaining(endtime);
            //t вернет нам объект поэтому мы пишем следующее
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.hours < 10) hours.textContent = "0" + t.hours;
            if (t.minutes < 10) minutes.textContent = "0" + t.minutes;
            if (t.seconds < 10) seconds.textContent = "0" + t.seconds;
            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }
    //данная функция уникальна поскольку позволяет создать таймер в любом месте в верстке
    setClock('timer', deadline);

    //Модальное окно
    //получаем наши элементы (кнопку, модалку, крестик(закрыть модалку))
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descr = document.querySelectorAll('.description');
    function openPopup() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    //прописываем функцию открывающую модалку и добавляющую анимацию и запрещаем листать страницу
    for(let d = 0; d < descr.length; d++){
        descr[d].addEventListener('click', function(event){
            let target = event.target;
            if(target && target.classList.contains('description-btn')) {
                openPopup();
            }
        });
    }
    more.addEventListener('click', openPopup, function() {
        this.classList.add('more-splash');
    });
    //прописываем функцию закрывающую модалку и убирающую анимацию с кнопки
    close.addEventListener('click',function() {
        overlay.style.display = 'none';
        more.classList.remove('.more-splash');
        document.body.style.overflow = '';
    });
    //Отправка формы
    //Создаем объект с сообщениями состояния нашего запроса
    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Мы скоро с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };
    //Получаем форму и ее элементы, и создаем новый блок с ответом пользователю
    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    // отправка формы спомощью промиса сперва создаем функцию принимающую сам элемент как аргумент
    function sendForm(elem){
        //вешаем на элемент обработчик событий
        elem.addEventListener('submit', function(e) {
            //отменяем перезагрузку страницы
            event.preventDefault();
            //добавляем в форм блок
            elem.appendChild(statusMessage);
            //получаем данные которые ввел пользователь используя встроенный объект в котором лежат данные которые ввел пользователь
            let formData = new FormData(elem);
            //создаем функцию в которую будем ложить наш промис используя как аргумент данные которые ввел пользователь
            function postData(data){
                //сразу возвращаем наш промис
                return new Promise(function(resolve, reject){
                    //скрипт отправки данных на сервер создавая новый объект
                    let request = new XMLHttpRequest();
                    //настраиваем наш запрос
                    request.open('POST', 'server.php');//POST - т.к. мы отпраавляем наши данные на наш файл сервера
                    request.setRequestHeader('Content-Type', 'application/json', 'charset=utf-8');
                    //пишем событие добавляющее сообщение на страницу используя отслеживание изменения состояния страницы(readyState)
                    request.onreadystatechange = function () {
                        if(request.readyState < 4) {
                            //вызываем функцию если событие происходит
                            resolve()
                        } else if (request.readyState === 4 || request.status == 200) {
                            //вызываем функцию если событие произошло
                            resolve()
                        } else {
                            //вызываем функцию если событие не произошло или произошла ошибка
                            reject()
                        }
                    }
                    //отправляем наш запрос(данные пользователя) на сервер
                    request.send(data);
                })
            }
            //функция очистки нашего инпута после отправки запроса
            function clearInput() {
                for(let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            //вызываем функцию с промисом добавляя в аргументы данные пользователя
            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=>{
                    statusMessage.innerHTML = message.success;
                })
                .catch(()=>{statusMessage.innerHTML = message.failure})
                .then(clearInput)
        });
    }
    //вызываем функции
    sendForm(form);
    sendForm(contactForm);

    //Слайдер
    //получаем блокти для переменные на странице
    //переменная slideIndex отвечает за тот слайд который показывается в текущий момент
    //это параметр текущего слайда
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    //функция показа слайдера принимает 1 аргумент
    //вызываем нашу функцию т.к. у нас Function Declaration
    showSlides(slideIndex);
    //это сделано для того чтобы в будущем когда мы вызываем эту функцию она бы переключала нам эти слайды
    function showSlides (n) {
        //пишем проверку чтобы если были показаны все наши слайды произошла перемотка к самому первому слайду
        if (n > slides.length) {
            slideIndex = 1;
        }
        //пишем проверку чтобы если были показаны все наши слайды(в обратном порядке) произошла перемотка к самому последнему слайду
        if (n < 1) {
            slideIndex = slides.length
        }
        //скрываем все наши слайды перебирая через цикл
        slides.forEach((item) => item.style.display = 'none');
        //убираем класс активной точки по слайду
        dots.forEach((item) => item.classList.remove('dot-active'));
        //показываем только первый слайд при этом конвертируя нумерацию псевдомассива
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }
    //пишем функцию которая будет увеличивать порядковый номер наших слайдов
    //здесь мы сразу же вызываем функцию показа слайдов
    function plusSlides(n){
        showSlides(slideIndex += n);
    }
    //пишем функцию которая будет определять текущий слайд и устанавливать его
    function currentSlide(n){
        showSlides(slideIndex = n);
    }
    //вешаем обработчики события перемотки слайдера назад и вперед  на стрелки
    prev.addEventListener('click', function(){
        //здесь мы можем реализовать на сколько слайдов будут происходить перемотка
        plusSlides(-1);
    });
    next.addEventListener('click', function(){
        plusSlides(1);
    });
    //используя делегирование делаем наши точки кликабельными чтобы при нажатии была перемотка на соответсвующий слайд
    //даже если будут новые слайды то обработчки будут на всех точках
    //вешаем обработчик на блок с точками
    dotsWrap.addEventListener('click', function(e){
        //перебираем наши точки с помощью цикла
        //чтобы наш слайдер взаимодействовал с элементами а не со стилями
        //цикл закончится тогда когда наши точки закончатся +1
        for(let i = 0; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
        //цикл выше будет сравнивать нажатую точку с показанным слайдом
    });


    //Калькулятор
    //получаем наши инпуты и задаем их стартовые значения
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;
    //вешаем обработчик событий на инпут с количеством людей
    persons.addEventListener('change', function() {
        //к этой переменной мы будем добавлять то что пользователь ввел в поле persons
        personsSum = +this.value;
        //пишем функцию расчета стоимости общей поездки за определенное количество дней и людей
        //обычно такую формулу предоставляет заказчик
        total = (daysSum + personsSum)*4000;
        //если второе поле у нас пустует то мы пишем следующее условие
        if(restDays == ''){
            totalValue.innerHTML = 0;
        } else {
            //если второе поле у нас не пустует то мы пишем следующее условие
            totalValue.innerHTML = total;
        }
    });
    //вешаем обработчик событий на инпут с количеством дней
    restDays.addEventListener('change', function() {
        //к этой переменной мы будем добавлять то что пользователь ввел в поле persons
        daysSum = +this.value;
        //пишем функцию расчета стоимости общей поездки за определенное количество дней и людей
        //обычно такую формулу предоставляет заказчик
        total = (daysSum + personsSum)*4000;
        //если второе поле у нас пустует то мы пишем следующее условие
        if(persons.value == ''){
            totalValue.innerHTML = 0;
        } else {
            //если второе поле у нас не пустует то мы пишем следующее условие
            totalValue.innerHTML = total;
        }
    });
    //вешаем обработчик событий на список с опциями
    place.addEventListener('change', function(){
        //сперва пишем условие где мы проверяем что если какое-либо поле пустое
        if(restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            //если наши оба поля заполнены, то прописываем следующее условие
            //для того чтобы избежать потери данных в переменной total
            //мы прописываем промежуточную переменную a в которую ложим наш total
            let a = total;
            //здесь мы умножаем нашу общую сумму на выбранную(this.selectedIndex) опцию из списка 
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});