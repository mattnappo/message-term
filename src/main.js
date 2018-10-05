const imessage = require("osa-imessage");
var blessed = require("blessed");

var screen;
var message_window;
var chat_window;

var settings = {
    foreground: "#45ff30",
    background: "black"
};

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
        content: "{center}{bold}Messages{/bold}{/center}",
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
        content: "{center}{bold}Chats{/bold}{/center}",
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

    screen.append(header);
    screen.append(message_window);
    screen.append(chat_window);
    

}

function incoming_message(message, sender) {
    var new_message = blessed.box({
        parent: message_window,
        left: "center",
        top: 1,
        height: 3,
        width: "90%",
        content: "{center}" + sender + "{/center}",
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

    new_message.on('click', function(data) {
        new_message.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
        screen.render();
    });

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