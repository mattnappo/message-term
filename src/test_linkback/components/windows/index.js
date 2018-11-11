var components = require("../index.js")


function inner() {
    console.log("called inner")
    console.log("direct f: " + f.thing)
    console.log("getfoo " + components.foo)
    console.log("REAL F" + components.f.thing)
}

module.exports = {
    inner: inner,
    ggg: "ggg"
}

components.tester()