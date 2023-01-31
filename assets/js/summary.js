function openBoard() {
    location.href = 'https://gruppe-join-421.developerakademie.net/Robert/board.html'
}

async function prepareContacts() {
    await downloadFromServer();
    contacts = jsonFromServer['contacts'];
    for (j = 0; j < contacts.length; j++) {
        if (contacts[j]['color'] == '') {
            contacts[j]['color'] = generateRandomColor();
            refreshContacts();
        }
    }
}

async function setGreetingName() {
    await includeHTML();
    let name = localStorage.getItem("greetingName")
    console.log(name)
    document.getElementById('greetingName').innerHTML = name;
}