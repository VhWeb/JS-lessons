let menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu-item");
menu.insertBefore(menuItem[1], menuItem[3]);
let menuItemFive = document.createElement("li");
menuItemFive.textContent = "Пятый пункт";
menuItemFive.classList.add("menu-item");
menu.appendChild(menuItemFive);

document.body.style.background = 'url(./img/apple_true.jpg) center no-repeat';

let title = document.querySelector("#title");
title.textContent = "Мы продаем только подлинную технику Apple";

let column = document.querySelectorAll(".column");
let adv = document.querySelector(".adv");

column[1].removeChild(adv);

let ans = document.querySelector('#prompt');

let quest = prompt("Как вы относитесь к технике Apple?");

ans.textContent = quest;
