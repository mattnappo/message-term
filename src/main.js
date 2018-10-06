// ----- INIT CODE -----

const imessage = require("osa-imessage");
const blessed = require("blessed");

var screen;
var message_window;
var chat_window;

var no_messages;
var no_chats;

var current_chat;
var clicked_chat = false;

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

var message_count = 0;

// ----- SETUP -----

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

function hide_element(element) {
    element.content = "";
    element.border.type = "none";
}

function init_scr() {
    screen = blessed.screen({
        smartCSR: true,
        debug: true,
        title: "Message Term"
    });

    screen.key(["C-x"], function(ch, key) {
        return process.exit(0);
    });

    var header = blessed.box({
        top: 0,
        height: 3,
        width: "100%",
        content: "{center}{bold}Message Term{/bold}{/center}",
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

    message_window = blessed.list({
        top: 3,
        width: "50%",
        height: "100%",
        label: "{" + settings.foreground + "-fg}{bold}Messages{/bold}",
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
        top: 3,
        left: "50%",
        width: "50%",
        height: "100%",
        label: "{" + settings.foreground + "-fg}{bold}Conversations{/bold}",
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

    if (message_count <= 0) {
        no_messages = blessed.box({
            parent: message_window,
            left: "center",
            top: "center",
            height: 3,
            width: "90%",
            content: "{center}No new messages{/center}",
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
    }

    if (!clicked_chat) {  
        no_chats = blessed.box({
            parent: chat_window,
            left: "center",
            top: "center",
            height: 3,
            width: "90%",
            content: "{center}No active conversations{/center}",
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
    }
    
    screen.append(header);
    screen.append(message_window);
    screen.append(chat_window);
}

// ----- HANDLING -----

function open_chat(message) {
    chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: {/bold}" + message.sender);
    chat_window.render();
    var new_message = blessed.box({
        parent: chat_window,
        top: 0,
        height: message.lines + 2,
        width: "50%",
        content: "{left}" + message.content + "{/left}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.white
            },
            fg: settings.white,
            bg: settings.background
        }
    });
}

var top = 0;
function incoming_message(message, sender) {
    if (message_count == 1) {
        top = 0;
        hide_element(no_messages);
    } else {
        top += 3;
    }
    var new_message = blessed.box({
        parent: message_window,
        left: "center",
        top: top,
        height: 3,
        width: "90%",
        content: "{center}{bold}" + sender + "{/bold}: " + message + "{/center}",
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
    
    new_message.on("click", function(data) {
        if (!clicked_chat) hide_element(no_chats);
        current_chat = sender;
        open_chat({
            content: message,
            sender: sender,
            lines: message.split(/\r\n|\r|\n/).length
        });
        screen.render();
    });
    screen.render();
}

// ----- MAIN CODE -----

init_scr();

message_count += 1;
incoming_message("my message", "sender");

imessage.listen().on("message", (msg) => {
    // if (!msg.fromMe) {
        var name_object = imessage.nameForHandle(msg.handle);
        message_count += 1;
        name_object.then(function(result) {
            incoming_message(msg.text, result);
            
        });
    // }
});

screen.render();