let tasks = [];

function openBoard() {
    location.href = 'https://gruppe-join-421.developerakademie.net/Robert/board.html'
}

async function initSummary() {
    await includeHTML();
    await downloadFromServer();
    contacts = jsonFromServer['contacts'];
    tasks = jsonFromServer['tasks'];
    prepareContacts();
    loadTasks();
    greetingTime();

}

function prepareContacts() {
    for (j = 0; j < contacts.length; j++) {
        if (contacts[j]['color'] == '') {
            contacts[j]['color'] = generateRandomColor();
            refreshContacts();
        }
    }
}

function loadTasks() {
    showTasksInBoard();
    showTasksInProgress();
    showAwaitingFeedback();
    showUrgentTasks();
    fillInClosestDate();
    showTodos();
    showDone();
}

function showTasksInBoard() {
    document.getElementById('tasksInBoard').innerHTML = tasks.length;
    if (tasks.length < 2) {
        document.getElementById('tasksInBoardSpan').innerHTML = 'Task in Board';
    }
}

function showTasksInProgress() {
    let x = 0;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i]['progress'] === 'inProgress') {
            x = x + 1;
        }
    }
    document.getElementById('tasksInProgress').innerHTML = x;
    if (x < 2) {
        document.getElementById('tasksInProgressSpan').innerHTML = 'Task in Progress';
    }
}

function showAwaitingFeedback() {
    let x = 0;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i]['progress'] === 'feedback') {
            x = x + 1;
        }
    }
    document.getElementById('awaitingFeedback').innerHTML = x;
}

function showUrgentTasks() {
    let x = 0;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] === 'high') {
            x = x + 1;
        }
    }
    document.getElementById('urgent').innerHTML = x;

}

function findClosestDate() {
    const today = new Date();
    let closestDate = new Date(tasks[0]['due_date']);
    let closestDiff = Math.abs(today - closestDate);

    for (let i = 1; i < tasks.length; i++) {
        const currentDate = new Date(tasks[i]['due_date']);
        const currentDiff = Math.abs(today - currentDate);
        if (currentDiff < closestDiff) {
            closestDate = currentDate;
            closestDiff = currentDiff;
        }
    }

    return closestDate;
}

function fillInClosestDate() {
    const closestDate = findClosestDate();
    const dateString = closestDate.toLocaleDateString("default", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    document.getElementById('upcomingDeadline').innerHTML = dateString;
}

function greetingTime() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
        setGreetingName('Good morning')
    } else if (curHr < 18) {
        setGreetingName('Good afternoon')
    } else {
        setGreetingName('Good evening')
    }
}

function showTodos() {
    let x = 0;
    for (i = 0; i < tasks.length; i++) {
        let task = tasks[i]['subtasks']['status'];
        for (j = 0; j < task.length; j++) {
            if (task[j] === true) {
                x = x + 1;
            }
        }
    }
    document.getElementById('todo').innerHTML = x;
}

function showDone() {
    let x = 0;
    for (i = 0; i < tasks.length; i++) {
        let task = tasks[i]['subtasks']['status'];
        for (j = 0; j < task.length; j++) {
            if (task[j] === false) {
                x = x + 1;
            }
        }
    }
    document.getElementById('done').innerHTML = x;
}


function setGreetingName(time) {

    let name = localStorage.getItem("greetingName");
    document.getElementById('greetingName').innerHTML = name;
    let goodMorning = document.getElementById('goodMorning');
    if (name !== ' ') {
        goodMorning.innerHTML = time + ','
    } else {
        if (window.innerWidth < 1200) {
            goodMorning.innerHTML = time;
            goodMorning.style.fontWeight = '700';
        } else {
            goodMorning.innerHTML = time;
            goodMorning.style.fontWeight = '700';
            goodMorning.style.fontSize = '45px'
        }

    }
    if (window.innerWidth < 601) {
        responsiveGreeting()
    }

}

function responsiveGreeting() {
    document.getElementById('greeting').classList.add('responsive-greeting');
    document.getElementById('headline').style.opacity = 0;
    document.getElementById('summaryContent').style.opacity = 0
    animateResponsiveGreeting();

}

function animateResponsiveGreeting() {
    setTimeout(function () {
        const animation = gsap.timeline()
            .set('#greeting', {
                opacity: 1
            }, 0)
            .set('#headline', {
                opacity: 0
            }, 0)
            .set('#summaryContent', {
                opacity: 0
            }, 0)
            // .pause(2)
            .to("#greeting", {
                opacity: 0,
                duration: 1
            }, 0)
            .to('#headline', {
                opacity: 1,
                duration: 1,
                zIndex: 10
            }, 0)
            .to('#summaryContent', {
                opacity: 1,
                duration: 1,
                zIndex: 10
            }, 0);
    }, 2000)
}
