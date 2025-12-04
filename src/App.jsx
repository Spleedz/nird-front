import { useEffect, useState, useRef } from "react";
import StartScreen from "./components/StartScreen";
import GameHeader from "./components/GameHeader";
import GameBoard from "./components/GameBoard";
import { DIFFICULTY_MODES, COLORS, GAME_CONFIG } from "./constants/gameConstants";
import {
  getGameDimensions,
  getRandomFood,
  shouldInvertControls,
  invertKey,
  generateObstacles,
  checkObstacleCollision,
} from "./utils/gameHelpers";

export default function App() {
  // Dimensions et configuration
  const [width, setWidth] = useState(getGameDimensions().width);
  const [height, setHeight] = useState(getGameDimensions().height);
  const [cell] = useState(20);

  // État du jeu
  const [snake, setSnake] = useState([{ x: 100, y: 100 }]);
  const [food, setFood] = useState({ x: 200, y: 200 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [invertedControls, setInvertedControls] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [obstacles, setObstacles] = useState([]);

  // Refs pour la direction
  const directionRef = useRef({ x: cell, y: 0 });
  const nextDirectionRef = useRef({ x: cell, y: 0 });

  // Supprimer les marges par défaut du body
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Recalculer dimensions si fenêtre change
  useEffect(() => {
    const handleResize = () => {
      const dims = getGameDimensions();
      setWidth(dims.width);
      setHeight(dims.height);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Vérifier si les contrôles doivent être inversés
  useEffect(() => {
    if (difficulty && DIFFICULTY_MODES[difficulty].hasInvertedControls) {
      setInvertedControls(shouldInvertControls(score));
    } else {
      setInvertedControls(false);
    }
  }, [score, difficulty]);

  // Gestion des touches
  useEffect(() => {
    if (!gameStarted) return;

    const handleKey = (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
      }

      const currentDir = directionRef.current;
      let key = invertedControls ? invertKey(e.key) : e.key;

      switch (key) {
        case "ArrowUp":
          if (currentDir.y === 0) {
            nextDirectionRef.current = { x: 0, y: -cell };
          }
          break;
        case "ArrowDown":
          if (currentDir.y === 0) {
            nextDirectionRef.current = { x: 0, y: cell };
          }
          break;
        case "ArrowLeft":
          if (currentDir.x === 0) {
            nextDirectionRef.current = { x: -cell, y: 0 };
          }
          break;
        case "ArrowRight":
          if (currentDir.x === 0) {
            nextDirectionRef.current = { x: cell, y: 0 };
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cell, invertedControls, gameStarted]);

  // Boucle de jeu
  useEffect(() => {
    if (!gameStarted || isGameOver || !difficulty) return;

    const difficultyConfig = DIFFICULTY_MODES[difficulty];
    const gameSpeed = invertedControls
      ? difficultyConfig.invertedSpeed
      : difficultyConfig.normalSpeed;

    const gameLoop = setInterval(() => {
      directionRef.current = nextDirectionRef.current;

      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += directionRef.current.x;
        head.y += directionRef.current.y;

        // Collision murs
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
          setIsGameOver(true);
          fetch("http://localhost:3001/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: "Joueur", score }),
          }).catch(() => {});
          return prevSnake;
        }

        // Collision avec obstacles
        if (checkObstacleCollision(head, obstacles)) {
          setIsGameOver(true);
          fetch("http://localhost:3001/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player: "Joueur", score }),
          }).catch(() => {});
          return prevSnake;
        }

        // Collision avec soi
        for (let i = 1; i < newSnake.length; i++) {
          if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
            setIsGameOver(true);
            fetch("http://localhost:3001/scores", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ player: "Joueur", score }),
            }).catch(() => {});
            return prevSnake;
          }
        }

        newSnake.unshift(head);

        // Manger la nourriture
        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomFood(width, height, cell));
          setScore((s) => s + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, gameSpeed);

    return () => clearInterval(gameLoop);
  }, [
    isGameOver,
    food,
    score,
    width,
    height,
    cell,
    invertedControls,
    gameStarted,
    difficulty,
    obstacles,
  ]);

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setSnake([{ x: 100, y: 100 }]);
    directionRef.current = { x: cell, y: 0 };
    nextDirectionRef.current = { x: cell, y: 0 };
    setFood(getRandomFood(width, height, cell));
    setScore(0);
    setInvertedControls(false);
    setIsGameOver(false);

    // Générer les obstacles si le mode en a
    const difficultyConfig = DIFFICULTY_MODES[selectedDifficulty];
    if (difficultyConfig.hasObstacles) {
      const newObstacles = generateObstacles(
        width,
        height,
        cell,
        GAME_CONFIG.OBSTACLE_COUNT,
        GAME_CONFIG.OBSTACLE_SIZE
      );
      setObstacles(newObstacles);
    } else {
      setObstacles([]);
    }
  };

  const restart = () => {
    setSnake([{ x: 100, y: 100 }]);
    directionRef.current = { x: cell, y: 0 };
    nextDirectionRef.current = { x: cell, y: 0 };
    setFood(getRandomFood(width, height, cell));
    setScore(0);
    setInvertedControls(false);
    setIsGameOver(false);
  };

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
        background: COLORS.background,
        boxSizing: "border-box",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    >
      {!gameStarted ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <GameHeader score={score} invertedControls={invertedControls} />

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
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Recommencer
            </button>
          )}

          <GameBoard
            snake={snake}
            food={food}
            cell={cell}
            width={width}
            height={height}
            obstacles={obstacles}
          />
        </>
      )}
    </div>
  );
}
