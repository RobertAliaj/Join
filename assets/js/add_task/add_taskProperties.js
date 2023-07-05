/**
 *  Opens a category folder in a dropdown menu.
 * 
 * @param {string} clicked - The ID of the category folder element that is clicked and should be opened.
 * @param {string} notClicked - The ID of the category folder element that is not clicked and should be closed.
 * @param {string} visible - The ID of the content element that should be made visible.
 * @param {string} notVisible - The ID of the content element that should be hidden.
 */
function openCategoryFolder(clicked, notClicked, visible, notVisible) {
  document.getElementById(clicked).classList.add("dropdown-category-open");
  document.getElementById(notClicked).classList.remove("dropdown-category-open");
  document.getElementById(visible).classList.remove("d-none");
  document.getElementById(notVisible).classList.add("d-none");
  document.getElementById("initialsContainer").classList.add("d-none");
}


/**
 * Closes a category folder in a dropdown menu.
 */
function closeCategoryFolder(clicked, visible, notVisible) {
  document.getElementById(clicked).classList.remove("dropdown-category-open");
  document.getElementById(visible).classList.add("d-none");
  document.getElementById(notVisible).classList.add("d-none");
  document.getElementById("initialsContainer").classList.remove("d-none");
}


/**
 * Removes the "clearAddButtons" element's "d-none" class and adds the "ddArrow" element's "d-none" class.
 * Also sets an attribute after a delay of 200 milliseconds.
 */
function removeClearBtnAndAddArrow() {
  document.getElementById("clearAddButtons").classList.add("d-none");
  document.getElementById("ddArrow").classList.remove("d-none");
  setTimeout(setAttribute, 200);
}


/**
 * Adds the "clearAddButtons" element's "d-none" class and removes the "ddArrow" element's "d-none" class.
 * Also removes the "onclick" attribute from the "contactsToAssingContainer" element.
 */
function addClearBtnAndRemoveArrow() {
  document.getElementById("clearAddButtons").classList.remove("d-none");
  document.getElementById("ddArrow").classList.add("d-none");
  document
    .getElementById("contactsToAssingContainer")
    .removeAttribute("onclick");
}


/**
 * Changes the style of the element based on the provided priority.
 */
function changeStyleForPriority(clicked) {
  if (clicked == "prioHigh") {
    document.getElementById(clicked).style = `background-color: rgb(236, 85, 32); color: white`;
  } else if (clicked == "prioMedium") {
    document.getElementById(clicked).style = `background-color: rgb(243, 173, 50); color: white`;
  } else if (clicked == "prioLow") {
    document.getElementById(clicked).style = `background-color: rgb(147, 222, 70); color: white`;
  }
}


/**
 * Resets the style and images of priority buttons.
 * @param {string} notClicked - The identifier of the button that was not clicked.
 * @param {string} alsoNotClicked - The identifier of the other button that was not clicked.
 */
function resetPrioButton(notClicked, alsoNotClicked) {
  document.getElementById(notClicked).style = ``;
  document.getElementById(alsoNotClicked).style = ``;
  document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
  document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
  document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
}


/**
 * Changes the color of the specified image.
 */
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


/**
 * Gets the CSS class based on the status of the subtask at the specified index.
 */
function getClass(i) {
  if (subtaskStatus[i] == true) {
    return (setClass = "");
  } else {
    return (setClass = "d-none");
  }
}


/**
 * Switches the icons and behavior of the subtask elements based on the boolean argument.
 * @param {boolean} booleanArgument - The boolean argument to determine the state.
 * @param {HTMLElement} addSubtask - The add subtask button element.
 * @param {HTMLElement} subtaskInput - The subtask input element.
 */
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


/**
 * Opens the create category section by modifying the relevant elements' classes and invoking other functions.
 */
function openCreateCategory() {
  document.getElementById("categoryPlaceholder").classList.add("d-none");
  document.getElementById("newCategoryContainer").classList.remove("d-none");
  document.getElementById("color-picker").classList.remove("d-none");
  pullDownMenu("category", "assingedTo", "moreCategorys", "moreContacts");
  getRandomColor();
}


/**
 * Closes the create category section by modifying the relevant elements' classes.
 */
function closeCreateCategory() {
  document.getElementById("categoryPlaceholder").classList.remove("d-none");
  document.getElementById("newCategoryContainer").classList.add("d-none");
  document.getElementById("color-picker").classList.add("d-none");
}


/**
 * Removes the "d-none" CSS class from the element with the specified report ID.
 */
function remove_D_NoneCSSByReportId(reportId) {
  document.getElementById(reportId).classList.remove("d-none");
}


/**
 * Adds the "d-none" CSS class to the element with the specified report ID.
 */
function add_D_NoneCSSByReportId(reportId) {
  document.getElementById(reportId).classList.add("d-none");
}


/**
 * Resets the background color and text color of the priority buttons.
 */
function resetColorOfPrioButtons(highPrio, midPrio, lowPrio) {
  highPrio.style.background = "white";
  midPrio.style.background = "white";
  lowPrio.style.background = "white";
  highPrio.style.color = "black";
  midPrio.style.color = "black";
  lowPrio.style.color = "black";
}


/**
 * Resets the image source of the priority buttons to their default images.
 */
function resetImgOfPrioButtons() {
  document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
  document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
  document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
}


/**
 * Retrieves the priority button elements by their IDs.
 */
function getIdOfPrioButtons() {
  let highPrio = document.getElementById("prioHigh");
  let midPrio = document.getElementById("prioMedium");
  let lowPrio = document.getElementById("prioLow");

  return [highPrio, midPrio, lowPrio];
}


/**
 * Generates a random color in hexadecimal format.
 */
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


/**
 * Applies the slide-in animation for the desktop view by modifying the classes of the specified elements.
 * @param {HTMLElement} greyBackground - The grey background element.
 * @param {HTMLElement} addTaskPopUp - The add task popup element.
 * @param {HTMLElement} profile - The profile element.
 * @param {HTMLElement} addTaskBtn - The add task button element.
 */
function slideInAnimationDesktop(greyBackground, addTaskPopUp, profile, addTaskBtn) {
  greyBackground.classList.add("d-none");
  addTaskPopUp.classList.remove("slide-out");
  addTaskPopUp.classList.add("slide-in");
  addTaskPopUp.classList.remove("d-none");
  profile.classList.add("d-none");
  addTaskBtn.classList.remove("d-none");
}


/**
 * Applies the slide-in animation for the responsive view by modifying the classes of the specified elements.
 */
function slideInAnimationResponsive(greyBackground, addTaskPopUp) {
  greyBackground.classList.remove("d-none");
  addTaskPopUp.classList.remove("slide-out");
  addTaskPopUp.classList.add("slide-in");
  addTaskPopUp.classList.remove("d-none");
}


/**
 * Opens the add task container and applies the appropriate slide-in animation based on the window width.
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


/**
 * Resets the priority buttons to their default state.
 */
function setPrioButtonsToDefault() {
  let prioId = getIdOfPrioButtons();
  resetColorOfPrioButtons(prioId[0], prioId[1], prioId[2]);
  resetImgOfPrioButtons();
}


/**
 * Removes the 'choosenCategory' class from all color circles in the color picker.
 */
function removeClassFromColorPicker() {
  let colorCircles = document.querySelectorAll('[id^="colorPickCircle"]');

  colorCircles.forEach((circle) => {
    circle.classList.remove('choosenCategory');
  });
}


/**
 * Selects a color by adding the 'choosenCategory' class to the specified color circle and sets the color for a new category.
 * @param {number} r - The red component value (0-255) of the selected color.
 * @param {number} g - The green component value (0-255) of the selected color.
 * @param {number} b - The blue component value (0-255) of the selected color.
 * @param {number} index - The index of the selected color circle.
 */
function selectedColor(r, g, b, index) {
  removeClassFromColorPicker();
  smallCirleColor = true;
  // Add the 'choosenCategory' class to the selected color circle
  let selectedCircle = document.getElementById('colorPickCircle' + index);
  selectedCircle.classList.add('choosenCategory');
  colorForNewCategory = `rgb(${r}, ${g}, ${b})`;
}


/**
 * Generates random colors for the color picker and assigns them to color circles.
 */
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


/**
 * Adds the "selection-point" class to the specified element to indicate selection.
 */
function addSelectedPoint(selected) {
  document.getElementById(selected).classList.add("selection-point");
}


/**
 * Selects a contact for a task by adding it to a collected contacts array, adding a selected point indicator,
 * managing initials and color, and switching contact icons.
 * @param {Array} collectedContact - The array to collect selected contacts.
 * @param {string} selectedContact - The selected contact to add to the collected contacts array.
 * @param {string} selected - The ID of the element representing the selected contact.
 * @param {string} colorOfContact - The color associated with the selected contact.
 */
function selectContactForTask(collectedContact, selectedContact, selected, colorOfContact) {
  collectedContact.push(selectedContact);
  addSelectedPoint(selected);
  manageInitials(selectedContact, colorOfContact);
  switchContactIcons();
}


/**
 * Deselects a contact for a task by removing it from a collected contacts array, managing initials and color,
 * removing the selected point indicator, and switching contact icons.
 * @param {Array} collectedContact - The array of collected contacts.
 * @param {string} selectedContact - The selected contact to remove from the collected contacts array.
 * @param {string} colorOfContact - The color associated with the deselected contact.
 * @param {string} selected - The ID of the element representing the deselected contact.
 */
function deselectContactforTask(collectedContact, selectedContact, colorOfContact, selected) {
  contactToRemove = collectedContact.indexOf(selectedContact);
  collectedContact.splice(contactToRemove, 1);
  manageInitials(selectedContact, colorOfContact);
  document.getElementById(selected).classList.remove("selection-point");
  switchContactIcons();
}


/**
 * This function is used to change the height of a div and display its contents
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


/**
 * Switches the contact icons based on the state of collected contacts and initials rendering.
 */
function switchContactIcons() {
  if (collectedContact.length == false || initialsRenderd == true) {
    removeClearBtnAndAddArrow()
  } else {
    addClearBtnAndRemoveArrow()
  }
}


/**
 * Closes the add task section by resetting the pull-down menus for assignedTo and category
 */
function closeAddTask() {
  pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys');
  clearTaskFields();
  clearContacts();
}


/**
 * Shows or hides the create task button based on the current URL.
 */
function showCreateTaskBtn() {
  if (
    window.location.href == 'http://127.0.0.1:5501/add_task.html' ||
    window.location.href == 'https://join.robert-aliaj.de/add_task.html'
  ) {
    document.getElementById('addTaskBtn').classList.remove('d-none')
  } else {
    document.getElementById('addTaskBtn').classList.add('d-none')
  }
}


/**
 * Sets the onclick event for a color circle in the color picker.
 * Extracts the RGB color value from the color circle's style and assigns it to the onclick event.
 */
function setOnclickForColorpicker(colorCircle, index) {
  rgbColor = colorCircle.style["cssText"];
  i = rgbColor.length;
  onclickColor = rgbColor.slice(22, i - 2);
  colorCircle.setAttribute("onclick", `selectedColor(${onclickColor}, ${index})`);
}


/**
 * Adds CSS classes to a popup element to make it visible and styled as a popup.
 */
function addPopUpCSS(popUpId) {
  popUpId.classList.remove("d-none");
  popUpId.classList.add("popUp");
}


/**
 * Switches the icons and visibility of the subtask input and create subtask elements.
 */
function switchSubtaskIcons() {
  let addSubtask = document.getElementById("addSubtask");
  let createSubtask = document.getElementById("createSubtask");
  let subtaskInput = document.getElementById("subtaskInput");
  let createSubtaskClass = createSubtask.classList.value;
  let divClass = "d-none";
  if (createSubtaskClass.includes(divClass) == true) {
    booleanArgument = createSubtaskClass.includes(divClass);
    switchIconsfromSubtask(booleanArgument, addSubtask, subtaskInput);
  } else {
    booleanArgument = createSubtaskClass.includes(divClass);
    switchIconsfromSubtask(booleanArgument, addSubtask, subtaskInput);
  }
}


/**
Pushes the initial and color data of a contact to the 'initials' array.
Clears the selectedContact variable.
*/
function pushInitialAndColorData(initial, colorOfContact, selectedContact) {
  initials.push({
    initial: initial,
    color: colorOfContact,
  });
  selectedContact = "";
}


/**
Removes the initial and color data of a contact from the 'initials' array.
@param {string} initial - The initial of the contact to remove.
@param {string} selectedContact - The selected contact.
*/
function removeInitialAndColorData(initial, selectedContact) {
  const indexToRemove = initials.findIndex((obj) => obj.initial === initial);
  initials.splice(indexToRemove, 1);
  selectedContact = "";
}