const { stdout } = require('process');
const { Game } = require('./src/game.js');
const { Player } = require('./src/player.js');
const { Zombie } = require('./src/zombie.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const animate = (x, y, icon) => {
  stdout.clearScreenDown();
  stdout.cursorTo(x, y);
  stdout.write(icon);
};

const main = function () {
  const [maxX, maxY] = stdout.getWindowSize();
  const zombie = new Zombie(0, 3);
  const player = new Player(maxX - 10, maxY - 10);

  const game = new Game(player, zombie);
  hideCursor();
  setInterval(() => {
    game.visit(animate);
    game.update();
    if (game.isOver(maxX - 10)) {
      console.clear();
      console.log('Game Over');
      process.exit(1);
    }
  }, 500);
};

main();
