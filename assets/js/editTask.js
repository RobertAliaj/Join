function setTodayDate(i) {
    let today = new Date();
    let dateInput = document.getElementById(`date${i}`);
    dateInput.value = today.toISOString().slice(0, 10);
}


function editTask(i) {
    let editPopUp = document.getElementById('editTask');
    editPopUp.innerHTML = editTaskHtml(i);
    selectAssigned(i);
    renderEditInits(i);
}

function selectAssigned(i) {
    let select = document.getElementById(`selectAssign${i}`);

    let assigned = popUpTasks[i]['assigned_to'];
    for (let a = 0; a < assigned.length; a++) {
        const name = assigned[a];
        let option = document.createElement("option");
        option.text = name;
        option.classList.add('myOption')
        select.add(option);
    }
}


function renderEditInits(i) {
    let names = popUpTasks[i]['assigned_to'];
    let initials = names.map(name => name.split(' ').map(word => word[0]).join(''));
    for (let s = 0; s < initials.length; s++) {
        let inits = initials[s];
        document.getElementById(`editInits${i}`).innerHTML +=
            `<div id="editInits${i}-${s}" class="one-init">${inits}</div>`;
        renderEditInitialColors(i, s);
    }
}


function renderEditInitialColors(i, s) {
    let bubble = document.getElementById(`editInits${i}-${s}`);
    for (let j = 0; j < colorAndInitials.length; j++) {
        if (bubble.textContent.includes(colorAndInitials[j].name)) {
            bubble.style.backgroundColor = colorAndInitials[j].color;
            break;
        }
    }
}