"use strict";

import { setIpc, openDirectory } from "./ipcRendererEvents";
import { addImagesEvents, searchImagesEvents, selectEvent } from "./images-ui";

window.addEventListener("load", () => {
  setIpc();
  addImagesEvents();
  searchImagesEvents();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
});

function buttonEvent(id, func) {
  const btn = document.getElementById(id);
  btn.addEventListener("click", func);
}



// function addImageEvents() {
//   const thumbs = document.querySelectorAll("li.list-group-item");

//   for (let index = 0; index < thumbs.length; index++) {
//     const element = thumbs[index];
//     element.addEventListener("click", () => {
//       changeImage(element);
//     });
//   }
// }

// function changeImage(node) {
//   if (node) {
//     document.querySelector("li.selected").classList.remove("selected");
//     node.classList.add("selected");
//     document.getElementById("image-displayed").src = node.querySelector(
//       "img"
//     ).src;
//   } else {
//     document.getElementById("image-displayed").src = "";
//   }
// }

// function searchImageEvents() {
//   const searchBox = document.getElementById("search-box");
//   searchBox.addEventListener("keyup", () => {
//     const regex = new RegExp(searchBox.value.toLowerCase(), "gi");
//     if (searchBox.value.length > 0) {
//       const thumbs = document.querySelectorAll("li.list-group-item img");
//       for (let index = 0; index < thumbs.length; index++) {
//         const thumb = thumbs[index];
//         const fileUrl = url.parse(thumb.src);
//         const fileName = path.basename(fileUrl.pathname);
//         if (fileName.match(regex)) {
//           thumb.parentNode.classList.remove("hidden");
//         } else {
//           thumb.parentNode.classList.add("hidden");
//         }
//       }
//       selectFirstImage();
//     } else {
//       showAllImages();
//     }
//   });
// }

// function selectFirstImage() {
//   const image = document.querySelector("li.list-group-item:not(.hidden)");
//   changeImage(image);
// }



// function selectEvent() {
//   const select = document.getElementById("filters");
//   select.addEventListener("change", () => {
//     applyFilter(select.value, document.getElementById("image-displayed"));
//   });
// }

// function clearImages() {
//   const oldImages = document.querySelectorAll('li.list-group-item')
//   for (let index = 0; index < oldImages.length; index++) {
//     const element = oldImages[index];
//     element.parentNode.removeChild(element)
//   }
// }