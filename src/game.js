class Game {
  #zombie;
  constructor(zombie) {
    this.#zombie = zombie;
  }

  update() {
    this.#zombie.move();
  }

  isOver(maxX) {
    return this.#zombie.hasReached(maxX);
  }

  visit(visitor) {
    this.#zombie.visit(visitor);
  }
}

module.exports = { Game };
