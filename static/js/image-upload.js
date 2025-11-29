"use strict";

let imageFileNames = [];

fetch('/new', {
    method: 'POST'
});

const imageInput = document.getElementById("img-input");

window.addEventListener('beforeunload', beforeClose);

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
    fetch('/end', {
        method: 'POST',
        keepalive: true
    });
    
    deleteAllCookies();
    
    return null;
}

function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}