/**
 * This function creates a random color
 *
 * @param {number} j the index of which contact is getting a color
 */
function setRandomColor(j) {
    if (!contacts[j]["color"] == "") {
        document.getElementById(`${j}`).style.backgroundColor = `#${contacts[j]["color"]}`;
    } else {
        contacts[j]["color"] = generateRandomColor();
        document.getElementById(`${j}`).style.backgroundColor = `#${contacts[j]["color"]}`;
    }
    refreshContacts();
}


/**
 * This Function is used to generate a random Color
 *
 * @returns a random color
 */
async function generateRandomColor() {
    let color = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    while (r + g + b < (255 * 3) / 2) {
        color = "#" + Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
    }

    return color;
}


/**
* This function closes the alert card of the email input
*/
function closeAttentionCard() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('attentionCard').classList.add('d-none');
}


/**
 * This function opens the alert card of the email input
 * @param {number} idx The index of the contact thats open
 */
function openAttentionCard(idx) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('attentionCard').classList.remove('d-none');
    document.getElementById('attentionCard').innerHTML = attentionCardHtml(idx, i);
}


/**
* This function opens specific contact
*
* @param {number} idx the index of which contact in the array is opened
*/
function openSpecificContact(idx) {

    document.getElementById("specificContact").innerHTML = specificContactHtml(idx);
    document.getElementById(`specific${idx}`).style.backgroundColor = contacts[idx]["color"];

    changeLayoutForMobile();
}


/**
* This function changes the layout for mobile
*/
function changeLayoutForMobile() {
    if (window.innerWidth < 1300) {
        document.getElementById("leftSection").style.display = "none";
        document.getElementById("contacts").style.display = "none";
        document.getElementById("rightSection").style.display = "block";
        document.getElementById("arrow").style.display = "block";
        document.getElementById("editContactButton").style.display = "block";
        document.getElementById("editSpan").style.display = "none";
        document.getElementById("newContactButton").style.display = "none";
    }
}


/**
 * This function is removing all css that is made for the specific contact
 */
function closeSpecificContact() {
    document.getElementById("leftSection").style.display = "flex";
    document.getElementById("contacts").style.display = "block";
    document.getElementById("rightSection").style.display = "none";
    document.getElementById("arrow").style.display = "block";
    document.getElementById("editContactButton").style.display = "none";
    document.getElementById("editSpan").style.display = "flex";
    document.getElementById("newContactButton").style.display = "block";
}


/**
 * This function is an animation for slinding out
 *
 * @param {string} container  the container that is supposed to slide out
 */
function slideOut(container) {
    if (container === "newContactContainer") {
        document.getElementById("newContactContainer").classList.remove("slide-in");
        document.getElementById("newContactContainer").classList.add("slide-out");
    } else {
        document
            .getElementById("editContactContainer")
            .classList.remove("slide-in");
        document.getElementById("editContactContainer").classList.add("slide-out");
    }
}


/**
* This function is an animation for fading out
*/
function fadeOut() {
    document.getElementById("overlay").classList.remove("fade-in");
    document.getElementById("overlay").classList.add("fade-out");
}


/**
 * This function is an animation for sliding in
 *
 * @param {string} container the container that is supposed to slide in
 */
function slideIn(container) {
    if (container === "newContactContainer") {
        document.getElementById("newContactContainer").classList.remove("slide-out");
        document.getElementById("newContactContainer").classList.add("slide-in");
    } else {
        document.getElementById("editContactContainer").classList.remove("slide-out");
        document.getElementById("editContactContainer").classList.add("slide-in");
    }
}


/**
* This function is an animation for fading in
*/
function fadeIn() {
    document.getElementById("overlay").classList.remove("fade-out");
    document.getElementById("overlay").classList.add("fade-in");
}


/**
 * This function slides in the createContact Container
 */
function openCreateContact() {
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById("newContactContainer").classList.remove("d-none");
    document.getElementById("newContactContainer").innerHTML = createContactHtml();

    changeStyleForSmallScreen();
    fadeIn();
    slideIn("newContactContainer");
}


/**
* This function changes the layout for small screens
*/
function changeStyleForSmallScreen() {
    if (window.innerWidth < 801) {
        document.getElementById("close").src = "assets/img/close_white.png";
        document.getElementById("joinSmall").style.display = "none";
        document.getElementById("cancle").style.display = "none";
    }
}


/**
 * This function checks if all inputs are filled
 * @param {HTMLInputElement} name - The input element for the name of the new contact
 * @param {HTMLInputElement} mail - The input element for the email of the new contact
 * @param {HTMLInputElement} phone - The input element for the phone number of the new contact
 * @returns {boolean} - Returns true if all inputs have a value, otherwise false
 */
function checkAllValues(name, mail, phone) {
    checkValue(name, 'nameNecessary');
    checkValue(mail, 'mailNecessary');
    checkValue(phone, 'phoneNecessary');

    return name.value && mail.value && phone.value;
}


/**
 * Checks if an input has a value and controls visibility of corresponding error message
 * @param {HTMLInputElement} input - The input element to check
 * @param {string} errorMsgId - The id of the element that shows the error message
 */
function checkValue(input, errorMsgId) {
    const errorMsgElem = document.getElementById(errorMsgId);

    if (!input.value) {
        errorMsgElem.classList.remove('d-none');
    } else {
        errorMsgElem.classList.add('d-none');
    }
}


/**
 * Restricts keyboard input to only numbers, the plus sign, and control keys.
 * @param {KeyboardEvent} evt - The keyboard event
 * @returns {boolean} - Returns false if the input is not a number, plus sign, or control key, otherwise true
 */
function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57) && ASCIICode != 43)
        return false;
    return true;
}