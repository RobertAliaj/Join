function renderTasksHTML(task, i) {
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

     <div class="delete-bg d-none" id="openDeletePopUp${i}">
     <div class="delete-pop-up">
       <span>
         Permanently delete ?
       </span>
       <div class="buttons-div">
         <button class="delete-button red-btn"; onclick="removeBoardPopUp(); closeDeletePopUp(${i}); deleteTask(${i})"> Yes</button>
         <button class="delete-button white-btn" onclick="closeDeletePopUp(${i})"> No</button>
       </div>
       </div>
 </div>
    `;
}





function visibleInitialsHtml(oneInitial, i, s) {
    return `
    <div class="initials-board" id="inits${i}-${s}">
        ${oneInitial}
    </div>
    `;
}


function renderPopUpBoardHtml(task, i) {
    return `
    <div>
 
    <div class="exit">
    <img src="assets/img/Clear_task.png" id="exitPopUp" onclick="removeBoardPopUp()">
    </div>
    <div class="pop-up-category" id="popUpCategory${i}">
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

        <div class="name-inits" id="names${i}">
        </div>
    </div>
 </div>

    <div class="edit-or-delete">
        <div class="edit-or-delete-child" onclick="openDeletePopUp(${i})" title="Löschen">
            <img src="assets/img/deleteTask.png" class="delete">
        </div>

        <div class="edit-or-delete-child" onclick="openEditTask(); showEditPopUp(${i})" title="Bearbeiten">
            <img src="assets/img/pencil.png">
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


function renderEditTaskPopUpHtml(i) {
    let task = popUpTasks[i];
    return `

    <div>
        <div class="exit edit-exit">
            <img src="assets/img/Clear_task.png" onclick="closeEditTask(); renderEditedDetails(${i}), showPopUp(${i})">
        </div>
        
        <div class="edit-title column">
            <span>Title</span>
            <input id="inputTitle${i}" class="border" value="${task.title}">
        </div>

        <div class="edit-description column">
            <span>Description</span>
            <textarea id="inputDescription${i}" cols="0" rows="5" class="border description-input">${task.description}</textarea>
        </div>

        <div class="edit-date column">
            <span>DueDate</span>
            <input class="border edit-date" type="date" id="date${i}" value="${task.due_date}" onclick="setTodayDate(${i})">
        </div>

        <div class="edit-prio column">
            
            <span>Prio</span>

            <div class="edit-prio-divs">
                <div class="importance" id="high" onclick="editPriority(${i}, 'high', 'highImg')">
                    <span>Urgent</span>
                    <img src="assets/img/prio_high_old.png" id="highImg">
                </div>
                <div class="importance" id="medium" onclick="editPriority(${i}, 'medium', 'mediumImg')">
                    <span>Medium</span>
                    <img src="assets/img/prio_medium_old.png" id="mediumImg">
                </div>
                <div class="importance" id="low" onclick="editPriority(${i}, 'low', 'lowImg')">
                    <span>Low</span>
                    <img src="assets/img/prio_low_old.png" id="lowImg">
                </div>
            </div>

        </div>


        

        <div class="edit-assigned column">
            <span>Assigned To</span>
            
            <div class="border dropdown-div" id="dropdownDiv${i}" onclick="renderContactsOnDropDown(${i}); openEditDropDown(${i})">
                Select contacts to assign <img src="assets/img/drop_down.png">
            </div>
            
            <div id="dropdownElements${i}" class="dropDown-elemets border" style="display:none">
            </div>
        </div>


        <div class="edit-initials" id="editInits${i}">
        </div>


        <div class="edit-progress-divs">
            <div class="progress-divs" id="neWTODO" onclick="dragAndDropResponsive(${i}, 'neWTODO', 'TODO')">
                <span>To Do</span>
            </div>

            <div class="progress-divs" id="newInProgress" onclick="dragAndDropResponsive(${i}, 'newInProgress', 'inProgress')">
                <span>In Progress</span>
            </div>
            
            <div class="progress-divs" id="newFeedback" onclick="dragAndDropResponsive(${i}, 'newFeedback', 'feedback')">
                <span>Feedback</span>
            </div>

            <div class="progress-divs" id="newDone" onclick="dragAndDropResponsive(${i}, 'newDone', 'done')">
                <span>Done</span>
            </div>
        </div>
    </div>

    <div class="edit-ok-parent">
        <div class="edit-ok" onclick="closeEditTask(); renderEditedDetails(${i}), showPopUp(${i})" title="Speichern">
            <span>Ok</span>
            <img src="assets/img/create_task2.png">
        </div>
    </div>
    `;
}