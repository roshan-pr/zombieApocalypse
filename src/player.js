class Player {
  #x;
  #y;
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  moveUp(minY) {
    if (this.#y > minY) {
      this.#y--;
    }
  }

  moveDown(maxY) {
    if (this.#y < maxY) {
      this.#y++;
    }
  }

  visit(visitor) {
    visitor(this.#x, this.#y, '😠');
  }

}

module.exports = { Player };
