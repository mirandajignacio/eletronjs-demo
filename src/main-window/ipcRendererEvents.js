import { ipcRenderer, remote, clipboard } from "electron";
import { addImagesEvents, selectFirstImage, clearImages } from "./images-ui";
import path, { dirname } from 'path'
import { saveImage } from './filters'
import os from 'os'
import settings from 'electron-settings'

function setIpc() {
  if(settings.has('directory')){
    ipcRenderer.send('load-directory', settings.get('directory'))
  }
  ipcRenderer.on("load-images", (event, dir, images) => {
    clearImages();
    loadImages(images)
    addImagesEvents();
    selectFirstImage();
    settings.set('directory', dir)
    document.getElementById('directory').innerHTML = dir
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
  const mainWindow = remote.getGlobal('win')
  const preferencesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Preferencias',
    center: true,
    modal: true,
    frame: false,
    show: false
  })

  if(os.platform() !== 'win32'){
    preferencesWindow.setParentWindow(mainWindow)
  }

  preferencesWindow.once('ready-to-show', () => {
    preferencesWindow.show();
    preferencesWindow.focus();
  })
  preferencesWindow.loadURL(`file://${path.join(__dirname, '..')}/preferences.html`)
}

function uploadImage () {
  let image = document.getElementById('image-displayed').src
  image = image.replace('plp://', '')
  let fileName = path.basename(image)
  if(settings.has('cloudup.user') && settings.has('cloudup.password')) {

  } else {
    showDialog('error', 'platzipics', 'Por favor configure el aplicativo')
  }
}

function pasteImage() {
  console.log('asd')
  const image = clipboard.readImage()
  const data = image.toDataURL()
  if (data.indexOf('data:image/png;base64') !== -1 && !image.isEmpty()) {
    let mainImage = document.getElementById('image-displayed')
    mainImage.src = data;
    mainImage.dataset.original = data
  } else {
    showDialog('error', 'platzipics', 'La imagen que intenta pegar no es valida!')
  }
}

module.exports = {
  setIpc: setIpc,
  openDirectory: openDirectory,
  openPreferences: openPreferences,
  saveFile: saveFile,
  pasteImage: pasteImage
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
