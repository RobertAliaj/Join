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
            "color": ''
        };
        contacts.push(contact);
        console.log(contacts);
    } if (WordCount(name) === 2) {
        let contact = {
            "firstname": name.value.split(' ')[0],
            "lastname": name.value.split(' ')[1],
            "email": mail.value,
            "phone": phone.value,
            "color": ''
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
    displayContacts();
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
        let str = contacts[j]['firstname'].toLowerCase();
        if (!letters.includes(str.charAt(0))) {
            letters.push(str.charAt(0));
        }
    }

    for (i = 0; i < letters.length; i++) {
        document.getElementById('contacts').innerHTML += createLetterHtml(i);
    }
}

function createLetterHtml(i) {
    return /*html*/`
        <div class="letter" onclick="searchLetter(${i})">${letters[i].toUpperCase()}</div>
        <div class="letter-block" id="${letters[i]}">
        </div>
    `;
}

function displayContacts() {
    for (j = 0; j < contacts.length; j++) {
        let id = contacts[j]['firstname'].charAt(0).toLowerCase();
        document.getElementById(id).innerHTML += contactHtml(j);
        setRandomColor(j);
    }
}

function contactHtml(j) {
    return /*html*/ `
        <div class="single-contact" tabindex="1">
            <div class="name-tag" id="${j}">
                ${contacts[j]['firstname'].charAt(0).toUpperCase()}${contacts[j]['lastname'].charAt(0).toUpperCase()}
            </div>
            <div>
                <span>${contacts[j]['firstname']} ${contacts[j]['lastname']}</span>
                <span>${contacts[j]['email']}</span>
            </div>
        </div>
    `;
}

function generateRandomColor() {
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function setRandomColor(j) {
    if (! contacts[j]['color'] == '') {
        document.getElementById(`${j}`).style.backgroundColor = contacts[j]['color'];
    } else {
        contacts[j]['color'] = generateRandomColor();
        document.getElementById(`${j}`).style.backgroundColor = contacts[j]['color'];
    }
}