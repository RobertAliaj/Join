let allTasks = [];
let searchTasks = [];
let popUpTasks = [];
let contacts = [];
let colorAndInitials = [];
let currentDraggedElement;
let existingNames;
let editTaskCheck = false;


async function init() {
    await downloadFromServer();
    allTasks = jsonFromServer['tasks'];
    contacts = jsonFromServer['contacts'];
    getContactColorsandInitials();
    renderTasks();
}


////////////////////////// ALL TASKS /////////////////////7
function renderTasks() {
    clearSections();
    for (let i = 0; i < allTasks.length; i++) {
        let [task, section, category, names, prio, statusArray] = getAllTasksDetails(i);

        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderTasksHTML(task, i);

        taskDetails(names, category, prio, statusArray, i);
    }
}


function getAllTasksDetails(i) {
    let task = allTasks[i];
    let section = allTasks[i]['progress'];
    let category = allTasks[i]['category'];
    let names = allTasks[i]['assigned_to']
    let prio = allTasks[i]['prio'];
    let statusArray = allTasks[i]['subtasks']['status'];
    return [task, section, category, names, prio, statusArray];
}


function clearSections() {
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


function taskDetails(names, category, prio, statusArray, i) {
    getInitials(names, i);
    changeCategoryColor(category, i);
    renderPrioImg(prio, i);
    updateProgressBar(statusArray, i);
}


function getInitials(names, i) {
    let initialsDiv = document.getElementById(`initials${i}`);
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));

    renderVisibleInitials(initials, initialsDiv, i);
    renderHiddenInitials(names, initialsDiv);
}


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


//if theres more than 3 CoWO in one Task, then display a div with the number of the remaining Workers
function renderHiddenInitials(names, initialsDiv) {
    if (names.length > 3) {
        let remainingWorkers = document.createElement("div");
        remainingWorkers.innerHTML = `+${names.length - 3}`;
        remainingWorkers.classList.add("remaining-workers");
        initialsDiv.appendChild(remainingWorkers);
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


function changeCategoryColor(category, i) {
    document.getElementById(`category${i}`).style.backgroundColor = setColors(category);
}


function renderPrioImg(prio, i) {
    let prioImg = document.getElementById(`prioImg${i}`);
    prioImg.src = setPrioProperties(prio).img;
}



function updateProgressBar(statusArray, i) {
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


///////////////////////       DRAG AND DROP /////////////////////////////
function allowDrop(ev) {
    ev.preventDefault();
}


function startDragging(id) {
    currentDraggedElement = id;
}


async function moveTo(progress) {
    allTasks[currentDraggedElement]['progress'] = progress;
    renderTasks();

    jsonFromServer['tasks'] = allTasks;
    await saveJSONToServer();
}




////////////////////     FILTER FUNCTION   ///////////////
function searchTask() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();
    searchTasks = [];                                                       // leere die searchedTasks    
    for (let i = 0; i < allTasks.length; i++) {                            // iteriere durch die cards
        if (allTasks[i]['title'].toLowerCase().includes(search)) {         //  wenn search == title, dann  
            if (getSearchIndex(search) == -1) {                             //  wenn die Buchstabe nicht im Array vorhanden ist     
                searchTasks.push(allTasks[i]);                             //  dann pushe tasks[i]
            }
        }
    }

    renderSearchedTask();
}


function getSearchIndex(value) {
    let index = searchTasks.indexOf(value);
    return index;
}


function renderSearchedTask() {
    clearSections();
    for (let i = 0; i < searchTasks.length; i++) {
        let [task, section, category, names, prio, statusArray] = getSearchedTasksDetails(i);

        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderTasksHTML(task, i);

        taskDetails(names, category, prio, statusArray, i);
    }
}


function getSearchedTasksDetails(i) {
    let task = searchTasks[i];
    let names = searchTasks[i]['assigned_to'];
    let section = searchTasks[i]['progress'];
    let category = searchTasks[i]['category'];
    let prio = searchTasks[i]['prio'];
    let statusArray = searchTasks[i]['subtasks']['status'];
    return [task, section, category, names, prio, statusArray];
}