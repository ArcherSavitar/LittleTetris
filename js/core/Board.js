// Board 类 - 代表游戏板
class Board {
    constructor(width, height) {
        this.width = width || BOARD_WIDTH;
        this.height = height || BOARD_HEIGHT;
        this.grid = this.createGrid();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.clearedLines = 0; // 用于计算升级
    }

    // 创建空的游戏网格
    createGrid() {
        return Array(this.height).fill().map(() => Array(this.width).fill(0));
    }

    // 清空游戏板
    clear() {
        this.grid = this.createGrid();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.clearedLines = 0;
    }

    // 检查移动是否有效
    isValidMove(tetromino, deltaRow, deltaCol) {
        const newPositions = [];

        for (let r = 0; r < tetromino.shape.length; r++) {
            for (let c = 0; c < tetromino.shape[r].length; c++) {
                if (tetromino.shape[r][c]) {
                    const newRow = tetromino.row + r + deltaRow;
                    const newCol = tetromino.col + c + deltaCol;

                    // 检查边界
                    if (
                        newCol < 0 ||
                        newCol >= this.width ||
                        newRow >= this.height
                    ) {
                        return false;
                    }

                    // 检查是否与已有方块重叠
                    if (newRow >= 0 && this.grid[newRow][newCol]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    // 将方块固定在游戏板上
    placeTetromino(tetromino) {
        for (let r = 0; r < tetromino.shape.length; r++) {
            for (let c = 0; c < tetromino.shape[r].length; c++) {
                if (tetromino.shape[r][c]) {
                    const row = tetromino.row + r;
                    const col = tetromino.col + c;

                    // 只有当方块在游戏区域内才放置
                    if (row >= 0) {
                        this.grid[row][col] = tetromino.type;
                    } else {
                        // 如果方块在顶部区域就已经重叠，表示游戏结束
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // 检查并清除完整行
    clearLines() {
        let linesCleared = 0;

        for (let r = this.height - 1; r >= 0; r--) {
            // 检查这一行是否填满
            if (this.grid[r].every(cell => cell !== 0)) {
                // 移除这一行
                this.grid.splice(r, 1);
                // 在顶部添加新的空行
                this.grid.unshift(Array(this.width).fill(0));
                linesCleared++;

                // 因为我们移除了这一行，所以需要重新检查同一索引的行
                r++;
            }
        }

        if (linesCleared > 0) {
            // 更新分数
            this.updateScore(linesCleared);

            // 更新清除的总行数
            this.clearedLines += linesCleared;

            // 每清除10行升一级
            this.level = Math.floor(this.clearedLines / 10) + 1;

            // 确保级别不超过最大值
            this.level = Math.min(this.level, LEVEL_SPEED.length);
        }

        return linesCleared;
    }

    // 更新分数
    updateScore(linesCleared) {
        // 根据一次清除的行数计算分数
        let points = 0;
        switch (linesCleared) {
            case 1:
                points = 100;
                break;
            case 2:
                points = 300;
                break;
            case 3:
                points = 500;
                break;
            case 4:
                points = 800; // Tetris!
                break;
            default:
                points = linesCleared * 100;
        }

        this.score += points * this.level;
        this.lines += linesCleared;
    }

    // 获取当前等级对应的下降速度
    getCurrentSpeed() {
        const levelIndex = Math.min(this.level - 1, LEVEL_SPEED.length - 1);
        return LEVEL_SPEED[levelIndex];
    }

    // 检查游戏是否结束
    isGameOver() {
        // 如果新方块在初始位置就与其他方块冲突，则游戏结束
        // 这通常发生在顶部区域
        for (let r = 0; r < 2; r++) { // 检查前两行
            for (let c = 0; c < this.width; c++) {
                if (this.grid[r][c] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}