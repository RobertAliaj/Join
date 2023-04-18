let allTasks = [];
let searchTasks = [];
let popUpTasks = [];
let contactsBoard = [];
let colorAndInitials = [];
let categories = [];
let categoriesAndColors = [];
let currentDraggedElement;
let existingNames;
let editTaskCheck = false;
let popUpOpen = false;


/**
 * This function is used to call the functions that get the data from Backend and render them
 */
async function initBoard() {
    await init();
    await getDataBase();
    getCategoryColorAndName();
    getContactColorsandInitials();
    renderTasks();
    // renderCategorys();
}


/**
 * This function is used to get the Data from server
 */
async function getDataBase() {
    await downloadFromServer();
    allTasks = jsonFromServer['tasks'];
    contactsBoard = jsonFromServer['contacts'];
    categories = jsonFromServer['categorys'];
}


/**
 * This function is used to render the Tasks
 */
function renderTasks() {
    clearSections();
    for (let i = 0; i < allTasks.length; i++) {
        let [task, section, names, prio, statusArray] = getAllTasksDetails(i);

        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderTasksHTML(task, i);

        taskDetails(names, prio, statusArray, i);
    }
}


/**
 * This Function is used to clear all Sections/Columns
 */
function clearSections() {
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * This Function is used to get all the Details from the allTasks Array
 */
function getAllTasksDetails(i) {
    let task = allTasks[i];
    let section = allTasks[i]['progress'];
    let names = allTasks[i]['assigned_to']
    let prio = allTasks[i]['prio'];
    let statusArray = allTasks[i]['subtasks']['status'];
    return [task, section, names, prio, statusArray];
}



/**
 * @param {string} names - The names of the employees who have to do the job.
 * @param {string} prio    - The priority of the task.
 */
function taskDetails(names, prio, statusArray, i) {
    getInitials(names, i);
    changeCategoryColor(i);
    renderPrioImg(prio, i);
    updateProgressBar(statusArray, i);
}


/**
 * This function is used to get the Initials of each name
 *  
 * @param {string} names - The names of the employees who have to do the job.
 */
function getInitials(names, i) {
    let initialsDiv = document.getElementById(`initials${i}`);
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));

    renderVisibleInitials(initials, initialsDiv, i);
    renderHiddenInitials(names, initialsDiv);
}


/**
 * This function is used to render the three first initials
 * 
 * @param {string} initials - initials of each name.
 */
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


/**
 * This function is used to render the number of the remaining Coworkers, if there are more than three.
 * 
 * @param {string} names - The names of the employees who have to do the job.
 */
function renderHiddenInitials(names, initialsDiv) {
    if (names.length > 3) {
        let remainingWorkers = document.createElement("div");
        remainingWorkers.innerHTML = `+${names.length - 3}`;
        remainingWorkers.classList.add("remaining-workers");
        initialsDiv.appendChild(remainingWorkers);
    }
}



/**
 *  This function is used to give each Initial a color
*/
function renderInitialsColors(i, s) {
    let bubble = document.getElementById(`inits${i}-${s}`);

    for (let j = 0; j < colorAndInitials.length; j++) {
        if (bubble.textContent.includes(colorAndInitials[j].name)) {
            bubble.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
    }
}


/**
 *  This function is used to give each Category a color
 */
function changeCategoryColor(i) {
    let categoryName = document.getElementById(`category${i}`);
    for (let n = 0; n < categoriesAndColors.length; n++) {
        if (categoryName.textContent.includes(categoriesAndColors[n].name)) {
            categoryName.style.backgroundColor = categoriesAndColors[n].color;
            break;
        }
    }
}


/**
 *  This function is used to render the Priority img.
 *  
 * @param {string} prio - The name of the Priority.
 */
function renderPrioImg(prio, i) {
    let prioImg = document.getElementById(`prioImg${i}`);
    prioImg.src = setPrioProperties(prio).img;
}



/**
 *  This function is used to update the Progressbar of the Subtasks.
 */
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


/**
 * This function is used to make an Element available for the drag and drop.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function is used to start dragging. 
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * This function is used to move the task to another ProgressSection (To do, In Progress, Awating Feedback, Done).
 * 
 * @param {string} progress - The id of the ProgressSection where you can move the task to.
 */
async function moveTo(progress) {
    let search = document.getElementById('searchInput').value;

    if (search.length > 0) {
        searchTasks[currentDraggedElement]['progress'] = progress;
        document.getElementById('searchInput').value = '';
        await saveJSONToServer();
        renderTasks();
    } else {
        allTasks[currentDraggedElement]['progress'] = progress;
        jsonFromServer['tasks'] = allTasks;
        await saveJSONToServer();
        renderTasks();
    }
}


/**
 * This funcion is used to push the searched task/s into the searchTasks.
 */
function searchTask() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();
    searchTasks = [];
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['title'].toLowerCase().includes(search)) {
            if (getSearchIndex(search) == -1) {
                searchTasks.push(allTasks[i]);
            }
        }
    }
    renderSearchedTask();
}


/**
 * This function is used to get the index of searchTasks array.
 * 
 * @param {string} value - This is the value of the search input. 
 */
function getSearchIndex(value) {
    let index = searchTasks.indexOf(value);
    return index;
}


/**
 * This function is used to render the searched task.
 */
function renderSearchedTask() {
    clearSections();
    for (let i = 0; i < searchTasks.length; i++) {
        let [task, section, names, prio, statusArray] = getSearchedTasksDetails(i);

        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderTasksHTML(task, i);

        taskDetails(names, prio, statusArray, i);
    }
}


/**
 * This Function is used to get all the Details from the searchTasks Array
 */
function getSearchedTasksDetails(i) {
    let task = searchTasks[i];
    let names = searchTasks[i]['assigned_to'];
    let section = searchTasks[i]['progress'];
    let prio = searchTasks[i]['prio'];
    let statusArray = searchTasks[i]['subtasks']['status'];
    return [task, section, names, prio, statusArray];
}


function showAddTaskTemplate(){
    let greyBackground = document.getElementById('greyBackground');
    let addTaskPopUp = document.getElementById('addTaskWrapper');

    greyBackground.classList.add('grey-background');
    greyBackground.classList.remove('hide-pop-up');

    addTaskPopUp.classList.add('add-task-wrapper');
    addTaskPopUp.classList.add('slide');
    addTaskPopUp.classList.remove('hide-pop-up');
}

function closeAddTaskWrapper(){
    let greyBackground = document.getElementById('greyBackground');
    let addTaskPopUp = document.getElementById('addTaskWrapper');

    greyBackground.classList.remove('grey-background');
    greyBackground.classList.add('hide-pop-up');

    addTaskPopUp.classList.remove('add-task-wrapper');
    addTaskPopUp.classList.remove('slide');
    addTaskPopUp.classList.add('hide-pop-up');
}