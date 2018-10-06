// ----- INIT CODE -----

const imessage = require("osa-imessage");
var blessed = require("blessed");

var screen;
var message_window;
var chat_window;

var no_messages;
var no_chats;

var settings = {
    foreground: "#45ff30",
    background: "black"
};

var message_count = 0;

// ----- SETUP -----

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

function init_scr() {
    screen = blessed.screen({
        smartCSR: true,
        debug: true
    });
    screen.title = "Message Term";

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
        label: "{" + settings.foreground + "-fg}{bold}Chats{/bold}",
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

        no_chats = blessed.box({
            parent: chat_window,
            left: "center",
            top: "center",
            height: 3,
            width: "90%",
            content: "{center}No current chats{/center}",
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

function hide_element(element) {
    element.content = "";
    element.border.type = "none";
}

function open_chat() {
    console.log("chat opened");
}

var top = 0;
function incoming_message(message, sender) {
    if (message_count == 1) {
        top = 0;
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
        open_chat();
        screen.render();
    });
    screen.render();
}

// ----- MAIN CODE -----

init_scr();

// incoming_message("my message\nhi", "sender");
// message_count += 1;

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