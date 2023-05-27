setURL(`https://gruppe-join-421.developerakademie.net/smallest_backend_ever`);

async function init() {
  await downloadFromServer();
  users = backend.getItem("users") || [];
  tasks = backend.getItem("tasks") || [];
  contacts = backend.getItem("contacts") || [];
  categorys = backend.getItem("categorys") || [];
}

async function loadHelpAndPrivacy() {
  await awaitHTML();
  saveCurrentUser();
  setProfilePicture();
}


