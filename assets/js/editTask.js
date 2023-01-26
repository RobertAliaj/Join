function setTodayDate(i) {
    let today = new Date();
    let dateInput = document.getElementById(`date${i}`);
    dateInput.value = today.toISOString().slice(0, 10);
}


function editTask(i) {
    let editPopUp = document.getElementById('editTask');
    editPopUp.innerHTML = editTaskHtml(i);
    renderEditInits(i);
    renderContactss(i);
}


function renderEditInits(i) {
    let names = popUpTasks[i]['assigned_to'];
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    for (let s = 0; s < initials.length; s++) {
        let inits = initials[s];
        document.getElementById(`editInits${i}`).innerHTML +=
            `<div id="editInits${i}-${s}" class="one-init">${inits}</div>`;
        renderEditInitialColors(i, s);
    }
}


function renderEditInitialColors(i, s) {
    let bubble = document.getElementById(`editInits${i}-${s}`);
    for (let j = 0; j < colorAndInitials.length; j++) {
        if (bubble.textContent.includes(colorAndInitials[j].name)) {
            bubble.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
    }
}


function renderContactss(i) {
    let dropdownMenu = document.getElementById(`dropdownElements${i}`);
    dropdownMenu.innerHTML = '';
    for (let c = 0; c < contacts.length; c++) {
        let oneContact = contacts[c];
        let firstName = oneContact['firstname'] + ' ' + oneContact['lastname'];
        dropdownMenu.innerHTML += `
        <div class="editContacts">
        ${firstName}
        <div class="editCheckBox"></div>
        </div>`;
    }
}


function openEditToDropDown(i) {
    let dropdownMenu = document.getElementById(`dropdownElements${i}`);
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "flex";
        document.getElementById(`editInits${i}`).classList.add('d-none');
    } else {
        dropdownMenu.style.display = "none";
        document.getElementById(`editInits${i}`).classList.remove('d-none');
    }
};

function editPriority(i, prio, imgId) {
    clearPrioDivs();
    setColor(prio, imgId);
    popUpTasks[i]['prio'] = prio;
    editDetails(i);
}


function setColor(prio, imgId) {
    let prioDiv = document.getElementById(prio);
    let prioImg = document.getElementById(imgId);
    let { color } = setPrioProperties(prio);
    prioDiv.style.backgroundColor = color;
    prioImg.classList.add('turn-white');
}


function clearPrioDivs() {
    let allPrioDivs = document.querySelectorAll('.edit-prio-divs .importance');
    allPrioDivs.forEach(div => {
        div.style.backgroundColor = 'initial';
        let img = div.querySelector('img');
        img.classList.remove('turn-white');
    });
}


async function editDetails(i) {
    let task = popUpTasks[i];
    task['title'] = document.getElementById(`inputTitle${i}`).value;
    task['description'] = document.getElementById(`inputDescription${i}`).value;
    task['due_date'] = document.getElementById(`date${i}`).value;
    await saveJSONToServer();
    renderSearchedTask();
}


// function editPriority(i, prio, imgId) {
//     let allPrioDivs = document.querySelectorAll('.edit-prio-divs .importance'); // hol dir aus dem Div mit class="edit-prio-divs" alle divs mit class="importance"
//     allPrioDivs.forEach(div => {                                                // gehe mit einer "for-Schleife" durch diese Divs, div ist die variable von der zu beabeitenden div
//         div.style.backgroundColor = 'initial';                                  // setze background color auf auf den Ursprünglichen Wert zurück
//         let img = div.querySelector('img');                                     // Hier wird das erste Element gefunden, das ein Kind von dem aktuellen Element ist und das ein img-Element ist und es in einer Variable namens "img" gespeichert.
//         img.classList.remove('turn-white');                                     // classe wird entfernt
//     });

//     let prioDiv = document.getElementById(prio);                                // hol dir den div mit id(variable) "prio"
//     let prioImg = document.getElementById(imgId);                               // hol dir das Bild id(variable) "imgId"
//     let { color } = setPrioProperties(prio);                                    // hol dir den BackgroundColor von setPrioProperties Funktion
//     prioDiv.style.backgroundColor = color;                                      // setze die bg color
//     prioImg.classList.add('turn-white');                                        // add classList

//     let task = allTasks[i];
//     task['prio'] = prio;                                                        // ändere den Wert von prio im JSON zu dem neuen Wert (der div wo man drauf klickt)

//     editDetails(i);
// }
