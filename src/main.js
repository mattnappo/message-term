// ----- INIT CODE -----

const imessage = require("osa-imessage");
const blessed = require("blessed");

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

var current_chat;

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
            ch: ' ',
            track: {
                bg: 'yellow'
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
    
    chat_window.on('submit', function (data) {
        console.log(data.message);
    });

    // input_window = blessed.form({
    //     parent: screen,
    //     keys: true,
    //     mouse: true,
    //     top: screen.height - 4,
    //     left: "50%",
    //     width: "50%",
    //     height: 4,
    //     label: "{" + settings.foreground + "-fg}{bold}Message{/bold}",
    //     tags: true,
    //     name: "input_window",
    //     border: {
    //         type: "line"
    //     },
    //     style: {
    //         border: {
    //             fg: settings.foreground
    //         },
    //         fg: settings.foreground,
    //         bg: settings.background
    //     }
    // });

    // input_box = blessed.textbox({
    //     parent: input_window,
    //     top: screen.height - 4,
    //     left: "50%",
    //     width: "50%",
    //     height: 4,
    //     label: "{" + settings.foreground + "-fg}{bold}Message{/bold}",
    //     content: ">sreufywb4fuwefihjkx ",
    //     tags: true,
    //     border: {
    //         type: "line"
    //     },
    //     style: {
    //         border: {
    //             fg: settings.foreground
    //         },
    //         fg: settings.foreground,
    //         bg: settings.background
    //     }
    // });

    // input_box.on('focus', function() {
    //     input_box.readInput();
    // });
    
    // input_window.key(["enter"], function(ch, key) { 
    //     input_window.submit();
    // });

    // input_window.focus();


    input_window = blessed.form({
        parent: screen,
        mouse: true,
        keys: true,
        vi: true,
        top: screen.height - 4,
        left: "50%",
        width: "50%",
        //height: 12,
        style: {
            bg: 'green',
            // border: {
                //   inverse: true
                // },
            scrollbar: {
                inverse: true
            }
        },
        label: "{" + settings.foreground + "-fg}{bold}Message{/bold}",
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
        // border: {
        //   type: 'ch',
        //   ch: ' '
        // },
        scrollbar: {
            ch: ' '
        },
        //alwaysScroll: true
    });
    
    input_window.on('submit', function(data) {
        new_person(text.getContent());
        // console.log(text.getContent());
        // text.setContent(JSON.stringify(data, null, 2));
        screen.render();
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

    input_box.on('focus', function() {
        input_box.readInput();
    });

    screen.key('enter', function() {
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

function add_message(message, top) {
    chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: " + message.sender + "{/bold}");
    chat_window.render();
    var new_message = blessed.box({
        parent: chat_window,
        top: top,
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

    chat_window.render();
    screen.render();
    return new_message;
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
        if (i > 0) total_lines += messages[i].lines + 2;
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

function forge_message(name, message) {
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
    conversation[len].color = settings.white;

    if (current_chat == name) {
        update_messages();
    }
}

forge_message("Bob", "sup\nhi");
forge_message("Bob", "sup");

forge_message("Alice", "It's Alice.");
forge_message("Alice", "Yeah.");


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
            conversation[len].color = settings.white;

            // conversation[len] = {};
            // conversation[len].content = msg.text;
            // conversation[len].sender = name;
            // conversation[len].lines = msg.text.split(/\r\n|\r|\n/).length;
            // // conversation[len].left = "53%";
            // // conversation[len].left = chat_window.width / 2 - 3;
            // // console.log(conversation[len].left);
            // conversation[len].color = settings.blue;
            
            if (current_chat == name) {
                update_messages();
            }

        });
    // }
});

screen.render();