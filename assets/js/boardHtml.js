function renderCardsHTML(task, i) {
    return `
    <div class="to-do-cards" 
    draggable="true" 
    ondragstart="startDragging(${i})" 
    onclick="showPopUp(${i})">
         <div class="category" id="category${i}">
             ${task['category']}
         </div>
   
         <div class="title-descr">
             <span class="to-do-title" id="toDoTitle">
                 <b>${task['title']}</b>
             </span>
             <span class="description">
                 ${task['description']}
             </span>
         </div> 
         <div class="progress-div" id="proDiv${i}">
             <div class="progress-bar-bg" >
            <div id="proBar${i}" class="progress-bar"></div>
             </div>
             <div id="progressNumbers${i}"></div>
         </div>

         <div id="initials${i}" class="initials-div">
         </div>

         <img src="assets/img/prio_low.png" class="prio-img" id="prioImg${i}">    

     </div>
    `;
}


function visibleInitialsHtml(oneInitial, i, s) {
    return `
    <div class="initials" id="inits${i}-${s}">
     ${oneInitial}
    </div>
    `;
}


function renderPopUpBoardHtml(task) {
    return `
 
    <img src="assets/img/Clear_task.png" class="exit" onclick="removeBoardPopUp()">

    <div class="pop-up-category">
        <span>${task.category}</span>
    </div>

    <div class="pop-up-title">
        <h1>${task.title}</h1>
    </div>

    <div class="pop-up-description">
        <span>${task.description}</span>
    </div>

    <div class="date">
        <span><b>Due Date:</b></span>
        <div>${task.due_date}</div>
    </div>

    <div class="pop-up-priority" >
        <b>Priority:</b>
        <div class="prio-div" id="prioDiv">${task.prio} <img src="assets/img/prio_low.png" id="popUpPrio"></div>
    </div>

    
    <div class="subtasks-parent" id="subParent">
        <b class="sub-title" id="subTitle">Subtasks:</b>

        <div id="subtasks" class="subtasks-child">
        </div>

    </div>

    <div class="pop-up-names" >
        <b>Assigned To:</b>
    </div>

    <div class="pop-up-assigned">
        <div id="initsPopUp" class="pop-up-inits"></div>

        <div class="name-inits" id="names">
        </div>
    </div>
        `;
}


function getNamesPopUpHtml(i, n, initials, names) {
    return `
<div class="name-inits-child">
    <div class="one-init" id="popUpInitials${i}-${n}">${initials[n]}</div>
    <div>${names}</div>
</div>
`;
}