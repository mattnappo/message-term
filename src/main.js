const imessage = require("osa-imessage");
var blessed = require('blessed');

var screen;
var messages;

function init_scr() {
    screen = blessed.screen({
        smartCSR: true
    });
    screen.title = 'MessageTerm';

    screen.key(['C-x'], function(ch, key) {
        return process.exit(0);
    });

    var box = blessed.box({
        top: 0,
        
        width: '100%',
        height: '5%',
        content: 'Message Term',
        tags: true,
        style: {
            fg: 'black',
            bg: 'magenta',

            hover: {
                bg: 'green'
            }
        }
    });
    screen.append(box);
}

function incoming_message(message, sender) {
    var msg = {
        message: message,
        sender: sender
    };

    var box = blessed.box({
        top: "center",
        
        width: '100%',
        height: '5%',
        content: msg.sender,
        tags: true,
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
    screen.append(box);

    box.on('click', function(data) {
        box.setContent(msg.message);
        screen.render();
    });

    box.focus();

}

init_scr();

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});
incoming_message("asdad", "sender");
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



// Render the screen.
screen.render();