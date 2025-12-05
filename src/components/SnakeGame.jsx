import { useEffect, useState, useRef } from "react";
import StartScreen from "./StartScreen";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import { DIFFICULTY_MODES, COLORS, GAME_CONFIG } from "../constants/gameConstants";
import {
  getGameDimensions,
  getRandomFood,
  shouldInvertControls,
  invertKey,
  generateObstacles,
  checkObstacleCollision,
} from "../utils/gameHelpers";

export default function SnakeGame() {
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
  const [gameRunning, setGameRunning] = useState(false);

  // Refs pour la direction
  const directionRef = useRef({ x: 0, y: 0 });
  const nextDirectionRef = useRef({ x: 0, y: 0 });

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

  // Retourner à l'écran de démarrage après Game Over
  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        backToStart();
      }, 2000); // Attendre 2 secondes avant de retourner
      return () => clearTimeout(timer);
    }
  }, [isGameOver]);

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
          if (currentDir.y === 0 && !(currentDir.x === 0 && currentDir.y === 0)) {
            nextDirectionRef.current = { x: 0, y: -cell };
          } else if (currentDir.x === 0 && currentDir.y === 0) {
            nextDirectionRef.current = { x: 0, y: -cell };
            setGameRunning(true);
          }
          break;
        case "ArrowDown":
          if (currentDir.y === 0 && !(currentDir.x === 0 && currentDir.y === 0)) {
            nextDirectionRef.current = { x: 0, y: cell };
          } else if (currentDir.x === 0 && currentDir.y === 0) {
            nextDirectionRef.current = { x: 0, y: cell };
            setGameRunning(true);
          }
          break;
        case "ArrowLeft":
          if (currentDir.x === 0 && !(currentDir.x === 0 && currentDir.y === 0)) {
            nextDirectionRef.current = { x: -cell, y: 0 };
          } else if (currentDir.x === 0 && currentDir.y === 0) {
            nextDirectionRef.current = { x: -cell, y: 0 };
            setGameRunning(true);
          }
          break;
        case "ArrowRight":
          if (currentDir.x === 0 && !(currentDir.x === 0 && currentDir.y === 0)) {
            nextDirectionRef.current = { x: cell, y: 0 };
          } else if (currentDir.x === 0 && currentDir.y === 0) {
            nextDirectionRef.current = { x: cell, y: 0 };
            setGameRunning(true);
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cell, invertedControls, gameStarted]);

  // Boucle de jeu
  useEffect(() => {
    if (!gameStarted || !gameRunning || isGameOver || !difficulty) return;

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
          setFood(getRandomFood(width, height, cell, obstacles));
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
    gameRunning,
    difficulty,
    obstacles,
  ]);

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setGameRunning(false);
    setSnake([{ x: 100, y: 100 }]);
    directionRef.current = { x: 0, y: 0 };
    nextDirectionRef.current = { x: 0, y: 0 };
    setScore(0);
    setInvertedControls(false);
    setIsGameOver(false);

    // Générer les obstacles si le mode en a
    const difficultyConfig = DIFFICULTY_MODES[selectedDifficulty];
    let newObstacles = [];
    if (difficultyConfig.hasObstacles) {
      newObstacles = generateObstacles(
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

    // Générer la nourriture en évitant les obstacles
    setFood(getRandomFood(width, height, cell, newObstacles));
  };

  const backToStart = () => {
    setGameStarted(false);
    setGameRunning(false);
    setIsGameOver(false);
    setSnake([{ x: 100, y: 100 }]);
    setScore(0);
    setObstacles([]);
    setDifficulty(null);
    setInvertedControls(false);
    directionRef.current = { x: 0, y: 0 };
    nextDirectionRef.current = { x: 0, y: 0 };
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
            <div
              style={{
                marginBottom: "15px",
                padding: "20px 40px",
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                fontWeight: "bold",
                color: "white",
                background: "rgba(255, 107, 107, 0.9)",
                borderRadius: "15px",
                boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
                animation: "pulse 1s infinite",
              }}
            >
              💀 GAME OVER 💀
            </div>
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
