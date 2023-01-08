
let myData = [
    {
        "category": "Sales",
        "title": "Call Potential Clients",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ['john'],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1
    },
    {
        "category": "Sales",
        "title": "Call Potential Clients",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ['john'],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1
    }, {
        "category": "Sales",
        "title": "Call Potential Clients",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ['john'],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1
    }, {
        "category": "Sales",
        "title": "Call Potential Clients",
        "description": "Make the Product Presentation to prospective Buyers",
        "assigned_to": ['John', 'Melissa'],
        "due_date": "20.02.2150",
        "prio": "Urgent",
        "subtasks": 1
    },
];

function renderToDoDetails() {
    for (let i = 0; i < myData.length; i++) {
         oneCard = myData[i];
        let title = oneCard['title'];
        let description = oneCard['description'];
        let category = oneCard['category'];
        let prio = oneCard['prio'];

        let card = document.getElementById('cards');
        card.innerHTML += renderToDoDetailsHtml(title, description, category, i);
        renderCoWorkers(oneCard, i);
    }   
}


function renderToDoDetailsHtml(title, description, category, i){
    return /* html */`
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
            <div class="initials-div" id="initials${i}">
            </div>
            <div></div>
        </div>
    </div>
`;
}

function renderCoWorkers(oneCard, i){
    let myCard = oneCard['assigned_to'];
    for (let c = 0; c < myCard.length; c++) {
        const element = myCard[c].charAt(0);  
        document.getElementById(`initials${i}`).innerHTML += `<div class="initials" >${element}</div>`;
    }
}
