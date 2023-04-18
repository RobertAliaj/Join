/**
 * This function is used to show the Board-Popup.
 */
function displayBoardPopUp() {
    document.getElementById('card').classList.remove('d-none')
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('popUpOne').classList.remove('d-none');
}


/**
 * This function is used to remove the Board-Popup.
 */
function removeBoardPopUp() {
    document.getElementById('card').classList.add('d-none')
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    popUpOpenFalse();
}



/**
 * This function is used to show the Add-task-Popup on the boardpage.
 */
function showAddTaskPopUp() {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('popUp').classList.remove('d-none');
}


/**
 * This function is used to remove the Add-Task-Popup.
 */
function removeAddTaskPopUp() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('popUp').classList.add('d-none')
}


/**
 * This function is used to highlight the area where you drag and drop an Element.
 * 
 * @param {string} id - The id of the Element where you can move the task to.
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragarea-highlight');
}


/**
 * This function is used to remove the highlight if drag and drop as soon as you're done drag-and-dropping.
 * 
 * @param {string} id - The id of the Element where you can move the task to.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragarea-highlight');
}


/**
 * This function is used to show the Edit-Task Popup.
 */
function openEditTask() {
    document.getElementById('editTask').classList.remove('d-none');
    document.getElementById('popUpOne').classList.add('d-none');
}


/**
 * This function is used to remove the Edit-Task Popup.
 */
function closeEditTask() {
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('popUpOne').classList.remove('d-none');
}


/**
 * This function is used to show the Delete-Popup.
 */
function openDeletePopUp(i) {
    document.getElementById(`openDeletePopUp${i}`).classList.remove('d-none');
}


/**
 * This function is used to close the Delete-Popup.
 */
function closeDeletePopUp(i) {
    document.getElementById(`openDeletePopUp${i}`).classList.add('d-none');
}


/**
 * This function is used to remoce the scrollbar from the body.
 */
function bodyOverflowHidden() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}


/**
 * This function is used to turn the value of the variable to false.
 */
function turnToFalse() {
    editTaskCheck = false;
}


function turnToTrue() {
    editTaskCheck = true;
}

/**
 * This function is used to add/remove an onclick to the Edit-Task-Bg (remove onlick while you are editing the task, so you can olny save the Edits through the "Ok-Button").
 */
function addOnclickToBg() {
    if (editTaskCheck == true) {
        document.getElementById('card').removeEventListener("click", removeBoardPopUp);
    } else {
        document.getElementById('card').addEventListener("click", removeBoardPopUp);
    }
}


/**
 * This function is used to call the replaceXthroughArray function.
 */
window.addEventListener('resize', replaceXThroughArrow);


/**
 * This function is used to change the "x" img of the Board-Popup.
 */
function replaceXThroughArrow() {
    if (popUpOpen == true) {
        if (window.matchMedia("(max-width: 450px)").matches) {
            document.getElementById('exitPopUp').src = "assets/img/Vector.png";
        } else {
            document.getElementById('exitPopUp').src = "assets/img/Clear_task.png";
        }
    }
}


/**
 * This function is used to turn the Variable to true (for design).
 */
function popUpOpenTrue() {
    popUpOpen = true;
}



/**
 *  This function is used to turn the Variable to false (for design).
 */
function popUpOpenFalse() {
    popUpOpen = false;
}

/**
 * This function is used to get the color and the name of every category in the categoryJSON and push it into the categoriesAndColors array.
 */
function getCategoryColorAndName() {
    for (let i = 0; i < categories.length; i++) {
        let categoryName = categories[i]['name'];
        let categoryColor = '#' + categories[i]['color'];
        categoriesAndColors.push(setCategoryColor(categoryName, categoryColor));
    }
}


/**
 *  This function returns the color and the name of every Category in the CategoryJSON.
 *  
 * @param {string} categoryName - The name of the Category.
 * @param {string} categoryColor     - The color of the Category.
 */
function setCategoryColor(categoryName, categoryColor) {
    return {
        name: categoryName,
        color: categoryColor
    }
}


/**
 *  This function returns the Priority img and backgroundcolor.
 *  
 * @param {string} prio - Priority name (low, medium or urgent).
 */
function setPrioProperties(prio) {
    let img = prio === 'low' ? 'assets/img/prio_low_old.png'
        : prio === 'medium' ? 'assets/img/prio_medium_old.png'
            : 'assets/img/prio_high_old.png';

    let color = prio === 'low' ? 'rgb(122,226,41)'
        : prio === 'medium' ? 'rgb(255,168,0)'
            : 'rgb(255,61,0)';
    return { img, color };
}


/**
 * This function is used to get the color and the initial of every name in the contacts and push it into the colorAndInitials array.
 */
function getContactColorsandInitials() {
    for (let i = 0; i < contactsBoard.length; i++) {
        let contactColor = contactsBoard[i]['color'];
        let contact = contactsBoard[i];
        let firstInitial = contact.firstname[0];
        let lastInitial = contact.lastname[0];
        let initials = (firstInitial + lastInitial);
        colorAndInitials.push(setContactColors(contactColor, initials));
    }
}


/**
 *  This function returns the color and the initial of everyname in the contacts.
 *  
 * @param {string} contactColor - The color of the contact name.
 * @param {string} initials     - The initials of the contact name.
 */
function setContactColors(contactColor, initials) {
    return {
        name: initials,
        color: contactColor
    }
}


/**
 *  This function returns the color for each Progresssection-Button (4 Buttons instead of drag and drop in the responsive: To do, In Progress, Awating Feedback, Done).
 * 
 * @param {string} progressId - Progresssection id.
 */
function newProgressColor(progressId) {
    let progressColors = {
        neWTODO: "#d9534f",
        newInProgress: "#5bc0de",
        newFeedback: "#f0ad4e",
        newDone: "#5cb85c"
    };
    return (progressColors[progressId])
}