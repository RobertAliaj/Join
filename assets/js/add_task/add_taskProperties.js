function openCategoryFolder(clicked, notClicked, visible, notVisible) {
    document.getElementById(clicked).classList.add("dropdown-category-open");
    document.getElementById(notClicked).classList.remove("dropdown-category-open");
    document.getElementById(visible).classList.remove("d-none");
    document.getElementById(notVisible).classList.add("d-none");
    document.getElementById("initialsContainer").classList.add("d-none");
}

function closeCategoryFolder(clicked, visible, notVisible) {
    document.getElementById(clicked).classList.remove("dropdown-category-open");
    document.getElementById(visible).classList.add("d-none");
    document.getElementById(notVisible).classList.add("d-none");
    document.getElementById("initialsContainer").classList.remove("d-none");
}

function removeClearBtnAndAddArrow() {
    document.getElementById("clearAddButtons").classList.add("d-none");
    document.getElementById("ddArrow").classList.remove("d-none");
    setTimeout(setAttribute, 200);
}

function addClearBtnAndRemoveArrow() {
    document.getElementById("clearAddButtons").classList.remove("d-none");
    document.getElementById("ddArrow").classList.add("d-none");
    document
        .getElementById("contactsToAssingContainer")
        .removeAttribute("onclick");
}

function changeStyleForPriority(clicked) {
    if (clicked == "prioHigh") {
        document.getElementById(clicked).style = `background-color: rgb(236, 85, 32); color: white`;
    } else if (clicked == "prioMedium") {
        document.getElementById(clicked).style = `background-color: rgb(243, 173, 50); color: white`;
    } else if (clicked == "prioLow") {
        document.getElementById(clicked).style = `background-color: rgb(147, 222, 70); color: white`;
    }
}

function resetPrioButton(notClicked, alsoNotClicked) {
    document.getElementById(notClicked).style = ``;
    document.getElementById(alsoNotClicked).style = ``;
    document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
    document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
    document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
}

function changeColor(img) {
    imgPath = document.getElementById(img);
    if (img == "prioHighImg") {
        imgPath.src = `assets/img/prio_high_white.svg`;
    }
    if (img == "prioMediumImg") {
        imgPath.src = `assets/img/prio_medium_white.svg`;
    }
    if (img == "prioLowImg") {
        imgPath.src = `assets/img/prio_low_white.svg`;
    }
}



function getClass(i) {
    if (subtaskStatus[i] == true) {
        return (setClass = "");
    } else {
        return (setClass = "d-none");
    }
}

function switchIconsfromSubtask(booleanArgument, addSubtask, subtaskInput) {
    if (booleanArgument == true) {
      subtaskInput.removeAttribute("onclick");
      createSubtask.classList.remove("d-none");
      addSubtask.classList.add("d-none");
      subtaskInput.focus();
    } else {
      subtaskInput.setAttribute("onclick", "switchSubtaskIcons()");
      createSubtask.classList.add("d-none");
      addSubtask.classList.remove("d-none");
      subtaskInput.blur();
      subtaskInput.value = "";
    }
  }

  function openCreateCategory() {
    document.getElementById("categoryPlaceholder").classList.add("d-none");
    document.getElementById("newCategoryContainer").classList.remove("d-none");
    document.getElementById("color-picker").classList.remove("d-none");
    pullDownMenu("category", "assingedTo", "moreCategorys", "moreContacts");
    getRandomColor();
  }
  
  function closeCreateCategory() {
    document.getElementById("categoryPlaceholder").classList.remove("d-none");
    document.getElementById("newCategoryContainer").classList.add("d-none");
    document.getElementById("color-picker").classList.add("d-none");
  }

  function remove_D_NoneCSSByReportId(reportId){
    document.getElementById(reportId).classList.remove("d-none");
  }
  
  function add_D_NoneCSSByReportId(reportId){
    document.getElementById(reportId).classList.add("d-none");
  }

  function resetColorOfPrioButtons(highPrio, midPrio, lowPrio){
    highPrio.style.background = "white";
    midPrio.style.background = "white";
    lowPrio.style.background = "white";
    highPrio.style.color = "black";
    midPrio.style.color = "black";
    lowPrio.style.color = "black";
  }

  function resetImgOfPrioButtons() {
    document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
    document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
    document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
  }

  function getIdOfPrioButtons(){
    let highPrio = document.getElementById("prioHigh");
    let midPrio = document.getElementById("prioMedium");
    let lowPrio = document.getElementById("prioLow");
  
    return [highPrio, midPrio, lowPrio];
  }

  async function generateRandomColor() {
    let color = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
  
    while (r + g + b < (255 * 3) / 2) {
      color = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    }
    return color;
  }

  function slideInAnimationDesktop(greyBackground, addTaskPopUp, profile, addTaskBtn){
    greyBackground.classList.add("d-none");
    addTaskPopUp.classList.remove("slide-out");
    addTaskPopUp.classList.add("slide-in");
    addTaskPopUp.classList.remove("d-none");
    profile.classList.add("d-none");
    addTaskBtn.classList.remove("d-none");
  }

  function slideInAnimationResponsive(greyBackground, addTaskPopUp){
    greyBackground.classList.remove("d-none");
    addTaskPopUp.classList.remove("slide-out");
    addTaskPopUp.classList.add("slide-in");
    addTaskPopUp.classList.remove("d-none");
  }

  
/**
 * This function is opening the addTask container
 */
function openAddTaskContainer(idx) {
  let greyBackground = document.getElementById("greyBackground");
  let addTaskPopUp = document.getElementById("addTaskWrapper");
  let profile = document.getElementById('userPicture');
  let addTaskBtn = document.getElementById("addTaskBtn");

  if (window.innerWidth < 1300) {
    slideInAnimationDesktop(greyBackground, addTaskPopUp, profile, addTaskBtn)
  } else {
    slideInAnimationResponsive(greyBackground, addTaskPopUp);
  }
  loadInfos();
  
  if (idx) {
    selectedForTask(combineNames(contacts, idx), `contactName${idx}`, contacts[idx]["color"]);
  }
  pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys');
  addContacts();
}

function setPrioButtonsToDefault() {
  let prioId = getIdOfPrioButtons();
  resetColorOfPrioButtons(prioId[0], prioId[1], prioId[2]);
  resetImgOfPrioButtons();
}

function removeClassFromColorPicker() {
  // Alle Farbkreise abrufen
  let colorCircles = document.querySelectorAll('[id^="colorPickCircle"]');

  // Von allen Farbkreisen die Klasse 'choosenCategory' entfernen
  colorCircles.forEach((circle) => {
    circle.classList.remove('choosenCategory');
  });
}

function selectedColor(r, g, b, index) {
  removeClassFromColorPicker();
  smallCirleColor = true;
  // Der ausgewählten Farbkreis die Klasse 'choosenCategory' hinzufügen
  let selectedCircle = document.getElementById('colorPickCircle' + index);
  selectedCircle.classList.add('choosenCategory');

  colorForNewCategory = `rgb(${r}, ${g}, ${b})`;
}

async function getRandomColor() {
  categoryInputFiled = document.getElementById("categoryInput");
  for (let index = 0; index < 6; index++) {
    generatedColor = await generateRandomColor();
    onclickColor = `selectedColor(#${generatedColor})`;
    colorCircle = document.getElementById("colorPickCircle" + index);
    colorCircle.style = `background-color: ${generatedColor}`;
    setOnclickForColorpicker(colorCircle, index);
  }
}

function addSelectedPoint(selected) {
  document.getElementById(selected).classList.add("selection-point");
}

function selectContactForTask(collectedContact, selectedContact, selected, colorOfContact) {
  collectedContact.push(selectedContact);
  addSelectedPoint(selected);
  manageInitials(selectedContact, colorOfContact);
  switchContactIcons();
}

function deselectContactforTask(collectedContact, selectedContact, colorOfContact, selected){
  contactToRemove = collectedContact.indexOf(selectedContact);
  collectedContact.splice(contactToRemove, 1);
  manageInitials(selectedContact, colorOfContact);
  document.getElementById(selected).classList.remove("selection-point");
  switchContactIcons();
}

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
  if (openMenu == "dropdown-category-closed") {
    openCategoryFolder(clicked, notClicked, visible, notVisible);
  } else {
    closeCategoryFolder(clicked, visible, notVisible);
  }
  if (clicked == "assingedTo") {
    switchContactIcons();
    renderInitials();
    initialsRenderd = false;
  }
}

function renderAvailableContacts(contacts, i){
  let contactName = combineNames(contacts, i);
  let colorOfContact = contacts[i]["color"];
  contactContainer.innerHTML += renderContactsHtml(contactName, colorOfContact, i);
}

function switchContactIcons() {
  if (collectedContact.length == false || initialsRenderd == true) {
    removeClearBtnAndAddArrow()
  } else {
    addClearBtnAndRemoveArrow()
  }
}

function closeAddTask() {
  pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys');
  clearTaskFields();
  clearContacts();
}

function showCreateTaskBtn() {
  if (window.location.href == 'http://127.0.0.1:5501/add_task.html' || window.location.href == 'https://gruppe-join-421.developerakademie.net/add_task.html') {
    document.getElementById('addTaskBtn').classList.remove('d-none')
  } else {
    document.getElementById('addTaskBtn').classList.add('d-none')
  }
}