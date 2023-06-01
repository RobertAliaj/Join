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
       </form>`;
}
