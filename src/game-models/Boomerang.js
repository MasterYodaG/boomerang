// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor(startPosition) {
    this.skin = '🌀';
    this.position = startPosition;
    this.startPosition = startPosition;
    this.isFlying = false;
    this.isReturning = false;
    this.maxDistance = 20; // Максимальная дистанция полета
  }

  fly() {
    this.isFlying = true;
  }

  move() {
    if (this.isFlying && !this.isReturning) {
      // Летим вправо
      this.moveRight();
      if (this.position - this.startPosition >= this.maxDistance) {
        this.isReturning = true; // Начинаем возвращаться
      }
    } else if (this.isReturning) {
      // Возвращаемся назад
      this.moveLeft();
      if (this.position <= this.startPosition) {
        // Вернулись к герою
        this.isFlying = false;
        this.isReturning = false;
      }
    }
  }

  moveLeft() {
    // Идём влево
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо
    this.position += 1;
  }
}

module.exports = Boomerang;