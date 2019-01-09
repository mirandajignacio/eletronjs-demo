import { remote } from "electron";
import { openDirectory, saveFile, openPreferences } from './ipcRendererEvents'

function createMenu() {
  const template = [{
    label: 'Archivo',
    submenu: [{
      label: 'Abrir ubicación',
      accelerator: 'CmdOrCtrl+O',
      click() {
        openDirectory();
      }
    },
    {
      label: 'Guardar',
      click() {
        saveFile()
      }
    },
    {
      label: 'Preferencias',
      click() {
        openPreferences()
      }
    },
    {
      label: 'Cerrar',
      role: 'quit'
    }
    ]
  }]
  const menu = remote.Menu.buildFromTemplate(template)
  remote.Menu.setApplicationMenu(menu)
}

export default createMenu