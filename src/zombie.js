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

  hasReached(abscissa) {
    return this.#x === abscissa;
  }

  visit(visitor) {
    visitor(this.#x, this.#y);
  }
}

module.exports = { Zombie };
