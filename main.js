const { stdout, stdin } = require('process');
const { EventEmitter } = require('events');
const { Game } = require('./src/game.js');
const { Player } = require('./src/player.js');
const { Zombie } = require('./src/zombie.js');
const { Bullet } = require('./src/bullet.js');
const { Position } = require('./src/position.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const erase = (position, icon) => {
  position.visit((x, y) => stdout.cursorTo(x, y));
  stdout.write(' '.repeat(icon.length));
};

const animate = (position, icon) => {
  position.visit((x, y) => stdout.cursorTo(x, y));
  stdout.write(icon);
};

const createBullet = (position) => {
  const bulletPos = position.translate(-1, 0);
  return new Bullet(bulletPos);
};

const getMoves = (game, player, maxY) => {
  const moves = new EventEmitter();
  moves.on('\x1B[A', () => player.moveUp(0));
  moves.on('\x1B[B', () => player.moveDown(maxY));
  moves.on('\x1B[D', () => game.addBullet(player.visit(createBullet)));
  moves.on('q', () => process.exit(1));
  return moves;
};

const createZombie = (maxY) => {
  const position = new Position(0, Math.ceil(Math.random() * (maxY - 1)));
  return new Zombie(position);
};

const playGame = (game, maxX, maxY, duration) => {
  if (duration === 0) {
    game.addZombie(createZombie(maxY));
  }
  game.visit(erase);
  game.update();
  game.visit(animate);
  if (game.isOver(maxX - 10)) {
    console.clear();
    console.log('Game Over');
    process.exit(1);
  }
};

const main = function (speed = 1) {
  let duration = 100 - speed;
  const [maxX, maxY] = stdout.getWindowSize();
  stdin.setRawMode(true);
  const player = new Player(new Position(maxX - 10, maxY));
  const game = new Game(player);
  const moves = getMoves(game, player, maxY);
  stdin.on('data', (keyStroke) => {
    player.visit(erase);
    moves.emit(keyStroke);
  });
  hideCursor();

  setInterval(() => {
    if (duration < 0) {
      duration = 100 - speed;
    }
    playGame(game, maxX, maxY, duration);
    duration--;
  }, 50);
};

main(+process.argv[2]);
