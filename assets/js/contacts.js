let letters = [];

/**
 * This function initializes the contacts page
 */
async function initContacts() {
  await includePlusInit();
  saveCurrentUser();
  setProfilePicture();
  showContacts();
  checkPreviousAddTask();
}

/**
 * This function checks if the previous page was the addTask page
 */
function checkPreviousAddTask() {
  let set = localStorage.getItem('inviteContact');
  if (set === 'true') {
    openCreateContact();
  }
}

/**
 * This function is refreshing contacts in the Json from the Server
 */
async function refreshContacts() {
  jsonFromServer["contacts"] = contacts;
  await saveJSONToServer();
}

/**
 * create a new contact
 */
async function createNewContact() {
  let name = document.getElementById("name");
  let mail = document.getElementById("mail");
  let phone = document.getElementById("phone");
  let color = await generateRandomColor();
  if (checkCreate(name, mail, phone)) {
    await newContact(name, mail, phone, color);
    closeNewContact();
    showContacts();
  }
}

/**
 * This function checks the values of the inputs of the create contact container
 * @param {string} name name of new contact
 * @param {email} mail email of new contact
 * @param {number} phone phone number of new contact
 * @returns if the contact already exists
 */
function checkCreate(name, mail, phone) {
  checkEmail();
  checkAllValues(name, mail, phone);
  if (!checkEmail() && checkAllValues(name, mail, phone)) {
    return true;
  }
}

/**
 * This function shows all the contacts on the left side of the page
 */
function showContacts() {
  document.getElementById('contacts').innerHTML = '';
  if (window.innerWidth < 1001) {
    document.getElementById("newContactButtonResponsive").style.display =
      "flex";
  }
  createLetters();
  displayContacts();
}

/**
 * This function checks if all inputs are filled
 * @param {string} name name of new contact
 * @param {email} mail email of new contact
 * @param {number} phone phone number of new contact
 * @returns if all inputs have a value
 */
function checkAllValues(name, mail, phone) {
  if (!name.value) {
    document.getElementById('nameNecessary').classList.remove('d-none');
  } else {
    document.getElementById('nameNecessary').classList.add('d-none');
  }
  if (!mail.value) {
    document.getElementById('mailNecessary').classList.remove('d-none');
  } else {
    document.getElementById('mailNecessary').classList.add('d-none');
  }
  if (!phone.value) {
    document.getElementById('phoneNecessary').classList.remove('d-none');
  } else {
    document.getElementById('phoneNecessary').classList.add('d-none');
  }
  if (name.value && mail.value && phone.value) {
    return true
  }
}

/**
 * This function checks if the email already exists
 */
function checkEmail() {
  if (!isEmailExisting(mail, 'createContactEmailAlert')) {
    true
  }
}

/**
 * This function checks if the email can be found in the contacts
 * @param {string} mail mail of the new contact
 * @param {string} div the div of the alert
 * @returns if the email is found or not
 */
function isEmailExisting(mail, div) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]['email'] === mail.value) {
      document.getElementById(div).classList.remove('d-none');
      return true
    } else {
      document.getElementById(div).classList.add('d-none');
    }
  }
}

/**
 * This function creates the object for a new contact depending on wheather there are 2 names or just one
 *
 * @param {string} name name of the contact
 * @param {string} mail mail of the contact
 * @param {number} phone number of the contact
 * @param {string} color color for the contact
 */
async function newContact(name, mail, phone, color) {
  if (WordCount(name) === 1) {
    let newContact = {
      firstname: name.value,
      lastname: "",
      email: mail.value,
      color: color,
    };
    contacts.push(newContact);
    await refreshContacts()
  }
  if (WordCount(name) === 2) {
    let newContact = {
      firstname: name.value.split(" ")[0],
      lastname: name.value.split(" ")[1],
      email: mail.value,
      phone: gettingPhoneNumber(phone),
      color: color,
    };
    contacts.push(newContact);
    await refreshContacts()
  }
}

/**
 * This function is made for a true return instead of a default
 *
 * @param {number} phone number of the contact
 * @returns phone number or no phone number
 */
function gettingPhoneNumber(phone) {
  if (phone.value) {
    return phone.value;
  } else {
    return "";
  }
}

/**
 *
 * @param {string} str the name of the contact
 * @returns how many words are in the contacts name
 */
function WordCount(str) {
  let arr = str.value.split(" ");
  return arr.filter((word) => word !== "").length;
}

/**
 * This function slides in the createContact Container
 */
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

/**
 * This function slides out the new contact container
 */
function closeNewContact() {
  slideOut("newContactContainer");
  fadeOut();
  setTimeout(function () {
    document.getElementById("overlay").classList.add("d-none");
    document.getElementById("newContactContainer").classList.add("d-none");
  }, 400);
  refreshContacts();
  localStorage.setItem('inviteContact', false);
}

/**
 * This function is an animation for fading in
 */
function fadeIn() {
  document.getElementById("overlay").classList.remove("fade-out");
  document.getElementById("overlay").classList.add("fade-in");
}

/**
 * This function is an animation for sliding in
 *
 * @param {string} container the container that is supposed to slide in
 */
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

/**
 * This function is an animation for fading out
 */
function fadeOut() {
  document.getElementById("overlay").classList.remove("fade-in");
  document.getElementById("overlay").classList.add("fade-out");
}

/**
 * This function is an animation for slinding out
 *
 * @param {string} container  the container that is supposed to slide out
 */
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

/**
 * This function creates the letters for the contacts sorting system
 */
function createLetters() {
  letters = [];
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

/**
 * This function displays all Contacts
 */
function displayContacts() {
  if (contacts.length > 0) {
    for (j = 0; j < contacts.length; j++) {
      let id = contacts[j]["firstname"].charAt(0).toLowerCase();
      document.getElementById(id).innerHTML += contactHtml(j);
      setRandomColor(j);
    }
  }
}

/**
 * This function creates a random color
 *
 * @param {number} j the index of which contact is getting a color
 */
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

/**
 *
 * @returns a random color
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
 * This function opens specific contact
 *
 * @param {number} idx the index of which contact in the array is opened
 */
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

/**
 * This function is removing all css that is made for the specific contact
 */
function closeSpecificContact() {
  document.getElementById("leftSection").style.display = "flex";
  document.getElementById("contacts").style.display = "block";
  document.getElementById("rightSection").style.display = "none";
  document.getElementById("arrow").style.display = "block";
  document.getElementById("editContactButton").style.display = "none";
  document.getElementById("editSpan").style.display = "flex";
  document.getElementById("newContactButton").style.display = "block";
}

/**
 * This function is editing a contact in the json
 *
 * @param {number} idx the index of the contact that is going to be edited
 */
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

/**
 * This function is closing the editing div and showing the refreshed contacts
 */
async function closeEditContact() {
  slideOut("newContactContainer");
  fadeOut();
  setTimeout(function () {
    document.getElementById("overlay").classList.add("d-none");
    document.getElementById("newContactContainer").classList.add("d-none");
  }, 400);
  if (window.innerWidth < 1001) {
    closeSpecificContact();
  }
  await refreshContacts();
  showContacts();
}

/**
 * This function is deleting a contact out of the json
 *
 * @param {number} idx the index of the contact
 */
async function deleteContact(idx) {
  for (let i = 0; i < users.length; i++) {
    if (contacts[idx]['email'] === users[i]['email']) {
      document.getElementById("newContactContainer").classList.add("d-none");
      openAttentionCard(idx, i);
    } else {
      contacts.splice(idx, 1);
      await refreshContacts();
      initContacts();
      document.getElementById("specificContact").innerHTML = "";
    }
  }

}

/**
 * This function closes the alert card of the email input
 */
function closeAttentionCard() {
  document.getElementById('overlay').classList.add('d-none');
  document.getElementById('attentionCard').classList.add('d-none');
}

/**
 * This function opens the alert card of the email input
 * @param {number} idx The index of the contact thats open
 */
function openAttentionCard(idx) {
  document.getElementById('overlay').classList.remove('d-none');
  document.getElementById('attentionCard').classList.remove('d-none');
  document.getElementById('attentionCard').innerHTML = attentionCardHtml(idx, i);

}

/**
 * This function deletes the contact u are logged in with
 * @param {number} idx index of the contact 
 * @param {number} i index of the user
 */
async function deleteOwnUser(idx, i) {
  users.splice(i, 1);
  contacts.splice(idx, 1);
  await refreshContacts();
  await refreshUsers();
  window.location.href = 'login.html';
}

/**
 * This function is changing the parameters of the contact
 *
 * @param {number} idx index of contact
 */
function changeContact(idx) {
  let name = document.getElementById("name")
  let firstname = document.getElementById("name");
  let lastname = document.getElementById("name");
  let email = document.getElementById("mail");
  let phone = document.getElementById("phone");

  if (checkEdit(idx, name, email, phone)) {
    contacts[idx]["firstname"] = firstname.value.split(" ")[0];
    contacts[idx]["lastname"] = lastname.value.split(" ")[1];
    contacts[idx]["email"] = email.value;
    contacts[idx]["phone"] = phone.value;

    refreshContacts();
    closeEditContact();
    openSpecificContact(idx);
  }
}

/**
 * This function checks the values of the edit
 * @param {number} idx index of contact
 * @param {string} name name of contact
 * @param {string} email email of contact
 * @param {number} phone number of contact
 * @returns if the inputs have values and the email exists
 */
function checkEdit(idx, name, email, phone) {
  checkEditEmail(idx);
  checkAllValues(name, email, phone)
  if (!checkEditEmail(idx) && checkAllValues(name, email, phone)) {
    return true
  }
}

/**
 * This function checks if the email is already used 
 * @param {number} idx index of the contact thats beeing edited
 * @returns true or false
 */
function checkEditEmail(idx) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]['email'] === mail.value && i !== idx) {
      document.getElementById('editContactEmailAlert').classList.remove('d-none');
      return true
    } else {
      document.getElementById('editContactEmailAlert').classList.add('d-none');
    }
  }
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
    addTaskPopUp.classList.remove("slide-out");
    addTaskPopUp.classList.add("slide-in");
    addTaskPopUp.classList.remove("d-none");
    profile.classList.add("d-none");
    addTaskBtn.classList.remove("d-none");
  } else {
    greyBackground.classList.remove("d-none");
    addTaskPopUp.classList.remove("slide-out");
    addTaskPopUp.classList.add("slide-in");
    addTaskPopUp.classList.remove("d-none");
  }

  loadInfos();
  if (idx) {
    selectedForTask(combineNames(contacts, idx), `contactName${idx}`, contacts[idx]["color"]);
  }
  pullDownMenu('assingedTo', 'category', 'moreContacts', 'moreCategorys');
  addContacts();

}


/**
 * This function is closing the add task container
 */
function closeAddTaskWrapper() {
  let greyBackground = document.getElementById("greyBackground");
  let addTaskPopUp = document.getElementById("addTaskWrapper");
  let profile = document.getElementById('userPicture');
  let addTaskBtn = document.getElementById("addTaskBtn");

  if (window.innerWidth < 1300) {
    addTaskPopUp.classList.add("slide-out");
    addTaskPopUp.classList.remove("slide-in");
    profile.classList.remove("d-none");
    addTaskBtn.classList.add("d-none");
  } else {
    addTaskPopUp.classList.add("slide-out");
    addTaskPopUp.classList.remove("slide-in");
  }
  setTimeout(() => {
    greyBackground.classList.add("d-none");
    addTaskPopUp.classList.add("d-none");
  }, 400);

}

/**************************** */
/************ HTML ************/
/**************************** */

/**
 * @param {number} idx index of the contact
 * @param {number} i index of the user
 * @returns the attention card html
 */
function attentionCardHtml(idx, i) {
  return /*html*/ `
        <span>Are you sure you want to delete the Contact you are signed in with?</span>
        <div class="submit-section">
            <div onclick="closeAttentionCard()">Cancle <img src="assets/img/Clear_task.png" alt="">
            </div>
            <button class="contacts-button" onclick="deleteOwnUser(${idx, i})">Delete<img src="assets/img/create_task.png"
                    alt="">
            </button>
        </div>
  `;
}

/**
 * @param {number} i index of the letter
 * @returns a single letter
 */
function createLetterHtml(i) {
  return /*html*/ `
        <div class="letter" >${letters[i].toUpperCase()}</div>
        <div class="letter-block" id="${letters[i]}">
        </div>
    `;
}

/**
 * @param {number} j index of the contact
 * @returns a single contact
 */
function contactHtml(j) {
  return /*html*/ `
        <div class="single-contact" tabindex="1" onclick="openSpecificContact(${j})">
            <div style="background-color:${contacts[j].color
    }" class="name-tag" id="${j}">
                ${contacts[j]["firstname"].charAt(0).toUpperCase()}${contacts[
      j
    ]["lastname"]
      .charAt(0)
      .toUpperCase()}
            </div>
            <div>
                <span>${contacts[j]["firstname"]} ${contacts[j]["lastname"]
    }</span>
                <span>${contacts[j]["email"]}</span>
            </div>
        </div>
    `;
}

/**
 * @param {number} idx index of the contact
 * @returns a contact as a close up
 */
function specificContactHtml(idx) {
  return /*html*/ `
        <div class="specific-contact">
            <div class="specific-single-contact">
                <div style="background-color:${contacts[idx].color
    }" class="name-tag bigger" id="specific${idx}">
                    ${contacts[idx]["firstname"]
      .charAt(0)
      .toUpperCase()}${contacts[idx]["lastname"]
        .charAt(0)
        .toUpperCase()}
                </div>
                <div>
                    <span class="name">${contacts[idx]["firstname"]} ${contacts[idx]["lastname"]
    }</span>
                    <span onclick="openAddTaskContainer(${idx})" class="add-task">+ Add Task</span>
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

/**
 * @param {number} idx index of the contact
 * @returns the edit contact container
 */
function editContactHtml(idx) {
  return /*html*/ `
        <img id="close" onclick="closeEditContact()" class="close" src="assets/img/Clear_task.png" alt="">
        <div class="blue-side">
            <div class="flex-blue-side">
                <img id="joinSmall" src="assets/img/join_small.png" alt="">
                <b>Edit contact</b>
                <div class="horizontal-blue-line"></div>
            </div>
        </div>
        <div class="contact-create-container">
            <div style="background-color:#${contacts[idx].color
    }" class="name-tag bigger edit-bigger" id="edit${idx}">
                ${contacts[idx]["firstname"].charAt(0).toUpperCase()}${contacts[
      idx
    ]["lastname"]
      .charAt(0)
      .toUpperCase()}
            </div>           
            <div class="contact-form">
                <div class="form-container">
                    <div class="input-fields">
                        <div>
                            <input id="name" style="cursor: pointer;" placeholder="Name" type="text" value="${contacts[idx]["firstname"]} ${contacts[idx]["lastname"]}" >
                            <img src="assets/img/user.png" alt="">
                            <div id="nameNecessary" class="necessary d-none"></div>

                        </div>
                        <div>
                            <input id="mail" placeholder="Email" type="email" value="${contacts[idx]["email"]}">
                            <img src="assets/img/mail.png" alt="">
                            <div id="editContactEmailAlert" class="alert d-none">This email is already taken</div>
                            <div id="mailNecessary" class="necessary d-none"></div>
                        </div>
                        <div>
                            <input id="phone" placeholder="Phone" type="tel" value="${contacts[idx]["phone"]}">
                            <img src="assets/img/mobile.png" alt="">
                            <div id="phoneNecessary" class="necessary d-none"></div>
                        </div>
                    </div>
                    <div class="submit-section">
                        <button class="contacts-button" id="submit" onclick="changeContact(${idx})" type="submit">Save<img
                                src="assets/img/create_task.png" alt="">
                        </button>
                        <button class="contacts-button" onclick="deleteContact(${idx})" type="submit">Delete<img
                                src="assets/img/create_task.png" alt="">
                        </button>
                    </div>
  </div>
            </div>
        </div>
    `;
}

/**
 * @returns the create contact html
 */
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
                <div class="form-container">
                    <div class="input-fields">
                        <div>
                            <input id="name" style="cursor: pointer;" placeholder="Name" type="text" required>
                            <img src="assets/img/user.png" alt="">
                            <div id="nameNecessary" class="necessary d-none"></div>
                        </div>
                        <div>
                            <input id="mail" placeholder="Email" type="email" required>
                            <img src="assets/img/mail.png" alt="">
                            <div id="createContactEmailAlert" class="alert d-none">This email is already taken</div>
                            <div id="mailNecessary" class="necessary d-none"></div>

                        </div>
                        <div>
                            <input id="phone" placeholder="Phone" type="tel" required>
                            <img src="assets/img/mobile.png" alt="">
                            <div id="phoneNecessary" class="necessary d-none"></div>

                        </div>
                    </div>
                    <div class="submit-section">
                        <div id="cancle" onclick="closeNewContact()">Cancle <img src="assets/img/Clear_task.png" alt="">
                        </div>
                        <button class="contacts-button" id="submit" onclick="createNewContact()" type="submit">Create contact <img
                                src="assets/img/create_task.png" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
