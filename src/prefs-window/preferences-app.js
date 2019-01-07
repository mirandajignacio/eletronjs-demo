import { remote } from "electron";

window.addEventListener('load', () => {
  cancelButton();
})

function cancelButton(){
  buttonEvent('cancel-button', () => {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  })
}

function buttonEvent(id, func) {
  const btn = document.getElementById(id);
  btn.addEventListener("click", func);
}