"use strict";

let imageFileNames = [];

await fetch('/new', {
    method: 'POST'
});

const imageInput = document.getElementById("img-input");
const imageFileContainer = document.getElementById("image-file-container");

window.addEventListener('unload', beforeClose);

imageInput.addEventListener("change", addImage);

function addImage(){
    console.log("Added image");

    var data = new FormData();
    data.append('file', imageInput.files[0]);

    (async () => await fetch('/add', {
      method: 'POST',
      body: data
    }).then((response) => response.json())
      .then((val) => imageFileNames.push(val)))();

    imageFileName = imageFileNames[length(imageFileNames) - 1]

    const imageDisplaySpan = document.createElement("span");
    const imageDisplayButton = document.createElement("button");
    const imageDisplayText = document.createElement("p");

    imageDisplayText.innerText = imageFileName;

    imageDisplayButton.innerText = 'Delete Image';
    imageDisplayButton.type = 'button';
    imageDisplayButton.id = imageFileName;

    imageDisplayButton.addEventListener("change", removeImage);

    imageDisplaySpan.appendChild(imageDisplayText);
    imageDisplaySpan.appendChild(imageDisplayButton);
    
    imageFileContainer.appendChild(imageDisplaySpan);
}

function removeImage(e){
    imageFileName = e.id;

    e.target.parentNode.remove();

    (async () => await fetch('/remove', {
        method: 'POST',
        body: imageFileName
    }))();
}

function beforeClose(e) {
    navigator.sendBeacon("/end");
       
    return null;
}