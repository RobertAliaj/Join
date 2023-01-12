let categorys = [];
let colors = [];


/**
 * This function is used to change the height of a div and display its contents
 * if the height of a div was previously changed and you click on another,
 * the previous div is reduced again and the content is hidden. 
 * The height of the clicked div is increased and the content is displayed
 * 
 * @param {*} clicked - This is the id where a classlist should be changed
 * @param {*} notClicked - This is the id where a classlist should be changed
 * @param {*} visible - This is the id where the classlist "d-none" will removed
 * @param {*} notVisible - This is the id where the classlist "d-none" will added
 */
function pullDownMenu(clicked, notClicked, visible, notVisible) {
    let openMenu = document.getElementById(clicked).classList;
    if (openMenu == 'dropdown-category-closed') {
        document.getElementById(clicked).classList.add('dropdown-category-open','overflow-auto');
        document.getElementById(notClicked).classList.remove('dropdown-category-open','overflow-auto');
        document.getElementById(visible).classList.remove('d-none');
        document.getElementById(notVisible).classList.add('d-none');
    } else {
        document.getElementById(clicked).classList.remove('dropdown-category-open','overflow-auto');
        document.getElementById(visible).classList.add('d-none');
        document.getElementById(notVisible).classList.add('d-none');
    }
}


/**
 * This function is used to change the classes.
 * Depending on which div should be shown or hidden
 */
function changeIcons() {
    let addSubtask = document.getElementById('addSubtask');
    let createSubtask = document.getElementById('createSubtask');
    let subtaskInput = document.getElementById('subtaskInput');
    let createSubtaskClass = createSubtask.classList.value;
    let divClass = 'd-none';

    if (createSubtaskClass.includes(divClass) == true) {
        createSubtask.classList.remove('d-none');
        addSubtask.classList.add('d-none');
        subtaskInput.focus();
    } else {
        createSubtask.classList.add('d-none');
        addSubtask.classList.remove('d-none');
        subtaskInput.blur();
        subtaskInput.value = '';
    }
}


function getTitle() {
    title = document.getElementByIde('tileInput').value;
    return title;
}

function getDescription() {
    description = document.getElementByIde('descriptionInput').value;
    return description;
}


function addSubtask() {
    subtask = document.getElementById('subtaskInput').value;
    console.log(subtask);
}