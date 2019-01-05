"use strict";

import { app, Menu, BrowserWindow, ipcMain, dialog } from "electron";
import devtools from "./devtools";
import fs from "fs";
import isImage from "is-image";
import path from "path";
import filesize from "filesize";

if (process.env.NODE_ENV === "development") {
  devtools();
}


app.on("before-quit", () => { });

app.on("ready", () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Hola Mundo Electron Js",
    center: true,
    show: false,
    darkTheme: true
  });

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

ipcMain.on("open-directory", (event, arg) => {
  dialog.showOpenDialog(
    {
      title: "Seleccione la nueva ubicación",
      buttonLabel: "Abrir ubicación",
      properties: ["openDirectory"]
    },
    dir => {
      const images = [];
      if (dir) {
        fs.readdir(dir[0], (err, files) => {
          if (err) throw err

          for (let index = 0; index < files.length; index++) {
            const element = files[index];
            if (isImage(element)) {
              let imageFile = path.join(dir[0], element);
              let stats = fs.statSync(imageFile);
              let size = filesize(stats.size, { round: 0 });
              images.push({
                filename: element,
                src: `file://${imageFile}`,
                size: size
              });
            }
          }
          event.sender.send('load-images', images)
        });
      }
    }
  );
});

// Docs
// https://electronjs.org/docs/api/browser-window
