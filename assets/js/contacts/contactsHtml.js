/**
 * @param {number} idx index of the contact
 * @param {number} i index of the user
 * @returns the attention card html
 */
function attentionCardHtml(idx, i) {
    return /*html*/ `
          <span>Are you sure you want to delete the Contact you are signed in with?</span>
          <div class="submit-section">
              <div onclick="closeAttentionCard()">Cancel <img src="assets/img/Clear_task.png" alt="">
              </div>
              <button class="contacts-button" onclick="deleteOwnUser(${idx, i})">Delete<img src="assets/img/create_task.png"
                      alt="">
              </button>
          </div>
    `;
}


/**
 * @param {number} i index of the letter
 * @returns a single letter
 */
function createLetterHtml(i) {
    return /*html*/ `
          <div class="letter" >${letters[i].toUpperCase()}</div>
          <div class="letter-block" id="${letters[i]}">
          </div>
      `;
}


/**
 * @param {number} j index of the contact
 * @returns a single contact
 */
function contactHtml(j) {
    return /*html*/ `
          <div class="single-contact" tabindex="1" onclick="openSpecificContact(${j})">
              <div style="background-color:${contacts[j].color
        }" class="name-tag" id="${j}">
                  ${contacts[j]["firstname"].charAt(0).toUpperCase()}${contacts[
            j
        ]["lastname"]
            .charAt(0)
            .toUpperCase()}
              </div>
              <div>
                  <span>${contacts[j]["firstname"]} ${contacts[j]["lastname"]
        }</span>
                  <span>${contacts[j]["email"]}</span>
              </div>
          </div>
      `;
}


/**
 * @param {number} idx index of the contact
 * @returns a contact as a close up
 */
function specificContactHtml(idx) {
    return /*html*/ `
          <div class="specific-contact">
              <div class="specific-single-contact">
                  <div style="background-color:${contacts[idx].color
        }" class="name-tag bigger" id="specific${idx}">
                      ${contacts[idx]["firstname"]
            .charAt(0)
            .toUpperCase()}${contacts[idx]["lastname"]
                .charAt(0)
                .toUpperCase()}
                  </div>
                  <div>
                      <span class="name">${contacts[idx]["firstname"]} ${contacts[idx]["lastname"]
        }</span>
                      <span onclick="openAddTaskContainer(${idx})" class="add-task">+ Add Task</span>
                  </div>
              </div>
              <div class="contact-information">
                  <img onclick="editContact(${idx})" class="edit" id="editContactButton" src="assets/img/edit.png" alt="" style="display: none;">
                  <div class="edit-span" id="editSpan">
                      <span>Contact Information</span>
                      <span style="cursor:pointer" onclick="editContact(${idx})">
                      <img style="height:20px" src="assets/img/edit_pen_img.png">
                      Edit Contact</span>
                  </div>
                  <div>
                      <b>Email</b>
                      <span class="mail">${contacts[idx]["email"]}</span>
                      <b>Phone</b>
                      <span>${contacts[idx]["phone"]}</span>
                  </div>
              </div>
          </div>
      `;
}


/**
 * @param {number} idx index of the contact
 * @returns the edit contact container
 */
function editContactHtml(idx) {
    return /*html*/ `
          <img id="close" onclick="closeEditContact()" class="close" src="assets/img/Clear_task.png" alt="">
          <div class="blue-side">
              <div class="flex-blue-side">
                  <img id="joinSmall" src="assets/img/join_small.png" alt="">
                  <b>Edit contact</b>
                  <div class="horizontal-blue-line"></div>
              </div>
          </div>
          <div class="contact-create-container">
              <div style="background-color:#${contacts[idx].color
        }" class="name-tag bigger edit-bigger" id="edit${idx}">
                  ${contacts[idx]["firstname"].charAt(0).toUpperCase()}${contacts[
            idx
        ]["lastname"]
            .charAt(0)
            .toUpperCase()}
              </div>           
              <div class="contact-form">
                  <form class="form-container" onsubmit="event.preventDefault(); changeContact(${idx})">
                      <div class="input-fields">
                          <div>
                              <input id="name" style="cursor: pointer;" placeholder="Name" type="text" value="${contacts[idx]["firstname"]} ${contacts[idx]["lastname"]}" >
                              <img src="assets/img/user.png" alt="">
                              <div id="nameNecessary" class="necessary d-none"></div>
  
                          </div>
                          <div>
                              <input id="mail" placeholder="Email" type="email" value="${contacts[idx]["email"]}">
                              <img src="assets/img/mail.png" alt="">
                              <div id="editContactEmailAlert" class="alert d-none">This email is already taken</div>
                              <div id="mailNecessary" class="necessary d-none"></div>
                          </div>
                          <div>
                          <input id="phone" placeholder="Phone" type="text" value="${contacts[idx]["phone"]}" onkeypress="return onlyNumberKey(event)">
                          <img src="assets/img/mobile.png" alt="">
                              <div id="phoneNecessary" class="necessary d-none"></div>
                          </div>
                      </div>
                      <div class="submit-section">
                          <div onclick="deleteContact(${idx})">Delete <img src="assets/img/Clear_task.png" alt="">
                          </div>
                          <button class="contacts-button" type="submit" >Save<img
                                  src="assets/img/create_task.png" alt="">
                          </button>
                      </div>
                    </form>
              </div>
          </div>
      `;
}


/**
 * @returns the create contact html
 */
function createContactHtml() {
    return /*html*/ `
          <img id="close" onclick="closeNewContact()" class="close" src="assets/img/Clear_task.png" alt="">
          <div class="blue-side">
              <div class="flex-blue-side">
                  <img id="joinSmall" src="assets/img/join_small.png" alt="">
                  <b id="overlayHeadline">Add contact</b>
                  <span id="overlaySubline">Tasks are better with a team!</span>
                  <div class="horizontal-blue-line"></div>
              </div>
          </div>
          <div class="contact-create-container">
              <img class="user" src="assets/img/user (1).png" alt="">
              <div class="contact-form">
                  <div class="form-container">
                      <div class="input-fields">
                          <div>
                              <input id="name" style="cursor: pointer;" placeholder="Name" type="text" required>
                              <img src="assets/img/user.png" alt="">
                              <div id="nameNecessary" class="necessary d-none"></div>
                          </div>
                          <div>
                              <input id="mail" placeholder="Email" type="email" required>
                              <img src="assets/img/mail.png" alt="">
                              <div id="createContactEmailAlert" class="alert d-none">This email is already taken</div>
                              <div id="mailNecessary" class="necessary d-none"></div>
  
                          </div>
                          <div>
                              <input id="phone" placeholder="Phone" type="text" onkeypress="return onlyNumberKey(event)" required>
                              <img src="assets/img/mobile.png" alt="">
                              <div id="phoneNecessary" class="necessary d-none"></div>
  
                          </div>
                      </div>
                      <div class="submit-section">
                          <div id="cancle" onclick="closeNewContact()">Cancel <img src="assets/img/Clear_task.png" alt="">
                          </div>
                          <button class="contacts-button" id="submit" onclick="createNewContact()" type="submit">Create contact <img
                                  src="assets/img/create_task.png" alt="">
                          </button>
                      </div>
                      
                  </div> 
              </div>
              <div id="successfulUpload" class="d-none"> succesfull!
                          <img class="checkIcon" src="assets/img/successfull_check.png" alt="" />
              </div>
          </div>
      `;
}
