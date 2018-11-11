module.exports.master_keys = {
    "keys": {

    }
};

module.exports.settings = {
    foreground: "#45ff30",
    background: "black",
    blue: "#429bf4",
    white: "#e0e0e0",
};

module.exports.current_chat = "";
module.exports.pending_send = { };

module.exports.message_count = 0;
module.exports.clicked_chat = false;
module.exports.people = [ ];

module.exports.conversations = { };
module.exports.chat_messages = [ ];

module.exports.test = function() {
    console.log("Imported successfully!");
};

module.exports = {
    settings: {}
}