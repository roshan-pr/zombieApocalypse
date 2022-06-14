const { stdout } = require('process');

const main = function () {
  let [x, y] = [0, 3];

  stdout.write('\x1B[?25l');
  setInterval(() => {
    stdout.cursorTo(x, y);
    stdout.clearLine();
    stdout.write('^');
    x++;
  }, 500);
};

main();

module.exports = { main };
