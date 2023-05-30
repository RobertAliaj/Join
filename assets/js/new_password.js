users = [];

/**
 * This function initilizes the password page
 */
async function initPassword() {
  init();
  users = jsonFromServer["users"];
  getParameter();
}

/**
 * This function gets the parameter of the url in the email
 */
function getParameter() {
  var urlParams = new URLSearchParams(window.location.search);
  var email = urlParams.get("email");
  var decodedEmail = decodeURIComponent(email);
  localStorage.setItem("email", decodedEmail);
}

/** 
 * This function gets the new password out of the inputs
 */
async function createNewPassword() {
  let password1 = document.getElementById("newPassword1").value;
  let password2 = document.getElementById("newPassword2").value;

  if (password1 === password2) {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["email"] === localStorage.email) {
        users[i]["password"] = password1;
        await saveJSONToServer();
        correctPassword();
      }
    }
  } else {
    wrongPassword();
  }
}

/**
 * This function redirects to the login site if the new password was similar in both inputs
 */
function correctPassword() {
  document.getElementById("loginContainer").innerHTML += `
        <div id="blueAlert" class="blue-alert">Dein Passwort wurde erfolgreich geändert. In ein paar Sekunden wirst du zur Login Seite weitergeleitet!</div>
    `;
  setTimeout(function () {
    location.href = "login.html";
    document.getElementById("blueAlert").classList.add("d-none");
  }, 3000);
}

/**
 * This function says that the new password was not similar in both inputs.
 */
function wrongPassword() {
  document.getElementById("loginContainer").innerHTML += `
    <div id="redAlert" class="red-alert">Deine Passwörter stimmen nicht überein. Bitte versuche es erneut!</div>
`;
  setTimeout(function () {
    document.getElementById("redAlert").classList.add("d-none");
  }, 3000);
}
