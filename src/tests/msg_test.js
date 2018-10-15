const imessage = require("osa-imessage");

process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
});

imessage.send("+19144142874", "omg!");

imessage.listen().on('message', (msg) => {
    if (!msg.fromMe) console.log(`'${msg.text}' from ${msg.handle}`);
});

imessage.getRecentChats(20);

console.log(imessage.getRecentChats(20));

imessage.handleForName("Charlie Loigman").then(handle => {
    imessage.send(handle, "gn");
});