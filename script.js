setURL(`https://join.robert-aliaj.de/smallest_backend_ever`);

async function init() {
  await downloadFromServer();
  users = backend.getItem("users") || [];
  tasks = backend.getItem("tasks") || [];
  contacts = backend.getItem("contacts") || [];
  categorys = backend.getItem("categorys") || [];
}

async function loadHelpAndPrivacy() {
  await includePlusInit();
  saveCurrentUser();
  setProfilePicture();
}


