window.addEventListener('DOMContentLoaded', function(){
    'use strict';
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
});