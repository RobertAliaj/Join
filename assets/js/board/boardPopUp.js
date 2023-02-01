/**
 * This function is used to show the Board-Popup (the first 4 functions in it are just for the design of the page).
 */
function showPopUp(i) {
    bodyOverflowHidden();
    turnToFalse();
    addOnclickToBg();
    popUpOpenTrue();

    proofInput();
    displayBoardPopUp();
    renderPopUpBoard(i);
    renderSubtasksPopUp(i);
    renderPopUpPrio(i);
    proofSubtasks(i);
    popUpCategoryColor(i);
    changeHeightofAssignedTo(i);
}


/**
 * This function is used to pass the Data from allTasks or from searchTasks into the popUpTasks depending on the search input length.
 */
function proofInput() {
    let search = document.getElementById('searchInput').value;
    search.length > 0 ? popUpTasks = searchTasks : popUpTasks = allTasks;
}


/**
 * This function is used to render the Popup of one task. 
 */
function renderPopUpBoard(i) {
    let popUp = document.getElementById('popUpOne');
    popUp.innerHTML = '';
    let task = popUpTasks[i];
    popUp.innerHTML += renderPopUpBoardHtml(task, i);
    getNamesPopUp(i);
}


/**
 * - This function is used to get the names of the employees who have to do the job in one task.
 */
function getNamesPopUp(i) {
    let nameDiv = document.getElementById(`names${i}`);
    nameDiv.innerHTML = '';
    let myNames = popUpTasks[i]['assigned_to'];
    let names = popUpTasks[i]['assigned_to'];
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    for (let n = 0; n < myNames.length; n++) {
        const names = myNames[n];
        nameDiv.innerHTML += getNamesPopUpHtml(i, n, initials, names);
        popUpInitialColor(i, n);
    }
}


/**
 * This function is used to give the Intials on the Popup the color.
 */
function popUpInitialColor(i, n) {
    let popUpInitials = document.getElementById(`popUpInitials${i}-${n}`);
    for (let j = 0; j < colorAndInitials.length; j++) {
        if (popUpInitials.textContent.includes(colorAndInitials[j].name)) {
            popUpInitials.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
    }
}


/**
 * This function is used to give the Category on the Popup the color.
 */
function popUpCategoryColor(i) {
    let popUpCategory = document.getElementById(`popUpCategory${i}`);
    for (let n = 0; n < categoriesAndColors.length; n++) {
        if (popUpCategory.textContent.includes(categoriesAndColors[n].name)) {
            popUpCategory.style.backgroundColor = categoriesAndColors[n].color;
            break;
        }
    }
}


/**
 * This function is use to render the Subtasks on the Popup.
 */
async function renderSubtasksPopUp(i) {
    let subtasks = popUpTasks[i]['subtasks']['name'],
        statusArray = popUpTasks[i]['subtasks']['status'],
        subtasksContainer = document.getElementById('subtasks');

    subtasks.forEach((sub, s) => {
        let subTaskDiv = createSubtaskDiv(sub, statusArray, s, i);
        subtasksContainer.appendChild(subTaskDiv);
    });
}


/**
 * This function is used to render the name/description of the subtask on the PopUp.
 * 
 * @param {string} sub - The name/description of the subtask.
 */
function createSubtaskDiv(sub, statusArray, s, i) {
    let subTaskDiv = document.createElement('div');
    subTaskDiv.classList.add('subtasks-names');

    let checkBox = createCheckbox(statusArray, s, i);
    subTaskDiv.appendChild(checkBox);

    let subTaskName = document.createElement('div');
    subTaskName.classList.add('width');
    subTaskName.innerText = sub;
    subTaskDiv.appendChild(subTaskName);

    return subTaskDiv;
}



/**
 * This function is used to create the Check-Box on the Popup.
 */
function createCheckbox(statusArray, s, i) {
    let checkBox = document.createElement('div');
    checkBox.classList.add('check-box');
    checkBox.id = `checkBox${i}-${s}`;

    checkBox.addEventListener('click', () => checkboxClicked(statusArray, s, checkBox, i));
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';
    return checkBox;
}


/**
 * This function is used to cross out the Check-Box when a subtask is done.
 */
async function checkboxClicked(statusArray, s, checkBox, i) {
    statusArray[s] = !statusArray[s];
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';

    updateProgressBar(statusArray, i);
    jsonFromServer['tasks'] = popUpTasks;
    await saveJSONToServer();
}


/**
 * This function is used to render the priority on the Popup.
 */
function renderPopUpPrio(i) {
    let prio = popUpTasks[i]['prio'];
    let popUpPrio = document.getElementById('popUpPrio');
    let prioBg = document.getElementById('prioDiv');
    let { img, color } = setPrioProperties(prio);

    popUpPrio.classList.add('turn-white');
    popUpPrio.src = img;
    prioBg.style.backgroundColor = color;
}


/**
 * This function is used to change the Title of the subtasks if there's no subtasks.
 */
function proofSubtasks(i) {
    let noSub = popUpTasks[i]['subtasks']['name'];
    if (noSub.length == 0) {
        document.getElementById('subTitle').innerHTML = 'No Subtasks';
        document.getElementById('subParent').style.marginBottom = '0px';
    }
}



function deleteTask(i) {
    proofInput();
    deleteTaskFromArrays(i);
    renderAndSave();
}


/**
 * This function is used to delete a task (the same task) from popUpTasks and allTasks.
 */
function deleteTaskFromArrays(i) {
    let task = popUpTasks[i];
    let taskTitle = task.title;                                                 // der Titel von dem jeweiligen Task in der popUpTasks

    popUpTasks.splice(popUpTasks.indexOf(task), 1);                             // lösche die Task aus dem Array popUpTasks

    let index = allTasks.findIndex(x => x.title === taskTitle);                 // index = der Titel im allTasks der mit taskTitle (der Title von der Task die gelöscht wurde) übereinstimmt
    if (index != -1 && allTasks[index].title === taskTitle) {                   // wenn index existiert (!= -1 (nicht minus 1 heisst true, also heisst das es ist im Array Vorhanden)) und der Titel von der Task im allTask == der titel von der gelöschten Task
        allTasks.splice(index, 1);                                              // dann lösche die Task auch aus dem allTasks
    }
}


/**
 * This function is used to save the changes after deleting a task and render the rest.
 */
function renderAndSave() {
    document.getElementById('searchInput').value = '';
    saveJSONToServer();
    renderTasks();
}



/**
 * This function is used to change the height of the Element is there are more than 3 subtasks in one task (just for design).
 */
function changeHeightofAssignedTo(i) {
    if (allTasks[i]['subtasks']['name'].length >= 3) {
        document.getElementById(`names${i}`).style.height = '90px';
    }
    else {
        document.getElementById(`names${i}`).style.height = '180px';
    }
}