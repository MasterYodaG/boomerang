// Наш герой

class Hero {
  constructor({ position }) {
    this.skin = '🤠'; // можем использовать любые emoji '💃'
    this.position = position;
    this.lives = 3;          // Количество жизней
    this.boomerang = null;   // Оружие
  }

  moveLeft() {
    // Идём влево
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо
    this.position += 1;
  }

  attack() {
    // Атакуем
    if (!this.boomerang) {
      const Boomerang = require('./Boomerang');
      this.boomerang = new Boomerang(this.position);
    }
    this.boomerang.fly();
  }

  // умераем
  die() {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.skin = '💀';
      console.log('YOU ARE DEAD!💀');
      return true; // Герой умер
    }
    return false; // У героя еще есть жизни
  }
}

module.exports = Hero;
