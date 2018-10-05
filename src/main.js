const imessage = require("osa-imessage");
var blessed = require("blessed");

var screen;
var message_window;
var chat_window;

function init_scr() {
    screen = blessed.screen({
        smartCSR: true
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
                fg: "#f0f0f0"
            },
            fg: "black",
            bg: "magenta"
        }
    });

    message_window = blessed.box({
        top: 3,
        width: "50%",
        height: "100%",
        content: "{center}{bold}Messages{/bold}{/center}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: "#f0f0f0"
            },
            fg: "black",
            bg: "magenta"
        }
    });

    chat_window = blessed.box({
        top: 3,
        left: "50%",
        width: "50%",
        height: "100%",
        content: "{center}{bold}Chats{/bold}{/center}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: "#f0f0f0"
            },
            fg: "black",
            bg: "magenta"
        }
    });

    screen.append(header);
    screen.append(message_window);
    screen.append(chat_window);
    

}

function incoming_message(message, sender) {
    var msg = {
        message: message,
        sender: sender
    };

    // var box = blessed.box({
    //     top: "center",

    //     width: "100%",
    //     height: "5%",
    //     content: msg.sender,
    //     tags: true,
    //     style: {
    //         fg: "white",
    //         bg: "magenta",
    //         border: {

    //             fg: "#f0f0f0"
    //         },
    //         hover: {
    //             bg: "green"
    //         }
    //     }
    // });
    // screen.append(box);

    // box.on("click", function(data) {
    //     box.setContent(msg.message);
    //     screen.render();
    // });

    // box.focus();
    return msg;

}

init_scr();

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});
incoming_message("asdad", "sender");
imessage.listen().on("message", (msg) => {
    if (!msg.fromMe) {
        incoming_message(msg.text, msg.handle);
        // console.log(`"${msg.text}" from ${msg.handle}`);
    }
});

imessage.getRecentChats(20);

console.log(imessage.getRecentChats(20));




// Render the screen.
screen.render();