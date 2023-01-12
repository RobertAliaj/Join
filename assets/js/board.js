let progress = ['To Do', 'In Progress', 'Awaiting Feedback', 'Done'];
let myData = [];

async function renderContent() {
    await loadMyData();
    renderProgressSection();
    renderCards();
}


async function loadMyData() {
    let resp = await fetch('.//database.json');
    myData = await resp.json();
}


function renderProgressSection() {
    let mySection = document.getElementById('toDoSection');
    for (let i = 0; i < progress.length; i++) {
        const currentSection = progress[i];
        mySection.innerHTML += renderProgressHtml(currentSection);
    }
}


function renderCards() {
    let tasks = document.getElementById(`task`);
    tasks.innerHTML = '';

    for (let l = 0; l < myData.length; l++) {
        const currentCard = myData[l];
        tasks.innerHTML += renderCardsHtml(currentCard, l);
        renderCoWorkes(l);
    }
}


//render the first three CoWorkers to have the Task
function renderCoWorkes(l) {
    let initialsDiv = document.getElementById(`initials${l}`);
    let initialsArray = myData[l]['assigned_to'];
    //das 0 wird praktisch nicht durch die Schleife erhöht sondern durch divscreated++; 
    let divsCreated = 0;
    for (let s = 0; s < initialsArray.length; s++) {
        if (divsCreated === 3) {
            break;
        }
        const myInitial = initialsArray[s].charAt(0);
        initialsDiv.innerHTML += renderCoWorkersHtml(myInitial, s);
        divsCreated++;
    }
    displayRemainingWorkers(initialsArray, initialsDiv);
}


//if theres more than 3 CoWO in one Task, then display a div with the number of the remaining Workers
function displayRemainingWorkers(initialsArray, initialsDiv){
    if (initialsArray.length > 3) {
        // Create a new div element into the 'initialsDiv' to display the number of remaining workers
        let remainingWorkers = document.createElement("div");
        remainingWorkers.innerHTML = `+${initialsArray.length - 3}`;
        remainingWorkers.classList.add("remaining-workers");
        initialsDiv.appendChild(remainingWorkers);
    }
}


function filterCards() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();
    let task = document.getElementById('task');
    task.innerHTML = '';
    
    for (let l = 0; l < myData.length; l++) {
        const currentCard = myData[l];
        if (myData[l]['title'].toLowerCase().includes(search)) {
            task.innerHTML += renderCardsHtml(currentCard, l);
            renderCoWorkes(l);
        }
    }
}










function renderProgressHtml(currentSection) {
    return `
    <div class="task-divs-parent">
    <div class="task-divs-child">
       <div>${currentSection}</div>
     <img src="/assets/img/add_button.png" class="add-img">
    </div>

        <div id="task" class="cards-parent">
        </div>`;
}


function renderCardsHtml(currentCard, l) {
    return `
    <div class="to-do-cards" id="myCard${l}">
        <div class="category" id="category">
            ${currentCard['category']}
        </div>
   
        <div class="title-descr">
            <span class="to-do-title" id="toDoTitle">
                ${currentCard['title']}
            </span>
            <span>
                ${currentCard['description']}
            </span>
        </div> 
        <div class="progress-div">
            <div class="progress-bar"></div>
            <div><span class="progress-info"> <b>1</b>/ <b>2</b> Done</span></div>
        </div>

        <div id="initials${l}" class="initials-div">
        </div>
    </div>
`;
}


function renderCoWorkersHtml(myInitial, s){
    return `
    <div class="initials" id="inits${s}">
     ${myInitial}
    </div>
    `;
}


// function filterCards() {
//     filteredCard.length = 0;
//     for (let i = 0; i < myData.length; i++) {
//         filteredCard.push(myData[i]);
//     }
//     renderFilteredCards();
// }


// function renderFilteredCards() {
//     let search = document.getElementById('searchInput').value;
//     search = search.toLowerCase().trim();
//     let task = document.getElementById('task');
//     task.innerHTML = '';
    
//     for (let l = 0; l < filteredCard.length; l++) {
//         const currentCard = filteredCard[l];
//         if (filteredCard[l]['title'].toLowerCase().includes(search)) {
//             task.innerHTML += renderCardsHtml(currentCard, l);
//             renderCoWorkes(l);
//         }
//     }
// }
