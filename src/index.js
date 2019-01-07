"use strict";

import { app, BrowserWindow, Tray } from "electron";
import devtools from "./devtools";
import handleErrors from "./handle-erros";
import setIpcMain from "./ipcMainEvents";
import os from 'os'
import path from 'path'
global.win = null; //eslint-disable-line
global.tray = null;

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

  let icon;
  if (os.platform() === 'win32') {
    icon = path.join(__dirname, 'assets', 'icons', 'icon-icon.ico')
  } else {
    icon = path.join(__dirname, 'assets', 'icons', 'icon-png.png')
  }

  global.tray = new Tray(icon)
  global.tray.setToolTip('platzipic')
  global.tray.on('click', () => {
    global.win.isVisible() ? global.win.hide() : global.win.show()
  })
  // global.win.loadURL('http://mirandajignacio.com/')
  global.win.loadURL(`file://${__dirname}/index.html`);
});


// Docs
// https://electronjs.org/docs/api/browser-window
// https://electronjs.org/docs/api/tray