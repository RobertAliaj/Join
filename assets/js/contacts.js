let contacts = [];
let letters = [];

function submitContact() {
    let name = document.getElementById('name');
    let mail = document.getElementById('mail');
    let phone = document.getElementById('phone');

    if (WordCount(name) === 1) {
        let contact = {
            "firstname": name.value,
            "lastname": '',
            "email": mail.value,
            "phone": phone.value,
        };
        contacts.push(contact);
        console.log(contacts);
    } if (WordCount(name) === 2) {
        let contact = {
            "firstname": name.value.split(' ')[0],
            "lastname": name.value.split(' ')[1],
            "email": mail.value,
            "phone": phone.value,
        };
        contacts.push(contact);
        console.log(contacts);
    }

    closeNewContact();

}

function WordCount(str) {
    let arr = str.value.split(' ');
    return arr.filter(word => word !== '').length;
}

function openCreateContact() {
    document.getElementById('overlay').classList.remove('d-none')
    fadeIn();
    slideIn();
}

function closeNewContact() {
    slideOut();
    fadeOut();
    setTimeout(function () {
        document.getElementById('overlay').classList.add('d-none')
    }, 400)
    createLetters();
}

function fadeIn() {
    document.getElementById('overlay').classList.remove('fade-out');
    document.getElementById('overlay').classList.add('fade-in');
}

function slideIn() {
    document.getElementById('newContactContainer').classList.remove('slide-out');
    document.getElementById('newContactContainer').classList.add('slide-in');
}

function fadeOut() {
    document.getElementById('overlay').classList.remove('fade-in');
    document.getElementById('overlay').classList.add('fade-out');
}

function slideOut() {
    document.getElementById('newContactContainer').classList.remove('slide-in');
    document.getElementById('newContactContainer').classList.add('slide-out');
}

function createLetters() {
    document.getElementById('contacts').innerHTML = '';

    for (j = 0; j < contacts.length; j++) {
        let str = contacts[j]['firstname'];
        if (!letters.includes(str.charAt(0))) {
            letters.push(str.charAt(0));
        }
    }

    for(i = 0; i < letters.length; i++) {
        document.getElementById('contacts').innerHTML += createLetterHtml(i);
    }
}

function createLetterHtml(i) {
    return /*html*/`
        <div class="letter" onclick="searchLetter(${i})">${letters[i]}</div>
        <div></div>
    `;
}
