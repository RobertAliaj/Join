let tasks = [];
let contacts = [];
let collectedContact = [];
let subtasks = [];
let subtaskStatus = [];
let initials = [];

let selectedCategory;
let newCategory;
let currentProgress;
let prio;
let colorForNewCategory;

let required = true;
let initialsRenderd = false;
let smallCirleColor = false;


/**
 * this is an object that is neccesary to create a task for the board
 * @param {object} task - this object defines all components you need for, to create a new task
 * @param {string} title - describes the title of the new task
 * @param {string} describtion - describes the description of the new task
 * @param {string} category - describes the category in which you put your new task, for example: media, design, marketing etc.
 * @param {string} assigned_to - defines one or more persons that have to do the task
 * @param {number} due_date - defines the date deadline for the task, which you can choose from the datepicker function -> addTaskSetDate()
 * @param {string} prio - defines the priority from the task which can be: urgent, medium or low
 */
let task = {
  title: "",
  description: "",
  category: "",
  assigned_to: [],
  due_date: "",
  prio: "",
  subtasks: {
    name: [],
    status: [],
  },
  progress: "",
};


async function initAddTask() {
  await includePlusInit();
  saveCurrentUser();
  setProfilePicture();
  loadInfos();
  showCreateTaskBtn();
}

function loadInfos() {
  renderCategorys();
  renderContacts();
}


function changeProgress(progressColumn) {
  currentProgress = progressColumn;
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

/**
 * Adds the current date to the date input field of a task set.
 * 
 * @param {number} today - Get the current date
 * @param {string} dateInput.value - Set the input field value to the current date
 */
function addTaskSetDate() {
  let today = new Date();
  let dateInput = document.getElementById('date');
  dateInput.value = today.toISOString().slice(0, 10);
}


/**
 * Renders the categories and adds them to the category container
 * 
 * @param {string} categoryContainer - Get the category container from the document
 * @param {*} categoryContainer.innerHtml - Clear the category container
 * 
 */

function renderCategorys() {
  categoryContainer = document.getElementById("loadedCategorys");
  categoryContainer.innerHTML = "";
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i].name;
    let categoryColor = categorys[i].color;
    categoryContainer.innerHTML += renderCategorysHtml(category, categoryColor);
  }
}

/**
 * This function renders all available contact
 */
function renderContacts() {
  renderYouContact();
  contactContainer = document.getElementById("loadedContacts");
  contactContainer.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    let you = localStorage.getItem("currentUser");

    if (contacts[i]["email"] !== you) {
      let contactName = combineNames(contacts, i);
      let colorOfContact = contacts[i]["color"];
      contactContainer.innerHTML += renderContactsHtml(contactName, colorOfContact, i);
    }
  }
}

function renderYouContact() {
  let you = localStorage.getItem("currentUser");
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["email"] === you) {
      let contactName = combineNames(contacts, i);
      let color = contacts[i]["color"];
      renderYou(contactName, color);
    }
  }
}

function renderYou(contactName, colorOfContact) {
  let container = document.getElementById("selectYouContainer");
  container.innerHTML += renderYouHtml(contactName, colorOfContact);
}

function combineNames(contacts, i) {
  let firstname = contacts[i].firstname;
  let lastname = contacts[i].lastname;
  let contact = firstname + " " + lastname;
  return contact;
}

function selectCategory(category, categoryColor) {
  document.getElementById("chosenCategory").innerHTML = selectedCategoryHtml(category, categoryColor);
  selectedCategory = category;
  openOrClose = document.getElementById("category").classList[1];
  if (openOrClose == "dropdown-category-open") {
    pullDownMenu("category", "assignedTo", "moreCategorys", "moreContacts");
  }
}

function selectedForTask(selectedContact, selected, colorOfContact) {
  if (collectedContact.includes(selectedContact) == false) {
    collectedContact.push(selectedContact);
    addSelectedPoint(selected);
    manageInitials(selectedContact, colorOfContact);
    switchContactIcons();
  } else {
    contactToRemove = collectedContact.indexOf(selectedContact);
    collectedContact.splice(contactToRemove, 1);
    manageInitials(selectedContact, colorOfContact);
    document.getElementById(selected).classList.remove("selection-point");
    switchContactIcons();
  }
}

function addSelectedPoint(selected) {
  document.getElementById(selected).classList.add("selection-point");
}

function manageInitials(selectedContact, colorOfContact) {
  let initial = getFirstLetters(selectedContact);
  const exists = initials.some((obj) => obj.initial === initial);

  if (!exists) {
    initials.push({
      initial: initial,
      color: colorOfContact,
    });
    selectedContact = "";
  } else {
    const indexToRemove = initials.findIndex((obj) => obj.initial === initial);
    initials.splice(indexToRemove, 1);
    selectedContact = "";
  }
}

function switchContactIcons() {
  if (collectedContact.length == false || initialsRenderd == true) {
    removeClearBtnAndAddArrow()
  } else {
    addClearBtnAndRemoveArrow()
  }
}

function setAttribute() {
  document
    .getElementById("contactsToAssingContainer")
    .setAttribute(
      "onclick",
      "pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys')"
    );
}

function getFirstLetters(name) {
  firstLetters = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return firstLetters;
}


function clearContacts() {
  let you = document.getElementById("point");
  if (you) {
    you.classList.remove("selection-point");
  }
  pullDownMenu("assingedTo", "category", "moreContacts", "moreCategorys");
  collectedContact = [];
  initials = [];
  switchContactIcons();
  renderContacts();
  renderInitials();
}

function addContacts() {
  initialsRenderd = true;
  switchContactIcons();
  renderInitials();
  pullDownMenu("assingedTo", "category", "moreContacts", "moreCategorys");
}

function renderInitials() {
  initialsContainer = document.getElementById("initialsContainer");
  initialsContainer.innerHTML = "";

  for (let i = 0; i < initials.length; i++) {
    initialsContainer.innerHTML += renderInitialsHtml(initials, i)
  }
}

/**
 * @param {*} clicked
 * @param {*} notClicked
 * @param {*} alsoNotClicked
 */

function priority(clicked, notClicked, alsoNotClicked, img) {
  resetPrioButton(notClicked, alsoNotClicked);
  if (clicked == "prioHigh") {
    setPriority(clicked, img);
  }
  if (clicked == "prioMedium") {
    setPriority(clicked, img);
  }
  if (clicked == "prioLow") {
    setPriority(clicked, img);
  }
}
function setPriority(clicked, img) {
  if (clicked == "prioHigh") {
    changeStyleForPriority(clicked);
    changeColor(img);
    prio = "urgent";
  } else if (clicked == "prioMedium") {
    changeStyleForPriority(clicked)
    changeColor(img);
    prio = "medium";
  } else if (clicked == "prioLow") {
    changeStyleForPriority(clicked)
    changeColor(img);
    prio = "low";
  }
}

function addSubtask() {
  let subtaskInput = document.getElementById("subtaskInput");
  if (subtaskInput.value.length > 0) {
    subtasks.push(subtaskInput.value);
    subtaskStatus.push(false);
    renderSubtasks();
    switchSubtaskIcons();
  }
}

function removeSubtask(i) {
  subtasks.splice(i, 1);
  subtaskStatus.splice(i, 1)
  renderSubtasks();
}

function renderSubtasks() {
  let subtaskContainer = document.getElementById("addedSubtasks");
  subtaskContainer.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let setClass = getClass(i);
    subtaskContainer.innerHTML += renderSubtasksHtml(i, setClass, subtasks);
  }
}

/**
* this function changes the CSS-class of the input field.
* If you click in the input field, add a subtask or press cancel,
* you will switch between 2 different views on the right side of the input field.
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


function setStatus(divID, i) {
  if (subtaskStatus[i] == false) {
    document.getElementById(divID).classList.remove("d-none");
    subtaskStatus.splice(i, 1, true);
  } else {
    document.getElementById(divID).classList.add("d-none");
    subtaskStatus.splice(i, 1, false);
  }
}

function addCategory() {
  categoryInputFiled = document.getElementById("categoryInput");
  newCategory = categoryInputFiled.value;
  if (categoryInputFiled.value.length > 0 && smallCirleColor) {
    closeCreateCategory();
    selectCategory(newCategory, colorForNewCategory);
    removeClassFromColorPicker();
    smallCirleColor = false;
  }
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



function setOnclickForColorpicker(colorCircle, index) {
  rgbColor = colorCircle.style["cssText"];
  i = rgbColor.length;
  onclickColor = rgbColor.slice(22, i - 2);
  colorCircle.setAttribute("onclick", `selectedColor(${onclickColor}, ${index})`);
}


function selectedColor(r, g, b, index) {
  removeClassFromColorPicker();
  smallCirleColor = true;
  // Der ausgewählten Farbkreis die Klasse 'choosenCategory' hinzufügen
  let selectedCircle = document.getElementById('colorPickCircle' + index);
  selectedCircle.classList.add('choosenCategory');

  colorForNewCategory = `rgb(${r}, ${g}, ${b})`;
}


function removeClassFromColorPicker() {
  // Alle Farbkreise abrufen
  let colorCircles = document.querySelectorAll('[id^="colorPickCircle"]');

  // Von allen Farbkreisen die Klasse 'choosenCategory' entfernen
  colorCircles.forEach((circle) => {
    circle.classList.remove('choosenCategory');
  });
}

async function saveNewCategory() {
  category = {
    name: `${newCategory}`,
    color: `${colorForNewCategory}`,
  };
  await pushCategoryInCategorys();
}

async function pushCategoryInCategorys() {
  i = categorys.length;
  categorys.splice(i, 0, category);
  jsonFromServer["categorys"] = categorys;
  renderCategorys();
  await saveJSONToServer();
}


function getTitleOrDescription(inputId, reportId) {
  let taskInfo = document.getElementById(inputId).value;
  if (taskInfo == "") {
    remove_D_NoneCSSByReportId(reportId);
    required = true;
  } else {
    required = false;
    add_D_NoneCSSByReportId(reportId);
    return taskInfo;
  }
}


function getCategory(reportId) {
  if (selectedCategory == undefined) {
    remove_D_NoneCSSByReportId(reportId);
    required = true;
  } else {
    required = false;
    add_D_NoneCSSByReportId(reportId);
    return selectedCategory;
  }
}

function getContact(reportId) {
  if (collectedContact == "") {
    remove_D_NoneCSSByReportId(reportId);
    required = true;
  } else {
    required = false;
    add_D_NoneCSSByReportId(reportId);
    return collectedContact;
  }
}

function getDate(reportId) {
  let chosenDate = document.getElementById("date").value;
  if (chosenDate == "") {
    remove_D_NoneCSSByReportId(reportId);
    required = true;
  } else {
    add_D_NoneCSSByReportId(reportId);
    required = false;
    return chosenDate;
  }
}

function getPrio(reportId) {
  if (prio == undefined) {
    remove_D_NoneCSSByReportId(reportId);
    required = true;
  } else {
    required = false;
    add_D_NoneCSSByReportId(reportId);
    return prio;
  }

}

function pushSubtask() {
  for (let i = 0; i < subtasks.length; i++) {
    task.subtasks.name.push(subtasks[i]) || [];
  }
}


function pushStatus() {
  for (let i = 0; i < subtaskStatus.length; i++) {
    task.subtasks.status.push(subtaskStatus[i]);
  }
}

function collectAllInfos() {
  task.title = getTitleOrDescription("titleInput", "titleReport");
  task.description = getTitleOrDescription("descriptionInput", "descriptionReport");
  task.category = getCategory("categoryReport");
  task.assigned_to = getContact("descriptionReport");
  task.due_date = getDate("dateReport");
  task.prio = getPrio("prioReport");
  task.progress = currentProgress ? currentProgress : 'TODO';

  pushSubtask();
  pushStatus();

  if (collectedContact.length > 0 && task.category && task.title && task.description && task.assigned_to && task.due_date) {
    pushTaskInTasks();
    saveNewCategory();
  }
}

function closeAddTask() {
  pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys');
  clearTaskFields();
  clearContacts();
}

function clearTaskFields() {
  let valuesOfInputs = getIdsOfInputFields();
  setPrioButtonsToDefault();
  clearValues(valuesOfInputs);
  task = {
    title: "",
    description: "",
    category: "",
    assigned_to: [],
    due_date: "",
    prio: "",
    subtasks: {
      name: [],
      status: [],
    },
    progress: "",
  };
}

function getIdsOfInputFields() {
  let titleField = document.getElementById("titleInput");
  let descriptionField = document.getElementById("descriptionInput");
  let chosenDateField = document.getElementById("date");
  let categoryField = document.getElementById("chosenCategory");
  let contactField = document.getElementById("initialsContainer");

  return {
    titleField,
    descriptionField,
    chosenDateField,
    categoryField,
    contactField,
  };
}

function setPrioButtonsToDefault() {
  let prioId = getIdOfPrioButtons();
  resetColorOfPrioButtons(prioId[0], prioId[1], prioId[2]);
  resetImgOfPrioButtons();
}

function clearValues(valuesOfInputs) {
  subtasks = [];
  renderSubtasks();

  valuesOfInputs = {
    titleField: { value: "" },
    descriptionField: { value: "" },
    chosenDateField: { value: "" },
    categoryField: { innerHTML: "Select task category", value: "" },
    contactField: { innerHTML: "" }
  };
}

async function pushTaskInTasks() {
  if (required == false) {
    tasks.push(task);
    jsonFromServer["tasks"] = tasks;
    await saveJSONToServer();
    taskUploaded();
    // await backend.deleteItem("users");
  }
}


function showCreateTaskBtn() {
  if (window.location.href == 'http://127.0.0.1:5501/add_task.html' || window.location.href == 'https://gruppe-join-421.developerakademie.net/add_task.html') {
    document.getElementById('addTaskBtn').classList.remove('d-none')
  } else {
    document.getElementById('addTaskBtn').classList.add('d-none')
  }
}


function taskUploaded() {
  // Hier muss das Url noch dynamisch angepasst werden, erst wenn das Projekt fertig auf dem Server liegt
  if (window.location.href == 'http://127.0.0.1:5501/board.html' || window.location.href == 'https://gruppe-join-421.developerakademie.net/board.html') {
    closeAddTask();
    closeAddTaskWrapper();
    initBoard();

  } else {
    let popUpId = document.getElementById("successfulUpload");
    popUpId.classList.remove("d-none");
    popUpId.classList.add("popUp");

    setTimeout(function () {
      popUpId.innerHTML = `redirecting to the board...`;
      clearTaskFields();
    }, 500);

    setTimeout(function () {
      window.location.href = "board.html";
    }, 1000);
  }

}

function directToNewContact() {
  localStorage.setItem('inviteContact', true);
  window.location.href = 'contacts.html';
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

