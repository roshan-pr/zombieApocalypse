const { stdout } = require('process');

const eraseCursor = () => stdout.write('\x1B[?25l');

class Zombie {
  #x;
  #y;
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  move() {
    this.#x++;
  }
  getPosition() {
    return [this.#x, this.#y];
  }
}

const animate = (zombie) => {
  const [x, y] = zombie.getPosition();
  stdout.cursorTo(x, y);
  stdout.clearLine();
  zombie.move();
  stdout.write('^');
};

const main = function () {
  const zombie = new Zombie(0, 3);

  eraseCursor();
  setInterval(() => {
    animate(zombie);
  }, 500);
};

main();

module.exports = { main };
