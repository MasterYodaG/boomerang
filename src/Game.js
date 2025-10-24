const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');
const { Score } = require('../db/models');

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1 });
    this.enemy = new Enemy();
    this.view = new View(this);
    this.track = [];
    this.score = 0;
    this.gameInterval = null;
    this.gameOver = false;
    this.gameInterval = null; // Добавил инициализацию
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
      this.hero.boomerang.position === this.enemy.position
    ) {
      this.enemy.die();
      this.score += 10;

      // БУМЕРАНГ НАЧИНАЕТ ВОЗВРАЩАТЬСЯ, А НЕ СРАЗУ ИСЧЕЗАЕТ
      this.hero.boomerang.isReturning = true;
      this.hero.boomerang.direction = -1; // Меняем направление на обратное

      // Создаем нового врага
      this.enemy = new Enemy();
    }

    // Проверка возврата бумеранга к герою
    if (
      this.hero.boomerang &&
      this.hero.boomerang.isReturning &&
      this.hero.boomerang.position === this.hero.position
    ) {
      // Бумеранг полностью возвращен
      this.hero.boomerang.isFlying = false;
      this.hero.boomerang.isReturning = false;
      this.hero.boomerang.position = this.hero.position;
    }

    // Автоматический возврат бумеранга при достижении конца трека
    if (
      this.hero.boomerang &&
      this.hero.boomerang.isFlying &&
      !this.hero.boomerang.isReturning &&
      this.hero.boomerang.position >= this.trackLength - 1
    ) {
      this.hero.boomerang.isReturning = true;
      this.hero.boomerang.direction = -1;
    }
  }

  play() {
    this.gameInterval = setInterval(() => { // Сохраняем ID интервала
      if (this.gameOver) {
        clearInterval(this.gameInterval);
        await Score.create({ player: 'Сова', score: this.score });
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
    }, 250);
  }

  // Метод для остановки игры при Game Over
  stopGame() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
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