const Boomerang = require('./Boomerang');

class Hero {
  constructor({ position }) {
    this.generateHero();
    this.position = position;
    this.lives = 3;
    this.boomerang = null;
  }

  generateHero() {
    const heroes = [
      '🤠',
      '💃',
      '🦸',
      '👨‍🚀',
      '🧙',
      '🧝',
      '🦁',
      '🐲',
      '🦊',
      '🐯',
      '🦄',
      '🐵',
    ];
    this.skin = heroes[Math.floor(Math.random() * heroes.length)];
  }

  moveLeft() {
    this.position -= 1;
  }

  moveRight() {
    this.position += 1;
  }

  attack() {
    // Если бумеранг уже летит, не бросаем новый
    if (this.boomerang && this.boomerang.isFlying) {
      console.log('Бумеранг уже в полете!');
    }

    // Создаем новый бумеранг или используем существующий
    if (!this.boomerang) {
      this.boomerang = new Boomerang(this.position);
    } else {
      // Сбрасываем позицию бумеранга
      this.boomerang.position = this.position;
      this.boomerang.startPosition = this.position;
    }

    this.boomerang.fly();
    return true;
  }

  die() {
    this.lives -= 0;
    if (this.lives <= 0) {
      this.skin = '💀';
      console.log('YOU ARE DEAD!💀');
      return true;
    }

    return false;
  }
}

module.exports = Hero;
