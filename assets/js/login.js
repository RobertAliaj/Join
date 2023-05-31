
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
 * This function animates the j image 
 */
function animate() {
  if (window.innerWidth < 501) {
    animateResponsive();
  } else {
    animateNormal();
  }
}

/**
 * This function animates if not responsive mode
 */
function animateNormal() {
  let height = document.getElementById("outerDiv").clientHeight;
  let width = document.getElementById("outerDiv").clientWidth;
  let imgHeight = document.getElementById("imgDiv").clientHeight;
  let imgWidth = document.getElementById("imgDiv").clientWidth;
  setTimeout(function () {
    const animation = gsap
      .timeline()
      .set(
        "#imgDiv",
        {
          x: 0,
          y: 0,
          scale: 0.9,
        },
        0
      )
      .set(
        "#contentDiv",
        {
          opacity: 0,
        },
        0
      )
      .to(
        "#imgDiv",
        {
          x: -width / 2 + imgWidth / 2 + 50,
          y: -height / 2 + imgHeight / 2 + 50,
          scale: 0.3,
          ease: "power1.out",
          duration: 1,
        },
        0
      )
      .to(
        "#contentDiv",
        {
          opacity: 1,
          duration: 1,
        },
        0
      );
  }, 1000);

  document.getElementById("outerDiv").style.zIndex = 1;
}

/**
 * This function animates in responsive
 */
function animateResponsive() {
  let height = document.getElementById("outerDiv").clientHeight;
  let width = document.getElementById("outerDiv").clientWidth;
  let imgHeight = document.getElementById("imgDiv").clientHeight;
  let imgWidth = document.getElementById("imgDiv").clientWidth;
  setTimeout(function () {
    const animation = gsap
      .timeline()
      .set(
        "#imgDiv",
        {
          x: 0,
          y: 0,
          scale: 1,
        },
        0
      )
      .set(
        "#contentDiv",
        {
          opacity: 0,
        },
        0
      )
      .to(
        "#imgDiv",
        {
          x: -width / 2 + imgWidth / 2 + 20,
          y: -height / 2 + imgHeight / 2 + 20,
          scale: 0.2,
          ease: "power1.out",
          duration: 1,
        },
        0
      )
      .to(
        "#contentDiv",
        {
          opacity: 1,
          duration: 1,
        },
        0
      );
  }, 1000);

  document.getElementById("outerDiv").style.zIndex = 1;
}

/**
 * This function opens the sign up Container
 */
function openSignUp() {
  document.getElementById("signUp").style.display = "none";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += SignUpContainerHtml();
}

/**
 * This function opens the login container
 */
function openLogIn() {
  document.getElementById("signUp").style.display = "flex";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += LoginContainerHtml();
}

/**
 * This function opens the forgot password container
 */
function openForgotPassword() {
  document.getElementById("signUp").style.display = "none";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += PasswordContainerHtml();
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

/**
 * This function opens the log out container
 */
function openLogOutContainer() {
  document.getElementById('logOut').classList.toggle('d-none')
  let logOut = document.getElementById('logOut');
  if (window.innerWidth < 1300) {
    logOut.innerHTML = `
    <div onclick="window.location.href = 'help.html'">Help</div>
    <div onclick="window.location.href =  'privacy.html'">Legal Notice</div>
    <div onclick="logOut()">Log Out</div>
    <div id="profilePictures2" class="different-profiles responsive-profiles d-none">
      <img onclick="chooseProfilePicture('woman.png'); openLogOutContainer(); openSelectProfile()" src="assets/img/woman.png">
      <img onclick="chooseProfilePicture('man.png'); openLogOutContainer(); openSelectProfile()" src="assets/img/man.png">
    </div>
    `
  } else {
    logOut.innerHTML = `
    <div class="log-out-div" onclick="logOut()">Log Out</div>
    `
  }
}

/**
 * This function logs out of a user and redirects to the login page without the action to go back
 */
function logOut() {
  localStorage.removeItem('greetingName');
  window.location.replace('login.html');
}

/**
 * @returns the login container html
 */
function LoginContainerHtml() {
  return `
      <span class="login-span">Log in</span>
      <div class="horizontal-blue-line"></div>
      <div class="form-container " >
        <div>
          <input autocomplete="username" type="email" placeholder="Email" id="email">
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input autocomplete="current-password" type="password" placeholder="Password" id="password">
          <img src="assets/img/schloss.png" alt="">
        </div>
        <div id="alert" class="alert d-none">
          <span> You've got the wrong email or password </span>
        </div>
        <div class="remember-me">
          <div>
            <input type="checkbox" id="rememberMe" onclick="clickedRememberMe()" value="lsRememberMe" class="select-box">
            <span>Remember me</span>
          </div>
          <a onclick="openForgotPassword()">Forgot my password</a>
        </div>
        <div class="buttons">
          <button onclick="logIn()" class="login-button"> Log in</button>
          <button onclick="window.location.replace('index.html'); guestLogIn()" class="guest-login-button">Guest Log in</button>
        </div> 
      </div>
  `;
}

/**
 * @returns the sign up container html
 */
function SignUpContainerHtml() {
  return `
      <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
      <span class="sign-up-span" >Sign up</span>
      <div class="horizontal-blue-line"></div>
      <form class="form-container" onsubmit="event.preventDefault(); signUp()">
        <div>
          <input placeholder="Name" id="signUpName" required>
          <img src="assets/img/user.png" alt="">
        </div>
        <div>
          <input type="email" placeholder="Email" id="signUpEmail" required>
          <img src="assets/img/mail.png" alt="">
           <div id="emailAlert" class="alert d-none">
          <span> This email is already taken</span>
        </div>
        </div>
        <div>
          <input type="password" placeholder="Password" id="signUpPassword" required>
          <img src="assets/img/schloss.png" alt="">
        </div>
        
        <div class="buttons">
          <button type="submit" class="login-button"> Sign Up</button>
        </div>
     </form>
  `;
}

/**
 * @returns the password container html
 */
function PasswordContainerHtml() {
  return `
      <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
      <span class="forgot-password-span" >Forgot Password</span>
      <div class="horizontal-blue-line"></div>
      <form class="form-container " action="https://gruppe-join-421.developerakademie.net/send_mail.php" method="POST">
        <div>
          <input name="name" type="email" placeholder="Email" id="forgotPasswordEmail" required>
          <img src="assets/img/mail.png" alt="">

        </div>
        <div class="buttons">
          <button type="submit" class="login-button"> Send Mail </button>
        </div>
     </form>
      `;
}
