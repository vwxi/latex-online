"use strict";

const imageInput = document.getElementById("img-input");

//imageButton.addEventListener("change", addImage);

var data = new FormData()
data.append('file', imageInput.files[0])

fetch('/new', {
  method: 'POST',
  body: data
})  
