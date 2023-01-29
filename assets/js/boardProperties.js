function displayBoardPopUp() {
    document.getElementById('card').classList.remove('d-none')
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('popUpOne').classList.remove('d-none');
}


function removeBoardPopUp() {
    document.getElementById('card').classList.add('d-none')
}


function displayOverlay() {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('popUp').classList.remove('d-none');
}


function removeOverlay() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('popUp').classList.add('d-none')
}


function highlight(id) {
    document.getElementById(id).classList.add('dragarea-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragarea-highlight');
}


function openEditTask() {
    document.getElementById('editTask').classList.remove('d-none');
    document.getElementById('popUpOne').classList.add('d-none');
}

function closeEditTask() {
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('popUpOne').classList.remove('d-none');
}


function openDeletePopUp(i) {
    document.getElementById(`openDeletePopUp${i}`).classList.remove('d-none');
}

function closeDeletePopUp(i) {
    document.getElementById(`openDeletePopUp${i}`).classList.add('d-none');
}



function setColors(category) {
    let categorysAndColors = {
        Design: "rgb(239, 132, 41)",
        Sales: "rgb(236, 126, 250)",
        Backoffice: "rgb(100, 210, 193)",
        Marketing: "rgb(18, 58, 248)",
        Media: "rgb(247, 202, 57)",
    };
    return (categorysAndColors[category]);
}


function setPrioProperties(prio) {
    let img = prio === 'low' ? 'assets/img/prio_low_old.png'
        : prio === 'medium' ? 'assets/img/prio_medium_old.png'
            : 'assets/img/prio_high_old.png';

    let color = prio === 'low' ? 'rgb(122,226,41)'
        : prio === 'medium' ? 'rgb(255,168,0)'
            : 'rgb(255,61,0)';
    return { img, color };
}


function getContactColorsandInitials() {
    for (let i = 0; i < contacts.length; i++) {
        let contactColor = contacts[i]['color'];
        let contact = contacts[i];
        let firstInitial = contact.firstname[0];
        let lastInitial = contact.lastname[0];
        let initials = (firstInitial + lastInitial);
        colorAndInitials.push(setContactColors(contactColor, initials));
    }
}


function setContactColors(contactColor, initials) {
    return {
        name: initials,
        color: contactColor
    }
}