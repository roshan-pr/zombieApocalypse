class Game {
  #zombie;
  constructor(zombie) {
    this.#zombie = zombie;
  }

  update() {
    this.#zombie.move();
  }

  visit(visitor) {
    this.#zombie.visit(visitor);
  }
}

module.exports = { Game };
