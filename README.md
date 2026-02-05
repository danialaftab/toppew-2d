# TopPew 2D

A classic arcade-style shooter game built with [Phaser 3](https://phaser.io/). This is a weekend project designed to be a fun, lightweight browser game.

## 🚀 Live Demo

Play the game here: **[https://aero-game-iota.vercel.app/](https://aero-game-iota.vercel.app/)**

## 🎮 Features

- **Classic Arcade Action**: Vertical scrolling shooter gameplay inspired by retro classics.
- **Multiple Enemies**: Face off against different enemy types including Fighter Jets and Bombers.
- **Combat Systems**:
    - **Machine Gun**: Unlimited rapid-fire capability.
    - **Homing Missiles**: Lock onto the closest enemy for guaranteed hits.
- **Controls**:
    - **Desktop**: Keyboard arrows to move, Space to shoot.
    - **Mobile/Touch**: On-screen virtual buttons for movement (Left/Right) and firing (Fire/Missile).
- **Game Loop**: Infinite enemy waves, score tracking, and a high-stakes 3-life system.

## 🛠️ Built With

- **Phaser 3**: The versatile HTML5 game framework.
- **JavaScript (ES6+)**: Core logic and game mechanics.
- **Node.js**: Development environment.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danialaftab/aero-game.git
   cd aero-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run dev
```

This will launch the game in your default browser, typically at `http://127.0.0.1:8080`.

## 🚀 Deployment

The game is static and client-side only, making it easy to deploy to any static site hosting service (Vercel, Netlify, GitHub Pages, etc.).

**Vercel Deployment Example:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run the deploy command in the project root: `vercel`
3. Follow the prompts to deploy to production.

## 🛡️ Security

This project has been scanned for common vulnerabilities and checked for hardcoded secrets. It is designed to be safe for public deployment.

## 📄 License

This project is licensed under the ISC License.
