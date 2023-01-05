setURL('http://gruppe-join-421.developerakademie.net/smallest_backend_ever.zip');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    awaitHTML();
}


