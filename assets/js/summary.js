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
    if(name !== ' ') {
        document.getElementById('goodMorning').innerHTML = 'Good Morning,'
    } else {
        document.getElementById('goodMorning').innerHTML = 'Good Morning'
    }
    
}