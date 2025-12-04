// Configuration du jeu Snake

export const CELL_SIZE = 20;

export const DIFFICULTY_MODES = {
  BASIC: {
    name: "Basique",
    description: "Mode classique sans obstacles ni contrôles inversés",
    normalSpeed: 80,
    invertedSpeed: 80,
    hasObstacles: false,
    hasInvertedControls: false,
    icon: "😊",
    color: "linear-gradient(135deg, #00ff88, #00cc66)"
  },
  NORMAL: {
    name: "Normal",
    description: "Contrôles inversés tous les 10 points (ralentit en mode inversé)",
    normalSpeed: 80,
    invertedSpeed: 120,
    hasObstacles: false,
    hasInvertedControls: true,
    icon: "🎮",
    color: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  OBSTACLES: {
    name: "Obstacles",
    description: "Des obstacles apparaissent sur le terrain, sans contrôles inversés",
    normalSpeed: 80,
    invertedSpeed: 80,
    hasObstacles: true,
    hasInvertedControls: false,
    icon: "🧱",
    color: "linear-gradient(135deg, #f093fb, #f5576c)"
  },
  EXTREME: {
    name: "Extrême",
    description: "Obstacles + Contrôles inversés tous les 10 points (sans ralentissement)",
    normalSpeed: 80,
    invertedSpeed: 80,
    hasObstacles: true,
    hasInvertedControls: true,
    icon: "😈",
    color: "linear-gradient(135deg, #ff6b6b, #cc0000)"
  }
};

export const GAME_CONFIG = {
  // Cycle des contrôles inversés
  INVERT_CYCLE: 30,        // Cycle complet de 30 points
  INVERT_START: 10,        // Commence à 10 points
  INVERT_END: 20,          // Termine à 20 points

  // Dimensions
  MAX_WIDTH_RATIO: 0.9,
  MAX_HEIGHT_RATIO: 0.7,
  MAX_WIDTH: 600,
  MAX_HEIGHT: 400,

  // Obstacles
  OBSTACLE_COUNT: 8,       // Nombre d'obstacles sur le terrain
  OBSTACLE_SIZE: 40,       // Taille d'un obstacle (2x2 cellules)
};

export const COLORS = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  snakeHead: "linear-gradient(135deg, #ff69b4, #ff1493)",
  snakeBody: "#ff69b4",
  food: "radial-gradient(circle, #ff4444, #cc0000)",
  gameBoard: "#1a1a2e",
  border: "white",
  obstacle: "#8b4513",
  obstacleBorder: "#654321",
};
