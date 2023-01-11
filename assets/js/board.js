
// let myData = [
//     {
//         "category": "Sales",
//         "title": "Call Potential Clients",
//         "description": "Make the Product Presentation to prospective Buyers",
//         "assigned_to": ['john'],
//         "due_date": "20.02.2150",
//         "prio": "Urgent",
//         "subtasks": 1
//     },
//     {
//         "category": "Sales",
//         "title": "Accounting Invoices",
//         "description": "Make the Product Presentation to prospective Buyers",
//         "assigned_to": ['john'],
//         "due_date": "20.02.2150",
//         "prio": "Urgent",
//         "subtasks": 1
//     }, {
//         "category": "Sales",
//         "title": "Social Media Strategy",
//         "description": "Make the Product Presentation to prospective Buyers",
//         "assigned_to": ['john'],
//         "due_date": "20.02.2150",
//         "prio": "Urgent",
//         "subtasks": 1
//     }, {
//         "category": "Sales",
//         "title": "Call Potential Clients",
//         "description": "Make the Product Presentation to prospective Buyers",
//         "assigned_to": ['John', 'Melissa'],
//         "due_date": "20.02.2150",
//         "prio": "Urgent",
//         "subtasks": 1
//     },
// ];

// let myData;

let filteredData = [];

let backgroundColors = ["8AA4FF", "FF0000", "2AD300", "FF7A00", "E200BE", "0038FF"];
let progress = ['To Do', 'In Progress', 'Awaiting Feedback', 'Done'];


async function loadDataBase() {
    let resp = await fetch('.//database.json');
    let myData = await resp.json();

    filteredData.push(myData);
}


function renderProgressSection() {
    for (let i = 0; i < progress.length; i++) {
        const oneSection = progress[i];
        let proogressSection = document.getElementById('toDoSection');
        progress.innerHTML = '';
        proogressSection.innerHTML += renderProgressSectionHtml(oneSection, i);
        renderToDoDetails(i);
    }
}


function renderProgressSectionHtml(oneSection, i) {
    return `
    <div class="task-divs-parent">
            <div class="task-divs-child">
               <div>${oneSection}</div>
             <img src="/assets/img/add_button.png" class="add-img">
            </div>

         <!-- Hier wird nur die Card mit der jeweiligen To do generiert -->
        <div id="cards${i}" class="cards-parent">
    </div>
`;
}


function renderToDoDetails(i) {
    for (let l = 0; l < filteredData.length; l++) {
        let oneCard = filteredData[l];
        let title = oneCard['title'];
        let description = oneCard['description'];
        let category = oneCard['category'];
        let prio = oneCard['prio'];
        let card = document.getElementById(`cards${i}`);

        card.innerHTML += renderToDoDetailsHtml(title, description, category, l);

        renderCoWorkers(l);
    }
}


function renderToDoDetailsHtml(title, description, category, l) {
    return`
    <div class="to-do-cards" id="toDoCards">
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

        <div>
            <div class="initials-div" id="initials${l}">
            </div>
            <div></div>
        </div>
    </div>
`;
}


function renderCoWorkers(l) {
    let myCard = filteredData[l]['assigned_to'];
    for (let c = 0; c < myCard.length; c++) {
        const element = myCard[c].charAt(0);
        document.getElementById(`initials${l}`).innerHTML += `<div class="initials" >${element}</div>`;
    }
}


function filterCards() {
    let search = document.getElementById('myInput').value;
    search = search.toLowerCase();

    for (let i = 0; i < filteredData.length; i++) {
        const filteredCards = filteredData[i];
        
        let card = document.getElementById(`cards${i}`);
        card.innerHTML = '';
        
        for (let s = 0; s < filteredCards.length; s++) {
            const myTitle = filteredCards[s]['title'];
            if (myTitle.toLowerCase().includes(search)) {
                renderToDoDetails(filteredCards);
                console.log(myTitle);
            }
        }
    }
}