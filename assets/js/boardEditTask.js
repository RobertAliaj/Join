function renderEditTaskPopUp(i) {
    let editPopUp = document.getElementById('editTask');
    editPopUp.innerHTML = renderEditTaskPopUpHtml(i);
    editTaskCheck = true;
    addOnclickToBg();
    renderEditInitials(i);
}


function renderEditInitials(i) {
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
    if (bubble) {
        for (let j = 0; j < colorAndInitials.length; j++) {
            if (bubble.textContent.includes(colorAndInitials[j].name)) {
                bubble.style.backgroundColor = colorAndInitials[j].color;
                break;
            }
        }
    }
}


function editDetails(i) {
    let task = popUpTasks[i];
    task['title'] = document.getElementById(`inputTitle${i}`).value;
    task['description'] = document.getElementById(`inputDescription${i}`).value;
    task['due_date'] = document.getElementById(`date${i}`).value;
}


function setTodayDate(i) {
    let today = new Date();
    let dateInput = document.getElementById(`date${i}`);
    dateInput.value = today.toISOString().slice(0, 10);
}


function editPriority(i, prio, imgId) {
    clearPriorityDivs();
    setBgColor(prio, imgId);
    setNewPriority(i, prio);
}


function clearPriorityDivs() {
    let allPrioDivs = document.querySelectorAll('.edit-prio-divs .importance');  // hol dir aus dem Div mit class="edit-prio-divs" alle divs mit class="importance"
    allPrioDivs.forEach(div => {                                                 // gehe mit einer "for-Schleife" durch diese Divs, div ist die variable von der zu beabeitenden div
        div.style.backgroundColor = 'initial';                                   // setze background color auf auf den Ursprünglichen Wert zurück
        let img = div.querySelector('img');                                      // Hier wird das erste Element gefunden, das ein Kind von dem aktuellen Element ist und das ein img-Element ist und es in einer Variable namens "img" gespeichert.   
        img.classList.remove('turn-white');                                      // classe wird entfernt
    });
}


function setBgColor(prio, imgId) {
    let prioDiv = document.getElementById(prio);
    let prioImg = document.getElementById(imgId);
    let { color } = setPrioProperties(prio);
    prioDiv.style.backgroundColor = color;
    prioImg.classList.add('turn-white');
}


function setNewPriority(i, prio) {
    popUpTasks[i]['prio'] = prio;                                           // ändere den Wert von prio im JSON zu dem neuen Wert (der div wo man drauf klickt)
}


function openEditDropDown(i) {
    let dropdownMenu = document.getElementById(`dropdownElements${i}`);

    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "flex";
        document.getElementById(`editInits${i}`).classList.add('d-none');
    } else {
        dropdownMenu.style.display = "none";
        document.getElementById(`editInits${i}`).classList.remove('d-none');
    }

    document.getElementById(`editInits${i}`).innerHTML = '';
    renderEditInitials(i)
    renderEditInitialColors(i);
};


function editPopUpContacts(i) {
    existingNames = popUpTasks[i]['assigned_to'];
    let dropdownMenu = document.getElementById(`dropdownElements${i}`);
    dropdownMenu.innerHTML = '';
    for (let c = 0; c < contacts.length; c++) {
        let [oneContact, checkBox] = createContactsAndCheckboxes(i, c);
        oneContact.appendChild(checkBox);
        dropdownMenu.appendChild(oneContact);
    }
}


function createContactsAndCheckboxes(i, c) {
    let fullName = contacts[c]['firstname'] + ' ' + contacts[c]['lastname'];

    let oneContact = createContact(fullName, i, c);
    let checkBox = createCheckBox(fullName, i, c);
    addClickEvent(oneContact, checkBox, fullName, i);

    return [oneContact, checkBox];
}


function createContact(fullName, i, c) {
    let oneContact = document.createElement('div');
    oneContact.className = 'editContacts';
    oneContact.id = `newName${i}-${c}`;
    oneContact.innerHTML = fullName;
    return oneContact;
}


function createCheckBox(fullName, i, c) {
    let checkBox = document.createElement('div');
    checkBox.className = 'check-box';
    checkBox.id = `checkBox${i}-${c}`;

    if (existingNames.includes(fullName)) {
        checkBox.innerHTML = `<img src="assets/img/check.png">`;
    }
    return checkBox;
}


function addClickEvent(oneContact, checkBox, fullName, i) {
    oneContact.addEventListener('click', function () {
        if (existingNames.includes(fullName)) {
            existingNames.splice(existingNames.indexOf(fullName), 1); // Entferne den Namen aus existingNames
            checkBox.innerHTML = '';
        } else {
            existingNames.push(fullName); // Füge den Namen zu existingNames hinzu
            checkBox.innerHTML = `<img src="assets/img/check.png">`;
        }
    });
}


async function renderEditedDetails(i) {
    proofInput();
    editDetails(i);

    await saveJSONToServer();
    chooseArrayToRender();
}


function chooseArrayToRender() {
    let search = document.getElementById('searchInput').value;
    search.length > 0 ? renderSearchedTask() : renderTasks();
}


function addOnclickToBg() {
    if (editTaskCheck == true) {
        document.getElementById('card').removeEventListener("click", removeBoardPopUp);
    } else {
        document.getElementById('card').addEventListener("click", removeBoardPopUp);
    }
}