'use strict'

import { app, Menu, BrowserWindow } from "electron";
import devtools from "./devtools";

if (process.env.NODE_ENV === 'development') {
  devtools()
}

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

app.on('before-quit', () => {
  console.log('Saliendo')
})

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola Mundo Electron Js',
    center: true,
    show: false,
    darkTheme: true
  });

  // win.setMenu(null)

  win.once('ready-to-show', () => {
    win.show();
  })

  win.on('move', () => {
    const position = win.getPosition();
    console.log('Position', position)
  })

  win.on('close', () => {
    app.quit();
  })


  // win.loadURL('http://mirandajignacio.com/')
  win.loadURL(`file://${__dirname}/index.html`)
})

// Docs
// https://electronjs.org/docs/api/browser-window