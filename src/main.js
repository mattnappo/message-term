// ----- INIT CODE -----

const imessage = require("osa-imessage");
const blessed = require("blessed");
const fs = require('fs');

var screen;
var people_window;
var chat_window;

var no_messages;
var no_chats;

var current_chat;

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

var message_count = 0;
var clicked_chat = false;
var people = [ ];

var conversations = { };

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

    people_window = blessed.list({
        top: 3,
        width: "50%",
        height: "100%",
        label: "{" + settings.foreground + "-fg}{bold}People{/bold}",
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
            parent: people_window,
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
    screen.append(people_window);
    screen.append(chat_window);
}

// ----- UI -----

function add_message(message) {
    chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: " + message.sender + "{/bold}");
    chat_window.render();
    var new_message = blessed.box({
        parent: chat_window,
        top: 0,
        height: message.lines + 2,
        width: "50%",
        content: "{" + message.place + "}" + message.content + "{/" + message.place + "}",
        tags: true,
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: message.color
            },
            fg: message.color,
            bg: settings.background
        }
    });

    chat_window.render();
    screen.render();
}

function update_mesages() {
    var messages = conversations[current_chat];
    for (var i = 0; i < messages.length; i++) {
        add_message(messages[i]);
    }
       
}

var top = 0;
function new_person(person) {
    if (message_count == 1) {
        top = 0;
        hide_element(no_messages);
    } else {
        top += 3;
    }
    var person_box = blessed.box({
        parent: people_window,
        left: "center",
        top: top,
        height: 3,
        width: "90%",
        content: "{center}{bold}" + person + "{/bold}{/center}",
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
    
    person_box.on("click", function(data) {
        if (!clicked_chat) hide_element(no_chats);
        current_chat = person;
        update_mesages();
        // screen.render();
    });
    screen.render();
}

function count(obj) {
    var count=0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
 }

// ----- MAIN CODE -----

init_scr();

// message_count += 1;
// new_person("my message", "sender");

var counter = 0;
imessage.listen().on("message", (msg) => {
    // if (!msg.fromMe) {
        message_count += 1;
        var name_object = imessage.nameForHandle(msg.handle);
        name_object.then(function(name) {
            
            if (!conversations.hasOwnProperty(name)) {
                people.push(name);
                new_person(name);
                conversations[name] = [];
            }

            var conversation = conversations[name];
            var len = conversation.length;

            conversation[len] = {};
            conversation[len].content = msg.text;
            conversation[len].sender = name;
            conversation[len].lines = msg.text.split(/\r\n|\r|\n/).length;
            conversation[len].place = "left";
            conversation[len].color = settings.white;
            
            if (current_chat == name) {
                update_mesages();
            }

        });
    // }
});

screen.render();