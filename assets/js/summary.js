let currentUser;

/**
 * This function initializes the Summary page
 */
async function initSummary() {
  await includePlusInit();
  greetingTime();
  saveCurrentUser();
  setProfilePicture();
  loadTasks();
}

/**
 * This function checks the current User idx in the users array
 */
function saveCurrentUser() {
  let email = localStorage.getItem('currentUser');
  for (let i = 0; i < users.length; i++) {
    if (users[i]["email"] == email) {
      currentUser = i;
      console.log(i)
    }
  }
}

/**
 * This function sets the profile picture in the top corner according to the gender
 */
async function setProfilePicture() {
  img = document.getElementById('userPicture');
  if (currentUser !== undefined) {
    gender = users[currentUser]['gender'];

    switch (gender) {
      case 'woman':
        img.src = 'assets/img/woman.png';
        break;
      case 'man':
        img.src = 'assets/img/man.png';
        break;
      default:
        img.src = 'assets/img/guestLogin.png';
    }
  } else {
    img.src = 'assets/img/guestLogin.png';
  }
}

/**
 * This function loads all the information of the board
 */
function loadTasks() {
  showTasksInBoard();
  showTasksInProgress();
  showAwaitingFeedback();
  showUrgentTasks();
  fillInClosestDate();
  showTodos();
  showDone();
}

/**
 * This function displays the number of tasks in board
 */
function showTasksInBoard() {
  document.getElementById("tasksInBoard").innerHTML = tasks.length;
  if (tasks.length < 2) {
    document.getElementById("tasksInBoardSpan").innerHTML = "Task in Board";
  }
}

/**
 * This function displays the number of tasks in progress
 */
function showTasksInProgress() {
  let x = 0;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i]["progress"] === "inProgress") {
      x = x + 1;
    }
  }
  document.getElementById("tasksInProgress").innerHTML = x;
  if (x < 2) {
    document.getElementById("tasksInProgressSpan").innerHTML =
      "Task in Progress";
  }
}

/**
 * This function displays the number of tasks awaiting feedback
 */
function showAwaitingFeedback() {
  let x = 0;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i]["progress"] === "feedback") {
      x = x + 1;
    }
  }
  document.getElementById("awaitingFeedback").innerHTML = x;
}

/**
 * This function displays the number of urgent tasks
 */
function showUrgentTasks() {
  let x = 0;
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i]["prio"] === "high") {
      x = x + 1;
    }
  }
  document.getElementById("urgent").innerHTML = x;
}

/**
 * This function displays the mumber of todos
 */
function showTodos() {
  let x = 0;
  for (i = 0; i < tasks.length; i++) {
    let task = tasks[i]["subtasks"]["status"];
    for (j = 0; j < task.length; j++) {
      if (task[j] === true) {
        x = x + 1;
      }
    }
  }
  document.getElementById("todo").innerHTML = x;
}

/**
 * This function displays the number of done tasks
 */
function showDone() {
  let x = 0;
  for (i = 0; i < tasks.length; i++) {
    let task = tasks[i]["subtasks"]["status"];
    for (j = 0; j < task.length; j++) {
      if (task[j] === false) {
        x = x + 1;
      }
    }
  }
  document.getElementById("done").innerHTML = x;
}

/**
 * This function displays the Task with the closest upcoming date
 * @returns the closest date
 */
function findClosestDate() {
  const today = new Date();
  let closestDate = new Date(tasks[0]["due_date"]);
  let closestDiff = Math.abs(today - closestDate);

  for (let i = 1; i < tasks.length; i++) {
    const currentDate = new Date(tasks[i]["due_date"]);
    const currentDiff = Math.abs(today - currentDate);
    if (currentDiff < closestDiff) {
      closestDate = currentDate;
      closestDiff = currentDiff;
    }
  }

  return closestDate;
}

/**
 * This function displays the date
 */
function fillInClosestDate() {
  const closestDate = findClosestDate();
  const dateString = closestDate.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  document.getElementById("upcomingDeadline").innerHTML = dateString;
}

/**
 * This function sets the greeting according to current time
 */
function greetingTime() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    setGreetingName("Good morning");
  } else if (curHr < 18) {
    setGreetingName("Good afternoon");
  } else {
    setGreetingName("Good evening");
  }
}

/**
 * This function displays the Greeting Name
 * @param {string} time time string
 */
function setGreetingName(time) {
  let name = localStorage.getItem("greetingName");
  document.getElementById("greetingName").innerHTML = name;
  let goodMorning = document.getElementById("goodMorning");
  if (name !== " ") {
    goodMorning.innerHTML = time + ",";
  } else {
    if (window.innerWidth < 1200) {
      goodMorning.innerHTML = time;
      goodMorning.style.fontWeight = "700";
    } else {
      goodMorning.innerHTML = time;
      goodMorning.style.fontWeight = "700";
      goodMorning.style.fontSize = "45px";
    }
  }
  if (window.innerWidth < 1000) {
    referrer = document.referrer;
    if (referrer == "https://gruppe-join-421.developerakademie.net/login.html") {
      responsiveGreeting();
    }
  }
}

/**
 * This function sets the greeting in responsive 
 */
function responsiveGreeting() {
  document.getElementById("greeting").classList.add("responsive-greeting");
  document.getElementById("headline").style.opacity = 0;
  document.getElementById("summaryContent").style.opacity = 0;
  animateResponsiveGreeting();
}

/**
 * This function animates the fade in of the responsive greeting
 */
function animateResponsiveGreeting() {
  setTimeout(function () {
    const animation = gsap
      .timeline()
      .set(
        "#greeting",
        {
          opacity: 1,
        },
        0
      )
      .set(
        "#headline",
        {
          opacity: 0,
        },
        0
      )
      .set(
        "#summaryContent",
        {
          opacity: 0,
        },
        0
      )
      // .pause(2)
      .to(
        "#greeting",
        {
          opacity: 0,
          duration: 1,
        },
        0
      )
      .to(
        "#headline",
        {
          opacity: 1,
          duration: 1,
          zIndex: 10,
        },
        0
      )
      .to(
        "#summaryContent",
        {
          opacity: 1,
          duration: 1,
          zIndex: 10,
        },
        0
      );
  }, 2000);
}

/**
 * This function opens the profile settings
 */
function openSelectProfile() {
  let user = localStorage.getItem('currentUser')
  if (user !== '') {
    document.getElementById('profilePictures').classList.toggle('d-none')
    if (window.innerWidth < 1300) {
      document.getElementById('profilePictures2').classList.toggle('d-none')
    }
  }
}

/**
 * This function chooses the picture that is set in the gender
 */
function chooseProfilePicture(img) {
  document.getElementById('userPicture').src = `assets/img/${img}`
  if (img === 'woman.png') {
    users[currentUser]['gender'] = 'woman';
  }
  if (img === 'man.png') {
    users[currentUser]['gender'] = 'man';
  }
  refreshUsers();
}

/**
 * This function directs to the board Page
 */
function openBoard() {
  location.href = "https://gruppe-join-421.developerakademie.net/board.html";
}


