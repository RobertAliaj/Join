/**
 * This function is used to show the Edit-Popup (first 2 functions are only for the deign).
 */
function showEditPopUp(i) {
    turnToTrue();
    addOnclickToBg();

    renderEditTaskPopUp(i);
    renderEditInitials(i);
}


/**
 * This function is used to render the Edit-PopUp.
 */
function renderEditTaskPopUp(i) {
    let editPopUp = document.getElementById('editTask');
    editPopUp.innerHTML = renderEditTaskPopUpHtml(i);
}


/**
 * This functions is used to render the initials on the Edit-Popup.
 */
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


/**
 * This function is used to give the Initials on the Edit-Popup a Background-Color.
 */
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


/**
 * This function is used to edit the details of the task.
 */
function editDetails(i) {
    let task = popUpTasks[i];
    task['title'] = document.getElementById(`inputTitle${i}`).value;
    task['description'] = document.getElementById(`inputDescription${i}`).value;
    task['due_date'] = document.getElementById(`date${i}`).value;
}


/**
 * This function is used to set the date of today on the Edit-Task-Popup.
 */
function setTodayDate(i) {
    let today = new Date();
    let dateInput = document.getElementById(`date${i}`);
    dateInput.value = today.toISOString().slice(0, 10);
}


/**
 *  This function is used to edit the Priority of the Task on the Edit-Task-Popup.
 * 
 * @param {string} prio - The id of the Priority-Divs on the Edit-Task-Popup. 
 * @param {string} imgId - The id of the Priority img in the Priority-Divs on the Popup.
 */
function editPriority(i, prio, imgId) {
    clearPriorityDivs();
    setBgColor(prio, imgId);
    setNewPriority(i, prio);
}


/**
 * This function is used to clear the style of the Priority-Divs- and Imgs on the Priority Popup.
 */
function clearPriorityDivs() {
    let allPrioDivs = document.querySelectorAll('.edit-prio-divs .importance');
    allPrioDivs.forEach(div => {
        div.style.backgroundColor = 'initial';
        let img = div.querySelector('img');
        img.classList.remove('turn-white');
        div.classList.remove('white-span');
    });
}


/**
 * This function is used to give the Priority-Divs a Backgroundcolor, and change the color of the Priority imgs.
 * 
 * @param {string} prio - The id of the Priority-Divs on the Edit-Task-Popup. 
 * @param {string} imgId - The id of the Priority img in the Priority-Divs on the Edit-Task-Popup.
 */
function setBgColor(prio, imgId) {
    let prioDiv = document.getElementById(prio);
    let prioImg = document.getElementById(imgId);
    let { color } = setPrioProperties(prio);
    prioDiv.style.backgroundColor = color;
    prioDiv.classList.add('white-span');
    prioImg.classList.add('turn-white');
}


/**
 * This function is used to set the new Priority value in the allTasks.
 * 
 * @param {string} prio - The id of the Priority-Divs on the Edit-Task-Popup. 
 */
function setNewPriority(i, prio) {
    popUpTasks[i]['prio'] = prio;
}


/**
 * This function is used to open the Dropdown with the contacts on the Edit-Task-Popup.
 */
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


/**
 * This function is used to render the contacts and Check-Boxes in the DropDown on the Edit-Task-Popup.
 */
function renderContactsOnDropDown(i) {
    existingNames = popUpTasks[i]['assigned_to'];
    let dropdownMenu = document.getElementById(`dropdownElements${i}`);
    dropdownMenu.innerHTML = '';
    for (let c = 0; c < contactsBoard.length; c++) {
        let [oneContact, checkBox] = createContactsAndCheckboxes(i, c);
        oneContact.appendChild(checkBox);
        dropdownMenu.appendChild(oneContact);
    }
}


/**
 * This functions returns the Contact names and the Check-Boxes for the Dropdown on the Edit-Task-Popup. 
 */
function createContactsAndCheckboxes(i, c) {
    let fullName = contactsBoard[c]['firstname'] + ' ' + contactsBoard[c]['lastname'];

    let oneContact = createContact(fullName, i, c);
    let checkBox = createCheckBox(fullName, i, c);
    addClickEvent(oneContact, checkBox, fullName, i);

    return [oneContact, checkBox];
}


/**
 * This function creates the the Contact Fullname for the Dropdown on the Edit-Task-Popup.
 *  
 * @param {string} fullName - The Fullname of the Contact.
 */
function createContact(fullName, i, c) {
    let oneContact = document.createElement('div');
    oneContact.className = 'editContacts';
    oneContact.id = `newName${i}-${c}`;
    oneContact.innerHTML = fullName;
    return oneContact;
}


/**
 * This function creates the Check-Box for the Dropdown on the Edit-Task-Popup.
 * 
 * @param {string} fullName - The Fullname of the Contact.
 */
function createCheckBox(fullName, i, c) {
    let checkBox = document.createElement('div');
    checkBox.className = 'check-box';
    checkBox.id = `checkBox${i}-${c}`;

    if (existingNames.includes(fullName)) {
        checkBox.innerHTML = `<img src="assets/img/check.png">`;
    }
    return checkBox;
}


/**
 * This function is used to add/remove a name from the Task.
 * 
 * @param {string} fullName - The Fullname of the Contact.
 */
function addClickEvent(oneContact, checkBox, fullName) {
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


/**
 * This function is used to save and render the Edited-Details. 
 */
async function renderEditedDetails(i) {
    proofInput();
    editDetails(i);

    await saveJSONToServer();
    chooseArrayToRender();
}


/**
 * This function is used to choose which of two functions to render based on the Searchinput length.
 */
function chooseArrayToRender() {
    let search = document.getElementById('searchInput').value;
    search.length > 0 ? renderSearchedTask() : renderTasks();
}


/**
 * This function is used to move the Task to another Progresssection (To do, In Progress, Awaiting Feedback, Done) only in Responsive mode on Edit-Task-Popup. 
 * 
 * @param {string} progressButton - The Id of the Progress-Buttons on Edit-Task-Popup, only in responsive  (To do, In Progress, Awaiting Feedback, Done).
 * @param {string} dropField  - The Id of the Progresssections where the Task can be moved to.
 */
function dragAndDropResponsive(i, progressButton, dropField) {
    clearProgressButtons();
    setProgressColor(progressButton);
    setNewProgress(i, dropField);
}


/**
 * This function is used to Clear the Progressbuttons on Edit-Task-Popup, only for Responsive.
 */
function clearProgressButtons() {
    let allProgressDivs = document.querySelectorAll('.edit-progress-divs .progress-divs');
    allProgressDivs.forEach(div => {
        div.style.backgroundColor = 'initial';
        div.classList.remove('white-span');
    });
}


/**
 * This function is used to give the Progress-Buttons a Backgroundcolor.
 * 
 * @param {*} progressButton - The Id of the Progress-Buttons on Edit-Task-Popup, only in responsive  (To do, In Progress, Awaiting Feedback, Done).
 */
function setProgressColor(progressButton) {
    let progressDiv = document.getElementById(progressButton);
    let myColor = newProgressColor(progressButton);
    progressDiv.style.backgroundColor = myColor;
    progressDiv.classList.add('white-span');
}


/**
 * This function is used to move the task to another Progresssection (To do, In Progress, Awaiting Feedback, Done), through the buttons on Edit-Task-Popup, only responsive.
 * 
 * @param {string} dropField - The Id of the Progresssections where the Task can be moved to.
 */
function setNewProgress(i, dropField) {
    popUpTasks[i]['progress'] = dropField;
}