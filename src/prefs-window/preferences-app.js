import { remote, dialog } from "electron";
import settings from 'electron-settings'
import { ipcRenderer } from 'electron'
import crypto from 'crypto'

window.addEventListener('load', () => {
  cancelButton();
  saveButton();
  if (settings.has('cloudup.user')) {
    document.getElementById('cloudup-user').value = settings.get('cloudup.user')
  }
  if (settings.has('cloudup.password')) {
    // const decipher = crypto.createDecipheriv('aes-128-cbc', '123', 'utf8');
    // const desencryptedPassword = decipher.update( settings.get('cloudup.password'), 'hex', 'utf8')
    // desencryptedPassword += decipher.final('utf8')
    document.getElementById('cloudup-password').value = settings.get('cloudup.password')
  }
})

function cancelButton() {
  buttonEvent('cancel-button', () => {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  })
}

function saveButton() {
  const prefsForm = document.getElementById('preferences-form')
  buttonEvent('save-button', () => {
    try {
      // const cipher = crypto.createCipheriv('aes-128-cbc', '123', 'utf8')
      // let passwordEncrypted = cipher.update(document.getElementById('cloudup-password').value)
      // passwordEncrypted += cipher.final('hex')

      if (prefsForm.reportValidity()) {
        settings.set('cloudup.user', document.getElementById('cloudup-user').value)
        settings.set('cloudup.password', document.getElementById('cloudup-password').value)
        const prefsWindow = remote.getCurrentWindow();
        prefsWindow.close();
      } else {
        showDialog('error', 'platzipic', 'Porfavor complete los campos requeridos.')
        const prefsWindow = remote.getCurrentWindow();
        prefsWindow.focus()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function buttonEvent(id, func) {
  const btn = document.getElementById(id);
  btn.addEventListener("click", func);
}

function showDialog(type, title, message) {
  ipcRenderer.send('show-dialog', {
    type,
    title,
    message
  })
}