const imessage = require("osa-imessage");

var sendMessage = (recipient, message) => {
    imessage.handleForName(recipient).then(handle => {
        imessage.send(handle, message);
    });
}

sendMessage("Henry Schatz", "this is an automated test.");

// imessage.listen().on("message", (response) => {
//     var nameObj = imessage.nameForHandle(response.handle);
//     nameObj.then(function (name) {
//         console.log(`name: ${name}\nmessage: ${response.text}`)
//     });
// });