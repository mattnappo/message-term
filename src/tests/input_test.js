const blessed = require('blessed');

screen = blessed.screen({
    warnings: true,
    debug: true
});

var form = blessed.form({
  parent: screen,
  mouse: true,
  keys: true,
  vi: true,
  left: 0,
  top: 0,
  width: '100%',
  //height: 12,
  style: {
    bg: 'green',
    // border: {
    //   inverse: true
    // },
    scrollbar: {
      inverse: true
    }
  },
  content: 'foobar',
  scrollable: true,
  // border: {
  //   type: 'ch',
  //   ch: ' '
  // },
  scrollbar: {
    ch: ' '
  }
  //alwaysScroll: true
});

form.on('submit', function(data) {
    // box.setContent(text.getContent());
    // console.log(text.getContent());
    // text.setContent(JSON.stringify(data, null, 2));
    // screen.render();
});

var text = blessed.textbox({
    parent: form,
    readOnFocus: true,
    mouse: true,
    keys: true,
    style: {
      bg: 'blue'
    },
    height: 1,
    width: 20,
    left: 1,
    top: 3,
    name: 'text'
});

var box = blessed.box({
    parent: screen,
    mouse: true,
    keys: true,
    style: {
      bg: 'blue'
    },
    height: 1,
    width: 20,
    left: "50%",
    top: "50%"
});

text.on('focus', function() {
    text.readInput();
});

screen.key('q', function() {
    return screen.destroy();
});

screen.key('enter', function() {
    form.submit();
});

form.focus();

screen.render();