// ----- INIT CODE -----
const imessage = require("osa-imessage")
const blessed = require("blessed")

var windows = require("./components").windows

var no_messages
var no_chats

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
}

var current_chat = ""

var message_count = 0
var clicked_chat = false
var people = [ ]

var conversations = { }
var chat_messages = [ ]

// ----- SETUP -----
    
process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message)
})

process.on("uncaughtException", function (err) {
    console.error(err)
})

function hide_element(element) {
    element.content = ""
    element.border.type = "none"
}

// ----- HANDLERS -----

windows.compose_window.on("submit", function(data) {
    var content = windows.compose_box.getContent()
    if (content != "") {
        windows.compose_window.reset()
        current_chat = content
        imessage.handleForName(content).then(handle => {
            if (handle != "") {
                if (!conversations.hasOwnProperty(content)) {
                    people.push(content)
                    new_person(content)
                    hide_element(no_messages)
                    hide_element(no_chats)
                    windows.chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: " + content + "{/bold}")
                    conversations[content] = []
                    windows.screen.render()
                }

            }
        })
        windows.screen.render()
    }
})

windows.input_window.on("submit", function(data) {
    var content = windows.compose_window.getContent()
    if (content != "") {
        current_chat = content
    }
    var message = windows.input_box.getContent()
    if (message != "") {
        windows.input_window.reset()
        forge_message(current_chat, message, true)
        send_message(current_chat, message)
        windows.input_box.focus()
    }
    
})

// ----- HANDLERS -----

function init_scr() {
    windows.compose_window.focus()

    if (message_count <= 0) {
        no_messages = blessed.box({
            parent: windows.people_window,
            left: "center",
            height: 3,
            top: windows.people_window.height / 2 - 2,
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
        })
        windows.screen.render()
    }

    if (!clicked_chat) {
        no_chats = blessed.box({
            parent: windows.chat_window,
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
        })
    }
    
}

// ----- UI -----

function add_message(message, previous_height) {
    windows.chat_window.setLabel("{" + settings.foreground + "-fg}{bold}Conversations: " + message.sender + "{/bold}")
    windows.chat_window.render()
    var new_message = blessed.box({
        parent: windows.chat_window,
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
    })

    windows.screen.render()
    return new_message
}

function send_message(recipient, message) {
    imessage.handleForName(recipient).then(handle => {
        imessage.send(handle, message)
    })
}

function clear_chats() {
    for (var i = 0; i < chat_messages.length; i++) {
        hide_element(chat_messages[i])
    }
}

function update_messages() {
    clear_chats()
    var messages = conversations[current_chat]
    var total_lines = 0
    for (var i = 0; i < messages.length; i++) {
        if (i > 0) {
            total_lines += messages[i - 1].lines + 2
        }
        var msg = add_message(messages[i], total_lines)
        chat_messages.push(msg)
    }
}

var top = 0
function new_person(person) {
    if (message_count == 1) {
        top = 0
        hide_element(no_messages)
    } else {
        top += 3
    }
    var person_box = blessed.box({
        parent: windows.people_window,
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
    })
    
    person_box.on("click", function(data) {
        if (!clicked_chat) hide_element(no_chats)
        current_chat = person
        update_messages()
    })
    windows.screen.render()
}

function count(obj) {
    var count = 0
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count
        }
    }
    return count
}

// ----- MAIN CODE -----

init_scr()

function forge_message(name, message, to_recipient) {
    message_count += 1
    if (!conversations.hasOwnProperty(name)) {
        people.push(name)
        new_person(name)
        conversations[name] = []
    }

    var conversation = conversations[name]
    var len = conversation.length
    conversation[len] = {}
    conversation[len].content = message
    conversation[len].sender = name
    conversation[len].lines = message.split(/\r\n|\r|\n/).length
    
    if (to_recipient) {
        conversation[len].color = settings.blue
        conversation[len].left = windows.screen.width / 2 + 3
    } else {
        conversation[len].color = settings.white
    }
    if (current_chat == name) {
        update_messages()
    }
}

imessage.listen().on("message", (msg) => {
    // if (!msg.fromMe) {
    var name_object = imessage.nameForHandle(msg.handle)
    name_object.then(function(name) {
        forge_message(name, msg.text)
        windows.screen.render()
    })
    // }
})

windows.input_window.focus()
windows.screen.render()