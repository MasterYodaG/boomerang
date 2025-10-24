// класс для отображения игры в консоли
const cfonts = require('cfonts');

class View {
  constructor(game) {
    this.game = game;
    this.isFirstRender = true;
  }

  render(track) {
    const yourTeamName = 'Elbrus';

    //
    // console.clear();
    process.stdout.write('\x1Bc');
    process.stdout.write('\x1b[H');

    // Заголовок игры
    // console.log('🌀═══════════════════════════════════════════════🌀');
    // console.log('               BOOMERANG GAME');
    // console.log('🌀═══════════════════════════════════════════════🌀');
    // console.log('');

    cfonts.say('BOOMERANG GAME', {
      font: 'block',
      align: 'left',
      gradient: ['yellow', 'green'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
      independentGradient: false,
      transitionGradient: false,
      rawMode: false,
      env: 'node',
    });

    // Отрисовка трека с границами
    const trackLine = track.map((cell) => (cell === ' ' ? ' ' : cell)).join('');
    const width = track.length;
    console.log('┌' + '─'.repeat(width) + '┐');
    // основная линия (там где герой и враги)
    console.log('│' + trackLine + '│' + '<- это дверь :)');
    // добавляем ещё 4 пустые линии под полем
    for (let i = 0; i < 3; i++) {
      console.log('│' + ' '.repeat(width) + '│');
    }
    // низ рамки
    console.log('└' + '─'.repeat(width) + '┘');

    // Статистика игры
    console.log('\n❤️  Жизни:', this.game.hero.lives);
    console.log('🎯 Счёт:', this.game.score || 0);

    // Управление
    // console.log('\n Управление:');
    cfonts.say('Controls:', {
      font: 'console',
      align: 'left',
      gradient: ['yellow', 'green'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
    });
    console.log('🎮 A/D - Влево/Вправо');
    console.log('🎮 Space - Бросить бумеранг');
    console.log('🎮 Q - Выйти из игры');

    // Сообщение о конце игры
    if (this.game.gameOver) {
      console.log('\n💀 GAME OVER! 💀');
      console.log('Нажмите R для перезапуска');
    }

    // console.log(`\nCreated by "${yourTeamName}" with love`);
    cfonts.say(`\nCreated by "${yourTeamName}" with love`, {
      font: 'console',
      align: 'left',
      gradient: ['yellow', 'green'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
    });
  }
}

module.exports = View;
