compose_window = blessed.form({
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    top: screen.height - 4,
    left: "0%",
    width: "50%",
    style: {
        bg: "green",
        scrollbar: {
            inverse: true
        }
    },
    // label: "{" + settings.foreground + "-fg}{bold}Message{/bold}{/" + settings.foreground + "-fg}",
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
})

compose_box = blessed.textbox({
    parent: compose_window,
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
    name: "compose_box"
})

compose_box.on("focus", function() {
    compose_box.readInput()
})

compose_window.on("submit", function(data) {
    // DO SOMETHING
})

compose_box.key("enter", function() {
    compose_window.submit()
})