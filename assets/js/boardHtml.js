function renderCardsHTML(element, i) {
    return `
    <div class="to-do-cards" draggable="true" ondragstart="startDragging(${i})" 
    onclick="displayBoardPopUp(); renderPopUpBoard(${i});renderSubtasks(${i}); renderPopUpPrio(${i}); removeSubtasks(${i})">
         <div class="category" id="category${i}">
             ${element['category']}
         </div>
   
         <div class="title-descr">
             <span class="to-do-title" id="toDoTitle">
                 <b>${element['title']}</b>
             </span>
             <span class="description">
                 ${element['description']}
             </span>
         </div> 
         <div class="progress-div">
             <div class="progress-bar"></div>
             <div><span class="progress-info"> 1/2 Done</span></div>
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


function renderPopUpBoardHtml(element) {
    return `
 
    <img src="assets/img/Clear_task.png" class="exit" onclick="removeBoardPopUp()">

    <div class="pop-up-category">
        <span>${element.category}</span>
    </div>

    <div class="pop-up-title">
        <h1>${element.title}</h1>
    </div>

    <div class="pop-up-description">
        <span>${element.description}</span>
    </div>

    <div class="date">
        <span><b>Due Date:</b></span>
        <div>${element.due_date}</div>
    </div>

    <div class="pop-up-priority" >
        <b>Priority:</b>
        <div class="prio-div" id="prioDiv">${element.prio} <img src="assets/img/prio_low.png" id="popUpPrio"></div>
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