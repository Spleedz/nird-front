import { GAME_CONFIG, CELL_SIZE } from "../constants/gameConstants";

export const getGameDimensions = () => {
  const maxWidth = Math.min(
    window.innerWidth * GAME_CONFIG.MAX_WIDTH_RATIO,
    GAME_CONFIG.MAX_WIDTH
  );
  const maxHeight = Math.min(
    window.innerHeight * GAME_CONFIG.MAX_HEIGHT_RATIO,
    GAME_CONFIG.MAX_HEIGHT
  );
  return {
    width: Math.floor(maxWidth / CELL_SIZE) * CELL_SIZE,
    height: Math.floor(maxHeight / CELL_SIZE) * CELL_SIZE,
    cell: CELL_SIZE,
  };
};

export const getRandomFood = (width, height, cell) => {
  return {
    x: Math.floor(Math.random() * (width / cell)) * cell,
    y: Math.floor(Math.random() * (height / cell)) * cell,
  };
};

export const shouldInvertControls = (score) => {
  const cyclePosition = score % GAME_CONFIG.INVERT_CYCLE;
  return (
    cyclePosition >= GAME_CONFIG.INVERT_START &&
    cyclePosition < GAME_CONFIG.INVERT_END
  );
};

export const invertKey = (key) => {
  const keyMap = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft",
  };
  return keyMap[key] || key;
};

export const generateObstacles = (width, height, cell, count, obstacleSize) => {
  const obstacles = [];
  const centerX = Math.floor(width / 2 / cell) * cell;
  const centerY = Math.floor(height / 2 / cell) * cell;

  for (let i = 0; i < count; i++) {
    let x, y;
    let attempts = 0;

    do {
      x = Math.floor(Math.random() * ((width - obstacleSize) / cell)) * cell;
      y = Math.floor(Math.random() * ((height - obstacleSize) / cell)) * cell;
      attempts++;

      // Éviter le centre (zone de spawn du serpent)
      const tooClose = Math.abs(x - centerX) < obstacleSize * 2 &&
                      Math.abs(y - centerY) < obstacleSize * 2;

      // Éviter les chevauchements avec d'autres obstacles
      const overlaps = obstacles.some(obs =>
        Math.abs(obs.x - x) < obstacleSize + cell &&
        Math.abs(obs.y - y) < obstacleSize + cell
      );

      if (!tooClose && !overlaps) {
        break;
      }
    } while (attempts < 100);

    if (attempts < 100) {
      obstacles.push({ x, y, width: obstacleSize, height: obstacleSize });
    }
  }

  return obstacles;
};

export const checkObstacleCollision = (head, obstacles) => {
  return obstacles.some(obstacle => {
    return (
      head.x >= obstacle.x &&
      head.x < obstacle.x + obstacle.width &&
      head.y >= obstacle.y &&
      head.y < obstacle.y + obstacle.height
    );
  });
};
