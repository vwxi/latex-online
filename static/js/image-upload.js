"use strict";

let imageFileNames = [];

fetch('/new', {
    method: 'POST'
});

const imageInput = document.getElementById("img-input");
const imageFileContainer = document.getElementById("image-file-container");

window.addEventListener('beforeunload', beforeClose);

imageInput.addEventListener("change", addImage);

function addImage(){
    console.log("Added image");

    var data = new FormData();
    data.append('file', imageInput.files[0]);

    let imageFileName = "";
    imageFileName = (fetch('/add', {
      method: 'POST',
      body: data
    }));

    imageFileNames.push(imageFileName);

    const imageDisplaySpan = document.createElement("span");
    const imageDisplayButton = document.createElement("button");
    const imageDisplayText = document.createElement("p");

    imageDisplayText.innerText = imageFileName;

    imageDisplayButton.innerText = 'Delete Image';
    imageDisplayButton.type = 'button';

    imageDisplaySpan.appendChild(imageDisplayText);
    imageDisplaySpan.appendChild(imageDisplayButton);
    
    imageFileContainer.appendChild(imageDisplaySpan);
}

function removeImage(imageFileName){
    removeItem(imageFileNames, imageFileName);

    fetch('/remove', {
        method: 'POST',
        body: imageFileName
    });
}

function beforeClose(e){
    fetch('/end', {
        method: 'POST',
        keepalive: true
    });
    
    deleteAllCookies();
    
    return null;
}
