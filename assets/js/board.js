
let tasks = [
    {
        "id": 0,
        "category": "Sales",
        "title": "call",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ["Michael"],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1,
        "progress": "TODO"
    },
    {
        "id" : 1,
        "category": "Sales",
        "title": "accounting Invoices",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ["John", "Andy", "Mary"],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1,
        "progress": "TODO"
    },
    {
        "id": 2,
        "category": "Marketing",
        "title": "Social media strategy",
        "description": "Develop an ad campaign for brand positioning",
        "assigned_to": ["Ina", "Dita", "Mary", "Anna"],
        "due_date": "2023-03-02",
        "prio": "low",
        "subtasks": "Design an ad, Calculate the costs, Created accounts for all common social media platforms",
        "progress": "TODO"
      },
      {
        "id": 3,
        "category": "Media",
        "title": "Video cut",
        "description": "Edit the new company video",
        "assigned_to": ["Jani", "Rrezi", "Mary", "Anna", "Gary", "Mary", "Anna", "Gary"],
        "due_date": "2023-03-02",
        "prio": "medium",
        "subtasks": "",
        "progress": "TODO"
      }
];


let progress =['TODO','inProgress','feedback','done'];

let currentDraggedElement;


function renderCards() {
    clearSections();
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        let section = tasks[i]['progress'];
        if (section == "TODO" || section == "inProgress" || section == "feedback" || section == "done")
            document.getElementById(section).innerHTML += renderCardsHTML(element, i);
            renderCoWorkes(i);
    }
}


function clearSections(){
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


//render the first three CoWorkers to have the Task
function renderCoWorkes(i) {
    let initialsDiv = document.getElementById(`initials${i}`);
    let initialsArray = tasks[i]['assigned_to'];
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
function displayRemainingWorkers(initialsArray, initialsDiv) {
    if (initialsArray.length > 3) {
        // Create a new div element into the 'initialsDiv' to display the number of remaining workers
        let remainingWorkers = document.createElement("div");
        remainingWorkers.innerHTML = `+${initialsArray.length - 3}`;
        remainingWorkers.classList.add("remaining-workers");
        initialsDiv.appendChild(remainingWorkers);
    }
}


function searchTask() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase().trim();

    for (let i = 0; i < progress.length; i++) {
        const status = progress[i];
        document.getElementById(status).innerHTML = '';
    }

    document.getElementById('TODO').innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (tasks[i]['title'].toLowerCase().includes(search)) {
            document.getElementById('TODO').innerHTML += renderCardsHTML(element, i);
            renderCoWorkes(i);
        }
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(progress){
    tasks[currentDraggedElement]['progress'] = progress;
    console.log(tasks[currentDraggedElement]['progress']);
    renderCards(); 
}


function renderCardsHTML(element, i) {
    return`
    <div class="to-do-cards" draggable="true" ondragstart="startDragging(${element['id']})">
         <div class="category" id="category">
             ${element['category']}
         </div>
   
         <div class="title-descr">
             <span class="to-do-title" id="toDoTitle">
                 ${element['title']}
             </span>
             <span>
                 ${element['description']}
             </span>
         </div> 
         <div class="progress-div">
             <div class="progress-bar"></div>
             <div><span class="progress-info"> <b>1</b>/ <b>2</b> Done</span></div>
         </div>

         <div id="initials${i}" class="initials-div">
         </div>
     </div>
    `; 
}


function renderCoWorkersHtml(myInitial, s) {
    return `
    <div class="initials" id="inits${s}">
     ${myInitial}
    </div>
    `;
}



















































// async function loadMyData() {
//     let resp = await fetch('.//database.json');
//     myData = await resp.json();
// }






// function filterCards() {
//     let search = document.getElementById('searchInput').value;
//     search = search.toLowerCase().trim();
//     let task = document.getElementById('task');
//     task.innerHTML = '';

//     for (let l = 0; l < myData.length; l++) {
//         const currentCard = myData[l];
//         if (myData[l]['title'].toLowerCase().includes(search)) {
//             task.innerHTML += renderCardsHtml(currentCard, l);
//             renderCoWorkes(l);
//         }
//     }
// }






function displayOverlay(){
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('popUp').classList.remove('d-none');
}


function removeOverlay(){
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('popUp').classList.add('d-none')
}
