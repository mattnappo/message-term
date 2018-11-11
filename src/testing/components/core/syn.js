var components = require("../index.js")

function syn() {
    console.log("syn")
}

function pprev() {
    console.log(components.foo.myfoo)
}

module.exports = {
    syn: syn,
    pprev: pprev
}