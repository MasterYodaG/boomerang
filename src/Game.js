const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 1 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View(this);
    this.track = [];
    this.score = 0;
    this.gameOver = false;
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = (new Array(this.trackLength)).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    
    // Добавляем бумеранг на трек, если он летит
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
      if (this.hero.die()) {
        this.gameOver = true;
      }
    }
    
    // Проверка столкновения бумеранга с врагом
    if (this.hero.boomerang && this.hero.boomerang.isFlying && 
        this.hero.boomerang.position === this.enemy.position) {
      this.enemy.die();
      this.score += 10;
      // Создаем нового врага
      this.enemy = new Enemy();
    }
    
    // Проверка возврата бумеранга
    if (this.hero.boomerang && this.hero.boomerang.isReturning && 
        this.hero.boomerang.position === this.hero.position) {
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
      
      // Двигаем бумеранг, если он летит
      if (this.hero.boomerang && this.hero.boomerang.isFlying) {
        this.hero.boomerang.move();
      }
      
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 500);
  }
}

module.exports = Game;