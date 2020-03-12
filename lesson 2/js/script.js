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
    let ourEvent = addEventListener('submit', function(event) {
        //отменяем перезагрузку страницы
        event.preventDefault();
        //добавляем в форм блок
        form.appendChild(statusMessage);
        //скрипт отправки данных на сервер создавая новый объект
        let request = new XMLHttpRequest();
        //настраиваем наш запрос
        request.open('POST', 'server.php');//POST - т.к. мы отпраавляем наши данные на наш файл сервера
        request.setRequestHeader('Content-Type', 'application/json', 'charset=utf-8');
        //получаем данные которые ввел пользователь используя встроенный объект в котором лежат данные которые ввел пользователь
        let formData = new FormData(form);
        let formDataS = new FormData(contactForm);
        //создаем промежуточный пустой объект
        let obj = {};
        //превращаем объект formData в обычный используя obj
        formData.forEach(function(value, key){
            obj[key] = value;
        });
        formDataS.forEach(function(value, key){
            obj[key] = value;
        });
        //превращаем наш объект obj в json
        let json = JSON.stringify(obj);
        //отправляем наш запрос на сервер
        request.send(json);
        //пишем событие добавляющее сообщение на страницу используя отслеживание изменения состояния страницы(readyState)
        request.addEventListener('readystatechange', function(){
            if(request.readyState === 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 || request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        //очищаем наш инпут после отправки запроса
        for(let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
    form.ourEvent;
    contactForm.ourEvent;
});