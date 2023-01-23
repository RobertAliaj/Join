let tasks = [];
let contacts = [];
let searchTasks = [];
let currentDraggedElement;
let colorAndInitials = [];



async function init() {
    await downloadFromServer();
    tasks = jsonFromServer['tasks'];
    contacts = jsonFromServer['contacts'];
    getContactColorsandInitials();
    renderCards();
}


////////////////////////// ALL TASKS /////////////////////7
function renderCards() {
    clearSections();
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        let section = tasks[i]['progress'];
        let category = tasks[i]['category'];
        let names = tasks[i]['assigned_to']
        let prio = tasks[i]['prio'];
        let statusArray = tasks[i]['subtasks']['status'];
        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderCardsHTML(element, i);
        getInitials(names, i);
        changeCategoryColor(category, i);
        renderPrioImg(prio, i);
        progressBar(statusArray, i);
    }
}


// // render the Initials of the first three names to have the task
function renderVisibleInitials(initials, initialsDiv, i) {
    let divsCreated = 0;
    for (let s = 0; s < initials.length; s++) {
        if (divsCreated === 3) {
            break;
        }
        divsCreated++;
        const oneInitial = initials[s];
        initialsDiv.innerHTML += visibleInitialsHtml(oneInitial, i, s);
        renderInitialsColors(i, s);
    }
}


function renderInitialsColors(i, s) {
    let bubble = document.getElementById(`inits${i}-${s}`);
    for (let j = 0; j < colorAndInitials.length; j++) {
        if (bubble.textContent.includes(colorAndInitials[j].name)) {
            bubble.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
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


function getContactColorsandInitials() {
    for (let i = 0; i < contacts.length; i++) {
        let contactColor = contacts[i]['color'];
        let contact = contacts[i];
        let firstInitial = contact.firstname[0];
        let lastInitial = contact.lastname[0];
        let initials = (firstInitial + lastInitial);
        colorAndInitials.push(setContactColors(contactColor, initials));
    }
}


function setContactColors(contactColor, initials) {
    return {
        name: initials,
        color: contactColor
    }
}


function clearSections() {
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function changeCategoryColor(category, i) {
    document.getElementById(`category${i}`).style.backgroundColor = setColors(category);
}


///////////////////////             GET INITIALS     //////////////////////////
function getInitials(names, i) {
    let initialsDiv = document.getElementById(`initials${i}`);
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    renderVisibleInitials(initials, initialsDiv, i);
    renderHiddenInitials(names, initialsDiv);
}


//if theres more than 3 CoWO in one Task, then display a div with the number of the remaining Workers
function renderHiddenInitials(names, initialsDiv) {
    if (names.length > 3) {
        // Create a new div element into the 'initialsDiv' to display the number of remaining workers
        let remainingWorkers = document.createElement("div");
        remainingWorkers.innerHTML = `+${names.length - 3}`;
        remainingWorkers.classList.add("remaining-workers");
        initialsDiv.appendChild(remainingWorkers);
    }
}


///////////////////////       DRAG AND DROP /////////////////////////////
function allowDrop(ev) {
    ev.preventDefault();
}


function startDragging(id) {
    currentDraggedElement = id;
}


async function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    renderCards();
    jsonFromServer['tasks'] = tasks;
    await saveJSONToServer();
}


////////////////////     FILTER FUNCTION   ///////////////
function searchTask() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();
    searchTasks = [];                                                   // leere die searchedTasks    
    for (let i = 0; i < tasks.length; i++) {                            // iteriere durch die cards
        if (tasks[i]['title'].toLowerCase().includes(search)) {         //  wenn search == title, dann  
            if (getIndexFromArray(search) == -1) {                      //  wenn die Buchstabe nicht im Array vorhanden ist     
                searchTasks.push(tasks[i]);                             //  dann pushe tasks[i]
            }
        }
    }
    renderSearchedTask();
}


function renderSearchedTask() {
    clearSections();
    for (let i = 0; i < searchTasks.length; i++) {
        let element = searchTasks[i];
        let section = searchTasks[i]['progress'];
        let category = searchTasks[i]['category'];
        let names = searchTasks[i]['assigned_to'];
        let prio = searchTasks[i]['prio'];
        let statusArray = searchTasks[i]['subtasks']['status'];
        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderCardsHTML(element, i);
        changeCategoryColor(category, i);
        getInitials(names, i);
        renderPrioImg(prio, i);
        // progressBar(statusArray, i);
    }
}


function getIndexFromArray(value) {
    let index = searchTasks.indexOf(value);
    return index;
}


/////////////////////////  BOARD-POPUP /////////////////////////
function showPopUp(i) {
    displayBoardPopUp();
    renderPopUpBoard(i);
    renderSubtasks(i);
    renderPopUpPrio(i);
    removeSubtasks(i)
}


function renderPopUpBoard(i) {
    let popUp = document.getElementById('popUpOne');
    popUp.innerHTML = '';
    let element = tasks[i];

    popUp.innerHTML += renderPopUpBoardHtml(element);
    getNamesPopUp(i);
}

async function renderSubtasks(i) {
    let subtasks = tasks[i]['subtasks']['name'];
    let statusArray = tasks[i]['subtasks']['status'];
    let subtasksContainer = document.getElementById('subtasks');

    for (let s = 0; s < subtasks.length; s++) {
        let sub = subtasks[s];
        let subTaskDiv = document.createElement('div');
        subTaskDiv.classList.add('subtasks-names');

        let checkBox = document.createElement('div');
        checkBox.classList.add('check-box');
        checkBox.id = `checkBox${i}-${s}`;

        checkBox.addEventListener('click', async function () {
            statusArray[s] = !statusArray[s];
            if (statusArray[s] == true) {
                checkBox.innerHTML = `<img src="assets/img/check.png">`;
                renderCards();
            } else {
                checkBox.innerHTML = '';
                renderCards();
            }
            jsonFromServer['tasks'] = tasks;
            await saveJSONToServer();
        });

        if (statusArray[s] == true) {
            checkBox.innerHTML = `<img src="assets/img/check.png">`;

        }

        let subTaskName = document.createElement('div');
        subTaskName.innerText = sub;

        subTaskDiv.appendChild(checkBox);
        subTaskDiv.appendChild(subTaskName);
        subtasksContainer.appendChild(subTaskDiv);
    }

}


function getNamesPopUp(i) {
    let nameDiv = document.getElementById('names');
    nameDiv.innerHTML = '';
    let myNames = tasks[i]['assigned_to'];
    let names = tasks[i]['assigned_to'];
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    for (let n = 0; n < myNames.length; n++) {
        const names = myNames[n];
        nameDiv.innerHTML += `
        <div class="name-inits-child">
            <div class="one-init" id="popUpInitials${i}-${n}">${initials[n]}</div>
            <div>${names}</div>
        </div>
        `;
        popUpInitialColor(i, n);
    }
}


function renderPrioImg(prio, i) {
    let prioImg = document.getElementById(`prioImg${i}`);
    switch (prio) {
        case 'low':
            prioImg.src = 'assets/img/prio_low_old.png';
            break;

        case 'medium':
            prioImg.src = 'assets/img/prio_medium_old.png';
            break;

        case 'high':
            prioImg.src = 'assets/img/prio_high_old.png';
            break;
    }
}


function renderPopUpPrio(i) {
    let prio = tasks[i]['prio'];
    let popUpPrio = document.getElementById('popUpPrio');
    let prioBg = document.getElementById('prioDiv');
    let { img, color } = setPrioProperties(prio);
    popUpPrio.classList.add('turn-white');
    popUpPrio.src = img;
    prioBg.style.backgroundColor = color;
}



function setPrioProperties(prio) {
    let prioImg = {
        low: 'assets/img/prio_low_old.png',
        medium: 'assets/img/prio_medium_old.png',
        high: 'assets/img/prio_high_old.png'
    };
    let prioColor = {
        low: 'rgb(122,226,41)',
        medium: 'rgb(255,168,0)',
        high: 'rgb(255,61,0)'
    };
    return { img: prioImg[prio], color: prioColor[prio] };
}


function removeSubtasks(i) {
    let noSub = tasks[i]['subtasks']['name'];
    if (noSub.length == 0) {
        document.getElementById('subTitle').innerHTML = 'No Subtasks';
    }
}


function progressBar(statusArray, i) {
    let trueCount = statusArray.filter(val => val === true).length;
    let progressPercent = (trueCount / statusArray.length) * 100;
    let progressBar = document.getElementById(`proBar${i}`);
    if (statusArray.length > 0) {
        progressBar.style.width = progressPercent + "%";
        document.getElementById(`progressNumbers${i}`).innerHTML = `${trueCount}/${statusArray.length} Done`;
    } else {
        document.getElementById(`proDiv${i}`).style = 'display : none;';
    }
}