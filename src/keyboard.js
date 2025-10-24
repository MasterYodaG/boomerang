const keypress = require('keypress');

function setupKeyboard(game) {
  const redraw = () => {
    // ограничим позицию героя в пределах поля
    game.hero.position = Math.max(0, Math.min(game.trackLength - 1, game.hero.position));
    game.regenerateTrack();
    game.view.render(game.track);
  };

  const keyboard = {
    // A / стрелка влево
    a: () => { game.hero.moveLeft(); redraw(); },
    left: () => { game.hero.moveLeft(); redraw(); },

    // D / стрелка вправо
    d: () => { game.hero.moveRight(); redraw(); },
    right: () => { game.hero.moveRight(); redraw(); },

    // Space — бросить бумеранг
    space: () => {
      if (game.hero.attack()) console.log('Бумеранг брошен!');
      else console.log('Бумеранг ещё в полёте!');
      redraw();
    },

    // Q — выход
    q: () => { console.log('Выход из игры...'); process.exit(); },

    // R — на будущее (перезапуск после gameOver)
    r: () => { /* опционально */ },
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (!key) return;
    if (keyboard[key.name]) keyboard[key.name]();
    if (key.ctrl && key.name === 'c') process.exit();
  });
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.resume();
}

module.exports = { setupKeyboard };