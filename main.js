const { stdout, stdin } = require('process');
const { EventEmitter } = require('events');
const { Game } = require('./src/game.js');
const { Player } = require('./src/player.js');
const { Zombie } = require('./src/zombie.js');
const { Bullet } = require('./src/bullet.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const erase = (x, y, icon) => {
  stdout.cursorTo(x, y);
  stdout.write(' '.repeat(icon.length));
};

const animate = (x, y, icon) => {
  stdout.cursorTo(x, y);
  stdout.write(icon);
};

const createBullet = (x, y) => {
  return new Bullet(x - 1, y);
};

const getMoves = (game, player, maxY) => {
  const moves = new EventEmitter();
  moves.on('\x1B[A', () => player.moveUp(0));
  moves.on('\x1B[B', () => player.moveDown(maxY));
  moves.on('\x1B[D', () => game.addBullet(player.visit(createBullet)));
  moves.on('q', () => process.exit(1));
  return moves;
};

const playGame = (game, maxX, maxY) => {
  const zombie = new Zombie(0, Math.ceil(Math.random() * (maxY - 1)));
  game.addZombie(zombie);
  game.visit(erase);
  game.update();
  game.visit(animate);
  if (game.isOver(maxX - 10)) {
    console.clear();
    console.log('Game Over');
    process.exit(1);
  }
};

const main = function () {
  const [maxX, maxY] = stdout.getWindowSize();
  stdin.setRawMode(true);
  const player = new Player(maxX - 10, maxY - 10);
  const game = new Game(player);
  const moves = getMoves(game, player, maxY);

  stdin.on('data', (keyStroke) => {
    player.visit(erase);
    moves.emit(keyStroke);
  });
  hideCursor();

  setInterval(() => {
    playGame(game, maxX, maxY);
  }, 500);
};

main();
