// ----- INIT CODE -----
const blessed = require("blessed");
const crypto = require("./crypto.js");

const fs = require("fs");
const path = require("path");

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

// ----- SETUP -----

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

var screen = blessed.screen({
    smartCSR: true,
    debug: true,
    title: "Message Term"
});

screen.key(["C-x"], function(ch, key) { 
    return process.exit(0);
});

function init_scr() {

    var header = blessed.box({
        parent: screen,
        top: 0,
        height: 3,
        width: "100%",
        content: "{center}{bold}Message Term Keygen{/bold}{/center}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        }
    });

    people_window = blessed.box({
        parent: screen,
        top: "50%",
        width: "50%",
        height: "50%",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        }
    });

    chat_window = blessed.box({
        parent: screen,
        top: 3,
        left: "50%",
        width: "50%",
        height: screen.height - 7,
        label: "{" + settings.foreground + "-fg}{bold}Conversations{/bold}",
        tags: true,
        border: {
            type: "line"
        },
        mouse: true,
        scrollable: true,
        alwaysScroll: true,
        scrollback: 100,
        scrollbar: {
            ch: " ",
            track: {
                bg: settings.background
            },
            style: {
                inverse: true
            }
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        }
    });
    
}

// ----- UI -----

    
person_box.on("click", function(data) {
    if (!clicked_chat) hide_element(no_chats);
    current_chat = person;
    update_messages();
});