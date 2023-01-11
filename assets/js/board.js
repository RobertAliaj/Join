let progress = ['To Do', 'In Progress', 'Awaiting Feedback', 'Done'];
let myData = [];

let filteredCard = [];

async function loadAll() {
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


function filter() {
    let search = document.getElementById('searchInput').value;
    if (search.length < 1) {
        renderCards();
    } else {
        filterCards();
    }
}


function filterCards() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    let task = document.getElementById('task');
    task.innerHTML = '';

    filteredCard.length = 0;                                    // setze das array auf 0

    for (let i = 0; i < myData.length; i++) {                   // iteriere durch das myDataArray     
        const myTitle = myData[i]['title'];                     // Der Titel
        filteredCard.push(myData[i]);                           // Kopiere myData in filteredCard
        if (myTitle.toLowerCase().includes(search)) {           // wenn der Titel = searchValue
            renderFilteredCards();                              // dann rufe diese Funktion auf
        }
    }
}

function renderFilteredCards() {
    let currentSection;
    for (let i = 0; i < progress.length; i++) {
        currentSection = progress[i];                           // variable die später als id übergeben wird 
    }

    for (let l = 0; l < filteredCard.length; l++) {             // iteriere durch das filteredCardArray  
        const currentCard = filteredCard[l];                    
        let title = currentCard['title'];
        let description = currentCard['description'];
        let category = currentCard['category'];
        let task = document.getElementById('task');           
        task.innerHTML += renderCardsHtml(title, description, category, currentSection, l);
    }
}



function renderCards() {

    let myCard = document.getElementById(`task`);
    myCard.innerHTML = '';
    let currentSection;

    for (let i = 0; i < progress.length; i++) {
        currentSection = progress[i];
    }
    for (let l = 0; l < myData.length; l++) {
        const currentCard = myData[l];
        let title = currentCard['title'];
        let description = currentCard['description'];
        let category = currentCard['category'];

        myCard.innerHTML += renderCardsHtml(title, description, category, currentSection, l);
        renderCoWorkes(currentSection, l)
    }
}



function renderCoWorkes(currentSection, l) {
    let initialsDiv = document.getElementById(`initials${currentSection}${l}`);
    let currentCard = myData[l];
    let initialsArray = currentCard['assigned_to'];

    for (let s = 0; s < initialsArray.length; s++) {
        const myInitial = initialsArray[s].charAt(0);
        initialsDiv.innerHTML += `
                    <div class="initials">
                     ${myInitial}
                    </div>
                    `;
    }
}

















function renderProgressHtml(currentSection) {
    return `
    <div class="task-divs-parent">
    <div class="task-divs-child">
       <div>${currentSection}</div>
     <img src="/assets/img/add_button.png" class="add-img">
    </div>

<!-- Hier wird nur die Card mit der jeweiligen To do generiert -->
<div id="task" class="cards-parent">
</div>`;
}




function renderCardsHtml(title, description, category, currentSection, l) {
    return `
    <div class="to-do-cards" id="${l}">
        <div class="category" id="category">
            ${category}
           </div>
   
           <span class="to-do-title" id="toDoTitle">
               ${title}
   </span>

   <span>
       ${description}
   </span>
   
   <div class="progress-div">
       <div class="progress-bar"></div>
       <div><span class="progress-info"> <b>1</b>/ <b>2</b> Done</span></div>
   </div>

   <div id="initials${currentSection}${l}" class="initials-div">
   </div>
</div>
`;
}