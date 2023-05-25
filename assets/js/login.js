
let users = [];

async function initLogin() {
  await init();
  openLogIn();
  checkRememberMe();
}

async function refreshUsers() {
  jsonFromServer["users"] = users;
  await saveJSONToServer();
}

function animate() {
  if (window.innerWidth < 501) {
    animateResponsive();
  } else {
    animateNormal();
  }
}

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



function openSignUp() {
  document.getElementById("signUp").style.display = "none";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += SignUpContainerHtml();
}

function openLogIn() {
  document.getElementById("signUp").style.display = "flex";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += LoginContainerHtml();
}

function openForgotPassword() {
  document.getElementById("signUp").style.display = "none";
  let loginContainer = document.getElementById("loginContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML += PasswordContainerHtml();
}

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
    refreshContacts();
    openLogIn();
  } else {
    let alert = document.getElementById("emailAlert");
    alert.classList.remove("d-none");
  }
}

function isEmailAlreadyExists(email) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      return true; // E-Mail bereits vorhanden
    }
  }

  return false; // E-Mail nicht gefunden
}

async function pushUser(user) {
  users.push(user);
  refreshUsers();
}

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

function guestLogIn() {
  saveGreetingNameToLocalStorage('Guest');
  saveCurrentUserToLocalStorage('');
}

async function replaceLocation() {
  window.location.replace("index.html");
}

function saveGreetingNameToLocalStorage(name) {
  localStorage.setItem("greetingName", name);
}

function saveCurrentUserToLocalStorage(email) {
  localStorage.setItem("currentUser", email);
}

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

function checkRememberMe() {
  const rmCheck = document.getElementById("rememberMe");
  let emailInput = document.getElementById("email");

  if (localStorage.checkbox && localStorage.checkbox !== "") {
    emailInput.value = localStorage.username;
    rmCheck.setAttribute("checked", "checked");
  }
}

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

function submitForm() {
  document.querySelector("form").submit();
}

function openLogOutContainer() {
  document.getElementById('logOut').classList.toggle('d-none')
}

function logOut() {
  localStorage.removeItem('greetingName');
  window.location.replace('login.html');
}

function LoginContainerHtml() {
  return `
      <span class="login-span">Log in</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="return false">
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
          <button type="submit" onclick="logIn()" class="login-button"> Log in</button>
          <button type="submit" onclick="window.location.replace('index.html'); guestLogIn()" class="guest-login-button">Guest Log in</button>
        </div> 
      </form>
  `;
}

function SignUpContainerHtml() {
  return `
      <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
      <span class="sign-up-span" >Sign up</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="return false">
        <div>
          <input placeholder="Name" id="signUpName" required>
          <img src="assets/img/user.png" alt="">
        </div>
        <div>
          <input type="email" placeholder="Email" id="signUpEmail" required>
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input type="password" placeholder="Password" id="signUpPassword" required>
          <img src="assets/img/schloss.png" alt="">
        </div>
        <div id="emailAlert" class="alert d-none">
          <span> This email is already taken</span>
        </div>
        <div class="buttons">
          <button type="submit" onclick="signUp()" class="login-button"> Sign Up</button>
        </div>
     </form>
  `;
}

function PasswordContainerHtml() {
  return `
      <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
      <span class="forgot-password-span" >Forgot Password</span>
      <div class="horizontal-blue-line"></div>
      <form action="https://gruppe-join-421.developerakademie.net/send_mail.php" method="POST">
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
