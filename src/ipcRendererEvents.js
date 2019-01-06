import { ipcRenderer, remote } from "electron";
import { addImagesEvents, selectFirstImage, clearImages } from "./images-ui";
import path from 'path'
import { saveImage } from './filters'

function setIpc() {
  ipcRenderer.on("load-images", (event, images) => {
    clearImages();
    loadImages(images)
    addImagesEvents();
    selectFirstImage();
  });
  ipcRenderer.on('save-image', (event, file) => {
    saveImage(file, (err) => {
      if (err) {
        return showDialog('error', 'Platzipics', err.message)
      }
      showDialog('info', 'platzipics', 'La imagen fue guardada')
    })
    console.log(file)
  })
}

function openDirectory() {
  ipcRenderer.send("open-directory", new Date());
}

function showDialog(type, title, message) {
  ipcRenderer.send('show-dialog', {
    type,
    title,
    message
  })
}

function saveFile() {
  const image = document.getElementById("image-displayed").dataset.original;
  const ext = path.extname(image)
  ipcRenderer.send('open-save-dialog', ext)
}

function openPreferences() {
  const BrowserWindow = remote.BrowserWindow
  const preferencesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Preferencias',
    center: true,
    modal: true,
    frame: false,
    show: false
  })

  preferencesWindow.show();
}

module.exports = {
  setIpc: setIpc,
  openDirectory: openDirectory,
  openPreferences: openPreferences,
  saveFile: saveFile
};


function loadImages(images) {
  const imagesList = document.querySelector('ul.list-group')
  for (let index = 0; index < images.length; index++) {
    const element = images[index];
    const node = `
    <li class="list-group-item">
      <img class=" media-object pull-left" src="${element.src}" width="32" height="32">
      <div class="media-body">
        <strong>${element.filename}</strong>
        <p>${element.size}</p>
      </div>
    </li>`
    imagesList.insertAdjacentHTML('beforeend', node);
  }
}
