// UI 类 - 处理用户界面和渲染
class UI {
    constructor(game) {
        this.game = game;
        this.boardCanvas = document.getElementById('board');
        this.nextPieceCanvas = document.getElementById('nextPiece');
        this.boardCtx = this.boardCanvas.getContext('2d');
        this.nextPieceCtx = this.nextPieceCanvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');

        // 设置画布比例
        this.setCanvasScale();
    }

    // 设置画布比例
    setCanvasScale() {
        // 设置主游戏板画布大小
        this.boardCtx.scale(BLOCK_SIZE, BLOCK_SIZE);

        // 不再在这里设置 nextPiece 的缩放，而是在渲染时单独处理
    }

    // 渲染整个游戏画面
    render() {
        // 保存Canvas状态以避免累积变换
        this.boardCtx.save();

        // 重置变换矩阵以避免缩放累积问题
        this.boardCtx.setTransform(1, 0, 0, 1, 0, 0);

        // 使用适当的颜色清空画布
        this.boardCtx.fillStyle = '#fff'; // 白色背景
        this.boardCtx.fillRect(0, 0, this.boardCanvas.width, this.boardCanvas.height);

        // 重新应用缩放
        this.boardCtx.scale(BLOCK_SIZE, BLOCK_SIZE);

        // 渲染游戏板
        this.renderBoard();

        // 渲染当前方块
        if (this.game.currentPiece && this.game.isStarted) {
            this.renderTetromino(this.game.currentPiece, this.boardCtx, 0, 0);
        }

        // 恢复Canvas状态
        this.boardCtx.restore();

        // 渲染下一个方块（在单独的上下文中操作）
        this.renderNextPiece();

        // 更新UI元素
        this.updateUI();
    }

    // 渲染游戏板
    renderBoard() {
        for (let r = 0; r < this.game.board.height; r++) {
            for (let c = 0; c < this.game.board.width; c++) {
                if (this.game.board.grid[r][c]) {
                    this.boardCtx.fillStyle = COLORS[this.game.board.grid[r][c]];
                    this.boardCtx.fillRect(c, r, 1, 1);

                    // 添加边框效果
                    this.boardCtx.strokeStyle = '#000';
                    this.boardCtx.lineWidth = 0.05;
                    this.boardCtx.strokeRect(c, r, 1, 1);
                }
            }
        }
    }

    // 渲染指定的俄罗斯方块
    renderTetromino(tetromino, ctx, offsetX = 0, offsetY = 0) {
        for (let r = 0; r < tetromino.shape.length; r++) {
            for (let c = 0; c < tetromino.shape[r].length; c++) {
                if (tetromino.shape[r][c]) {
                    ctx.fillStyle = COLORS[tetromino.type];
                    ctx.fillRect(tetromino.col + c + offsetX, tetromino.row + r + offsetY, 1, 1);

                    // 添加边框效果
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 0.05;
                    ctx.strokeRect(tetromino.col + c + offsetX, tetromino.row + r + offsetY, 1, 1);
                }
            }
        }
    }

    // 渲染下一个方块
    renderNextPiece() {
        // 保存Canvas状态
        this.nextPieceCtx.save();

        // 重置变换以避免累积
        this.nextPieceCtx.setTransform(1, 0, 0, 1, 0, 0);

        // 清空下一个方块的画布
        this.nextPieceCtx.fillStyle = '#fff'; // 白色背景
        this.nextPieceCtx.fillRect(0, 0, this.nextPieceCanvas.width, this.nextPieceCanvas.height);

        if (this.game.nextPiece) {
            // 计算居中的偏移量
            // 根据方块实际尺寸计算适当的缩放比例，使方块在120x120的画布中适中显示
            const blockSize = 20; // 增大方块显示尺寸

            // 计算方块的宽高
            const pieceWidth = this.game.nextPiece.shape[0].length * blockSize;
            const pieceHeight = this.game.nextPiece.shape.length * blockSize;

            // 计算居中的偏移量
            const offsetX = (this.nextPieceCanvas.width - pieceWidth) / 2;
            const offsetY = (this.nextPieceCanvas.height - pieceHeight) / 2;

            // 渲染下一个方块
            for (let r = 0; r < this.game.nextPiece.shape.length; r++) {
                for (let c = 0; c < this.game.nextPiece.shape[r].length; c++) {
                    if (this.game.nextPiece.shape[r][c]) {
                        this.nextPieceCtx.fillStyle = COLORS[this.game.nextPiece.type];
                        this.nextPieceCtx.fillRect(
                            offsetX + c * blockSize,
                            offsetY + r * blockSize,
                            blockSize,
                            blockSize
                        );

                        // 添加边框效果
                        this.nextPieceCtx.strokeStyle = '#000';
                        this.nextPieceCtx.lineWidth = 1;
                        this.nextPieceCtx.strokeRect(
                            offsetX + c * blockSize,
                            offsetY + r * blockSize,
                            blockSize,
                            blockSize
                        );
                    }
                }
            }
        }

        // 恢复Canvas状态
        this.nextPieceCtx.restore();
    }

    // 更新UI元素
    updateUI() {
        this.scoreElement.textContent = this.game.board.score;
        this.levelElement.textContent = this.game.board.level;
        this.linesElement.textContent = this.game.board.lines;
    }

    // 渲染游戏结束画面
    renderGameOver() {
        // 在游戏板中央显示游戏结束文字
        this.boardCtx.save();
        this.boardCtx.setTransform(1, 0, 0, 1, 0, 0); // 重置变换
        this.boardCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.boardCtx.fillRect(
            this.boardCanvas.width / 2 - 50,
            this.boardCanvas.height / 2 - 15,
            100,
            30
        );

        this.boardCtx.font = '16px Arial';
        this.boardCtx.fillStyle = 'white';
        this.boardCtx.textAlign = 'center';
        this.boardCtx.textBaseline = 'middle';
        this.boardCtx.fillText('GAME OVER', this.boardCanvas.width / 2, this.boardCanvas.height / 2);
        this.boardCtx.restore();
    }

    // 渲染暂停画面
    renderPause() {
        // 在游戏板中央显示暂停文字
        this.boardCtx.save();
        this.boardCtx.setTransform(1, 0, 0, 1, 0, 0); // 重置变换
        this.boardCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.boardCtx.fillRect(
            this.boardCanvas.width / 2 - 40,
            this.boardCanvas.height / 2 - 15,
            80,
            30
        );

        this.boardCtx.font = '16px Arial';
        this.boardCtx.fillStyle = 'white';
        this.boardCtx.textAlign = 'center';
        this.boardCtx.textBaseline = 'middle';
        this.boardCtx.fillText('PAUSED', this.boardCanvas.width / 2, this.boardCanvas.height / 2);
        this.boardCtx.restore();
    }
}