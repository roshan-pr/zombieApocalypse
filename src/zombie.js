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

module.exports = { Zombie };
