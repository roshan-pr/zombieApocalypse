const { stdout } = require('process');
const { Game } = require('./game.js');
const { Zombie } = require('./zombie.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const animate = (x, y) => {
  stdout.cursorTo(x, y);
  stdout.clearLine();
  stdout.write('🧟');
};

const main = function () {
  const zombie = new Zombie(0, 3);

  const game = new Game(zombie);
  hideCursor();
  setInterval(() => {
    game.visit(animate);
    game.update();
  }, 500);
};

main();

module.exports = { main };
