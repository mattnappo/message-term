// ----- INIT CODE -----
const imessage = require("osa-imessage")
const blessed = require("blessed")
const crypto = require("./crypto")

const fs = require("fs")
const path = require("path")

var windows = require("./components").windows

var master_keys = {
    "keys": {

    }
}

var public_path
var private_path

var no_messages
var no_chats

var settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
}

var current_chat = ""
var pending_send = { }

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

function show_key_error() {
    var errorbox = blessed.box({
        parent: windows.screen,
        top: "25%",
        left: "25%",
        width: "50%",
        height: "50%",
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

    var errorbox = blessed.box({
        parent: windows.screen,
        top: "50%",
        left: "25%",
        width: "50%",
        height: "50%",
        tags: true,
        content: "{center}Run 'npm run keymanage' to generate a key!{/center}",
        style: {
            fg: settings.foreground,
            bg: settings.background
        }
    })
    
    windows.screen.render()
}


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
    if (current_chat != "") {
        var message = windows.input_box.getContent()
        if (message != "") {
            windows.input_window.reset()
            if (!(current_chat in master_keys["keys"])) {
                fs.readFile(public_path, {encoding: 'utf-8'}, function(err, public_key) {
                    if (err) console.log(err)
                    var escaped = public_key.replace(/\n/g, String.raw`\n`)
                    var r = {
                        "public_key": escaped,
                        "body": "--REQUEST PUBLIC KEY--"
                    }
                    pending_send = {
                        to: current_chat,
                        message: message
                    }
                    send_message(current_chat, JSON.stringify(r))
                })
            } else {
                forge_message(current_chat, message, true)
                var public_key = master_keys["keys"][current_chat]
                var escaped = public_key.replace(/\n/g, String.raw`\n`)
                var r = {
                    "public_key": escaped,
                    "body": crypto.encrypt_k(message, public_key)
                }
                send_message(current_chat, JSON.stringify(r))
                
            }
            windows.input_box.focus()
        }
    }
})


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

try {
    var p = path.resolve(__dirname, "..", "keys", "keys.json")
    var raw = fs.readFileSync(p, "utf8")
    var contents = JSON.parse(raw)
    var mainkey = contents["mainkey"]
        
    public_path = path.resolve(__dirname, "..", "keys", mainkey, "public.pem")
    private_path = path.resolve(__dirname, "..", "keys", mainkey, "private.pem")
    init_scr()
} catch (err) {
    show_key_error()
}

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
        conversation[len].left = "53%"
    } else {
        conversation[len].color = settings.white
    }
    if (current_chat == name) {
        update_messages()
    }
}

imessage.listen().on("message", (msg) => {
    // if (!msg.fromMe) {
        fs.readFile(private_path, {encoding: 'utf-8'}, function(err, private_key) {
            if (err) console.log(err)
            var name_object = imessage.nameForHandle(msg.handle)
            try {
                var decoded_r = JSON.parse(msg.text)
                var body = decoded_r["body"]
                var their_public = decoded_r["public_key"]
                if (body == "--REQUEST PUBLIC KEY--") {
                    fs.readFile(public_path, {encoding: 'utf-8'}, function(err, public_key) {
                        if (err) console.log(err)
                        var escaped = public_key.replace(/\n/g, String.raw`\n`)
                        var r = {
                            "public_key": escaped,
                            "body": "--INCOMING PUBLIC KEY--"
                        }
                        send_message(current_chat, JSON.stringify(r))
                    })
                } else if (body == "--INCOMING PUBLIC KEY--") {
                    name_object.then(function(name) {
                        master_keys["keys"][name] = their_public
                        fs.readFile(public_path, {encoding: 'utf-8'}, function(err, public_key) {
                            if (err) console.log(err)
                            var escaped = public_key.replace(/\n/g, String.raw`\n`)
                            var r = {
                                "public_key": escaped,
                                "body": crypto.encrypt_k(pending_send[current_chat], their_public)
                            }
                            send_message(current_chat, JSON.stringify(r))
                        })
                    })
                } else {
                    var decrypted = crypto.decrypt_k(body, private_key)
                    name_object.then(function(name) {
                        forge_message(name, decrypted)
                        windows.screen.render()
                    })
                }
            } catch (err) { }
        })
    // }
})

windows.input_window.focus()

windows.screen.render()