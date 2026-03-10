// Game 类 - 游戏主控制器
class Game {
    constructor() {
        this.board = new Board();
        this.currentPiece = null;
        this.nextPiece = null;
        this.ui = new UI(this);
        this.isPaused = false;
        this.gameOver = false;
        this.isStarted = false; // 新增：游戏是否已经开始
        this.dropCounter = 0;
        this.lastTime = 0;
        this.dropInterval = this.board.getCurrentSpeed(); // 初始下降间隔

        // 初始化游戏状态
        this.init();
    }

    // 初始化游戏
    init() {
        // 游戏初始化，但暂不开始
        this.createNewPiece();
        this.createNewPiece(); // 生成下一个方块
        this.bindEvents();
    }

    // 开始游戏
    start() {
        if (!this.isStarted) {
            this.isStarted = true;
            this.gameOver = false;
            this.isPaused = false;
            this.gameLoop(0);
        } else if (this.gameOver) {
            // 如果游戏已经结束，重新开始
            this.restart();
        } else if (this.isPaused) {
            // 如果游戏暂停，继续游戏
            this.togglePause();
        }
    }

    // 绑定事件监听器
    bindEvents() {
        document.addEventListener('keydown', (event) => {
            if (!this.isStarted || this.gameOver) return;

            switch (event.keyCode) {
                case 37: // 左箭头键
                    if (!this.isPaused && this.currentPiece) {
                        this.currentPiece.moveLeft(this.board);
                    }
                    break;
                case 39: // 右箭头键
                    if (!this.isPaused && this.currentPiece) {
                        this.currentPiece.moveRight(this.board);
                    }
                    break;
                case 40: // 下箭头键
                    if (!this.isPaused && this.currentPiece) {
                        this.currentPiece.moveDown(this.board);
                    }
                    break;
                case 38: // 上箭头键
                    if (!this.isPaused && this.currentPiece) {
                        this.currentPiece.tryRotate(this.board);
                    }
                    break;
                case 32: // 空格键 - 硬降
                    if (!this.isPaused && this.currentPiece) {
                        const dropDistance = this.currentPiece.hardDrop(this.board);
                        // 硬降奖励分数
                        this.board.score += dropDistance * 2 * this.board.level;
                    }
                    break;
                case 80: // P键 - 暂停
                    this.togglePause();
                    break;
            }

            // 防止方向键滚动页面
            if ([37, 38, 39, 40].includes(event.keyCode)) {
                event.preventDefault();
            }
        });
    }

    // 创建新方块
    createNewPiece() {
        if (this.nextPiece) {
            this.currentPiece = this.nextPiece;
        } else {
            this.currentPiece = getRandomTetromino();
        }

        this.nextPiece = getRandomTetromino();

        // 检查游戏是否结束
        if (!this.board.isValidMove(this.currentPiece, 0, 0)) {
            this.gameOver = true;
        }
    }

    // 游戏主循环
    gameLoop(time = 0) {
        if (this.gameOver || !this.isStarted) {
            return;
        }

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        // 更新下降计数器
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.dropPiece();
        }

        // 渲染游戏画面
        this.render();

        // 请求下一帧
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    // 方块下降
    dropPiece() {
        if (!this.isPaused && !this.gameOver && this.currentPiece) {
            if (!this.currentPiece.moveDown(this.board)) {
                // 当方块无法再下降时，将其固定在游戏板上
                this.board.placeTetromino(this.currentPiece);

                // 检查并清除完整行
                const linesCleared = this.board.clearLines();

                // 创建新方块
                this.createNewPiece();

                // 更新下降间隔
                this.dropInterval = this.board.getCurrentSpeed();
            }

            this.dropCounter = 0; // 重置下降计数器
        }
    }

    // 渲染游戏
    render() {
        this.ui.render();

        if (this.gameOver && this.isStarted) {
            this.ui.renderGameOver();
        } else if (this.isPaused && this.isStarted) {
            this.ui.renderPause();
        }
    }

    // 切换暂停状态
    togglePause() {
        if (this.isStarted && !this.gameOver) {
            this.isPaused = !this.isPaused;
        }
    }

    // 结束游戏
    endGame() {
        this.isStarted = false;
        this.isPaused = false;
        this.gameOver = true;

        // 清空游戏区域到初始状态
        this.board.clear();
        this.currentPiece = null;
        this.nextPiece = null;
        this.dropCounter = 0;
        this.dropInterval = this.board.getCurrentSpeed();

        // 重新创建方块用于下次开始
        this.createNewPiece();
        this.createNewPiece();

        // 强制重新渲染以清空画面
        this.render();
    }

    // 重新开始游戏
    restart() {
        this.board = new Board();
        this.currentPiece = null;
        this.nextPiece = null;
        this.isPaused = false;
        this.gameOver = false;
        this.isStarted = true;
        this.dropCounter = 0;
        this.dropInterval = this.board.getCurrentSpeed();

        this.createNewPiece();
        this.createNewPiece();

        // 重新启动游戏循环
        this.gameLoop(0);
    }
}

// 启动游戏
let game;
window.onload = function() {
    game = new Game();
};