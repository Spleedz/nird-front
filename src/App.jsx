import { useState } from "react";
import SnakeGame from "./components/SnakeGame";

export default function App() {
  // État pour afficher ou non le Snake
  const [showSnake, setShowSnake] = useState(false);

  // Fonction pour activer le Snake (à appeler plus tard)
  const activateSnake = () => {
    setShowSnake(true);
  };

  // Si le Snake est activé, l'afficher
  if (showSnake) {
    return <SnakeGame />;
  }

  // Sinon, afficher ton contenu principal (vide pour l'instant)
  return (
    <div>
      {/* Ton contenu principal ici */}
      <h1>Application principale</h1>

      {/* Exemple : bouton pour tester le Snake */}
      <button onClick={activateSnake}>
        Activer le Snake (test)
      </button>
    </div>
  );
}
