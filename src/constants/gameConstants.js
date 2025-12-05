// Configuration du jeu Snake – version améliorée (graphismes premium)

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
    color: "linear-gradient(135deg, #00ffa3, #00cc88)" // Neon soft green
  },
  NORMAL: {
    name: "Normal",
    description: "Contrôles inversés tous les 10 points (ralentit en mode inversé)",
    normalSpeed: 80,
    invertedSpeed: 120,
    hasObstacles: false,
    hasInvertedControls: true,
    icon: "🎮",
    color: "linear-gradient(135deg, #6a5af9, #b44cff)" // Purple neon blend
  },
  OBSTACLES: {
    name: "Obstacles",
    description: "Des obstacles apparaissent sur le terrain, sans contrôles inversés",
    normalSpeed: 80,
    invertedSpeed: 80,
    hasObstacles: true,
    hasInvertedControls: false,
    icon: "🧱",
    color: "linear-gradient(135deg, #ff8cf3, #ff3d68)" // Pink/Red hot gradient
  },
  EXTREME: {
    name: "Extrême",
    description: "Obstacles + Contrôles inversés tous les 10 points",
    normalSpeed: 80,
    invertedSpeed: 80,
    hasObstacles: true,
    hasInvertedControls: true,
    icon: "😈",
    color: "linear-gradient(135deg, #ff4d4d, #b30000)" // Dark red neon
  }
};

export const GAME_CONFIG = {
  // Cycle des contrôles inversés
  INVERT_CYCLE: 30,
  INVERT_START: 10,
  INVERT_END: 20,

  // Dimensions
  MAX_WIDTH_RATIO: 0.9,
  MAX_HEIGHT_RATIO: 0.7,
  MAX_WIDTH: 600,
  MAX_HEIGHT: 400,

  // Obstacles
  OBSTACLE_COUNT: 8,
  OBSTACLE_SIZE: 40,
};

// 🎨 Nouveau thème graphique futuriste
export const COLORS = {
  // 🔥 Background global (arrière-plan de l'écran)
  background:
    "radial-gradient(circle at top, #1b0033, #120022 40%, #080011 80%)",

  // 🟦 Plateau futuriste
  gameBoardBackground: "#020312",
  gameBoardGrid:
    "linear-gradient(90deg, rgba(162, 0, 255, 0.15) 1px, transparent 1px), " +
    "linear-gradient(rgba(204, 0, 255, 0.15) 1px, transparent 1px)",
  gameBoardGridSize: "20px 20px",
  border: "#a600ff",

  // 🐍 Snake
  snakeHead:
    "linear-gradient(135deg, #ff00ff, #ff00ff)", // Tête neon bleue
  snakeHeadGlow: "0 0 12px rgba(13, 0, 255, 0.9)",

  snakeBody:
    "linear-gradient(135deg, #620065, #620271)", // Corps plus sombre
  snakeBodyGlow: "0 0 8px rgba(157, 0, 255, 0.5)",

  // 🍎 Nourriture (pulsation radioactive)
  food:
    "radial-gradient(circle, #ff0000, #ff0000)", // rose-violet neon
  foodGlow: "0 0 15px rgba(255, 174, 0, 0.9)",
  foodAnimation: "pulse 1s infinite alternate",

  // 🧱 Obstacles futuristes
  obstacle:
    "linear-gradient(135deg, #333, #555)", // métal sombre
  obstacleBorder: "#00eaff", // liseré neon
};
