"use strict";

let imageFileNames = [];

fetch('/new', {
    method: 'POST'
});

const imageInput = document.getElementById("img-input");

window.addEventListener('unload', beforeClose);

imageInput.addEventListener("change", addImage);

function addImage(){
    console.log("Added image");

    var data = new FormData();
    data.append('file', imageInput.files[0]);

    imageFileNames.push(fetch('/add', {
      method: 'POST',
      body: data
    }));
}

function removeImage(imageFileName){
    removeItem(imageFileNames, imageFileName);

    fetch('/remove', {
        method: 'POST',
        body: imageFileName
    });
}

function beforeClose(e){
    navigator.sendBeacon("/end");
       
    return null;
}