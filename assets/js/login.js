let users = [];

async function initLogin() {
  await downloadFromServer();
  users = jsonFromServer['users'];
  openLogIn();
  lsRememberMe();
}

function animate() {
  if (window.innerWidth < 501) {
    animateResponsive();
  } else {
    animateNormal()
  }
}

function animateNormal() {
  let height = document.getElementById('outerDiv').clientHeight;
  let width = document.getElementById('outerDiv').clientWidth;
  let imgHeight = document.getElementById('imgDiv').clientHeight;
  let imgWidth = document.getElementById('imgDiv').clientWidth;
  setTimeout(function () {
    const animation = gsap.timeline()
      .set("#imgDiv", {
        x: 0,
        y: 0,
        scale: 0.9
      }, 0)
      .set("#contentDiv", {
        opacity: 0
      }, 0)
      .to("#imgDiv", {
        x: (-width / 2) + (imgWidth / 2) + 50,
        y: (-height / 2) + (imgHeight / 2) + 50,
        scale: 0.3,
        ease: "power1.out",
        duration: 1
      }, 0)
      .to("#contentDiv", {
        opacity: 1,
        duration: 1
      }, 0);
  }, 1000);

  document.getElementById('outerDiv').style.zIndex = 1;
}

function animateResponsive() {
  let height = document.getElementById('outerDiv').clientHeight;
  let width = document.getElementById('outerDiv').clientWidth;
  let imgHeight = document.getElementById('imgDiv').clientHeight;
  let imgWidth = document.getElementById('imgDiv').clientWidth;
  setTimeout(function () {
    const animation = gsap.timeline()
      .set("#imgDiv", {
        x: 0,
        y: 0,
        scale: 1
      }, 0)
      .set("#contentDiv", {
        opacity: 0
      }, 0)
      .to("#imgDiv", {
        x: (-width / 2) + (imgWidth / 2) + 20,
        y: (-height / 2) + (imgHeight / 2) + 20,
        scale: 0.2,
        ease: "power1.out",
        duration: 1
      }, 0)
      .to("#contentDiv", {
        opacity: 1,
        duration: 1
      }, 0);
  }, 1000);

  document.getElementById('outerDiv').style.zIndex = 1;
}

function saveGreetingName(name) {
  localStorage.setItem("greetingName", name);
}

function openSignUp() {
  document.getElementById('signUp').style.display = 'none';
  let loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += SignUpContainerHtml();
}

function openLogIn() {
  document.getElementById('signUp').style.display = 'flex';
  let loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += LoginContainerHtml();
}

function openForgotPassword() {
  document.getElementById('signUp').style.display = 'none';
  let loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += PasswordContainerHtml();
}

function signUp() {
  signUpName = document.getElementById('signUpName')
  signUpEmail = document.getElementById('signUpEmail')
  signUpPassword = document.getElementById('signUpPassword')
  let user = {
    'name': signUpName.value,
    'email': signUpEmail.value,
    'password': signUpPassword.value
  };
  pushUser(user);
}

async function pushUser(user) {
  users.push(user);
  jsonFromServer['users'] = users
  await saveJSONToServer();
}

function logIn() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let user = users.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    // alert.classList.add('d-none');

    saveGreetingName(user['name'])
    location.href = 'index.html';

  } else {
    email.value = '';
    password.value = '';
    let alert = document.getElementById('alert');
    alert.classList.remove('d-none');
  }
}

function lsRememberMe() {
  const rmCheck = document.getElementById('rememberMe'),
    emailInput = document.getElementById('email');

  if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.username;
  } else {
    rmCheck.removeAttribute("checked");
  }

  if (rmCheck.checked) {
    localStorage.username = emailInput.value;
    localStorage.checkbox = "checked";
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}

function submitForm() {
  document.querySelector("form").submit();
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
            <input type="checkbox" id="rememberMe" onclick="lsRememberMe()" value="lsRememberMe" class="select-box">
            <span>Remember me</span>
          </div>
          <a onclick="openForgotPassword()">Forgot my password</a>
        </div>
        <div class="buttons">
          <button type="submit" onclick="logIn()" class="login-button"> Log in</button>
          <button type="submit" onclick="location.href = 'index.html'; saveGreetingName(' ')" class="guest-login-button">Guest Log in</button>
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
        <div class="buttons">
          <button type="submit" onclick="signUp(); openLogIn()" class="login-button"> Sign Up</button>
        </div>
     </form>
  `;
}

function PasswordContainerHtml() {
  return `
      <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
      <span class="forgot-password-span" >Forgot Password</span>
      <div class="horizontal-blue-line"></div>
      <form action="https://gruppe-join-421.developerakademie.net/Robert/send_mail.php" method="POST">
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