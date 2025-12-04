import { COLORS } from "../constants/gameConstants";

export default function GameBoard({ snake, food, cell, width, height, obstacles = [] }) {
  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
        border: `4px solid ${COLORS.border}`,
        background: COLORS.gameBoard,
        borderRadius: "10px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        maxWidth: "100%",
        maxHeight: "70vh",
      }}
    >
      {/* Obstacles */}
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
            borderRadius: "4px",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
          }}
        />
      ))}

      {/* Snake */}
      {snake.map((part, i) => (
        <div
          key={`snake-${i}`}
          style={{
            position: "absolute",
            width: cell,
            height: cell,
            left: part.x,
            top: part.y,
            background: i === 0 ? COLORS.snakeHead : COLORS.snakeBody,
            borderRadius: "3px",
            boxShadow: "0 2px 5px rgba(255,105,180,0.5)",
          }}
        />
      ))}

      {/* Food */}
      <div
        style={{
          position: "absolute",
          width: cell,
          height: cell,
          left: food.x,
          top: food.y,
          background: COLORS.food,
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(255,68,68,0.8)",
        }}
      />
    </div>
  );
}
