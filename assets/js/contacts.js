let contacts = [];

function submitContact() {
    let name = document.getElementById('name');
    let mail = document.getElementById('mail');
    let phone = document.getElementById('phone');

    if (WordCount(name) === 1) {
        let contact = {
            "firstname": name.value,
            "lastname": '',
            "email": mail.value,
            "phone": phone.value,
        };
        contacts.push(contact);
        console.log(contacts);
    } if (WordCount(name) === 2) {
        let contact = {
            "firstname": name.value.split(' ')[0],
            "lastname": name.value.split(' ')[1],
            "email": mail.value,
            "phone": phone.value,
        };
        contacts.push(contact);
        console.log(contacts);
    }

}

function WordCount(str) {
    let arr = str.value.split(' ');
    return arr.filter(word => word !== '').length;
}




