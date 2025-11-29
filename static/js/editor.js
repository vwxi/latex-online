"use strict";

const textEditor = document.querySelector("textarea");
const codeDisplay = document.querySelector("code");

editor.addEventListener("input", updateDisplay);

function updateDisplay() {
    console.log("Change!");

    const re_command = /\\([A-Za-z0-9@]+)?/g;
    let result = textEditor.value.replaceAll(re_command, (match) => {
        return "<span style=\"color: blue;\">" + match + "</span>";
    });

    const re_comment = /^%.*$/gm;
    result = result.replaceAll(re_comment, (match) => {
        return "<span style=\"color: green;\">" + match + "</span>";
    });

    codeDisplay.innerHTML = result;
}

const compileButton = document.getElementById("compile");
compileButton.addEventListener("click", e => {
    var resp = (async () => {
        var data = new FormData();
        data.append("source", textEditor.value);
        return fetch('/compile', {
            method: 'POST',
            body: data
        });
    })();

    
});

