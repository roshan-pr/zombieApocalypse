class Game {
  #zombie;
  #player;
  constructor(player, zombie) {
    this.#player = player;
    this.#zombie = zombie;
  }

  update() {
    this.#zombie.move();
  }

  isOver(maxX) {
    return this.#zombie.hasReached(maxX);
  }

  visit(visitor) {
    this.#player.visit(visitor);
    this.#zombie.visit(visitor);
  }
}

module.exports = { Game };
