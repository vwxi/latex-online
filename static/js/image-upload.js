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
}

function removeImage(imageFileName){
    removeItem(imageFileNames, imageFileName);

    (async () => await fetch('/remove', {
        method: 'POST',
        body: imageFileName
    }))();
}

function beforeClose(e){
    navigator.sendBeacon("/end");
       
    return null;
<<<<<<< HEAD
}
<<<<<<< Updated upstream
=======
}
>>>>>>> ea0479c2691fbc4cffdb0552b8d43a239fa2309b
=======
>>>>>>> Stashed changes
