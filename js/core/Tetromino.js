// Tetromino 类 - 代表单个俄罗斯方块
class Tetromino {
    constructor(type) {
        this.type = type;
        this.color = COLORS[type];
        this.shape = SHAPES[type];
        this.row = 0;
        this.col = Math.floor(BOARD_WIDTH / 2) - Math.floor(this.shape[0].length / 2);
        this.rotation = 0;
    }

    // 旋转方块
    rotate() {
        // 矩阵转置并翻转实现顺时针旋转
        const newShape = [];
        for (let c = 0; c < this.shape[0].length; c++) {
            const newRow = [];
            for (let r = this.shape.length - 1; r >= 0; r--) {
                newRow.push(this.shape[r][c]);
            }
            newShape.push(newRow);
        }
        return newShape;
    }

    // 尝试旋转，如果失败则返回原形状
    tryRotate(board) {
        const originalShape = this.shape;
        this.shape = this.rotate();

        // 检查旋转后是否与其他方块或边界冲突
        if (!board.isValidMove(this, 0, 0)) {
            // 如果旋转导致冲突，恢复原始形状
            this.shape = originalShape;
            return false;
        }
        return true;
    }

    // 向左移动
    moveLeft(board) {
        if (board.isValidMove(this, 0, -1)) {
            this.col--;
            return true;
        }
        return false;
    }

    // 向右移动
    moveRight(board) {
        if (board.isValidMove(this, 0, 1)) {
            this.col++;
            return true;
        }
        return false;
    }

    // 向下移动
    moveDown(board) {
        if (board.isValidMove(this, 1, 0)) {
            this.row++;
            return true;
        }
        return false;
    }

    // 瞬间下降到底部
    hardDrop(board) {
        let dropDistance = 0;
        while (board.isValidMove(this, 1, 0)) {
            this.row++;
            dropDistance++;
        }
        return dropDistance;
    }

    // 获取当前占用的坐标位置
    getPositions() {
        const positions = [];
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    positions.push({
                        row: this.row + r,
                        col: this.col + c
                    });
                }
            }
        }
        return positions;
    }
}

// 生成随机俄罗斯方块
function getRandomTetromino() {
    const type = Math.floor(Math.random() * 7) + 1;
    return new Tetromino(type);
}