var foo = "goo"
module.exports = {
    windows: require("./windows"),
    foo: foo,
    f: require("./f.js")
}

module.exports.tester = function(msg) {
    console.log(msg)
}