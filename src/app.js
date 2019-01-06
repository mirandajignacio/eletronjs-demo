"use strict";

import { setIpc, openDirectory, saveFile, openPreferences } from "./ipcRendererEvents";
import { addImagesEvents, searchImagesEvents, selectEvent } from "./images-ui";

window.addEventListener("load", () => {
  setIpc();
  addImagesEvents();
  searchImagesEvents();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
  buttonEvent('open-preferences', openPreferences);
  buttonEvent('save-button', saveFile);
});

function buttonEvent(id, func) {
  const btn = document.getElementById(id);
  btn.addEventListener("click", func);
}
