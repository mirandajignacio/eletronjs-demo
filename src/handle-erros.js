import { dialog, app } from "electron";

function relauchApp(win) {
  dialog.showMessageBox(win, {
    type: 'error',
    title: 'Platzipics',
    message: 'Ocurrio un error inesperado. Se reiniciará el aplicativo.'
  }, () => {
    app.relaunch()
    app.exit(0)
  })
}

function setupErros(win) {
  win.webContents.on('crashed', () => {
    relauchApp(win)
  })

  win.on('unresponsive', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      title: 'Platzipics',
      message: 'Un proceso está tardando demasiado, puede esperar o reiniciar el aplicativo.'
    }, () => {
    })
  })

  win.on('uncaughtException', (err) => {
    dialog.showMessageBox(win, {
      type: 'error',
      title: 'Platzipics',
      message: 'Ocurrio un error inesperado. Se reiniciará el aplicativo.'
    }, () => {
      app.relaunch()
      app.exit(0)
    })
  })
}

module.exports = setupErros