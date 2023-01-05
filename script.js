setURL('http://developerakademie.com/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    awaitHTML();
}


