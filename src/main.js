const { stdout } = require('process');

const hideCursor = () => stdout.write('\x1B[?25l');

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

  visit(visitor) {
    visitor(this.#x, this.#y);
  }
}

const animate = (x, y) => {
  stdout.cursorTo(x, y);
  stdout.clearLine();
  stdout.write('🧟');
};

const main = function () {
  const zombie = new Zombie(0, 3);

  hideCursor();
  setInterval(() => {
    zombie.visit(animate);
    zombie.move();
  }, 500);
};

main();

module.exports = { main };
