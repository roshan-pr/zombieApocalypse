const { stdout, stdin } = require('process');
const { EventEmitter } = require('events');
const { Game } = require('./src/game.js');
const { Player } = require('./src/player.js');
const { Zombie } = require('./src/zombie.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const erase = (x, y, icon) => {
  stdout.cursorTo(x, y);
  stdout.write(' '.repeat(icon.length));
};

const animate = (x, y, icon) => {
  stdout.cursorTo(x, y);
  stdout.write(icon);
};

const getMoves = (player, maxY) => {
  const moves = new EventEmitter();
  moves.on('\x1B[A', () => player.moveUp(0));
  moves.on('\x1B[B', () => player.moveDown(maxY));
  moves.on('q', () => process.exit(1));
  return moves;
};

const createGame = (maxX, maxY) => {
  const zombie = new Zombie(0, 3);
  const player = new Player(maxX - 10, maxY - 10);
  const moves = getMoves(player, maxY);
  stdin.on('data', (keyStroke) => {
    player.visit(erase);
    moves.emit(keyStroke);
  });

  return new Game(player, zombie);
};

const playGame = (game, maxX) => {
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
  const game = createGame(maxX, maxY);
  hideCursor();

  setInterval(() => {
    playGame(game, maxX);
  }, 50);
};

main();
