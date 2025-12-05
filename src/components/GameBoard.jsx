import { COLORS, GAME_CONFIG } from "../constants/gameConstants";

export default function GameBoard({ snake, food, cell, width, height, obstacles = [] }) {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",

        background: COLORS.gameBoardBackground,
        border: `2px solid ${COLORS.border}`,
        boxShadow: "0 0 25px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0,255,255,0.2)",

        backgroundImage: COLORS.gameBoardGrid,
        backgroundSize: COLORS.gameBoardGridSize,

        maxWidth: "100%",
        maxHeight: "70vh",
      }}
    >

      {/* 🐍 Snake (Glow + Dégradé glossy) */}
      {snake.map((part, i) => (
        <div
          key={`snake-${i}`}
          style={{
            position: "absolute",
            width: cell,
            height: cell,
            left: part.x,
            top: part.y,

            // 🐍 Texture ultra réaliste simulée
            background: i === 0
              ? `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 40%),
                radial-gradient(circle at 60% 70%, rgba(0,0,0,0.4), transparent 60%),
                ${COLORS.snakeHead}
              `
              : `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 40%),
                radial-gradient(circle at 60% 70%, rgba(0,0,0,0.4), transparent 60%),
                ${COLORS.snakeBody}
              `,

            // Corps allongé, organique
            borderRadius: "45%",

            // 🔗 Segments soudés (effet tube)
            outline: "1px solid rgba(0,0,0,0.25)",
            outlineOffset: "-3px",

            // 🎨 Ombres internes → illusion de volume / muscles
            boxShadow: i === 0
              ? `
                inset -3px -3px 6px rgba(0,0,0,0.35),
                inset 2px 2px 4px rgba(255,255,255,0.15),
                ${COLORS.snakeHeadGlow}
              `
              : `
                inset -3px -3px 6px rgba(0,0,0,0.35),
                inset 2px 2px 4px rgba(255,255,255,0.15),
                ${COLORS.snakeBodyGlow}
              `,

            // 🌀 Mouvement ultra fluide
            transition: "left 0.06s linear, top 0.06s linear",
          }}
        />
      ))}

      {/* 🍎 Food animée */}
      <div
        style={{
          position: "absolute",
          width: cell,
          height: cell,
          left: food.x,
          top: food.y,
          background: COLORS.food,
          borderRadius: "50%",
          boxShadow: COLORS.foodGlow,
          animation: COLORS.foodAnimation,
        }}
      />

      {/* 🧱 Obstacles futuristes */}
      {obstacles.map((obstacle, i) => (
        <div
          key={`obstacle-${i}`}
          style={{
            position: "absolute",
            width: obstacle.width,
            height: obstacle.height,
            left: obstacle.x,
            top: obstacle.y,

            background: COLORS.obstacle,
            border: `2px solid ${COLORS.obstacleBorder}`,
            borderRadius: "6px",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.9), 0 0 12px rgba(0,255,255,0.5)",
          }}
        />
      ))}

    </div>
  );
}
