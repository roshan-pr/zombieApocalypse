class Game {
  #zombie;
  #player;
  #bullets;
  constructor(player, zombie) {
    this.#player = player;
    this.#zombie = zombie;
    this.#bullets = [];
  }

  update() {
    this.#zombie.move();
    this.#bullets.forEach((bullet) => {
      bullet.move(0);
    });
  }

  addBullet(bullet) {
    this.#bullets.push(bullet);
  }

  isOver(maxX) {
    return this.#zombie.hasReached(maxX);
  }

  visit(visitor) {
    this.#player.visit(visitor);
    this.#zombie.visit(visitor);
    this.#bullets.forEach((bullet) => {
      bullet.visit(visitor);
    });
  }
}

module.exports = { Game };
