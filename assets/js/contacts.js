let contacts = [];
let letters = [];

setURL(`https://gruppe-join-421.developerakademie.net/smallest_backend_ever`);

async function init() {
    await downloadFromServer();
    contacts = jsonFromServer['contacts'];
    console.log(contacts)
    showContacts()
}

// async function deleteUser() {
//     await backend.deleteItem('contacts');
// }

async function refreshContacts() {
    jsonFromServer['contacts'] = contacts;
    await saveJSONToServer()
}

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
    } if (WordCount(name) === 2) {
        let contact = {
            "firstname": name.value.split(' ')[0],
            "lastname": name.value.split(' ')[1],
            "email": mail.value,
            "phone": phone.value,
            "color": ''
        };

        contacts.push(contact);
    }

    closeNewContact();
}

function WordCount(str) {
    let arr = str.value.split(' ');
    return arr.filter(word => word !== '').length;
}

function openCreateContact() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('newContactContainer').classList.remove('d-none');
    fadeIn();
    slideIn('newContactContainer');
}

function closeNewContact() {
    slideOut('newContactContainer');
    fadeOut();
    setTimeout(function () {
        document.getElementById('overlay').classList.add('d-none');
        document.getElementById('newContactContainer').classList.add('d-none')

    }, 400)
    showContacts()
}

function showContacts() {
    createLetters();
    displayContacts();
}

function fadeIn() {
    document.getElementById('overlay').classList.remove('fade-out');
    document.getElementById('overlay').classList.add('fade-in');
}

function slideIn(container) {
    if (container === 'newContactContainer') {
        document.getElementById('newContactContainer').classList.remove('slide-out');
        document.getElementById('newContactContainer').classList.add('slide-in');
    } else {
        document.getElementById('editContactContainer').classList.remove('slide-out');
        document.getElementById('editContactContainer').classList.add('slide-in');
    }

}

function fadeOut() {
    document.getElementById('overlay').classList.remove('fade-in');
    document.getElementById('overlay').classList.add('fade-out');
}

function slideOut(container) {
    if (container === 'newContactContainer') {
        document.getElementById('newContactContainer').classList.remove('slide-in');
        document.getElementById('newContactContainer').classList.add('slide-out');
    } else {
        document.getElementById('editContactContainer').classList.remove('slide-in');
        document.getElementById('editContactContainer').classList.add('slide-out');
    }

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

function displayContacts() {
    for (j = 0; j < contacts.length; j++) {
        let id = contacts[j]['firstname'].charAt(0).toLowerCase();
        document.getElementById(id).innerHTML += contactHtml(j);
        setRandomColor(j);
    }
}

// function generateRandomColor() {
//     var randomColor = Math.floor(Math.random()*16777215).toString(16);
//         return randomColor;
// }

function setRandomColor(j) {
    if (!contacts[j]['color'] == '') {
        document.getElementById(`${j}`).style.backgroundColor = contacts[j]['color'];
    } else {
        contacts[j]['color'] = generateRandomColor();
        document.getElementById(`${j}`).style.backgroundColor = contacts[j]['color'];
    }
    refreshContacts();
}

function generateRandomColor() {
    let color = '#'+ Math.floor(Math.random()*16777215).toString(16);
    // for (let i = 0; i < 3; i++)
    //     color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    return color;
}

function openSpecificContact(idx) {
    document.getElementById('specificContact').innerHTML = specificContactHtml(idx);
    document.getElementById(`specific${idx}`).style.backgroundColor = contacts[idx]['color'];
}

function editContact(idx) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('editContactContainer').classList.remove('d-none');
    fadeIn();
    slideIn('editContactContainer');
    showEditContactContainer(idx)
}

function showEditContactContainer(idx) {
    document.getElementById('editContactContainer').innerHTML = editContactHtml(idx)
}

function closeEditContact() {
    slideOut('editContactContainer');
    fadeOut();
    setTimeout(function () {
        document.getElementById('overlay').classList.add('d-none');
        document.getElementById('editContactContainer').classList.add('d-none')

    }, 400)
    showContacts()
}

function deleteContact(idx) {
    contacts.splice(idx, 1)
    refreshContacts();
    closeEditContact();
    document.getElementById('specificContact').innerHTML = '';
}

function changeContact(idx) {
    let firstname = document.getElementById('contactFirstname').value;
    let lastname = document.getElementById('contactLastname').value;
    let email = document.getElementById('contactEmail').value;
    let phone = document.getElementById('contactPhone').value;

    contacts[idx]['firstname'] = firstname;
    contacts[idx]['lastname'] = lastname;
    contacts[idx]['email'] = email;
    contacts[idx]['phone'] = phone;

    refreshContacts();
    closeEditContact();
    openSpecificContact(idx)
}




/**************************** */
/************ HTML ************/
/**************************** */





function createLetterHtml(i) {
    return /*html*/`
        <div class="letter" onclick="searchLetter(${i})">${letters[i].toUpperCase()}</div>
        <div class="letter-block" id="${letters[i]}">
        </div>
    `;
}

function contactHtml(j) {
    return /*html*/ `
        <div class="single-contact" tabindex="1" onclick="openSpecificContact(${j})">
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

function specificContactHtml(idx) {
    return /*html*/ `
        <div class="specific-contact">
            <div class="specific-single-contact">
                <div class="name-tag bigger" id="specific${idx}">
                    ${contacts[idx]['firstname'].charAt(0).toUpperCase()}${contacts[idx]['lastname'].charAt(0).toUpperCase()}
                </div>
                <div>
                    <span class="name">${contacts[idx]['firstname']} ${contacts[idx]['lastname']}</span>
                    <span class="add-task">+ Add Task</span>
                </div>
            </div>
            <div class="contact-information">
                <div>
                    <span>Contact Information</span>
                    <span onclick="editContact(${idx})">Edit Contact</span>
                </div>
                <div>
                    <b>Email</b>
                    <span class="mail">${contacts[idx]['email']}</span>
                    <b>Phone</b>
                    <span>${contacts[idx]['phone']}</span>
                </div>
            </div>
        </div>
    `;
}

function editContactHtml(idx) {
    return /*html*/ `
        <img onclick="closeEditContact()" class="close" src="assets/img/Clear_task.png" alt="">
        <div class="name-section">
            <b class="big-name">ALINA WETTER</b>
            <div class="horizontal-blue-line" style="width: 100%;"></div>
        </div>
        <div class="input-fields">
            <input id="contactFirstname" type="text" value="${contacts[idx]['firstname']}">
            <input id="contactLastname" type="text" value="${contacts[idx]['lastname']}">
            <input id="contactEmail" type="email" value="${contacts[idx]['email']}">
            <input id="contactPhone" type="tel" value="${contacts[idx]['phone']}">
        </div>
        <div class="submit-section" style="justify-content: center;">
            <div onclick="closeEditContact()">Cancle <img src="assets/img/Clear_task.png" alt="">
            </div>
            <div onclick="changeContact(${idx})" type="submit">Submit change<img
                    src="assets/img/create_task.png" alt="">
            </div>
        </div>
        <div class="delete-button" onclick="deleteContact(${idx})" type="submit">Delete contact
        </div>
    `;
}