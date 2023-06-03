function getIdsOfInputFields() {
    let titleField = document.getElementById("titleInput");
    let descriptionField = document.getElementById("descriptionInput");
    let chosenDateField = document.getElementById("date");
    let categoryField = document.getElementById("chosenCategory");
    let contactField = document.getElementById("initialsContainer");
  
    return {
      titleField,
      descriptionField,
      chosenDateField,
      categoryField,
      contactField,
    };
  }


function getTitleOrDescription(inputId, reportId) {
    let taskInfo = document.getElementById(inputId).value;
    if (taskInfo == "") {
      remove_D_NoneCSSByReportId(reportId);
      required = true;
    } else {
      required = false;
      add_D_NoneCSSByReportId(reportId);
      return taskInfo;
    }
  }
  
  function getCategory(reportId) {
    if (selectedCategory == undefined) {
      remove_D_NoneCSSByReportId(reportId);
      required = true;
    } else {
      required = false;
      add_D_NoneCSSByReportId(reportId);
      return selectedCategory;
    }
  }
  
  function getContact(reportId) {
    if (collectedContact == "") {
      remove_D_NoneCSSByReportId(reportId);
      required = true;
    } else {
      required = false;
      add_D_NoneCSSByReportId(reportId);
      return collectedContact;
    }
  }
  
  function getDate(reportId) {
    let chosenDate = document.getElementById("date").value;
    if (chosenDate == "") {
      remove_D_NoneCSSByReportId(reportId);
      required = true;
    } else {
      add_D_NoneCSSByReportId(reportId);
      required = false;
      return chosenDate;
    }
  }
  
  function getPrio(reportId) {
    if (prio == undefined) {
      remove_D_NoneCSSByReportId(reportId);
      required = true;
    } else {
      required = false;
      add_D_NoneCSSByReportId(reportId);
      return prio;
    }
  
  }
  
  function pushSubtask() {
    for (let i = 0; i < subtasks.length; i++) {
      task.subtasks.name.push(subtasks[i]) || [];
    }
  }
  
  function pushStatus() {
    for (let i = 0; i < subtaskStatus.length; i++) {
      task.subtasks.status.push(subtaskStatus[i]);
    }
  }