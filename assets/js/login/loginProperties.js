/**
 * This function animates the j image 
 */
function animate() {
    if (window.innerWidth < 501) {
        animateResponsive();
    } else {
        animateNormal();
    }
}


/**
* This function animates if not responsive mode
*/
function animateNormal() {
    let height = document.getElementById("outerDiv").clientHeight;
    let width = document.getElementById("outerDiv").clientWidth;
    let imgHeight = document.getElementById("imgDiv").clientHeight;
    let imgWidth = document.getElementById("imgDiv").clientWidth;
    setTimeout(function () {
        const animation = gsap
            .timeline()
            .set(
                "#imgDiv",
                {
                    x: 0,
                    y: 0,
                    scale: 0.9,
                },
                0
            )
            .set(
                "#contentDiv",
                {
                    opacity: 0,
                },
                0
            )
            .to(
                "#imgDiv",
                {
                    x: -width / 2 + imgWidth / 2 + 50,
                    y: -height / 2 + imgHeight / 2 + 50,
                    scale: 0.3,
                    ease: "power1.out",
                    duration: 1,
                },
                0
            )
            .to(
                "#contentDiv",
                {
                    opacity: 1,
                    duration: 1,
                },
                0
            );
    }, 1000);

    document.getElementById("outerDiv").style.zIndex = 1;
}


/**
 * This function animates in responsive
 */
function animateResponsive() {
    let height = document.getElementById("outerDiv").clientHeight;
    let width = document.getElementById("outerDiv").clientWidth;
    let imgHeight = document.getElementById("imgDiv").clientHeight;
    let imgWidth = document.getElementById("imgDiv").clientWidth;
    setTimeout(function () {
        const animation = gsap
            .timeline()
            .set(
                "#imgDiv",
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                },
                0
            )
            .set(
                "#contentDiv",
                {
                    opacity: 0,
                },
                0
            )
            .to(
                "#imgDiv",
                {
                    x: -width / 2 + imgWidth / 2 + 20,
                    y: -height / 2 + imgHeight / 2 + 20,
                    scale: 0.2,
                    ease: "power1.out",
                    duration: 1,
                },
                0
            )
            .to(
                "#contentDiv",
                {
                    opacity: 1,
                    duration: 1,
                },
                0
            );
    }, 1000);

    document.getElementById("outerDiv").style.zIndex = 1;
}


/**
 * This function opens the sign up Container
 */
function openSignUp() {
    document.getElementById("signUp").style.display = "none";
    let loginContainer = document.getElementById("loginContainer");
    loginContainer.innerHTML = "";
    loginContainer.innerHTML += SignUpContainerHtml();
}


/**
 * This function opens the login container
 */
function openLogIn() {
    document.getElementById("signUp").style.display = "flex";
    let loginContainer = document.getElementById("loginContainer");
    loginContainer.innerHTML = "";
    loginContainer.innerHTML += LoginContainerHtml();
}


/**
 * This function opens the forgot password container
 */
function openForgotPassword() {
    document.getElementById("signUp").style.display = "none";
    let loginContainer = document.getElementById("loginContainer");
    loginContainer.innerHTML = "";
    loginContainer.innerHTML += PasswordContainerHtml();
}