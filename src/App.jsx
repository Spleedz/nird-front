import { useEffect, useState } from "react";

export default function App() {
  // dimensions initiales pour calcul - responsive
  const getGameDimensions = () => {
    const maxWidth = Math.min(window.innerWidth * 0.9, 600);
    const maxHeight = Math.min(window.innerHeight * 0.7, 400);
    const cellSize = 20;
    return {
      width: Math.floor(maxWidth / cellSize) * cellSize,
      height: Math.floor(maxHeight / cellSize) * cellSize,
      cell: cellSize
    };
  };

  const [width, setWidth] = useState(getGameDimensions().width);
  const [height, setHeight] = useState(getGameDimensions().height);
  const [cell, setCell] = useState(20);

  const [snake, setSnake] = useState([{ x: 100, y: 100 }]);
  const [direction, setDirection] = useState({ x: cell, y: 0 });
  const [food, setFood] = useState(getRandomFood());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Supprimer les marges par défaut du body
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // recalculer dimensions si fenêtre change
  useEffect(() => {
    const handleResize = () => {
      const dims = getGameDimensions();
      setWidth(dims.width);
      setHeight(dims.height);
      setCell(dims.cell);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getRandomFood() {
    return {
      x: Math.floor(Math.random() * (width / cell)) * cell,
      y: Math.floor(Math.random() * (height / cell)) * cell,
    };
  }

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === cell) return;
          setDirection({ x: 0, y: -cell });
          break;
        case "ArrowDown":
          if (direction.y === -cell) return;
          setDirection({ x: 0, y: cell });
          break;
        case "ArrowLeft":
          if (direction.x === cell) return;
          setDirection({ x: -cell, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === -cell) return;
          setDirection({ x: cell, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, cell]);

  function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // collision murs
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      endGame();
      return;
    }

    // collision avec soi
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
        endGame();
        return;
      }
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomFood());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function endGame() {
    setIsGameOver(true);
    fetch("http://localhost:3001/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: "Joueur", score }),
    });
  }

  function restart() {
    setSnake([{ x: 100, y: 100 }]);
    setDirection({ x: cell, y: 0 });
    setFood(getRandomFood());
    setScore(0);
    setIsGameOver(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxSizing: "border-box",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: "0 0 10px 0", fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          Snake Game
        </h1>
        <h2 style={{ margin: "0", fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>
          Score : {score}
        </h2>
      </div>

      {isGameOver && (
        <button
          onClick={restart}
          style={{
            marginBottom: "15px",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            background: "#ff6b6b",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          Recommencer
        </button>
      )}

      <div
        style={{
          position: "relative",
          width: width,
          height: height,
          border: "4px solid white",
          background: "#1a1a2e",
          borderRadius: "10px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          maxWidth: "100%",
          maxHeight: "70vh",
        }}
      >
        {snake.map((part, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: cell,
              height: cell,
              left: part.x,
              top: part.y,
              background: i === 0
                ? "linear-gradient(135deg, #00ff88, #00cc66)"
                : "#00ff88",
              borderRadius: "3px",
              boxShadow: "0 2px 5px rgba(0,255,136,0.3)",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            width: cell,
            height: cell,
            left: food.x,
            top: food.y,
            background: "radial-gradient(circle, #ff4444, #cc0000)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(255,68,68,0.8)",
          }}
        />
      </div>
    </div>
  );
}
