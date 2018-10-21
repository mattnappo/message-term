// ----- INIT CODE -----

const imessage = require("osa-imessage");
const blessed = require("blessed");
const crypto = require("./crypto.js");
const path = require("path");

var public_path = path.join(__dirname, "key/public.pem");
var private_path = path.join(__dirname, "key/private.pem");

var public_key;
var private_key;

fs.readFile(public_path, {encoding: 'utf-8'}, function(err, data) {
    if (err) console.log(err);
    public_key = data;
    console.log(data);
});

fs.readFile(private_path, {encoding: 'utf-8'}, function(err, data) {
    if (err) console.log(err);
    private_key = data;
    console.log(data);
});

// var m_path = path.resolve(__dirname, "..", "key/public.pem");
// var s = crypto.encrypt("Hello world", m_path);
// console.log(s);

var screen;
var people_window;
var chat_window;

var no_messages;
var no_chats;

var input_window;
var input_box;

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

var current_chat = "";

var message_count = 0;
var clicked_chat = false;
var people = [ ];

var conversations = { };
var chat_messages = [ ];

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
        parent: screen,
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
        parent: screen,
        top: 3,
        width: "50%",
        height: screen.height - 3,
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
                bg: "yellow"
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

    input_window = blessed.form({
        parent: screen,
        mouse: true,
        keys: true,
        vi: true,
        top: screen.height - 4,
        left: "50%",
        width: "50%",
        style: {
            bg: "green",
            scrollbar: {
                inverse: true
            }
        },
        // label: "{" + settings.foreground + "-fg}{bold}Message{/bold}",
        label: "Message",
        border: {
            type: "line"
        },
        style: {
            border: {
                fg: settings.foreground
            },
            fg: settings.foreground,
            bg: settings.background
        },
        scrollable: true,
        scrollbar: {
            ch: " "
        },
    });
  
    input_box = blessed.textbox({
        parent: input_window,
        readOnFocus: true,
        mouse: true,
        keys: true,
        style: {
            bg: settings.background
        },
        height: 2,
        width: "100%",
        left: 1,
        top: 0,
        name: "input_box"
    });

    input_box.on("focus", function() {
        input_box.readInput();
    });

    input_window.on("submit", function(data) {
        if (current_chat != "") {
            input_box.content = "";
            var message = input_box.getContent();
            forge_message(current_chat, message, true);
            send_message(current_chat, message);
        }
    });

    screen.key("enter", function() {
        input_window.submit();
    });

    input_box.focus();

    if (message_count <= 0) {
        no_messages = blessed.box({
            parent: people_window,
            left: "center",
            height: 3,
            top: people_window.height / 2 - 4,
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
    
}

// ----- UI -----

function add_message(message, previous_height) {
    chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: " + message.sender + "{/bold}");
    chat_window.render();
    var new_message = blessed.box({
        parent: chat_window,
        top: previous_height,
        left: message.left,
        height: message.lines + 2,
        width: "45%",
        content: "{left}" + message.content + "{/left}",
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

    // chat_window.render();
    screen.render();
    return new_message;
}

function send_message(recipient, message) {
    imessage.handleForName(recipient).then(handle => {
        imessage.send(handle, message);
    });
}

function clear_chats() {
    for (var i = 0; i < chat_messages.length; i++) {
        hide_element(chat_messages[i]);
    }
}

function update_messages() {
    clear_chats();
    var messages = conversations[current_chat];
    var total_lines = 0;
    for (var i = 0; i < messages.length; i++) {
        if (i > 0) {
            // total_lines += messages[i].lines + 2;
            total_lines += messages[i - 1].lines + 2;
        }
        var msg = add_message(messages[i], total_lines);
        chat_messages.push(msg);
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
        update_messages();
    });
    screen.render();
}

function count(obj) {
    var count = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

// ----- MAIN CODE -----

init_scr();

function forge_message(name, message, to_recipient) {
    message_count += 1;
    if (!conversations.hasOwnProperty(name)) {
        people.push(name);
        new_person(name);
        conversations[name] = [];
    }

    var conversation = conversations[name];
    var len = conversation.length;
    conversation[len] = {};
    conversation[len].content = message;
    conversation[len].sender = name;
    conversation[len].lines = message.split(/\r\n|\r|\n/).length;
    
    if (to_recipient) {
        conversation[len].color = settings.blue;
        conversation[len].left = "53%";
    } else {
        conversation[len].color = settings.white;
    }
    if (current_chat == name) {
        update_messages();
    }
}

forge_message("Bob", "sup\nhi\nhi", false);
forge_message("Bob", "sup", false);
forge_message("Bob", "sup\nsup", false);
forge_message("Bob", "sup\nsup\nsupsup", false);

forge_message("Alice", "It's Alice.", false);
forge_message("Alice", "Yeah.", true);

imessage.listen().on("message", (msg) => {
    // if (!msg.fromMe) {
        var name_object = imessage.nameForHandle(msg.handle);
        name_object.then(function(name) {
            forge_message(name, msg.text);
            screen.render();
        });
    // }
});
function dothis() {
    console.log("DOING THIS")
    console.log("\n\n\chatmessagse  :" + JSON.stringify(chat_messages));
    console.log("\n\n\nconversations:" + JSON.stringify(conversations));
    console.log(conversations);
}
// dothis();
screen.render();