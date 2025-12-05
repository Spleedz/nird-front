import { DIFFICULTY_MODES } from "../constants/gameConstants";

export default function StartScreen({ onStart }) {
  const handleDifficultySelect = (difficultyKey) => {
    onStart(difficultyKey);
  };

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        maxWidth: "900px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "95vh",
      }}
    >
      <h1
        style={{
          margin: "0 0 20px 0",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: "bold",
        }}
      >
        🐍 Snake Game 🐍
      </h1>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "25px",
          backdropFilter: "blur(10px)",
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
            marginTop: "0",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          📜 Règles du jeu
        </h2>

        <div
          style={{
            fontSize: "clamp(0.85rem, 2.3vw, 1rem)",
            lineHeight: "1.6",
          }}
        >
          <p style={{ margin: "8px 0" }}>
            <strong>🎯 Objectif :</strong> Mangez la nourriture rouge pour
            grandir et marquer des points
          </p>

          <p style={{ margin: "8px 0" }}>
            <strong>🎮 Contrôles :</strong> Utilisez les flèches ⬆️ ⬇️ ⬅️ ➡️
            pour diriger le serpent
          </p>

          <p style={{ margin: "8px 0" }}>
            <strong>💀 Game Over :</strong> Si vous touchez un mur, un obstacle
            ou votre propre corps
          </p>
        </div>
      </div>

      <div>
        <h3
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
            marginBottom: "20px",
            color: "white",
          }}
        >
          🎮 Choisissez votre mode de jeu :
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          {Object.entries(DIFFICULTY_MODES).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => handleDifficultySelect(key)}
              style={{
                padding: "15px",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                fontWeight: "bold",
                color: "white",
                background: mode.color,
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                textAlign: "center",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                {mode.icon}
              </div>
              <div style={{ marginBottom: "6px", fontSize: "1.1em" }}>
                {mode.name}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                  opacity: 0.95,
                  fontWeight: "normal",
                  lineHeight: "1.3",
                }}
              >
                {mode.description}
              </div>
            </button>
          ))}
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
            lineHeight: "1.5",
            marginTop: "15px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <strong>💡 Détails des modes :</strong>
          </div>
          <ul style={{ margin: "0", paddingLeft: "20px", textAlign: "left" }}>
            <li>
              <strong>😊 Basique :</strong> Pour débuter, sans surprises
            </li>
            <li>
              <strong>🎮 Normal :</strong> Tous les 10 points (10-19, 40-49...),
              les contrôles s'inversent et le jeu ralentit
            </li>
            <li>
              <strong>🧱 Obstacles :</strong> 8 obstacles fixes apparaissent sur
              le terrain
            </li>
            <li>
              <strong>😈 Extrême :</strong> Obstacles + Contrôles inversés tous
              les 10 points (SANS ralentissement !)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
