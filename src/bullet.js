class Bullet {
  #position;

  constructor(position) {
    this.#position = position;
  }

  move(minX) {
    if (this.#position.isRight(minX)) {
      this.#position = this.#position.translate(-1, 0);
    }
  }

  getPosition() {
    return this.#position;
  }

  visit(visitor) {
    visitor(this.#position, '-');
  }
}

module.exports = { Bullet };
