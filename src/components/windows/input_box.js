const blessed = require("blessed")
var input_window = require("./input_window").input_window
var settings = require("../globals").settings

var input_box = blessed.textbox({
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
})

input_box.on("focus", function() {
    input_box.readInput()
})

input_box.key("enter", function() {
    input_window.submit()
})

module.exports.input_box = input_box
