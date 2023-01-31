/**
 * This function is used to show the Board-Popup (the first three functions in it are just for the design of the page) .
 */
function showPopUp(i) {
    bodyOverflowHidden();
    turnToFalse();
    addOnclickToBg();

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
    let category = popUpTasks[i]['category'];
    let popUpCategory = document.getElementById(`popUpCategory${i}`);
    popUpCategory.style.backgroundColor = setCategoryColor(category);
}


/**
 * This function is use to render the Subtasks on the Popup.
 */
async function renderSubtasksPopUp(i) {
    let subtasks = popUpTasks[i]['subtasks']['name'],                           // == [Modify content, usww]
        statusArray = popUpTasks[i]['subtasks']['status'],                      // == [true, false, usw]
        subtasksContainer = document.getElementById('subtasks');           // == der Div wo sich alle subtasks drin befinden 

    subtasks.forEach((sub, s) => {                                         // == for-schleife, sub ist der name von der subtask, und s ist der index
        let subTaskDiv = createSubtaskDiv(sub, statusArray, s, i);         //rufe die funktion auf 
        subtasksContainer.appendChild(subTaskDiv);                         // füge subTaskDiv zum subTaskContainer hinzu
    });
}


/**
 * This function is used to render the name/description of the subtask on the PopUp.
 * 
 * @param {string} sub - The name/description of the subtask.
 */
function createSubtaskDiv(sub, statusArray, s, i) {
    let subTaskDiv = document.createElement('div');             // kreiere ein div-elemet (der parent div von checkBox und Name) 
    subTaskDiv.classList.add('subtasks-names');                 // füge eine klasse hinzu 

    let checkBox = createCheckbox(statusArray, s, i);           // rufe die function auf
    subTaskDiv.appendChild(checkBox);                           // füge checkBox zu Subtaskdiv hinzu

    let subTaskName = document.createElement('div');            // kreiere ein Div-Element(der Div mit dem Namen)
    subTaskName.classList.add('width');
    subTaskName.innerText = sub;                                // zeige den Namen von der Subtask an
    subTaskDiv.appendChild(subTaskName);                        // füge die den Namen zu subTaskDiv hinzu

    return subTaskDiv;                                          // gebe subTaskDiv zurück
}



/**
 * This function is used to create the Check-Box on the Popup.
 */
function createCheckbox(statusArray, s, i) {
    let checkBox = document.createElement('div');                                                       // keriere ein Div-Element(der CheckBox) 
    checkBox.classList.add('check-box');                                                                // füge eine klasse hinzu
    checkBox.id = `checkBox${i}-${s}`;                                                                  // füge eine Id hinzu

    checkBox.addEventListener('click', () => checkboxClicked(statusArray, s, checkBox, i));            // füge den Event Listener hinzu
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';                      // wenn der wert "true" ist dann behalte das Bild in der CheckBox, damit das Bild beim neuladen der Seite nicht verschwindet
    return checkBox;                                                                                    // gebe Checkbox Zurück
}


/**
 * This function is used to cross out the Check-Box when a subtask is done.
 */
async function checkboxClicked(statusArray, s, checkBox, i) {                           // die separate Funktion
    statusArray[s] = !statusArray[s];                                                   // der Wert wird hier umgedreht, von true auf false und von false auf true
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';      // wenn der Wert true "?" ist dann füge das Bild hinzu, andernfalls ":" leere den Div

    updateProgressBar(statusArray, i);                                                  // führe die Funktion aus bei dem klicken damit der Progressbar den Wert herauslesen kann und somit die länge vom progressbar dementsprechend ändern kann 
    jsonFromServer['tasks'] = popUpTasks;                                                    // das "Alte" array == array mit den neuen Werten
    await saveJSONToServer();                                                           // speicher das ganze im Backend
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
    if(noSub.length == 0){
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
    let taskTitle = task.title;

    popUpTasks.splice(popUpTasks.indexOf(task), 1);

    let index = allTasks.findIndex(x => x.title === taskTitle);
    if (index != -1 && allTasks[index].title === taskTitle) {
        allTasks.splice(index, 1);
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
