export default function GameHeader({ score, invertedControls }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          margin: "0 0 10px 0",
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
        }}
      >
        Snake Game
      </h1>
      <h2 style={{ margin: "0", fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>
        Score : {score}
      </h2>
      {invertedControls && (
        <div
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "rgba(255, 107, 107, 0.9)",
            borderRadius: "20px",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            fontWeight: "bold",
            animation: "pulse 1s infinite",
          }}
        >
          ⚠️ CONTRÔLES INVERSÉS ⚠️
        </div>
      )}
    </div>
  );
}
