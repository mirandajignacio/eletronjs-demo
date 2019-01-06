'use-strict'
import { ipcMain, dialog } from 'electron'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'

function setMainIpc(win) {
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

  ipcMain.on('open-save-dialog', (event, ext) => {
    dialog.showSaveDialog(win, {
      title: 'Guardar imagen modificada',
      buttonLabel: 'Guardar imagen',
      filters: [{
        name: 'Images',
        extensions: [ext.substr(1)]
      }]
    }, (file) => {
      if (file) {
        event.sender.send('save-image', file)
      }
    })
  })

  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, info)
  })
}

module.exports = setMainIpc