let tasks = [];
let contacts = [];
let searchTasks = [];
let contactColors = [];
let progress = ['TODO', 'inProgress', 'feedback', 'done'];
let currentDraggedElement;

async function init() {
    await downloadFromServer();
    tasks = jsonFromServer['tasks'];
    contacts = jsonFromServer['contacts'];
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
        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderCardsHTML(element, i);
        getInitials(names, i);
        changeCategoryColor(category, i);
        renderPrioImg(prio, i);
    }
}


function renderSubtasks(i) {
    let subtasks = tasks[i]['subtasks']['name'];
    for (let s = 0; s < subtasks.length; s++) {
        const sub = subtasks[s];
        document.getElementById('subtasks').innerHTML += `
        <div class="subtasks-names">
            <div class="check-box"></div>
            <div>${sub}</div>
        </div>
        `;
    }
}



function clearSections() {
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function changeCategoryColor(category, i) {
    // let category = tasks[i]['category']
    document.getElementById(`category${i}`).style.backgroundColor = setColors(category);
}


///////////////////////             GET INITIALS     //////////////////////////
//get the names of the CoWorkers and get the Initials of them
function getInitials(names, i) {
    let initialsDiv = document.getElementById(`initials${i}`);
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    renderVisibleInitials(initials, initialsDiv, i);
    renderHiddenInitials(names, initialsDiv);
}


// render the Initials of the first three names to have the task
function renderVisibleInitials(initials, initialsDiv, i) {
    let divsCreated = 0;
    for (let s = 0; s < initials.length; s++) {
        if (divsCreated === 3) {
            break;
        }
        divsCreated++;
        const oneInitial = initials[s];
        initialsDiv.innerHTML += visibleInitialsHtml(oneInitial, i, s);
        initialColors(i, s);
    }
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


function initialColors(i, s) {
    let myNames = tasks[i]['assigned_to'];
    let lastName;
    for (let f = 0; f < myNames.length; f++) {
        let fullName = tasks[i]['assigned_to'][f];
        let split = fullName.split(' ');
        lastName = split[1];
        for (let c = 0; c < contacts.length; c++) {
            let lastNameContacts = contacts[c]['lastname'];
            if (lastName == lastNameContacts) {
                let bgColor = contacts[c]['color'];
                document.getElementById(`inits${i}-${s}`).style.backgroundColor = bgColor;
            }
        }
    }
}


///////////////////////       DRAG AND DROP /////////////////////////////
function allowDrop(ev) {
    ev.preventDefault();
}


function startDragging(id) {
    currentDraggedElement = id;
}


function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    renderCards();
    jsonFromServer['tasks'] = tasks;
    saveJSONToServer();
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
    console.log('Gefilterte Tasks:', searchTasks);
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
        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderCardsHTML(element, i);
        changeCategoryColor(category, i);
        getInitials(names, i);
        renderPrioImg(prio, i);
    }
}


function getIndexFromArray(value) {
    let index = searchTasks.indexOf(value);
    return index;
}


/////////////////////////  BOARD-POPUP /////////////////////////
function renderPopUpBoard(i) {
    let popUp = document.getElementById('popUpOne');
    popUp.innerHTML = '';
    let element = tasks[i];

    popUp.innerHTML += renderPopUpBoardHtml(element);
    getNamesPopUp(i);
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
            <div class="one-init">${initials[n]}</div>
            <div>${names}</div>
        </div>
        `;
    }
}


function renderPrioImg(prio, i) {
    let prioImg = document.getElementById(`prioImg${i}`);
    if (prio == 'low') {
        prioImg.src = 'assets/img/prio_low.png';
    }

    if (prio == 'medium') {
        prioImg.src = 'assets/img/prio_medium.png';
    }

    if (prio == 'high') {
        prioImg.src = 'assets/img/prio_high.png';
    }
}


function renderPopUpPrio(i) {
    let prio = tasks[i]['prio'];
    let popUpPrio = document.getElementById('popUpPrio');
    let prioBg = document.getElementById('prioDiv');

    if (prio == 'low') {
        popUpPrio.src = 'assets/img/prio_low.png';
        popUpPrio.classList.add('turn-white');
        prioBg.style.backgroundColor = 'rgb(122,226,41)'
    }

    if (prio == 'medium') {
        popUpPrio.src = 'assets/img/prio_medium.png';
        popUpPrio.classList.add('turn-white');
        prioBg.style.backgroundColor = 'rgb(255,168,0)';
    }

    if (prio == 'high') {
        popUpPrio.src = 'assets/img/prio_high.png';
        popUpPrio.classList.add('turn-white');
        prioBg.style.backgroundColor = 'rgb(255,61,0)';
    }
}


function removeSubtasks(i){
    let len = tasks[i]['subtasks']['name'];
    if(len.length == 0){
        document.getElementById('subTitle').innerHTML = 'No Subtasks';
    }
}