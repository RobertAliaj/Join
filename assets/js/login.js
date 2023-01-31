let users = [];

function animate() {
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

function saveGreetingName(name) {
  localStorage.setItem("greetingName", name);
}

function openSignUp() {
  document.getElementById('signUp').style.display = 'none';
  loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += SignUpContainerHtml();
}

function openLogIn() {
  document.getElementById('signUp').style.display = 'flex';
  loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += LoginUpContainerHtml();
}

function LoginUpContainerHtml() {
  return `
      <span>Log in</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="login()">
        <div>
          <input type="email" placeholder="Email" id="email">
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input type="password" placeholder="Password" id="password">
          <img src="assets/img/schloss.png" alt="">
        </div>
     
    <div class="remember-me">
    <div class="select-box"></div>
      <span>Remember me</span>
      <a>Forgot my password</a>
    </div>
    <div class="buttons">
      <button type="submit" class="login-button"> Log in</button>
      <button type="submit" onclick="location.href = 'index.html'; saveGreetingName('Guest')"class="guest-login-button">Guest Log in</button>
    </div> 
    </form>
  `;
}

function SignUpContainerHtml() {
  return `
    <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
    <span class="sign-up-span" >Sign up</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="login()">
        <div>
          <input placeholder="Name" id="name" required>
          <img src="assets/img/user.png" alt="">
        </div>
        <div>
          <input type="email" placeholder="Email" id="email" required>
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input type="password" placeholder="Password" id="password" required>
          <img src="assets/img/schloss.png" alt="">
        </div>
     <div class="buttons">
        <button type="submit" onclick="signUp()" class="login-button"> Sign Up</button>
     </div>
     </form>
  `;
}

