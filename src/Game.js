const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1 });
    this.enemy = new Enemy();
    this.view = new View(this);
    this.track = [];
    this.score = 0;
    this.gameOver = false;
    this.regenerateTrack();
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;

    if (this.hero.boomerang && this.hero.boomerang.isFlying) {
      const boomerangPos = this.hero.boomerang.position;
      if (boomerangPos >= 0 && boomerangPos < this.trackLength) {
        this.track[boomerangPos] = this.hero.boomerang.skin;
      }
    }
  }

  check() {
    // Проверка столкновения героя с врагом
    if (this.hero.position === this.enemy.position) {
      this.hero.lives -= 1;

      // Респавним врага
      this.enemy.respawn();

      if (this.hero.lives <= 0) {
        this.hero.die();
        this.gameOver = true;
      }
    }

    // Проверка столкновения бумеранга с врагом
    if (
      this.hero.boomerang &&
      this.hero.boomerang.isFlying &&
      this.hero.boomerang.position === this.enemy.position &&
      this.hero.boomerang.position === this.enemy.position
    ) {
      this.enemy.die();
      this.score += 10;

      // Правильно сбрасываем бумеранг
      this.hero.boomerang.isFlying = false;
      this.hero.boomerang.isReturning = false;
      this.hero.boomerang.position = this.hero.position;

      // Создаем нового врага
      this.enemy = new Enemy();
    }

    // Проверка возврата бумеранга
    if (
      this.hero.boomerang &&
      this.hero.boomerang.isReturning &&
      this.hero.boomerang.position === this.hero.position
    ) {
      this.hero.boomerang.isFlying = false;
      this.hero.boomerang.isReturning = false;
    }
  }

  play() {
    setInterval(() => {
      if (this.gameOver) {
        return;
      }

      // Двигаем врага
      this.enemy.move();

      // Если враг вышел за границы, респавним
      if (this.enemy.position < 0) {
        this.enemy.respawn();
      }

      // Двигаем бумеранг, если он летит
      if (this.hero.boomerang && this.hero.boomerang.isFlying) {
        this.hero.boomerang.move();
      }

      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 500);
  }

  restart() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }

    this.hero = new Hero({ position: 1 });
    this.enemy = new Enemy();
    this.score = 0;
    this.gameOver = false;

    this.regenerateTrack();
    this.view.render(this.track);
  }
}

module.exports = Game;
