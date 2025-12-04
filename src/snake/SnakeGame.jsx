import { useEffect, useState } from "react";

const CELL = 20;
const WIDTH = 600;
const HEIGHT = 400;

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 100, y: 100 }]);
  const [direction, setDirection] = useState({ x: CELL, y: 0 });
  const [food, setFood] = useState(getRandomFood());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function getRandomFood() {
    return {
      x: Math.floor(Math.random() * (WIDTH / CELL)) * CELL,
      y: Math.floor(Math.random() * (HEIGHT / CELL)) * CELL
    };
  }

  // mouvement du snake
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => moveSnake(), 120);
    return () => clearInterval(interval);
  });

  // touches clavier
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === CELL) return;
          setDirection({ x: 0, y: -CELL });
          break;
        case "ArrowDown":
          if (direction.y === -CELL) return;
          setDirection({ x: 0, y: CELL });
          break;
        case "ArrowLeft":
          if (direction.x === CELL) return;
          setDirection({ x: -CELL, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === -CELL) return;
          setDirection({ x: CELL, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // déplacement du serpent
  function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    head.x += direction.x;
    head.y += direction.y;

    // mur = game over
    if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
      endGame();
      return;
    }

    // collision avec soi-même
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        endGame();
        return;
      }
    }

    newSnake.unshift(head);

    // nourriture
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  // fin du jeu
  function endGame() {
    setIsGameOver(true);
    sendScore(score);
  }

  // envoyer le score au backend
  function sendScore(score) {
    fetch("http://localhost:3001/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: "Joueur", score })
    });
  }

  function restart() {
    setSnake([{ x: 100, y: 100 }]);
    setDirection({ x: CELL, y: 0 });
    setFood(getRandomFood());
    setScore(0);
    setIsGameOver(false);
  }

  return (
    <div>
      <h2>Score : {score}</h2>

      {isGameOver && (
        <button onClick={restart} style={{ marginBottom: "10px" }}>
          Recommencer
        </button>
      )}

      <div
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT,
          border: "2px solid black",
          margin: "0 auto",
          background: "#eef"
        }}
      >
        {/* Snake */}
        {snake.map((part, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: CELL,
              height: CELL,
              left: part.x,
              top: part.y,
              background: "green"
            }}
          />
        ))}

        {/* Food */}
        <div
          style={{
            position: "absolute",
            width: CELL,
            height: CELL,
            left: food.x,
            top: food.y,
            background: "red"
          }}
        />
      </div>
    </div>
  );
}
