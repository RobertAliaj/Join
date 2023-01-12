let progress = ['To Do', 'In Progress', 'Awaiting Feedback', 'Done'];
let myData = [];
let filteredCard = [];

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
        renderCoWorkes(l)
    }
}



function renderCoWorkes(l) {
    let initialsDiv = document.getElementById(`initials${l}`);
    let currentCard = myData[l];
    let initialsArray = currentCard['assigned_to'];

    for (let s = 0; s < initialsArray.length; s++) {
        const myInitial = initialsArray[s].charAt(0);
        initialsDiv.innerHTML += `
                    <div class="initials" id="inits${s}">
                     ${myInitial}
                    </div>
                    `;
    }
}


function proofInput() {
    let search = document.getElementById('searchInput').value;
    if (search.length < 1) {
        renderCards();
    } else {
        filterCards();
    }
}


function filterCards() {
    filteredCard.length = 0;
    for (let i = 0; i < myData.length; i++) {
        filteredCard.push(myData[i]);
    }
    renderFilteredCards();
}

function renderFilteredCards() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();
    let task = document.getElementById('task');
    task.innerHTML = '';
    
    for (let l = 0; l < filteredCard.length; l++) {
        const currentCard = filteredCard[l];
        if (filteredCard[l]['title'].toLowerCase().includes(search)) {
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
    <div class="to-do-cards" id="${l}">
        <div class="category" id="category">
            ${currentCard['category']}
           </div>
   
           <span class="to-do-title" id="toDoTitle">
               ${currentCard['title']}
   </span>

   <span>
       ${currentCard['description']}
   </span>
   
   <div class="progress-div">
       <div class="progress-bar"></div>
       <div><span class="progress-info"> <b>1</b>/ <b>2</b> Done</span></div>
   </div>

   <div id="initials${l}" class="initials-div">
   </div>
</div>
`;
}