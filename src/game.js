class Game {
  #zombies;
  #player;
  #bullets;
  constructor(player) {
    this.#player = player;
    this.#zombies = [];
    this.#bullets = [];
  }

  #killZombie() {
    this.#bullets.forEach((bullet, bulletIndex) => {
      const bulletPosition = bullet.getPosition();
      this.#zombies.forEach((zombie, zombieIndex) => {
        if (bulletPosition.equals(zombie.getPosition())) {
          this.#zombies.splice(zombieIndex, 1);
          this.#bullets.splice(bulletIndex, 1);
        }
      });
    });
  }

  update() {
    this.#killZombie();
    this.#zombies.forEach((zombie) => {
      zombie.move();
    });
    this.#killZombie();
    this.#bullets.forEach((bullet) => {
      bullet.move(0);
    });
  }

  addZombie(zombie) {
    this.#zombies.push(zombie);
  }

  addBullet(bullet) {
    this.#bullets.push(bullet);
  }

  isOver(maxX) {
    return this.#zombies.some((zombie) => {
      return zombie.hasReached(maxX);
    });
  }

  visit(visitor) {
    this.#player.visit(visitor);
    this.#zombies.forEach((zombie) => {
      zombie.visit(visitor);
    });
    this.#bullets.forEach((bullet) => {
      bullet.visit(visitor);
    });
  }
}

module.exports = { Game };
