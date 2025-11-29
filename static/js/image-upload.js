"use strict";

let imageFileNames = [];

fetch('/new', {
    method: 'POST'
})

window.addEventListener('beforeunload', beforeClose);

const imageInput = document.getElementById("img-input");

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
    //remove images
    console.log("end");
    fetch('/end', {
        method: 'POST'
    });

    return null;
}