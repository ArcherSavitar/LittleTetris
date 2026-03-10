// 主入口文件
document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    window.game = new Game();

    // 获取按钮元素
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const endButton = document.getElementById('endButton');

    // 添加按钮事件监听器
    startButton.addEventListener('click', () => {
        if (!window.game.isStarted) {
            // 首次开始游戏
            window.game.start();

            // 隐藏开始按钮，显示暂停和结束按钮
            startButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
            endButton.classList.remove('hidden');

            pauseButton.textContent = '暂停游戏';
        } else if (window.game.gameOver) {
            // 游戏结束后重新开始
            window.game.restart();

            // 更新按钮文本
            pauseButton.textContent = '暂停游戏';
        } else if (window.game.isPaused) {
            // 如果游戏暂停，继续游戏
            window.game.togglePause();
            pauseButton.textContent = '暂停游戏';
        }
    });

    pauseButton.addEventListener('click', () => {
        if (window.game.isStarted && !window.game.gameOver) {
            window.game.togglePause();

            // 根据暂停状态更新按钮文本
            if (window.game.isPaused) {
                pauseButton.textContent = '继续游戏';
            } else {
                pauseButton.textContent = '暂停游戏';
            }
        }
    });

    endButton.addEventListener('click', () => {
        // 结束当前游戏
        window.game.endGame();

        // 显示开始按钮，隐藏暂停和结束按钮
        startButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
        endButton.classList.add('hidden');

        // 重置暂停按钮文本
        pauseButton.textContent = '暂停游戏';

        // 强制渲染以确保画面更新
        window.game.render();
    });

    // 提供重启游戏的功能
    window.restartGame = function() {
        if (window.game) {
            window.game.restart();
        }
    };
});
