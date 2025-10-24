// Запускает игру
const Game = require('./src/Game');
const { setupKeyboard } = require('./src/keyboard');

// Инициализация игры с настройками
const game = new Game({
  trackLength: 30,
});

// Настройка управления клавиатурой
setupKeyboard(game);

// Запуск игры
game.play();