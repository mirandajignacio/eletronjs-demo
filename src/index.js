"use strict";

import { app, BrowserWindow } from "electron";
import devtools from "./devtools";
import handleErrors from "./handle-erros";
import setIpcMain from "./ipcMainEvents";

var win = null;

if (process.env.NODE_ENV === "development") {
  devtools();
}

app.on("ready", () => {


  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Hola Mundo Electron Js",
    center: true,
    show: false,
    darkTheme: true
  });

  setIpcMain(win)
  handleErrors(win)

  win.setMenu(null);

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("close", () => {
    app.quit();
  });

  // win.loadURL('http://mirandajignacio.com/')
  win.loadURL(`file://${__dirname}/index.html`);
});


// Docs
// https://electronjs.org/docs/api/browser-window
