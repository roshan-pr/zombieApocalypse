const { stdout, stdin } = require('process');
const { Game } = require('./src/game.js');
const { Player } = require('./src/player.js');
const { Position } = require('./src/position.js');

const hideCursor = () => stdout.write('\x1B[?25l');

const createGame = () => {
  const [maxX, maxY] = stdout.getWindowSize();
  const player = new Player(new Position(maxX - 10, maxY));
  return new Game(player, maxX, maxY);
};

const main = function (speed = 1) {
  let duration = 100 - speed;
  const game = createGame();
  stdin.setRawMode(true);
  stdin.on('data', (keyStroke) => {
    const asciiValue = keyStroke.toString().charCodeAt();
    game.operate(asciiValue);
  });
  hideCursor();

  setInterval(() => {
    if (duration < 0) {
      duration = 100 - speed;
    }
    game.play(duration);
    duration--;
  }, 50);
};

main(+process.argv[2]);
