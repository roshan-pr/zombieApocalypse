class Bullet {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  move(minX) {
    if (this.#x > minX) {
      this.#x--;
    }
  }

  visit(visitor) {
    visitor(this.#x, this.#y, '--');
  }
}

module.exports = { Bullet };
