users = [];


async function init() {
    await downloadFromServer();
    users = jsonFromServer['users'];
    getParameter()
}


function getParameter() {
    var urlParams = new URLSearchParams(window.location.search);
    var email = urlParams.get('email');
    var decodedEmail = decodeURIComponent(email);
    localStorage.setItem('email', decodedEmail);
}

async function createNewPassword() {
    let password1 = document.getElementById('newPassword1').value;
    let password2 = document.getElementById('newPassword2').value;

    if (password1 === password2) {
        for(let i = 0; i < users.length; i++) {
          if(users[i]['email'] === localStorage.email) {
            console.log(i)
            users[i]['password'] = password1;
            await saveJSONToServer();
            correctPassword();
          }
        }
    } else {
        wrongPassword();
    }
}

function correctPassword() {
    document.getElementById('loginContainer').innerHTML += `
        <div id="blueAlert" class="blue-alert">Dein Passwort wurde erfolgreich geändert. In ein paar Sekunden wirst du zur Login Seite weitergeleitet!</div>
    `;
    setTimeout(function() {
        window.open('login.html')
        document.getElementById('blueAlert').classList.add('d-none')
    }, 3000)
}

function wrongPassword() {
    document.getElementById('loginContainer').innerHTML += `
    <div id="redAlert" class="red-alert">Deine Passwörter stimmen nicht überein. Bitte versuche es erneut!</div>
`;
setTimeout(function() {
    document.getElementById('redAlert').classList.add('d-none')
}, 3000)

}