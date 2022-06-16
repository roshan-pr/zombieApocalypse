class Player {
  #position;
  constructor(position) {
    this.#position = position;
  }

  moveUp(minY) {
    if (this.#position.isBelow(minY)) {
      this.#position = this.#position.translate(0, -1);
    }
  }

  moveDown(maxY) {
    if (this.#position.isAbove(maxY)) {
      this.#position = this.#position.translate(0, 1);
    }
  }

  visit(visitor) {
    return visitor(this.#position, '😠');
  }

}

module.exports = { Player };
