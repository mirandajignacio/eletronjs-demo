import fs from 'fs.extra'

function applyFilter(filter, currentImage) {
    let imgObj = new Image();
    imgObj.src = currentImage.src;
    filterous
        .importImage(imgObj, {}) //eslint-disable-line
        .applyInstaFilter(filter)
        .renderHtml(currentImage);
}

function saveImage(fileName, cb) {
    let fileSrc = document.getElementById('image-displayed').src
    if(fileSrc.indexOf(';base64,') !== -1) {
        fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '')
        fs.writeFile(fileName, fileSrc, 'base64', cb)
    } else {
        fileSrc = fileSrc.replace('plp://', '')
        fs.copy(fileSrc.substr(1), fileName,cb)
    }
}

module.exports = {
    applyFilter: applyFilter,
    saveImage: saveImage
};
