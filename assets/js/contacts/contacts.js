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
 * This functio creates a new contact
 */
async function createNewContact() {
  let name = document.getElementById("name");
  let mail = document.getElementById("mail");
  let phone = document.getElementById("phone");
  let color = await generateRandomColor();
  if (checkCreate(name, mail, phone)) {
    await newContact(name, mail, phone, color);
    showCreateContactPopUp();
    setTimeout(function () {
      closeNewContact();
      showContacts();
    }, 1000);
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
    document.getElementById("newContactButtonResponsive").style.display = "flex";
  }
  createLetters();
  displayContacts();
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
    newContactWordCountOne(name, mail, phone, color);
  }
  if (WordCount(name) === 2) {
    newContactWordCountTwo(name, mail, phone, color)
  }
}


/**
 * This function creates a contact with one one name in the name attribute
 * 
 * @param {string} name name of the contact
 * @param {string} mail mail of the contact
 * @param {number} phone number of the contact
 * @param {string} color color for the contact
 */
async function newContactWordCountOne(name, mail, phone, color) {
  let newContact = {
    firstname: name.value,
    lastname: "",
    email: mail.value,
    phone: gettingPhoneNumber(phone),
    color: color,
  };
  contacts.push(newContact);
  await refreshContacts()
}


/**
 * This function creates a contact with two names in the name attribute
 * 
 * @param {string} name name of the contact
 * @param {string} mail mail of the contact
 * @param {number} phone number of the contact
 * @param {string} color color for the contact
 */
async function newContactWordCountTwo(name, mail, phone, color) {
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
 * This function creates the letters for the contacts sorting system
 */
function createLetters() {
  letters = [];
  let contactContainer = document.getElementById("contacts");

  if (contacts.length > 0) {
    pushLettersIntoHtml(contactContainer);
  } else {
    contactContainer.innerHTML = `no contacts selectable`;
  }
}


/**
 * This function shows the letters in html
 * 
 */
function pushLettersIntoHtml(contactContainer) {
  contactContainer.innerHTML = "";
  pushLettersInArray();
  for (i = 0; i < letters.length; i++) {
    document.getElementById("contacts").innerHTML += createLetterHtml(i);
  }
}


/**
 * This function pushes all the first letters once into an array and sorts it afterwards
 */
function pushLettersInArray() {
  for (j = 0; j < contacts.length; j++) {
    let str = contacts[j]["firstname"].toLowerCase();
    if (!letters.includes(str.charAt(0))) {
      letters.push(str.charAt(0));
    }
  }
  letters.sort();
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
 * This function is deleting a contact out of the json
 *
 * @param {number} idx the index of the contact
 */
async function deleteContact(idx) {
  const user = users.find(user => user.email === contacts[idx]['email']);
  if (user) {
    document.getElementById("newContactContainer").classList.add("d-none");
    openAttentionCard(idx, i);
  } else {
    contacts.splice(idx, 1);
    await refreshContacts();
    initContacts();
    document.getElementById("specificContact").innerHTML = "";
  }
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
    pushNewContactValues(firstname, lastname, email, phone, idx);
  }
}


/**
 * This function pushed all the edited values into the contactsarray
 * 
 * @param {*} firstname first name of the contact
 * @param {*} lastname last name of the contact
 * @param {*} email email of the contact
 * @param {*} phone phone number of the contact
 * @param {*} idx idx of the contact in the contacts array
 */
function pushNewContactValues(firstname, lastname, email, phone, idx) {
  contacts[idx]["firstname"] = firstname.value.split(" ")[0];
  contacts[idx]["lastname"] = lastname.value.split(" ")[1];
  contacts[idx]["email"] = email.value;
  contacts[idx]["phone"] = phone.value;

  refreshContacts();
  closeEditContact();
  openSpecificContact(idx);
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