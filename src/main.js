const imessage = require("osa-imessage");
var blessed = require('blessed');

function init_scr() {
    var screen = blessed.screen({
        smartCSR: true
    });
    screen.title = 'my window title';
}

function incoming_message(message, sender) {
    var msg = {
        message: message,
        sender: sender
    };

    var box = blessed.box({
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        content: sender,
        tags: true,
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'magenta',
            border: {
                fg: '#f0f0f0'
            },
            hover: {
                bg: 'green'
            }
        }
    });

}

init_scr();

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

imessage.listen().on('message', (msg) => {
    if (!msg.fromMe) {
        incoming_message(msg.text, msg.handle);
        // console.log(`'${msg.text}' from ${msg.handle}`);
    }
});

imessage.getRecentChats(20);

console.log(imessage.getRecentChats(20));

imessage.handleForName("Charlie Loigman").then(handle => {
    imessage.send(handle, "gn");
});