import React, { useState, useEffect, useRef } from 'react';
import './sesame.css';

const MedievalRitual = () => {
  const [stage, setStage] = useState(1);
  const [message, setMessage] = useState("APPROCHEZ, AVENTURIER...");
  
  // --- STAGE 1 : LA RÉVÉLATION ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
  const [proximity, setProximity] = useState(0);
  
  // NOUVEAU : State pour le compte à rebours
  const [timeLeft, setTimeLeft] = useState(10);

  // --- STAGE 2 : MÉMOIRE DES RUNES ---
  const [grid, setGrid] = useState(Array(16).fill(null));
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [memoryRound, setMemoryRound] = useState(0); 
  
  const runicAlphabet = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ'];

  // --- STAGE 3 : MÉCANISME CÉLESTE ---
  const [rotation, setRotation] = useState(0);
  const [syncCount, setSyncCount] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(3);
  
  const rotationRef = useRef(0);
  const requestRef = useRef();
  
  // ----------------------------------------------------------------
  // LOGIQUE STAGE 1 : TIMER VISUEL + DÉPLACEMENT
  // ----------------------------------------------------------------
  useEffect(() => {
    if (stage === 1) {
      // 1. Gestion de la souris
      const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        const dist = Math.sqrt(Math.pow(e.clientX - targetPos.x, 2) + Math.pow(e.clientY - targetPos.y, 2));
        const maxDist = 600; 
        const prox = Math.max(0, 1 - dist / maxDist);
        setProximity(prox);
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      // 2. Gestion du Compte à Rebours (chaque seconde)
      const countdownInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // LE TEMPS EST ÉCOULÉ !
            
            // On déplace la rune
            const newX = Math.random() * (window.innerWidth - 100) + 50;
            const newY = Math.random() * (window.innerHeight - 100) + 50;
            setTargetPos({ x: newX, y: newY });
            
            // Feedback visuel
            setMessage("LA RUNE S'EST DÉPLACÉE !");
            document.body.classList.add('flash-fail');
            setTimeout(() => document.body.classList.remove('flash-fail'), 200);

            // On reset le timer à 10s
            return 10;
          }
          // Sinon on décrémente
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(countdownInterval);
      };
    }
  }, [stage, targetPos]); // targetPos en dépendance pour recalculer la distance si elle bouge

  const handleTriangulationClick = () => {
    if (proximity > 0.90) {
      nextStage(2, "OBSERVEZ LES PIERRES...");
    }
  };

  // ----------------------------------------------------------------
  // LOGIQUE STAGE 2
  // ----------------------------------------------------------------
  useEffect(() => {
    if (stage === 2) {
        setTimeout(() => startMemoryRound(0), 500);
    }
  }, [stage]);

  const startMemoryRound = (roundIndex) => {
    setUserPattern([]);
    setIsShowingPattern(true);
    
    // Vitesses progressives
    const duration = [1000, 700, 400][roundIndex];
    
    if (roundIndex > 0) {
        setMessage(`SÉQUENCE ${roundIndex + 1}/3`);
    }

    const newPattern = [];
    while(newPattern.length < 5) {
      const r = Math.floor(Math.random() * 16);
      if(!newPattern.includes(r)) newPattern.push(r);
    }
    setPattern(newPattern);
    
    setTimeout(() => {
        setIsShowingPattern(false);
        setMessage("RÉPÉTEZ !");
    }, duration);
  };

  const handleDotClick = (index) => {
    if (isShowingPattern) return;
    if (userPattern.includes(index)) return;

    const isCorrectDot = pattern.includes(index);

    if (!isCorrectDot) {
      setMessage("ERREUR ! RETOUR AU DÉBUT");
      setMemoryRound(0);
      document.body.classList.add('rumble');
      setTimeout(() => {
        document.body.classList.remove('rumble');
        startMemoryRound(0);
      }, 800);
    } else {
      const newUserPattern = [...userPattern, index];
      setUserPattern(newUserPattern);

      if (newUserPattern.length === pattern.length) {
        if (memoryRound < 2) {
            const nextRound = memoryRound + 1;
            setMemoryRound(nextRound);
            setTimeout(() => {
                startMemoryRound(nextRound);
            }, 500);
        } else {
            nextStage(3, "LE MÉCANISME D'OR S'ÉVEILLE");
        }
      }
    }
  };

  // ----------------------------------------------------------------
  // LOGIQUE STAGE 3
  // ----------------------------------------------------------------
  const animateRotation = () => {
    rotationRef.current = (rotationRef.current + rotationSpeed) % 360;
    setRotation(rotationRef.current);
    requestRef.current = requestAnimationFrame(animateRotation);
  };

  useEffect(() => {
    if (stage === 3) {
      rotationRef.current = 0;
      requestRef.current = requestAnimationFrame(animateRotation);
      
      const handleKeyDown = (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          checkSync();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        cancelAnimationFrame(requestRef.current);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [stage, rotationSpeed, syncCount]);

  const checkSync = () => {
    const currentRot = rotationRef.current;
    const isHit = (currentRot >= 330 || currentRot <= 30);

    if (isHit) {
      const newCount = syncCount + 1;
      setSyncCount(newCount);
      if (newCount >= 3) {
        nextStage(4, "LE CAVEAU EST OUVERT !");
      } else {
        setRotationSpeed(prev => prev + 2);
        setMessage(`ALIGNEMENT OK (${newCount}/3)`);
      }
    } else {
      setSyncCount(0);
      setRotationSpeed(3);
      setMessage("ÉCHEC... LE MÉCANISME SE RÉINITIALISE");
      document.body.classList.add('flash-fail');
      setTimeout(() => document.body.classList.remove('flash-fail'), 200);
    }
  };

  // ----------------------------------------------------------------
  // TRANSITIONS
  // ----------------------------------------------------------------
  const nextStage = (next, msg) => {
    setMessage(msg);
    setStage(next);
  };

  return (
    <div className="medieval-container">
      <div className="dungeon-bg"></div>
      <div className="magic-particles"></div>
      
      <div className="scroll-header">
        <div className="scroll-title">LE RITUEL DES ANCIENS</div>
        <div className="scroll-status">{message}</div>
      </div>

      {/* STAGE 1 : RÉVÉLATION */}
      {stage === 1 && (
        <div className="stage-layer" onClick={handleTriangulationClick}>
          <div className="fog-overlay" style={{ opacity: 1 - proximity }}></div>
          
          <div 
            className="hidden-rune" 
            style={{ 
                top: targetPos.y, 
                left: targetPos.x, 
                opacity: proximity > 0.9 ? 1 : 0, 
                transition: 'opacity 0.2s',
                transform: `translate(-50%, -50%) scale(${0.5 + proximity/2})` 
            }}
          >
            <div className="rune-glow"></div>
            <div className="rune-symbol">⚡</div>
          </div>
          
          <div className="wisp-cursor" style={{ top: mousePos.y, left: mousePos.x }}>
             <div className="wisp-core"></div>
             <span className="resonance-text">{Math.round(proximity * 100)}%</span>
          </div>

          {/* AFFICHAGE DU TIMER */}
          <div style={{
              position: 'absolute', 
              bottom: 30, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              color: timeLeft <= 3 ? '#ff4d4d' : '#d4af37', // Devient rouge à 3s
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px #000'
          }}>
             DÉPLACEMENT DANS : {timeLeft} s
          </div>
        </div>
      )}

      {/* STAGE 2 : MÉMOIRE DE PIERRE */}
      {stage === 2 && (
        <div className="stage-layer center-content">
          <div className="stone-tablet-grid">
            {grid.map((_, i) => (
              <div 
                key={i}
                className={`stone-rune 
                  ${isShowingPattern && pattern.includes(i) ? 'active-magic' : ''}
                  ${userPattern.includes(i) ? 'user-activated' : ''}
                `}
                onClick={() => handleDotClick(i)}
              >
                {runicAlphabet[i]}
              </div>
            ))}
          </div>
          <div style={{color: '#d4af37', marginTop: '20px', fontSize: '1.2rem', fontFamily:'MedievalSharp'}}>
             MANCHE : {memoryRound + 1} / 3
          </div>
        </div>
      )}

      {/* STAGE 3 : MÉCANISME CÉLESTE */}
      {stage === 3 && (
        <div 
          className="stage-layer center-content" 
          onMouseDown={checkSync}
        >
          <div className="mechanism-container">
            <div className="mechanism-target"></div>
            <div className="mechanism-gear" style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="gear-jewel"></div>
            </div>
            <div className="mechanism-info">{syncCount} / 3</div>
          </div>
          <p className="parchment-hint">Cliquez ou Espace pour aligner le joyau</p>
        </div>
      )}

      {/* STAGE 4 : TRÉSOR */}
      {stage === 4 && (
        <div className="stage-layer center-content">
          <div className="treasure-anim">
            <h1>GLOIRE ET FORTUNE !</h1>
            <div className="treasure-chest"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedievalRitual;