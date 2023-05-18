let newContacts = [];
let letters = [];

async function initContacts() {
  await includePlusInit();
  showContacts();
}

async function refreshContacts() {
  jsonFromServer["contacts"] = contacts;
  await saveJSONToServer();
}

function createNewContact() {
  submitContact();
  closeNewContact();
  showContacts();
}

async function submitContact() {
  let name = document.getElementById("name");
  let mail = document.getElementById("mail");
  let phone = document.getElementById("phone");
  let color = generateRandomColor();

  if (WordCount(name) === 1) {
    let newContact = {
      firstname: name.value,
      lastname: "",
      email: mail.value,
      phone: phone.value,
      color: color,
    };
    contacts.push(newContact);
    await backend.setItem("contacts", JSON.stringify(contacts));
  }
  if (WordCount(name) === 2) {
    let newContact = {
      firstname: name.value.split(" ")[0],
      lastname: name.value.split(" ")[1],
      email: mail.value,
      phone: phone.value,
      color: color,
    };
    contacts.push(newContact);
    await backend.setItem("contacts", JSON.stringify(contacts));
  }
}

function WordCount(str) {
  let arr = str.value.split(" ");
  return arr.filter((word) => word !== "").length;
}

function openCreateContact() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("newContactContainer").classList.remove("d-none");
  document.getElementById("newContactContainer").innerHTML =
    createContactHtml();
  if (window.innerWidth < 801) {
    document.getElementById("close").src = "assets/img/close_white.png";
    document.getElementById("joinSmall").style.display = "none";
    document.getElementById("cancle").style.display = "none";
  }
  fadeIn();
  slideIn("newContactContainer");
}

function closeNewContact() {
  slideOut("newContactContainer");
  fadeOut();
  setTimeout(function () {
    document.getElementById("overlay").classList.add("d-none");
    document.getElementById("newContactContainer").classList.add("d-none");
  }, 400);
}

function showContacts() {
  if (window.innerWidth < 1001) {
    document.getElementById("newContactButtonResponsive").style.display =
      "flex";
  }
  createLetters();
  displayContacts();
}

function fadeIn() {
  document.getElementById("overlay").classList.remove("fade-out");
  document.getElementById("overlay").classList.add("fade-in");
}

function slideIn(container) {
  if (container === "newContactContainer") {
    document
      .getElementById("newContactContainer")
      .classList.remove("slide-out");
    document.getElementById("newContactContainer").classList.add("slide-in");
  } else {
    document
      .getElementById("editContactContainer")
      .classList.remove("slide-out");
    document.getElementById("editContactContainer").classList.add("slide-in");
  }
}

function fadeOut() {
  document.getElementById("overlay").classList.remove("fade-in");
  document.getElementById("overlay").classList.add("fade-out");
}

function slideOut(container) {
  if (container === "newContactContainer") {
    document.getElementById("newContactContainer").classList.remove("slide-in");
    document.getElementById("newContactContainer").classList.add("slide-out");
  } else {
    document
      .getElementById("editContactContainer")
      .classList.remove("slide-in");
    document.getElementById("editContactContainer").classList.add("slide-out");
  }
}

function createLetters() {
  let contactContainer = document.getElementById("contacts");

  if (contacts.length > 0) {
    contactContainer.innerHTML = "";

    for (j = 0; j < contacts.length; j++) {
      let str = contacts[j]["firstname"].toLowerCase();
      if (!letters.includes(str.charAt(0))) {
        letters.push(str.charAt(0));
      }
    }
    letters.sort();

    for (i = 0; i < letters.length; i++) {
      document.getElementById("contacts").innerHTML += createLetterHtml(i);
    }
  } else {
    contactContainer.innerHTML = `no contacts selectable`;
  }
}

function displayContacts() {
  if (contacts.length > 0) {
    for (j = 0; j < contacts.length; j++) {
      let id = contacts[j]["firstname"].charAt(0).toLowerCase();
      document.getElementById(id).innerHTML += contactHtml(j);
      setRandomColor(j);
    }
  }
}

function setRandomColor(j) {
  if (!contacts[j]["color"] == "") {
    document.getElementById(
      `${j}`
    ).style.backgroundColor = `#${contacts[j]["color"]}`;
  } else {
    contacts[j]["color"] = generateRandomColor();
    document.getElementById(
      `${j}`
    ).style.backgroundColor = `#${contacts[j]["color"]}`;
  }
  refreshContacts();
}

function generateRandomColor() {
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  while (r + g + b < (255 * 3) / 2) {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    r = parseInt(color.substring(1, 3), 16);
    g = parseInt(color.substring(3, 5), 16);
    b = parseInt(color.substring(5, 7), 16);
  }
  return color;
}

function openSpecificContact(idx) {
  document.getElementById("specificContact").innerHTML =
    specificContactHtml(idx);

  document.getElementById(`specific${idx}`).style.backgroundColor =
    contacts[idx]["color"];
  if (window.innerWidth < 1300) {
    document.getElementById("leftSection").style.display = "none";
    document.getElementById("contacts").style.display = "none";
    document.getElementById("rightSection").style.display = "block";
    document.getElementById("arrow").style.display = "block";
    document.getElementById("editContactButton").style.display = "block";
    document.getElementById("editSpan").style.display = "none";
    document.getElementById("newContactButton").style.display = "none";
  }
}

function closeSpecificContact() {
  document.getElementById("leftSection").style.display = "flex";
  document.getElementById("contacts").style.display = "block";
  document.getElementById("rightSection").style.display = "none";
  document.getElementById("arrow").style.display = "block";
  document.getElementById("editContactButton").style.display = "none";
  document.getElementById("editSpan").style.display = "flex";
  document.getElementById("newContactButton").style.display = "block";
}

function editContact(idx) {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("newContactContainer").classList.remove("d-none");
  document.getElementById("newContactContainer").innerHTML =
    editContactHtml(idx);
  if (window.innerWidth < 801) {
    document.getElementById("close").src = "assets/img/close_white.png";
    document.getElementById("joinSmall").style.display = "none";
  }

  fadeIn();
  slideIn("newContactContainer");
  document.getElementById(`edit${idx}`).style.backgroundColor =
    contacts[idx]["color"];
}

function closeEditContact(idx) {
  slideOut("newContactContainer");
  fadeOut();
  setTimeout(function () {
    document.getElementById("overlay").classList.add("d-none");
    document.getElementById("newContactContainer").classList.add("d-none");
  }, 400);
  if (window.innerWidth < 1001) {
    // openSpecificContact(idx)
    closeSpecificContact();
  }
  showContacts();
}

function deleteContact(idx) {
  contacts.splice(idx, 1);
  refreshContacts();
  document.getElementById("specificContact").innerHTML = "";
}

function changeContact(idx) {
  let firstname = document.getElementById("name").value.split(" ")[0];
  let lastname = document.getElementById("name").value.split(" ")[1];
  let email = document.getElementById("mail").value;
  let phone = document.getElementById("phone").value;

  contacts[idx]["firstname"] = firstname;
  contacts[idx]["lastname"] = lastname;
  contacts[idx]["email"] = email;
  contacts[idx]["phone"] = phone;

  refreshContacts();
  closeEditContact();
}

function openAddTaskContainer() {
  let greyBackground = document.getElementById("greyBackground");
  let addTaskPopUp = document.getElementById("addTaskWrapper");
  let rightSection = document.getElementById("rightSection");
  let contactsTemplate = document.getElementById("contactsTemplate");
  let bottomMenu = document.getElementById("bottomMenuTemplate");
  let kanbanTitle = document.getElementById("kanbanTitle");
  let addTaskTemplate = document.getElementById("addTaskTemplate");
  let createTaskBtn = document.getElementById("createTaskBtn");

  if (window.innerWidth < 1300) {
    addTaskPopUp.classList.add("add-task-wrapper");
    addTaskPopUp.classList.add("slide-in");
    addTaskPopUp.classList.remove("d-none");
    addTaskPopUp.classList.remove("slide-out");
    createTaskBtn.classList.remove("hide");
    kanbanTitle.classList.remove("show-if-mobile");

    rightSection.classList.add("d-none");
    contactsTemplate.classList.add("d-none");
    bottomMenu.classList.add("d-none");
    kanbanTitle.classList.add("d-none");
    addTaskTemplate.classList.add("flex-center");
  } else {
    greyBackground.classList.remove("d-none");

    addTaskPopUp.classList.add("add-task-wrapper");
    addTaskPopUp.classList.add("slide-in");

    addTaskPopUp.classList.remove("d-none");
    addTaskPopUp.classList.remove("slide-out");
  }
  loadInfos();
}

function closeAddTaskWrapper() {
  let greyBackground = document.getElementById("greyBackground");
  let addTaskPopUp = document.getElementById("addTaskWrapper");
  let rightSection = document.getElementById("rightSection");
  let contactsTemplate = document.getElementById("contactsTemplate");
  let bottomMenu = document.getElementById("bottomMenuTemplate");
  let kanbanTitle = document.getElementById("kanbanTitle");
  let addTaskTemplate = document.getElementById("addTaskTemplate");
  let createTaskBtn = document.getElementById("createTaskBtn");

  if (window.innerWidth > 1300) {
    addTaskPopUp.classList.remove("slide-in");
    addTaskPopUp.classList.add("slide-out");

    setTimeout(function () {
      greyBackground.classList.add("d-none");
      addTaskPopUp.classList.add("d-none");
      addTaskPopUp.classList.remove("add-task-wrapper");
    }, 400);
  } else {
    addTaskPopUp.classList.remove("slide-in");
    addTaskPopUp.classList.add("slide-out");

    rightSection.classList.remove("d-none");
    contactsTemplate.classList.remove("d-none");
    bottomMenu.classList.remove("d-none");
    kanbanTitle.classList.remove("d-none");
    addTaskTemplate.classList.remove("d-none");
    createTaskBtn.classList.remove("d-none");

    setTimeout(function () {
      addTaskPopUp.classList.add("d-none");
      addTaskPopUp.classList.remove("add-task-wrapper");
    }, 400);
  }
}

/**************************** */
/************ HTML ************/
/**************************** */

function createAddTaskTemplate() {
  return /*html*/ `
    <div class="add-task-container">
        
        <div id="successfulUpload" class="d-none">
            succesfully Upload! <img class="checkIcon" src="assets/img/successfull_check.png" alt="">
        </div>
        <span class="show-if-mobile" style="max-width: 100% !important">Kanban Project Managment Tool</span>
        <div class="headline">
            
            <h1>Add Task</h1>
        </div>
        <div class="input-section">
            <div class="main-information">
                <div class="padding-36-bottom">
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Title</div>
                        <div id="titleReport" class="report d-none">This field is required</div>
                    </div>
                    <input type="text" placeholder="Enter a title" class="white-box no-outline" id="titleInput">
    
                </div>
    
                <div class="padding-36-bottom">
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Description</div>
                        <div id="descriptionReport" class="report d-none">This field is required</div>
                    </div>
                    <textarea name="description" placeholder="Enter a description" class="textarea-description no-outline"
                        id="descriptionInput"></textarea>
                </div>
    
                <div class="padding-36-bottom">
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Category</div>
                        <div id="categoryReport" class="report d-none">This field is required</div>
                    </div>
                    <div class="dropdown-category-closed" id="category">
                        <div id="categoryPlaceholder" class="dd-placeholder"
                            onclick="pullDownMenu('category', 'assingedTo', 'moreCategorys', 'moreContacts')">
                            <div id="chosenCategory">Select task category</div>
                            <img src="assets/img/drop_down.png">
                        </div>
    
    
                        <div id="newCategoryContainer" class="d-none">
                            <div class="display-flex">
                                <input type="text" placeholder="New category name" id="categoryInput"
                                    class="input-cat-sub no-outline">
                                <div class="center space-between clear-add-button-container padding-17-right" id="#">
                                    <img class="clear-input pointer" onclick="closeCreateCategory()"
                                        src="assets/img/Clear_task_input.png">
                                    <div>|</div>
                                    <img onclick="addCategory()" class="pointer" src="assets/img/create_subtask.png">
                                </div>
                            </div>
                        </div>
    
    
    
                        <div class="d-none more-content overflow-auto" id="moreCategorys">
                            <div onclick="openCreateCategory()" class="dd-placeholder gray-hover">
                                <div >New category</div>
                            </div>
                            <div id="loadedCategorys"></div>
                        </div>
                    </div>
                    <div id="color-picker" class="display-flex padding-20-top d-none">
                        <div class="category-color margin-20-right" id="colorPickCircle0"></div>
                        <div class="category-color margin-20-right" id="colorPickCircle1"></div>
                        <div class="category-color margin-20-right" id="colorPickCircle2"></div>
                        <div class="category-color margin-20-right" id="colorPickCircle3"></div>
                        <div class="category-color margin-20-right" id="colorPickCircle4"></div>
                        <div class="category-color margin-20-right" id="colorPickCircle5"></div>
                    </div>
                </div>
    
                <div>
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Assinged to</div>
                        <div id="contactReport" class="report d-none">This field is required</div>
                    </div>
                    <div class="dropdown-category-closed" id="assingedTo">
                        <div onclick="pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys')"
                            class="dd-placeholder" id="contactsToAssingContainer">
                            <div>Contacts
                                to assing</div>
                            <img id="ddArrow" src="assets/img/drop_down.png">
                            <div class="center space-between clear-add-button-container d-none" id="clearAddButtons">
                                <div class="onclickArea" onclick="clearContacts()">
                                    <img class="clear-input pointer" 
                                    src="assets/img/Clear_task_input.png">
                                </div>
                             
                                <div>|</div>
                                <div class="onclickArea" onclick="addContacts()">
                                    <img  class="pointer" src="assets/img/create_subtask.png">
                                </div>
                            
                            </div>
                        </div>
                        <div class="d-none more-content overflow-auto" id="moreContacts">
                            <div class="dd-placeholder gray-hover" onclick="selectedForTask('You', 'point')">
                                <div>You</div>
                                <div class="select-box center">
                                    <div id="point"></div>
                                </div>
                            </div>
                            <div id="loadedContacts"></div>
                            <div class="dd-placeholder gray-hover">
                                <div>Invite new contact</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="initials-container" id="initialsContainer"></div>
            </div>
            <div class="bigBorder"></div>
            <div class="second-information">
                <div class="padding-36-bottom">
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Due date</div>
                        <div id="dateReport" class="report d-none">This field is required</div>
                    </div>
                    <input type="text" placeholder="dd/mm/yyyy" id="date" class="white-box no-outline">
                </div>
    
                <div class="padding-36-bottom">
                    <div class="display-flex">
                        <div class="padding-10-bottom padding-17-right">Prio</div>
                        <div id="prioReport" class="report d-none">This field is required</div>
                    </div>
                    <div class="prio-container">
                        <button class="prio-button center pointer"
                            onclick="priority('prioHigh', 'prioMedium', 'prioLow', 'prioHighImg')" id="prioHigh">
                            <div>Urgent</div>
                            <img id="prioHighImg" src="assets/img/prio_high.svg">
                        </button>
                        <button class="prio-button center pointer"
                            onclick="priority('prioMedium', 'prioHigh', 'prioLow', 'prioMediumImg')" id="prioMedium">
                            <div>Medium</div>
                            <img id="prioMediumImg" src="assets/img/prio_medium.svg">
                        </button>
                        <button class="prio-button center pointer"
                            onclick="priority('prioLow', 'prioHigh', 'prioMedium', 'prioLowImg')" id="prioLow">
                            <div>Low</div>
                            <img id="prioLowImg" src="assets/img/prio_low.svg">
                        </button>
                    </div>
                </div>
    
                <div class="padding-36-bottom">
                    <div class="padding-10-bottom">Subtasks</div>
                    <div class="white-box subtask-container" id="subtask">
                        <input type="text" placeholder="Add new subtask" id="subtaskInput" class="input-cat-sub no-outline"
                            onclick="switchSubtaskIcons()">
                        <div class="center" id="addSubtask">
                            <img onclick="switchSubtaskIcons()" class="padding-17-right pointer"
                                src="assets/img/add_subtask.png">
                        </div>
                        <div class="center space-between clear-add-button-container padding-17-right d-none"
                            id="createSubtask">
                            <img class="clear-input pointer" onclick="switchSubtaskIcons()"
                                src="assets/img/Clear_task_input.png">
                            <div>|</div>
                            <img onclick="addSubtask()" class="pointer" src="assets/img/create_subtask.png">
                        </div>
                    </div>
                    <div id="addedSubtasks"></div>
                </div>
            </div>
        </div>
    
        <div class="buttons">
            <button onclick="" id="clearButton" class="clear-task space-evenly">
                Clear
                <img id="clearButtonImg" src="assets/img/Clear_task-new.svg">
            </button>
            <button onclick="collectAllInfos()" class="create-task space-evenly">
                Create Task
                <img src="assets/img/create_task.png">
            </button>
        </div>
    </div>`;
}

function createLetterHtml(i) {
  return /*html*/ `
        <div class="letter" >${letters[i].toUpperCase()}</div>
        <div class="letter-block" id="${letters[i]}">
        </div>
    `;
}

function contactHtml(j) {
  return /*html*/ `
        <div class="single-contact" tabindex="1" onclick="openSpecificContact(${j})">
            <div style="background-color:${
              contacts[j].color
            }" class="name-tag" id="${j}">
                ${contacts[j]["firstname"].charAt(0).toUpperCase()}${contacts[
    j
  ]["lastname"]
    .charAt(0)
    .toUpperCase()}
            </div>
            <div>
                <span>${contacts[j]["firstname"]} ${
    contacts[j]["lastname"]
  }</span>
                <span>${contacts[j]["email"]}</span>
            </div>
        </div>
    `;
}

function specificContactHtml(idx) {
  return /*html*/ `
        <div class="specific-contact">
            <div class="specific-single-contact">
                <div style="background-color:${
                  contacts[idx].color
                }" class="name-tag bigger" id="specific${idx}">
                    ${contacts[idx]["firstname"]
                      .charAt(0)
                      .toUpperCase()}${contacts[idx]["lastname"]
    .charAt(0)
    .toUpperCase()}
                </div>
                <div>
                    <span class="name">${contacts[idx]["firstname"]} ${
    contacts[idx]["lastname"]
  }</span>
                    <span onclick="openAddTaskContainer()" class="add-task">+ Add Task</span>
                </div>
            </div>
            <div class="contact-information">
                <img onclick="editContact(${idx})" class="edit" id="editContactButton" src="assets/img/edit.png" alt="" style="display: none;">
                <div class="edit-span" id="editSpan">
                    <span>Contact Information</span>
                    <span style="cursor:pointer" onclick="editContact(${idx})">
                    <img style="height:20px" src="assets/img/edit_pen_img.png">
                    Edit Contact</span>
                </div>
                <div>
                    <b>Email</b>
                    <span class="mail">${contacts[idx]["email"]}</span>
                    <b>Phone</b>
                    <span>${contacts[idx]["phone"]}</span>
                </div>
            </div>
        </div>
    `;
}

function editContactHtml(idx) {
  return /*html*/ `
        <img id="close" onclick="closeEditContact(${idx})" class="close" src="assets/img/Clear_task.png" alt="">
        <div class="blue-side">
            <div class="flex-blue-side">
                <img id="joinSmall" src="assets/img/join_small.png" alt="">
                <b>Edit contact</b>
                <div class="horizontal-blue-line"></div>
            </div>
        </div>
        <div class="contact-create-container">
            <div style="background-color:#${
              contacts[idx].color
            }" class="name-tag bigger" id="edit${idx}">
                ${contacts[idx]["firstname"].charAt(0).toUpperCase()}${contacts[
    idx
  ]["lastname"]
    .charAt(0)
    .toUpperCase()}
            </div>           
            <div class="contact-form">
                <form onsubmit="return false">
                    <div class="input-fields">
                        <div>
                            <input id="name" style="cursor: pointer;" placeholder="Name" type="text" value="${
                              contacts[idx]["firstname"]
                            } ${contacts[idx]["lastname"]}" required>
                            <img src="assets/img/user.png" alt="">
                        </div>
                        <div>
                            <input id="mail" placeholder="Email" type="email" value="${
                              contacts[idx]["email"]
                            }" required>
                            <img src="assets/img/mail.png" alt="">
                        </div>
                        <div>
                            <input id="phone" placeholder="Phone" type="tel" value="${
                              contacts[idx]["phone"]
                            }" required>
                            <img src="assets/img/mobile.png" alt="">
                        </div>
                    </div>
                    <div class="submit-section">
                        <button class="contacts-button" id="submit" onclick="changeContact(${idx})" type="submit">Save<img
                                src="assets/img/create_task.png" alt="">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function createContactHtml() {
  return /*html*/ `
        <img id="close" onclick="closeNewContact()" class="close" src="assets/img/Clear_task.png" alt="">
        <div class="blue-side">
            <div class="flex-blue-side">
                <img id="joinSmall" src="assets/img/join_small.png" alt="">
                <b id="overlayHeadline">Add contact</b>
                <span id="overlaySubline">Tasks are better with a team!</span>
                <div class="horizontal-blue-line"></div>
            </div>
        </div>
        <div class="contact-create-container">
            <img class="user" src="assets/img/user (1).png" alt="">
            <div class="contact-form">
                <form onsubmit="return false">
                    <div class="input-fields">
                        <div>
                            <input id="name" style="cursor: pointer;" placeholder="Name" type="text" required>
                            <img src="assets/img/user.png" alt="">
                        </div>
                        <div>
                            <input id="mail" placeholder="Email" type="email" required>
                            <img src="assets/img/mail.png" alt="">
                        </div>
                        <div>
                            <input id="phone" placeholder="Phone" type="tel" required>
                            <img src="assets/img/mobile.png" alt="">
                        </div>
                    </div>
                    <div class="submit-section">
                        <div id="cancle" onclick="closeNewContact()">Cancle <img src="assets/img/Clear_task.png" alt="">
                        </div>
                        <button class="contacts-button" id="submit" onclick="createNewContact()" type="submit">Create contact <img
                                src="assets/img/create_task.png" alt="">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
