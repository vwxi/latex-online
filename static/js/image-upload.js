"use strict";

let imageFileNames = [];

fetch('/new'), {
    method: 'POST'
}

document.addEventListener('beforeunload', beforeClose);

const imageInput = document.getElementById("img-input");

imageInput.addEventListener("change", addImage);

function addImage(){
    console.log("Added image");

    var data = new FormData();
    data.append('file', imageInput.files[0]);

    imageFileNames.push(fetch('/add', {
      method: 'POST',
      body: data
<<<<<<< Updated upstream
    }));
=======
    }).then((response) => response.json())
      .then((val) => imageFileNames.push(val)))();

    imageFileName = imageFileNames[length(imageFileNames) - 1]

    const imageDisplaySpan = document.createElement("span");
    const imageDisplayButton = document.createElement("button");
    const imageDisplayText = document.createElement("p");

    imageDisplayText.innerText = imageFileName;

    imageDisplayButton.innerText = 'Delete Image';
    imageDisplayButton.type = 'button';
    imageDisplayButton.

    imageDisplaySpan.appendChild(imageDisplayText);
    imageDisplaySpan.appendChild(imageDisplayButton);
    
    imageFileContainer.appendChild(imageDisplaySpan);
>>>>>>> Stashed changes
}

function removeImage(imageFileName){
    removeItem(imageFileNames, imageFileName);

    fetch('/remove'), {
        method: 'POST',
        body: imageFileName
    }    
}

function beforeClose(e){
    //remove images
    console.log("end");
    fetch('/end'), {
        method: 'POST'
    }
}