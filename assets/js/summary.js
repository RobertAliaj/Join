function openBoard() {
    location.href = 'https://gruppe-join-421.developerakademie.net/Robert/board.html'
}

async function prepareContacts() {
    await downloadFromServer();
    contacts = jsonFromServer['contacts'];
    // await loadJSONFromServer()
    // contacts = JSON.parse(backend.getItem("contact")) || [];
    for (j = 0; j < contacts.length; j++) {
        if (contacts[j]['color'] == '') {
            contacts[j]['color'] = generateRandomColor();
            refreshContacts();
        }
    }
}

async function setGreetingName() {
    await includeHTML();

    let name = localStorage.getItem("greetingName");
    document.getElementById('greetingName').innerHTML = name;
    let goodMorning = document.getElementById('goodMorning');
    if (name !== ' ') {
        goodMorning.innerHTML = 'Good Morning,'
    } else {
        goodMorning.innerHTML = 'Good Morning';
        goodMorning.style.fontWeight = '700';
        goodMorning.style.fontSize = '45px'
    }

}