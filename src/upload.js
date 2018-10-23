var Client = require('ftp');

var c = new Client();
c.on('ready', function() {
    c.list(function(err, list) {
        if (err) throw err;
        console.dir(list);
        c.end();
    });
});

c.connect({
    host: "ftp.mattnappo.com",
    user: "keys",
    password: ""
});