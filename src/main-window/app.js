"use strict";

import { setIpc, openDirectory, saveFile, openPreferences,pasteImage } from "./main-window/ipcRendererEvents";
import { addImagesEvents, searchImagesEvents, selectEvent, print } from "./main-window/images-ui";
// import 

window.addEventListener("load", () => {
  setIpc();
  addImagesEvents();
  searchImagesEvents();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
  buttonEvent('open-preferences', openPreferences);
  buttonEvent('save-button', saveFile);
  buttonEvent('print-button', print);
  buttonEvent('paste-button', pasteImage);
  
});

function buttonEvent(id, func) {
  const btn = document.getElementById(id);
  btn.addEventListener("click", func);
}
