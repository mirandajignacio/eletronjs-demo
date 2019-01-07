"use strict";

import { app, BrowserWindow } from "electron";
import devtools from "./devtools";
import handleErrors from "./handle-erros";
import setIpcMain from "./ipcMainEvents";

global.win = null; //eslint-disable-line

if (process.env.NODE_ENV === "development") {
  devtools();
}

app.on("ready", () => {


  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Hola Mundo Electron Js",
    center: true,
    show: false,
    darkTheme: true
  });

  setIpcMain(global.win)
  handleErrors(global.win)

  global.win.setMenu(null);

  global.win.once("ready-to-show", () => {
    global.win.show();
  });

  global.win.on("close", () => {
    app.quit();
  });

  // global.win.loadURL('http://mirandajignacio.com/')
  global.win.loadURL(`file://${__dirname}/index.html`);
});


// Docs
// https://electronjs.org/docs/api/browser-window
