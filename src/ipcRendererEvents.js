import { ipcRenderer } from "electron";
import { addImagesEvents, selectFirstImage, clearImages } from "./images-ui";
function setIpc() {
  ipcRenderer.on("load-images", (event, images) => {
    clearImages();
    loadImages(images)
    addImagesEvents();
    selectFirstImage();
  });
}

function openDirectory() {
  ipcRenderer.send("open-directory", new Date());
}

module.exports = {
  setIpc: setIpc,
  openDirectory: openDirectory
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
