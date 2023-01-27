function showPopUp(i) {
    proofInput();
    displayBoardPopUp();
    renderPopUpBoard(i);
    renderSubtasksPopUp(i);
    renderPopUpPrio(i);
    proofSubtasks(i);
}


function proofInput() {
    let search = document.getElementById('searchInput').value;
    search.length > 0 ? popUpTasks = searchTasks : popUpTasks = allTasks;
}


function renderPopUpBoard(i) {
    let popUp = document.getElementById('popUpOne');
    popUp.innerHTML = '';
    let task = popUpTasks[i];
    popUp.innerHTML += renderPopUpBoardHtml(task, i);
    getNamesPopUp(i);
}


function getNamesPopUp(i) {
    let nameDiv = document.getElementById('names');
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


function popUpInitialColor(i, n) {
    let popUpInitials = document.getElementById(`popUpInitials${i}-${n}`);
    for (let j = 0; j < colorAndInitials.length; j++) {
        if (popUpInitials.textContent.includes(colorAndInitials[j].name)) {
            popUpInitials.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
    }
}


async function renderSubtasksPopUp(i) {
    let subtasks = popUpTasks[i]['subtasks']['name'],                           // == [Modify content, usww]
        statusArray = popUpTasks[i]['subtasks']['status'],                      // == [true, false, usw]
        subtasksContainer = document.getElementById('subtasks');           // == der Div wo sich alle subtasks drin befinden 

    subtasks.forEach((sub, s) => {                                         // == for-schleife, sub ist der name von der subtask, und s ist der index
        let subTaskDiv = createSubtaskDiv(sub, statusArray, s, i);         //rufe die funktion auf 
        subtasksContainer.appendChild(subTaskDiv);                         // füge subTaskDiv zum subTaskContainer hinzu
    });
}


function createSubtaskDiv(sub, statusArray, s, i) {
    let subTaskDiv = document.createElement('div');             // kreiere ein div-elemet (der parent div von checkBox und Name) 
    subTaskDiv.classList.add('subtasks-names');                 // füge eine klasse hinzu 

    let checkBox = createCheckbox(statusArray, s, i);           // rufe die function auf
    subTaskDiv.appendChild(checkBox);                           // füge checkBox zu Subtaskdiv hinzu

    let subTaskName = document.createElement('div');            // kreiere ein Div-Element(der Div mit dem Namen)
    subTaskName.innerText = sub;                                // zeige den Namen von der Subtask an
    subTaskDiv.appendChild(subTaskName);                        // füge die den Namen zu subTaskDiv hinzu

    return subTaskDiv;                                          // gebe subTaskDiv zurück
}


function createCheckbox(statusArray, s, i) {
    let checkBox = document.createElement('div');                                                       // keriere ein Div-Element(der CheckBox) 
    checkBox.classList.add('check-box');                                                                // füge eine klasse hinzu
    checkBox.id = `checkBox${i}-${s}`;                                                                  // füge eine Id hinzu

    checkBox.addEventListener('click', () => checkboxClicked(statusArray, s, checkBox, i));            // füge den Event Listener hinzu
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';                      // wenn der wert "true" ist dann behalte das Bild in der CheckBox, damit das Bild beim neuladen der Seite nicht verschwindet
    return checkBox;                                                                                    // gebe Checkbox Zurück
}


async function checkboxClicked(statusArray, s, checkBox, i) {                           // die separate Funktion
    statusArray[s] = !statusArray[s];                                                   // der Wert wird hier umgedreht, von true auf false und von false auf true
    checkBox.innerHTML = statusArray[s] ? `<img src="assets/img/check.png">` : '';      // wenn der Wert true "?" ist dann füge das Bild hinzu, andernfalls ":" leere den Div

    updateProgressBar(statusArray, i);                                                  // führe die Funktion aus bei dem klicken damit der Progressbar den Wert herauslesen kann und somit die länge vom progressbar dementsprechend ändern kann 
    jsonFromServer['tasks'] = popUpTasks;                                                    // das "Alte" array == array mit den neuen Werten
    await saveJSONToServer();                                                           // speicher das ganze im Backend
}



function renderPopUpPrio(i) {
    let prio = popUpTasks[i]['prio'];
    let popUpPrio = document.getElementById('popUpPrio');
    let prioBg = document.getElementById('prioDiv');
    let { img, color } = setPrioProperties(prio);

    popUpPrio.classList.add('turn-white');
    popUpPrio.src = img;
    prioBg.style.backgroundColor = color;
}


function proofSubtasks(i) {
    let noSub = popUpTasks[i]['subtasks']['name'];
    document.getElementById('subTitle').innerHTML = noSub.length == 0 ? 'No Subtasks' : 'Subtasks';
}


async function deleteTask(i) {
    let task = popUpTasks[i];
    allTasks.splice(allTasks.indexOf(task), 1);

    await saveJSONToServer();
    chooseArrayToRender();
}