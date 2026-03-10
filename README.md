# LittleTetris 俄罗斯方块游戏

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Canvas-blue?style=flat&logo=html5" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Style-orange?style=flat&logo=css3" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/MIT-License-green?style=flat" alt="License">
</p>

<p align="center">
  <strong>English</strong> | <a href="#中文">中文</a>
</p>

---

## English

### Overview

LittleTetris is a classic Tetris clone built with HTML5, CSS3, and vanilla JavaScript. It features a fully playable game with keyboard controls, scoring system, levels, and mobile touch support.

### Features

- **Classic Gameplay**: Authentic Tetris experience with 7 standard tetrominoes (I, O, T, S, Z, J, L)
- **Scoring System**: Points awarded based on lines cleared (100/300/500/800 × level)
- **Level Progression**: Level increases every 10 lines cleared, speeding up piece descent
- **Next Piece Preview**: See the upcoming piece in advance
- **Game Controls**: Pause/Resume/End game functionality
- **Mobile Support**: Touch controls with responsive design (320-440px width adaptation)
- **Collision Detection**: Accurate boundary and piece collision detection

### Controls

| Key | Action |
|-----|--------|
| ← → | Move piece left/right |
| ↑ | Rotate piece clockwise |
| ↓ | Soft drop (accelerate descent) |
| Space | Hard drop (instantly place at bottom) |
| P | Pause/Resume game |

**Mobile Touch Controls:**
- Direction buttons (64×64px) for left/right/rotate/soft drop
- Hard drop button (80×80px) in bottom-right corner

### Installation

No installation required! Simply open `index.html` in any modern web browser.

```bash
# Clone the repository
git clone https://github.com/yourusername/LittleTetris.git

# Open in browser
cd LittleTetris
open index.html
```

Or serve locally:

```bash
# Using Python
python -m http.server 8000
# Then visit http://localhost:8000

# Using Node.js
npx serve .
# Then visit http://localhost:3000
```

### File Structure

```
LittleTetris/
├── index.html              # Main HTML entry point
├── LICENSE                # MIT License
├── README.md              # This file
├── CHANGELOG.md           # Version changelog
├── DESIGN_DOC.md          # Design documentation
├── css/
│   └── style.css          # Main stylesheet
└── js/
    ├── main.js            # JavaScript entry point
    ├── core/
    │   ├── Game.js       # Main game controller
    │   ├── Board.js      # Game board management
    │   └── Tetromino.js  # Tetromino entity
    ├── ui/
    │   └── UI.js         # User interface rendering
    └── utils/
        └── constants.js   # Game constants
```

### Scoring Rules

| Lines Cleared | Points |
|---------------|--------|
| 1 line | 100 × level |
| 2 lines | 300 × level |
| 3 lines | 500 × level |
| 4 lines (Tetris) | 800 × level |
| Hard drop | 2 × distance × level |

### Level System

- Level increases every 10 lines cleared
- Higher levels = faster piece descent
- Maximum 20 levels

### Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

### Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

- Author: LittleTetris Team
- GitHub: [https://github.com/yourusername/LittleTetris](https://github.com/yourusername/LittleTetris)
- Issues: [https://github.com/yourusername/LittleTetris/issues](https://github.com/yourusername/LittleTetris/issues)

---

## 中文

### 项目简介

LittleTetris 是一个使用 HTML5、CSS3 和原生 JavaScript 实现的经典俄罗斯方块游戏。支持完整的游戏玩法、键盘控制、计分系统、等级系统以及移动端触控操作。

### 功能特性

- **经典玩法**: 7 种标准俄罗斯方块 (I, O, T, S, Z, J, L)
- **计分系统**: 根据消除行数计分 (100/300/500/800 × 等级)
- **等级系统**: 每消除 10 行升一级，方块下落速度加快
- **下一个方块预览**: 提前查看下一个出现的方块
- **游戏控制**: 开始/暂停/继续/结束游戏功能
- **移动端支持**: 触控操作，响应式布局 (320-440px 宽度自适应)
- **碰撞检测**: 精准的边界和方块碰撞检测

### 控制方式

| 按键 | 功能 |
|------|------|
| ← → | 左右移动方块 |
| ↑ | 顺时针旋转方块 |
| ↓ | 软降 (加速下落) |
| 空格 | 硬降 (立即落到底部) |
| P | 暂停/继续游戏 |

**移动端触控:**
- 方向键 (64×64px) - 左/右/旋转/软降
- 硬降键 (80×80px) - 位于右下角

### 安装与运行

无需安装！直接在现代浏览器中打开 `index.html` 即可运行。

```bash
# 克隆仓库
git clone https://github.com/yourusername/LittleTetris.git

# 进入目录并用浏览器打开
cd LittleTetris
open index.html
```

或使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000
# 访问 http://localhost:8000

# 使用 Node.js
npx serve .
# 访问 http://localhost:3000
```

### 文件结构

```
LittleTetris/
├── index.html              # 主 HTML 入口
├── LICENSE                # MIT 许可证
├── README.md              # 说明文档
├── CHANGELOG.md           # 版本更新日志
├── DESIGN_DOC.md          # 设计文档
├── css/
│   └── style.css          # 样式表
└── js/
    ├── main.js            # JavaScript 入口
    ├── core/
    │   ├── Game.js       # 游戏主控制器
    │   ├── Board.js      # 游戏板管理
    │   └── Tetromino.js  # 俄罗斯方块实体
    ├── ui/
    │   └── UI.js         # 用户界面渲染
    └── utils/
        └── constants.js   # 游戏常量配置
```

### 得分规则

| 消除行数 | 得分 |
|----------|------|
| 1 行 | 100 × 等级 |
| 2 行 | 300 × 等级 |
| 3 行 | 500 × 等级 |
| 4 行 (Tetris) | 800 × 等级 |
| 硬降 | 2 × 距离 × 等级 |

### 等级系统

- 每累计消除 10 行升一级
- 等级越高，方块下落速度越快
- 最高 20 级

### 浏览器兼容性

| 浏览器 | 版本 |
|--------|------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

### API 文档

#### 全局函数

| 函数 | 描述 |
|------|------|
| `calculateResponsiveParams()` | 计算响应式布局参数 (缩放比例、画布尺寸等) |
| `isTouchDevice()` | 检测是否为触屏设备 |

#### Game 类

| 方法 | 描述 |
|------|------|
| `start()` | 开始游戏 |
| `restart()` | 重新开始游戏 |
| `togglePause()` | 切换暂停状态 |
| `endGame()` | 结束游戏 |
| `dropPiece()` | 方块自动下落 |

#### Board 类

| 方法 | 描述 |
|------|------|
| `isValidMove(tetromino, deltaRow, deltaCol)` | 检查移动是否合法 |
| `placeTetromino(tetromino)` | 将方块放置到棋盘 |
| `clearLines()` | 清除满行并返回消除行数 |
| `getCurrentSpeed()` | 获取当前等级的下落速度 |

#### Tetromino 类

| 方法 | 描述 |
|------|------|
| `moveLeft(board)` | 向左移动 |
| `moveRight(board)` | 向右移动 |
| `moveDown(board)` | 向下移动 |
| `tryRotate(board)` | 尝试旋转 |
| `hardDrop(board)` | 硬降并返回下落距离 |

### 贡献指南

欢迎贡献代码！请在提交 PR 前阅读贡献指南。

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

### 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 联系方式

- 作者: LittleTetris Team
- GitHub: [https://github.com/yourusername/LittleTetris](https://github.com/yourusername/LittleTetris)
- 问题反馈: [https://github.com/yourusername/LittleTetris/issues](https://github.com/yourusername/LittleTetris/issues)

---

<p align="center">
  Made with ❤️ by LittleTetris Team
</p>
