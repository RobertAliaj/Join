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


/**
 * this function initals all infos and functions you need,
 * to load the addTask page and create a new Task and send it to the server or pushes it to the board.
 */
async function initAddTask() {
  await includePlusInit();
  saveCurrentUser();
  setProfilePicture();
  loadInfos();
  showCreateTaskBtn();
}


/**
 * this function renders all categorys or contacts that are available 
 */
function loadInfos() {
  renderCategorys();
  renderContacts();
}


/**
 * this function sets the progress status variable which depens in which column the task is
 */
function changeProgress(progressColumn) {
  currentProgress = progressColumn;
}


/**
 * Adds the current date to the date input field of a task set.
 */
function addTaskSetDate() {
  let today = new Date();
  let dateInput = document.getElementById('date');
  dateInput.value = today.toISOString().slice(0, 10);
}


/**
 * Renders the categories and adds them to the category container
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
 * This function renders all available contacts
 * @param {string} contactContainer - get the contact containter id from the document
 * @param {string} you - you is the user that ist currently logged in
 */
function renderContacts() {
  renderYouContact();
  contactContainer = document.getElementById("loadedContacts");
  contactContainer.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let you = localStorage.getItem("currentUser");
    if (contacts[i]["email"] !== you) {
      renderAvailableContacts(contacts, i)
    }
  }
}


/**
 * this function renders the data of the currentUser to choose it from the contacts list
 */
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


/**
 * this function renders the name and color for the currentUser
 */
function renderYou(contactName, colorOfContact) {
  let container = document.getElementById("selectYouContainer");
  container.innerHTML += renderYouHtml(contactName, colorOfContact);
}


/**
 * this function renturns the name and the surname of a contact
 */
function combineNames(contacts, i) {
  let firstname = contacts[i].firstname;
  let lastname = contacts[i].lastname;
  let contact = firstname + " " + lastname;
  return contact;
}


/**
 * this function selects a chosen category with his data and will be pushed to the board if you create a task
 */
function selectCategory(category, categoryColor) {
  document.getElementById("chosenCategory").innerHTML = selectedCategoryHtml(category, categoryColor);
  selectedCategory = category;
  openOrClose = document.getElementById("category").classList[1];
  if (openOrClose == "dropdown-category-open") {
    pullDownMenu("category", "assignedTo", "moreCategorys", "moreContacts");
  }
}


/**
 * this function select the contacts for the selected task which will be pushed to the board if you create a task.
 */
function selectedForTask(selectedContact, selected, colorOfContact) {
  if (collectedContact.includes(selectedContact) == false) {
    selectContactForTask(collectedContact, selectedContact, selected, colorOfContact);
  } else {
    deselectContactforTask(collectedContact, selectedContact, colorOfContact, selected)
  }
}


/**
 * this function get the first letter of the name and of the surname
 *  and pushes into the initials array and it checks if it exit twice or not
 */

function manageInitials(selectedContact, colorOfContact) {
  let initial = getFirstLetters(selectedContact);
  const exists = initials.some((obj) => obj.initial === initial);

  if (!exists) {
    pushInitialAndColorData(initial, colorOfContact)
  } else {
    removeInitialAndColorData(initial, colorOfContact)
  }
}


/**
 * this function is necessary for the pulldownMenu function
 */
function setAttribute() {
  document
    .getElementById("contactsToAssingContainer")
    .setAttribute(
      "onclick",
      "pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys')"
    );
}


/**
 * 
 * @param {string} name - this variable is the name of the contact 
 * @returns - it returns the first Letter of a name for example: name: Alex -> returns A.
 */
function getFirstLetters(name) {
  firstLetters = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return firstLetters;
}


/**
 * this function deselect the contact from the contactslist and the belongig data, like initials etc.
 */
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


/**
 * this function open the pullDownMenu to selecting the chosen contact from contactslist
 */
function addContacts() {
  initialsRenderd = true;
  switchContactIcons();
  renderInitials();
  pullDownMenu("assingedTo", "category", "moreContacts", "moreCategorys");
}


/**
 * this function renders the initials of the selected contacts
 */
function renderInitials() {
  initialsContainer = document.getElementById("initialsContainer");
  initialsContainer.innerHTML = "";

  for (let i = 0; i < initials.length; i++) {
    initialsContainer.innerHTML += renderInitialsHtml(initials, i)
  }
}


/**
 * this function checks the three prio buttons (urgent, medium and low) and permits only one button
 * After i selected a prio button of my choice the other buttons will be reseted and the css changes to default.
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


/**
 *this function changes the style of the prio button and sets the prio variable depending which button you clicked
 */
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


/**
 * this function adds a subtask for the new Task, you can add multiple subtasks
 */
function addSubtask() {
  let subtaskInput = document.getElementById("subtaskInput");
  if (subtaskInput.value.length > 0) {
    subtasks.push(subtaskInput.value);
    subtaskStatus.push(false);
    renderSubtasks();
    switchSubtaskIcons();
  }
}


/**
 * this funcion removes a subtask if you inadvertently created a subtask too much
 */
function removeSubtask(i) {
  subtasks.splice(i, 1);
  subtaskStatus.splice(i, 1)
  renderSubtasks();
}


/**
 * this function renders the created subtask
 */
function renderSubtasks() {
  let subtaskContainer = document.getElementById("addedSubtasks");
  subtaskContainer.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    let setClass = getClass(i);
    subtaskContainer.innerHTML += renderSubtasksHtml(i, setClass, subtasks);
  }
}


/**
 * this function add new category, therefore you write a text and choose a color for it
 */
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


/**
 * this function declares name and color for the category
 */
async function saveNewCategory() {
  category = {
    name: `${newCategory}`,
    color: `${colorForNewCategory}`,
  };
  await pushCategoryInCategorys();
}


/**
 * this function pushes the category into the categorys Array and save it to the server
 */
async function pushCategoryInCategorys() {
  i = categorys.length;
  categorys.splice(i, 0, category);
  jsonFromServer["categorys"] = categorys;
  renderCategorys();
  await saveJSONToServer();
}


/**
 * this function collect all the necessary infos from the input or selecteable fields to create a new task
 */
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


/**
 * this function clear all inputs and values from the task array and from the input fields,
 * also sets the prio buttons to default
 */
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


/**
 * this function clear all values and innerHTML`s from the add Task page
 */
function clearValues(valuesOfInputs) {
  subtasks = [];
  renderSubtasks();

  valuesOfInputs.titleField.value = "";
  valuesOfInputs.descriptionField.value = "";
  valuesOfInputs.chosenDateField.value = "";
  valuesOfInputs.categoryField.value = "";
  valuesOfInputs.categoryField.innerHTML = "Select task category";
  valuesOfInputs.contactField.innerHTML = "";
}

/**
 * this function checks if all fields are requiered and pushes the new created task to the Tasks array from the server
 */
async function pushTaskInTasks() {
  if (required == false) {
    tasks.push(task);
    jsonFromServer["tasks"] = tasks;
    await saveJSONToServer();
    taskUploaded();
  }
}


/**
 * this function creates a popUp, clear the taskfields if the upload was successful and redirects you to the board page
 */
function taskUploaded() {
  if (window.location.href == 'http://127.0.0.1:5501/board.html' || window.location.href == 'https://join.robert-aliaj.de/board.html') {
    closeAddTask();
    closeAddTaskWrapper();
    initBoard();

  } else {
    let popUpId = document.getElementById("successfulUpload");
    addPopUpCSS(popUpId);
    setTimeout(function () {
      popUpId.innerHTML = `redirecting to the board...`;
      clearTaskFields();
    }, 500);

    setTimeout(function () {
      window.location.href = "board.html";
    }, 1000);
  }

}

/**
 * this function sends you to the contacts page 
 */
function directToNewContact() {
  localStorage.setItem('inviteContact', true);
  window.location.href = 'contacts.html';
}


/**
 * Renders the available contacts by generating HTML for each contact and appending it to the contact container.
 */
function renderAvailableContacts(contacts, i) {
  let contactName = combineNames(contacts, i);
  let colorOfContact = contacts[i]["color"];
  contactContainer.innerHTML += renderContactsHtml(contactName, colorOfContact, i);
}