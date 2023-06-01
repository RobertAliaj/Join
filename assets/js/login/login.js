
let users = [];

/**
 * This function inits the login page
 */
async function initLogin() {
  await init();
  openLogIn();
  checkRememberMe();
}

/**
 * This function saves the users array to the backend json
 */
async function refreshUsers() {
  jsonFromServer["users"] = users;
  await saveJSONToServer();
}


/**
 * This function signs up a new User
 */
async function signUp() {
  let signUpName = document.getElementById("signUpName");
  let signUpEmail = document.getElementById("signUpEmail");
  let signUpPassword = document.getElementById("signUpPassword");
  let phone = "";

  if (!isEmailAlreadyExists(signUpEmail.value)) {
    let color = await generateRandomColor();
    let user = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
      gender: '',
    };
    pushUser(user);
    newContact(signUpName, signUpEmail, phone, color);
    await refreshContacts();
    openLogIn();
  } else {
    let alert = document.getElementById("emailAlert");
    alert.classList.remove("d-none");
  }
}

/**
 * This function checks if the function already exists
 * @param {string} email the email of the input of the sign up
 * @returns if the email is found
 */
function isEmailAlreadyExists(email) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      return true; // E-Mail bereits vorhanden
    }
  }

  return false; // E-Mail nicht gefunden
}

/**
 * This function pushes a user to the users array
 * @param {json} user new user
 */
async function pushUser(user) {
  users.push(user);
  refreshUsers();
}

/**
 * This function logs in with a specific user
 */
async function logIn() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  if (user) {

    saveGreetingNameToLocalStorage(user["name"]);
    saveCurrentUserToLocalStorage(user["email"]);
    isRememberMe();
    await replaceLocation();

  } else {
    email.value = "";
    password.value = "";
    let alert = document.getElementById("alert");
    alert.classList.remove("d-none");
  }
}

/**
 * This function initializes the guest login
 */
function guestLogIn() {
  saveGreetingNameToLocalStorage('Guest');
  saveCurrentUserToLocalStorage('');
}

/**
 * This function replaces the location so there is no going back
 */
async function replaceLocation() {
  window.location.replace("index.html");
}

/**
 * This function saves the name to the local storage
 * @param {string} name name of the login email user
 */
function saveGreetingNameToLocalStorage(name) {
  localStorage.setItem("greetingName", name);
}

/**
 * This function saves the email to the local storage
 * @param {string} email email of the login user
 */
function saveCurrentUserToLocalStorage(email) {
  localStorage.setItem("currentUser", email);
}

/**
 * This function checks if the checkbox is being activated
 */
function isRememberMe() {
  const rmCheck = document.getElementById("rememberMe");
  let emailInput = document.getElementById("email");

  if (rmCheck.checked) {
    localStorage.username = emailInput.value;
    localStorage.checkbox = "checked";
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}

/**
 * This function checks if the remember me was checked before
 */
function checkRememberMe() {
  const rmCheck = document.getElementById("rememberMe");
  let emailInput = document.getElementById("email");

  if (localStorage.checkbox && localStorage.checkbox !== "") {
    emailInput.value = localStorage.username;
    rmCheck.setAttribute("checked", "checked");
  }
}

/**
 * This function is used when you click the remember me 
 */
function clickedRememberMe() {
  const rmCheck = document.getElementById("rememberMe");
  let emailInput = document.getElementById("email");

  if (localStorage.checkbox && localStorage.checkbox == "") {
    localStorage.username = emailInput.value;
    rmCheck.setAttribute("checked", "checked");
  } else {
    rmCheck.removeAttribute("checked");
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}
