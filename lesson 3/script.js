let age = document.getElementById('age').value;
function showUser(surname, name) {
    alert("Пользователь " + surname + " " + name + ", его возраст " + this);
}
let userInfo = showUser.bind(age);
userInfo('Femov', 'Nigga');
