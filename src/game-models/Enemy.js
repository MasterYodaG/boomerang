// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 25; // Начинаем с конца трека
    this.speed = 1;
    this.isAlive = true;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  move() {
    if (this.isAlive) {
      // Идём влево с заданной скоростью
      this.position -= this.speed;
      
      // Если враг дошел до начала, респавним в конце
      if (this.position < 0) {
        this.position = 25;
      }
    }
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  respawn() {
    this.position = 25;
    this.generateSkin();
    }

  die() {
    if (!this.isAlive) return; // добавил "защиту" и теперь при убийстве врага добавляются очки
    this.isAlive = false;
    this.skin = '💀';
    console.log('Enemy is dead! +10 points');
  }
}

module.exports = Enemy;