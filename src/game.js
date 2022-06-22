const { Bullet } = require('./bullet.js');
const { Zombie } = require('./zombie.js');
const { Position } = require('./position.js');
const { stdout } = require('process');

class Game {
  #zombies;
  #player;
  #bullets;
  #maxX;
  #maxY;
  constructor(player, maxX, maxY) {
    this.#player = player;
    this.#maxX = maxX;
    this.#maxY = maxY;
    this.#zombies = [];
    this.#bullets = [];
  }

  play(duration) {
    if (duration === 0) {
      this.addZombie(createZombie(this.#maxY));
    }
    this.visit(erase);
    this.update();
    this.visit(animate);
    if (this.isOver(this.#maxX - 10)) {
      console.clear();
      console.log('Game Over');
      process.exit(1);
    }
  }

  #killZombie() {
    this.#bullets.forEach((bullet, bulletIndex) => {
      const bulletPosition = bullet.getPosition();
      this.#zombies.forEach((zombie, zombieIndex) => {
        if (bulletPosition.equals(zombie.getPosition())) {
          this.#removeZombie(zombieIndex);
          this.#removeBullet(bulletIndex);
        }
      });
    });
  }

  #removeZombie(index) {
    this.#zombies.splice(index, 1);
  }

  #removeBullet(index) {
    this.#bullets.splice(index, 1);
  }

  update() {
    this.#killZombie();
    this.#zombies.forEach((zombie) => {
      zombie.move();
    });
    this.#killZombie();
    this.#bullets.forEach((bullet, index) => {
      bullet.move(0);
      if (bullet.isOutOfRange(0)) {
        this.#removeBullet(index);
      }
    });
  }

  addZombie(zombie) {
    this.#zombies.push(zombie);
  }

  #addBullet(bullet) {
    this.#bullets.push(bullet);
  }

  isOver(maxX) {
    return this.#zombies.some((zombie) => {
      return zombie.hasReached(maxX);
    });
  }

  operate(value) {
    this.#player.visit(erase);
    if (value === 119) {
      this.#player.moveUp(0);
    }
    if (value === 115) {
      this.#player.moveDown(this.#maxY);
    }
    if (value === 13) {
      this.#addBullet(this.#player.visit(createBullet));
    }
    if (value === 113) {
      console.clear();
      process.exit(1);
    }
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

const createBullet = (position) => {
  const bulletPos = position.translate(-1, 0);
  return new Bullet(bulletPos);
};

const erase = (position, icon) => {
  position.visit((x, y) => stdout.cursorTo(x, y));
  stdout.write(' '.repeat(icon.length));
};

const animate = (position, icon) => {
  position.visit((x, y) => stdout.cursorTo(x, y));
  stdout.write(icon);
};

const createZombie = (maxY) => {
  const position = new Position(0, Math.ceil(Math.random() * (maxY - 1)));
  return new Zombie(position);
};

module.exports = { Game };
