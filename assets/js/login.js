

function animate() {
  let height = document.getElementById('outerDiv').clientHeight;
  let width = document.getElementById('outerDiv').clientWidth;
  let imgHeight = document.getElementById('imgDiv').clientHeight;
  let imgWidth = document.getElementById('imgDiv').clientWidth;
  setTimeout(function () {
    const animation = gsap.timeline()
      .set("#imgDiv", {
        x: 0,
        y: 0,
        scale: 0.9
      }, 0)
      .set("#contentDiv", {
        opacity: 0
      }, 0)
      .to("#imgDiv", {
        x: (-width / 2) + (imgWidth / 2) + 50,
        y: (-height / 2) + (imgHeight / 2) + 50,
        scale: 0.3,
        ease: "power1.out",
        duration: 1
      }, 0)
      .to("#contentDiv", {
        opacity: 1,
        duration: 1
      }, 0);
  }, 1000);

  document.getElementById('outerDiv').style.zIndex = 1;
}

function saveGreetingName(name) {
  localStorage.setItem("greetingName", name);
}

function openSignUp() {
  document.getElementById('signUp').style.display = 'none';
  loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += SignUpContainerHtml();
}

function openLogIn() {
  document.getElementById('signUp').style.display = 'flex';
  loginContainer = document.getElementById('loginContainer')
  loginContainer.innerHTML = '';
  loginContainer.innerHTML += LoginUpContainerHtml();
}

function LoginUpContainerHtml() {
  return `
      <span>Log in</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="login()">
        <div>
          <input type="email" placeholder="Email" id="email">
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input type="password" placeholder="Password" id="password">
          <img src="assets/img/schloss.png" alt="">
        </div>
     
    <div class="remember-me">
    <div class="select-box"></div>
      <span>Remember me</span>
      <a>Forgot my password</a>
    </div>
    <div class="buttons">
      <button type="submit" class="login-button"> Log in</button>
      <button type="submit" onclick="location.href = 'index.html'; saveGreetingName('Guest')"class="guest-login-button">Guest Log in</button>
    </div> 
    </form>
  `;
}

function SignUpContainerHtml() {
  return `
    <img onclick="openLogIn()" class="arrow" src="assets/img/left-arrow.png">
    <span class="sign-up-span" >Sign up</span>
      <div class="horizontal-blue-line"></div>
      <form onsubmit="login()">
        <div>
          <input placeholder="Name" id="name" required>
          <img src="assets/img/user.png" alt="">
        </div>
        <div>
          <input type="email" placeholder="Email" id="email" required>
          <img src="assets/img/mail.png" alt="">
        </div>
        <div>
          <input type="password" placeholder="Password" id="password" required>
          <img src="assets/img/schloss.png" alt="">
        </div>
     <div class="buttons">
        <button type="submit" onclick="signUp()" class="login-button"> Sign Up</button>
     </div>
     </form>
  `;
}


// let users = []
// let contacts = [{
//   "firstname": "Anton",
//   "lastname": "Mayer",
//   "email": "antom@gmail.com",
//   "phone": "+491111111111",
//   "color": "#cde302"
// },
// {
//   "firstname": "Tanja",
//   "lastname": "Wolf",
//   "email": "wolf@gmail.com",
//   "phone": "+492222222222",
//   "color": "#cb2cf9"
// },
// {
//   "firstname": "Sofia",
//   "lastname": "Müller",
//   "email": "sofiam@gmail.com",
//   "phone": "+493333333333",
//   "color": "#7c6ace"
// },
// {
//   "firstname": "Herbert",
//   "lastname": "Braun",
//   "email": "hbraun@gmail.com",
//   "phone": "+494444444444",
//   "color": "#5eebaf"
// },
// {
//   "firstname": "David",
//   "lastname": "Eisenberg",
//   "email": "daveis@gmail.com",
//   "phone": "+495555555555",
//   "color": "#d03687"
// },
// {
//   "firstname": "Benedikt",
//   "lastname": "Ziegler",
//   "email": "ziegel@gmail.com",
//   "phone": "+496666666666",
//   "color": "#f7e998"
// },
// {
//   "firstname": "Marcel",
//   "lastname": "Bauer",
//   "email": "mbauer@gmail.com",
//   "phone": "+497777777777",
//   "color": "#5ccee0"
// },
// {
//   "firstname": "Robo",
//   "lastname": "James",
//   "email": "RoboJames@blabla.com",
//   "phone": "+497777777777",
//   "color": "#3ad288"
// },
// {
//   "firstname": "Christian",
//   "lastname": "Meyer",
//   "email": "chris@blabla.com",
//   "phone": "+497777777777",
//   "color": "#3ad368"
// },
// {
//   "firstname": "Mareike",
//   "lastname": "Schneider",
//   "email": "mareike@gmail.com",
//   "phone": "+49764677777",
//   "color": "#4ad368"
// }];

// let categorys = [
//   {
//     "name": "Design",
//     "color": "rgb(239, 132, 41)"
// },
// {
//     "name": "Sales",
//     "color": "rgb(236, 126, 250)"
// },
// {
//     "name": "Backoffice",
//     "color": "rgb(100, 210, 193)"
// },
// {
//     "name": "Marketing",
//     "color": "rgb(18, 58, 248)"
// },
// {
//     "name": "Media",
//     "color": "rgb(247, 202, 57)"
// }
// ]

// let tasks = [
//   {
//     "title": "Website redesign",
//     "description": "Modify the contents of the main website. Adjust the UI to the company's brand design. Check responsiv",
//     "category": "Design",
//     "assigned_to": [
//         "Anton Mayer",
//         "Benedikt Ziegler",
//         "Christian Meyer",
//         "Sofia Müller",
//         "Tanja Wolf",
//         "Herbert Braun",
//         "David Eisenberg"
//     ],
//     "due_date": "2023-04-23",
//     "prio": "low",
//     "subtasks": {
//         "name": [
//             "Modify contents",
//             "Create new icons",
//             "Revise the homepage responsively"
//         ],
//         "status": [
//             true,
//             true,
//             true
//         ]
//     },
//     "progress": "TODO"
// },
// {
//     "title": "Call potential clients",
//     "description": "Make the product presentation to prospective buyers",
//     "category": "Sales",
//     "assigned_to": [
//         "David Eisenberg",
//         "Mareike Schneider",
//         "Tanja Wolf",
//         "Sofia Müller"
//     ],
//     "due_date": "2023-06-28",
//     "prio": "high",
//     "subtasks": {
//         "name": [],
//         "status": []
//     },
//     "progress": "inProgress"
// },
// {
//     "title": "Accounting invoices",
//     "description": "Write open invoices for customer",
//     "category": "Backoffice",
//     "assigned_to": [
//         "Herbert Braun"
//     ],
//     "due_date": "2023-02-13",
//     "prio": "medium",
//     "subtasks": {
//         "name": [
//             "Subtask 1",
//             "Subtask 2"
//         ],
//         "status": [
//             true,
//             true
//         ]
//     },
//     "progress": "feedback"
// },
// {
//     "title": "Social media strategy",
//     "description": "Develop an ad campaign for brand positioning",
//     "category": "Marketing",
//     "assigned_to": [
//         "Sofia Müller",
//         "Marcel Bauer"
//     ],
//     "due_date": "2023-03-02",
//     "prio": "low",
//     "subtasks": {
//         "name": [
//             "Design an ad",
//             "Calculate the costs",
//             "Created accounts for all common social media platforms"
//         ],
//         "status": [
//             true,
//             true,
//             true
//         ]
//     },
//     "progress": "done"
// },
// {
//     "title": "Video cut",
//     "description": "Edit the new company video",
//     "category": "Media",
//     "assigned_to": [
//         "Tanja Wolf",
//         "Robo James"
//     ],
//     "due_date": "2023-03-02",
//     "prio": "medium",
//     "subtasks": {
//         "name": [],
//         "status": []
//     },
//     "progress": "done"
// }
// ]

// async function loadEverything() {
//   setURL(`https://gruppe-join-421.developerakademie.net/smallest_backend_ever`);
//   backend.setItem('users', JSON.stringify(users));
//   backend.setItem('contacts', JSON.stringify(contacts));
//   backend.setItem('categorys', JSON.stringify(categorys));
//   backend.setItem('tasks', JSON.stringify(tasks));

// }