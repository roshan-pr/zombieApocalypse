class Zombie {
  #position;
  constructor(position) {
    this.#position = position;
  }

  move() {
    this.#position = this.#position.translate(1, 0);
  }

  hasReached(abscissa) {
    return this.#position.hasReachedMaxX(abscissa);
  }

  getPosition() {
    return this.#position;
  }

  visit(visitor) {
    visitor(this.#position, '🧟');
  }
}

module.exports = { Zombie };
