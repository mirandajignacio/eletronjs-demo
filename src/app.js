import { BrowserWindowProxy } from "electron";

window.addEventListener('load', () => {
  document.getElementById('mesagge').innerHTML = 'ASD'
  setTimeout(() => {
    document.body.classList.add('asd')
  }, 300);
})