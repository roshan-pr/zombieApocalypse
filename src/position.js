class Position {
  #x;
  #y;
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  translate(xDelta, yDelta) {
    return new Position(this.#x + xDelta, this.#y + yDelta);
  }

  isBelow(minY) {
    return this.#y > minY;
  }

  isAbove(maxY) {
    return this.#y < maxY;
  }

  isRight(minX) {
    return this.#x > minX;
  }

  hasReachedMaxX(maxX) {
    return this.#x >= maxX;
  }

  visit(visitor) {
    visitor(this.#x, this.#y);
  }

  toString() {
    return `${this.#x}: ${this.#y}`;
  }

  equals(otherPosition) {
    return otherPosition instanceof Position &&
      this.#x === otherPosition.#x &&
      this.#y === otherPosition.#y;
  }
}

module.exports = { Position };
