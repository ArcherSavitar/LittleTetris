// 游戏常量定义
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30; // 每个小方块的像素大小

// 俄罗斯方块颜色定义
const COLORS = [
    null,
    '#FF0D72', // I - 红色
    '#0DC2FF', // J - 蓝色
    '#0DFF72', // L - 绿色
    '#F538FF', // O - 紫红色
    '#FF8E0D', // S - 橙色
    '#FFE138', // T - 黄色
    '#3877FF'  // Z - 蓝色
];

// 俄罗斯方块形状定义
const SHAPES = [
    null,
    // I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // J
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    // L
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    // O
    [
        [4, 4],
        [4, 4]
    ],
    // S
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    // T
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    // Z
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
];

// 游戏速度设置 (每级下降间隔，毫秒)
const LEVEL_SPEED = [
    1000, 920, 840, 760, 680, 600, 520, 440, 360, 280,
    200, 160, 120, 80, 40, 20, 10, 5, 0, 0
];

// 响应式参数计算函数
function calculateResponsiveParams() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let scale = 1;

    // 320-440px 区间自动缩放
    if (viewportWidth <= 440) {
        scale = Math.max(0.6, (viewportWidth - 20) / 320);
    }

    // 横屏特殊处理 (宽度大于高度且在移动设备范围)
    if (viewportWidth > viewportHeight && viewportWidth <= 896) {
        scale = Math.max(0.5, (viewportHeight - 140) / 600);
    }

    // 桌面端但窗口较小
    if (viewportWidth > 440 && viewportWidth < 768) {
        scale = Math.max(0.8, (viewportWidth - 20) / 400);
    }

    return {
        scale: scale,
        blockSize: Math.floor(30 * scale),
        boardWidth: Math.floor(300 * scale),
        boardHeight: Math.floor(600 * scale),
        nextPieceSize: Math.floor(120 * scale)
    };
}

// 检测是否为移动设备/触屏设备
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}