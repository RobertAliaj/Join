function openCategoryFolder(clicked, notClicked, visible, notVisible) {
    document.getElementById(clicked).classList.add("dropdown-category-open");
    document.getElementById(notClicked).classList.remove("dropdown-category-open");
    document.getElementById(visible).classList.remove("d-none");
    document.getElementById(notVisible).classList.add("d-none");
    document.getElementById("initialsContainer").classList.add("d-none");
}

function closeCategoryFolder(clicked, visible, notVisible) {
    document.getElementById(clicked).classList.remove("dropdown-category-open");
    document.getElementById(visible).classList.add("d-none");
    document.getElementById(notVisible).classList.add("d-none");
    document.getElementById("initialsContainer").classList.remove("d-none");
}

function removeClearBtnAndAddArrow() {
    document.getElementById("clearAddButtons").classList.add("d-none");
    document.getElementById("ddArrow").classList.remove("d-none");
    setTimeout(setAttribute, 200);
}

function addClearBtnAndRemoveArrow() {
    document.getElementById("clearAddButtons").classList.remove("d-none");
    document.getElementById("ddArrow").classList.add("d-none");
    document
        .getElementById("contactsToAssingContainer")
        .removeAttribute("onclick");
}

function changeStyleForPriority(clicked) {
    if (clicked == "prioHigh") {
        document.getElementById(clicked).style = `background-color: rgb(236, 85, 32); color: white`;
    } else if (clicked == "prioMedium") {
        document.getElementById(clicked).style = `background-color: rgb(243, 173, 50); color: white`;
    } else if (clicked == "prioLow") {
        document.getElementById(clicked).style = `background-color: rgb(147, 222, 70); color: white`;
    }
}

function resetPrioButton(notClicked, alsoNotClicked) {
    document.getElementById(notClicked).style = ``;
    document.getElementById(alsoNotClicked).style = ``;
    document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
    document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
    document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
}

function changeColor(img) {
    imgPath = document.getElementById(img);
    if (img == "prioHighImg") {
        imgPath.src = `assets/img/prio_high_white.svg`;
    }
    if (img == "prioMediumImg") {
        imgPath.src = `assets/img/prio_medium_white.svg`;
    }
    if (img == "prioLowImg") {
        imgPath.src = `assets/img/prio_low_white.svg`;
    }
}



function getClass(i) {
    if (subtaskStatus[i] == true) {
        return (setClass = "");
    } else {
        return (setClass = "d-none");
    }
}

function switchIconsfromSubtask(booleanArgument, addSubtask, subtaskInput) {
    if (booleanArgument == true) {
      subtaskInput.removeAttribute("onclick");
      createSubtask.classList.remove("d-none");
      addSubtask.classList.add("d-none");
      subtaskInput.focus();
    } else {
      subtaskInput.setAttribute("onclick", "switchSubtaskIcons()");
      createSubtask.classList.add("d-none");
      addSubtask.classList.remove("d-none");
      subtaskInput.blur();
      subtaskInput.value = "";
    }
  }

  function openCreateCategory() {
    document.getElementById("categoryPlaceholder").classList.add("d-none");
    document.getElementById("newCategoryContainer").classList.remove("d-none");
    document.getElementById("color-picker").classList.remove("d-none");
    pullDownMenu("category", "assingedTo", "moreCategorys", "moreContacts");
    getRandomColor();
  }
  
  function closeCreateCategory() {
    document.getElementById("categoryPlaceholder").classList.remove("d-none");
    document.getElementById("newCategoryContainer").classList.add("d-none");
    document.getElementById("color-picker").classList.add("d-none");
  }

  function remove_D_NoneCSSByReportId(reportId){
    document.getElementById(reportId).classList.remove("d-none");
  }
  
  function add_D_NoneCSSByReportId(reportId){
    document.getElementById(reportId).classList.add("d-none");
  }

  function resetColorOfPrioButtons(highPrio, midPrio, lowPrio){
    highPrio.style.background = "white";
    midPrio.style.background = "white";
    lowPrio.style.background = "white";
    highPrio.style.color = "black";
    midPrio.style.color = "black";
    lowPrio.style.color = "black";
  }

  function resetImgOfPrioButtons() {
    document.getElementById("prioHighImg").src = `assets/img/prio_high.svg`;
    document.getElementById("prioMediumImg").src = `assets/img/prio_medium.svg`;
    document.getElementById("prioLowImg").src = `assets/img/prio_low.svg`;
  }

  function getIdOfPrioButtons(){
    let highPrio = document.getElementById("prioHigh");
    let midPrio = document.getElementById("prioMedium");
    let lowPrio = document.getElementById("prioLow");
  
    return [highPrio, midPrio, lowPrio];
  }