function renderCategorysHtml(category, categoryColor) {
  return `
        <div class="dd-placeholder gray-hover" onclick="selectCategory('${category}', '${categoryColor}')">
            <div class="center">
                <div class="padding-17-right">${category}</div>
                <div class="category-color" style="background-color: ${categoryColor}"></div>
            </div>
        </div>
        `;
}

function renderContactsHtml(contactName, colorOfContact, i) {
  return `
    <div class="dd-placeholder gray-hover" onclick="selectedForTask('${contactName}', 'contactName${[
      i,
    ]}','${colorOfContact}')">
        <div>${contactName}</div>
        <div class="select-box center">
            <div id="contactName${[i]}"></div>
        </div>
    </div>
    `;
}

function renderYouHtml(contactName, colorOfContact) {
  return `
    <div
      class="dd-placeholder gray-hover"
      id="youContact"
      onclick="selectedForTask('${contactName}', 'point','${colorOfContact}')"
    >
      <div>You</div>
      <div class="select-box center">
        <div id="point"></div>
      </div>
    </div>
  `;
}

function selectedCategoryHtml(category, categoryColor) {
  return `
            <div class="center">
                <div class="padding-17-right">${category}</div>
                <div class="category-color" style="background-color: ${categoryColor};"></div>
            </div>
            `;
}

function renderSubtasksHtml(i, setClass, subtasks) {
  return `
    <div class="sub-task">
    <div onclick="setStatus('selectboxSubtask${i}', ${i})" class="selectbox-subtask">
      <img class="subtaskDone ${setClass}" id="selectboxSubtask${i}" src="assets/img/create_subtask.png">
    </div>
    <div class="subtask-text">${subtasks[i]}</div>
      <img class="clear-input pointer delete-subtask" onclick="removeSubtask(${i}), ${i}" src="assets/img/Clear_task_input.png" alt="${subtasks[i]}">
  </div>
  `;
}

function renderInitialsHtml(initials, i) {
 return `
    <div style="background-color:${initials[i]["color"]
    }" class="initials" id="contactInitials${[i]}">${initials[i]["initial"]
    }</div>
    `;
}

