"use strict";

const textEditor = document.querySelector("textarea");
const codeDisplay = document.querySelector("code");

editor.addEventListener("input", updateDisplay);
editor.addEventListener("keydown", handleKey) ;

function handleKey(e) {
    if (e.key === "Tab") {
        e.preventDefault();
        textEditor.value += "\t";
    }
}

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
compileButton.addEventListener("click", async (e) => {
    var data = new FormData();
    data.append("source", textEditor.value);

    console.log(textEditor.value);

    var resp = await fetch('/compile', { method: 'POST', body: data });
    var reader = resp.body.getReader();
    var buf = await reader.read();
    var blob = new Blob([buf.value], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    
    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.src = url;
});

