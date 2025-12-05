import React, { useState, useEffect } from 'react';

export default function App() {
  const [hp, setHp] = useState(100);
  const [mana, setMana] = useState(80);
  const [gold, setGold] = useState(450);
  const [level, setLevel] = useState(12);
  const [xp, setXp] = useState(65);
  const [selectedClass, setSelectedClass] = useState('knight');
  const [showSnake, setShowSnake] = useState(false);
  const [konamiCode, setKonamiCode] = useState([]);
  const [showShop, setShowShop] = useState(false);
  const [maxHp, setMaxHp] = useState(100);
  const [maxMana, setMaxMana] = useState(100);
  const [stamina, setStamina] = useState(100);
  const [maxStamina, setMaxStamina] = useState(100);
  const [critChance, setCritChance] = useState(0);
  const [bossDefeated, setBossDefeated] = useState(false);
  const [equippedWeapon, setEquippedWeapon] = useState(null);
  const [equippedArmor, setEquippedArmor] = useState(null);
  const [equippedAccessory, setEquippedAccessory] = useState(null);
  const [theme, setTheme] = useState('cyber'); // cyber, fire, ice, nature
  const [inventory, setInventory] = useState([
    { id: 1, name: '⚔️ Épée Légendaire', rarity: 'legendary', damage: 25 },
    { id: 2, name: '🛡️ Bouclier Sacré', rarity: 'epic', defense: 15 },
    { id: 3, name: '⚗️ Potion de Vie', rarity: 'common', heal: 30 },
    { id: 4, name: '💎 Gemme Magique', rarity: 'rare', mana: 20 },
  ]);
  const [messages, setMessages] = useState([
    '⚔️ Bienvenue dans le royaume',
    '🎮 Prépare-toi à l\'aventure',
    '✨ La quête commence...'
  ]);
  const [enemies, setEnemies] = useState([
    { id: 1, name: '👾 Gobelin', hp: 45, maxHp: 60, goldReward: 30, xpReward: 15 },
    { id: 2, name: '🐉 Dragon', hp: 150, maxHp: 200, goldReward: 100, xpReward: 40 },
    { id: 3, name: '💀 Squelette', hp: 30, maxHp: 50, goldReward: 20, xpReward: 10 },
    { id: 99, name: '👹 ROI DÉMON', hp: 666, maxHp: 666, goldReward: 1000, xpReward: 200, locked: true }
  ]);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newCode = [...konamiCode, e.key.toLowerCase()];
      const checkSequence = newCode.slice(-konamiSequence.length);
      
      if (konamiSequence.every((key, i) => key.toLowerCase() === checkSequence[i])) {
        setShowSnake(true);
        setMessages(prev => [...prev, '🐍 CODE SECRET ACTIVÉ !']);
      }
      
      setKonamiCode(newCode.slice(-konamiSequence.length));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  useEffect(() => {
    // Régénération passive de stamina
    const staminaRegen = setInterval(() => {
      setStamina(s => Math.min(maxStamina, s + 2));
    }, 2000);

    const interval = setInterval(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const randomMsg = [
          '💰 Coffre trouvé !',
          '⚡ Attaque critique disponible !',
          '🎯 Quête complétée',
          '🔮 Sort appris',
          '🗝️ Clé mystérieuse',
          '🏆 Succès débloqué'
        ];
        if (newMessages.length > 6) newMessages.shift();
        newMessages.push(randomMsg[Math.floor(Math.random() * randomMsg.length)]);
        return newMessages;
      });
    }, 4000);
    return () => {
      clearInterval(interval);
      clearInterval(staminaRegen);
    };
  }, [maxStamina]);

  const attack = (enemyId) => {
    const enemy = enemies.find(e => e.id === enemyId);
    if (enemy?.locked) {
      setMessages(prev => [...prev, '🔒 Boss verrouillé ! Niveau 20 requis']);
      return;
    }
    
    if (stamina < 10) {
      setMessages(prev => [...prev, '❌ Pas assez de stamina !']);
      return;
    }

    const weaponBonus = equippedWeapon?.damage || 0;
    const isCrit = Math.random() < (critChance / 100);
    const baseDamage = 15 + weaponBonus;
    const damage = isCrit ? baseDamage * 2 : baseDamage;
    
    setEnemies(prev => prev.map(enemy => {
      if (enemy.id === enemyId && enemy.hp > 0 && !enemy.locked) {
        const newHp = Math.max(0, enemy.hp - damage);
        if (newHp === 0) {
          setGold(g => g + enemy.goldReward);
          setXp(x => {
            const newXp = x + enemy.xpReward;
            if (newXp >= 100) {
              setLevel(l => l + 1);
              setMessages(prev => [...prev, `⭐ LEVEL UP ! Niveau ${level + 1}`]);
              return newXp - 100;
            }
            return newXp;
          });
          setMessages(prev => [...prev, `💀 ${enemy.name} vaincu ! +${enemy.goldReward} gold`]);
          if (enemy.id === 99) setBossDefeated(true);
        } else if (isCrit) {
          setMessages(prev => [...prev, `💥 COUP CRITIQUE ! -${damage} HP`]);
        }
        return { ...enemy, hp: newHp };
      }
      return enemy;
    }));
    
    setStamina(s => Math.max(0, s - 10));
    setMana(Math.max(0, mana - 10));
  };

  const heal = () => {
    if (mana >= 20 && hp < maxHp) {
      setHp(Math.min(maxHp, hp + 30));
      setMana(mana - 20);
      setMessages(prev => [...prev, '💚 +30 HP restaurés']);
    }
  };

  const restoreMana = () => {
    if (stamina >= 15 && mana < maxMana) {
      setMana(Math.min(maxMana, mana + 40));
      setStamina(s => Math.max(0, s - 15));
      setMessages(prev => [...prev, '🔵 +40 Mana restaurés']);
    }
  };

  const resetCombat = () => {
    setEnemies([
      { id: 1, name: '👾 Gobelin', hp: 60, maxHp: 60, goldReward: 30, xpReward: 15 },
      { id: 2, name: '🐉 Dragon', hp: 200, maxHp: 200, goldReward: 100, xpReward: 40 },
      { id: 3, name: '💀 Squelette', hp: 50, maxHp: 50, goldReward: 20, xpReward: 10 },
      { id: 99, name: '👹 ROI DÉMON', hp: 666, maxHp: 666, goldReward: 1000, xpReward: 200, locked: level < 20 }
    ]);
    setMessages(prev => [...prev, '🔄 Combat réinitialisé !']);
  };

  const summonBoss = () => {
    if (level >= 20) {
      setEnemies(prev => prev.map(e => 
        e.id === 99 ? { ...e, locked: false } : e
      ));
      setMessages(prev => [...prev, '👹 LE ROI DÉMON EST DÉBLOQUÉ !']);
    }
  };

  const shopItems = [
    { id: 's1', name: '⚡ +50 Stamina', cost: 100, effect: () => setStamina(s => Math.min(maxStamina, s + 50)) },
    { id: 's2', name: '💪 Stamina Max +20', cost: 300, effect: () => { setMaxStamina(m => m + 20); setStamina(s => s + 20); } },
    { id: 's3', name: '❤️ HP Max +30', cost: 250, effect: () => { setMaxHp(m => m + 30); setHp(h => h + 30); } },
    { id: 's4', name: '🔵 Mana Max +30', cost: 250, effect: () => { setMaxMana(m => m + 30); setMana(ma => ma + 30); } },
    { id: 's5', name: '💥 Crit +5%', cost: 400, effect: () => setCritChance(c => c + 5) },
    { id: 's6', name: '🗡️ Dague Assassin', cost: 500, type: 'weapon', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '🗡️ Dague Assassin', rarity: 'epic', damage: 20, type: 'weapon' }]);
    }},
    { id: 's7', name: '⚔️ Épée Divine', cost: 800, type: 'weapon', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '⚔️ Épée Divine', rarity: 'legendary', damage: 35, type: 'weapon' }]);
    }},
    { id: 's8', name: '🏹 Arc Runique', cost: 600, type: 'weapon', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '🏹 Arc Runique', rarity: 'legendary', damage: 30, type: 'weapon' }]);
    }},
    { id: 's9', name: '🛡️ Armure Lourde', cost: 700, type: 'armor', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '🛡️ Armure Lourde', rarity: 'epic', defense: 25, type: 'armor' }]);
    }},
    { id: 's10', name: '👘 Robe Mystique', cost: 650, type: 'armor', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '👘 Robe Mystique', rarity: 'epic', defense: 15, manaBonus: 20, type: 'armor' }]);
    }},
    { id: 's11', name: '💍 Anneau Sacré', cost: 900, type: 'accessory', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '💍 Anneau Sacré', rarity: 'legendary', hpRegen: 5, type: 'accessory' }]);
    }},
    { id: 's12', name: '🔮 Amulette Magique', cost: 850, type: 'accessory', effect: () => {
      setInventory(inv => [...inv, { id: Date.now(), name: '🔮 Amulette Magique', rarity: 'legendary', manaRegen: 5, type: 'accessory' }]);
    }},
    { id: 's13', name: '⚗️ Potion Complète', cost: 150, effect: () => { setHp(maxHp); setMana(maxMana); setStamina(maxStamina); } },
  ];

  const buyItem = (item) => {
    if (gold >= item.cost) {
      setGold(g => g - item.cost);
      item.effect();
      setMessages(prev => [...prev, `✅ Acheté : ${item.name}`]);
    } else {
      setMessages(prev => [...prev, '❌ Pas assez de gold !']);
    }
  };

  const equipItem = (item) => {
    if (item.type === 'weapon') {
      setEquippedWeapon(item);
      setMessages(prev => [...prev, `⚔️ Équipé : ${item.name}`]);
    } else if (item.type === 'armor') {
      setEquippedArmor(item);
      setMessages(prev => [...prev, `🛡️ Équipé : ${item.name}`]);
    } else if (item.type === 'accessory') {
      setEquippedAccessory(item);
      setMessages(prev => [...prev, `💍 Équipé : ${item.name}`]);
    }
  };

  const getClassAvatar = () => {
    const avatars = {
      knight: '🛡',
      mage: '🧙‍♂️',
      ranger: '🏹',
      assassin: '🗡',
      paladin: '⚜️',
      necro: '💀'
    };
    return avatars[selectedClass] || '🛡';
  };

  const getThemeColors = () => {
    const themes = {
      cyber: {
        primary: '#ff6ec7',
        secondary: '#00ff88',
        tertiary: '#ffd700',
        accent: '#a29bfe',
        bg: '#0a0014',
        glow: '#ff6ec7'
      },
      fire: {
        primary: '#ff4500',
        secondary: '#ffa500',
        tertiary: '#ff6347',
        accent: '#ff1744',
        bg: '#1a0500',
        glow: '#ff4500'
      },
      ice: {
        primary: '#00d4ff',
        secondary: '#4dd0e1',
        tertiary: '#b3e5fc',
        accent: '#0288d1',
        bg: '#001a1f',
        glow: '#00d4ff'
      },
      nature: {
        primary: '#7cb342',
        secondary: '#66bb6a',
        tertiary: '#81c784',
        accent: '#4caf50',
        bg: '#0a1a0a',
        glow: '#7cb342'
      }
    };
    return themes[theme];
  };

  const cycleTheme = () => {
    const themes = ['cyber', 'fire', 'ice', 'nature'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    setMessages(prev => [...prev, `🎨 Thème changé : ${nextTheme.toUpperCase()}`]);
  };

  return (
    <>
      <style>{`
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: ${getThemeColors().bg};
  overflow-x: hidden;
  transition: background 0.5s ease;
}

@keyframes stars {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@keyframes glow-pulse {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 5px currentColor); }
  50% { filter: brightness(1.3) drop-shadow(0 0 15px currentColor); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pixel-blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0.7; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.boss-card {
  animation: shake 0.5s ease-in-out infinite;
}

.locked-enemy {
  opacity: 0.5;
  position: relative;
}

.locked-enemy::after {
  content: '🔒 NIVEAU 20';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.9);
  padding: 10px 20px;
  border: 3px solid #ff4757;
  color: #ff4757;
  font-size: 12px;
  z-index: 10;
}

.avatar-panel {
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border: 5px solid #ff6ec7;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.avatar-display {
  font-size: 120px;
  margin: 20px 0;
  filter: drop-shadow(0 0 20px ${getThemeColors().primary});
  position: relative;
  z-index: 2;
  transition: filter 0.5s ease;
}

.equipment-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  position: relative;
  z-index: 2;
}

.equipment-slot {
  background: #0f0f1e;
  border: 3px solid #666;
  padding: 10px;
  font-size: 10px;
  color: #fff;
  text-align: left;
}

.equipment-slot.equipped {
  border-color: #00ff88;
  box-shadow: 0 0 10px #00ff8866;
}

.equipment-label {
  color: #888;
  margin-bottom: 5px;
}

.equipment-item {
  color: #00ff88;
}

.medieval-wrapper {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: 
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent),
    radial-gradient(1px 1px at 33% 80%, white, transparent),
    ${getThemeColors().bg};
  background-size: 200% 200%;
  font-family: "Press Start 2P", cursive;
  color: #d4d4d4;
  transition: background 0.5s ease;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.pixel-title {
  font-size: 32px;
  color: ${getThemeColors().primary};
  margin-bottom: 20px;
  text-shadow: 
    3px 3px 0 #7928ca,
    6px 6px 0 #4a148c,
    0 0 20px ${getThemeColors().primary};
  animation: glow-pulse 2s ease-in-out infinite;
  letter-spacing: 4px;
  transition: all 0.5s ease;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.stat-box {
  background: linear-gradient(145deg, #1a1a2e 0%, #0f0f1e 100%);
  border: 4px solid ${getThemeColors().secondary};
  padding: 12px 20px;
  box-shadow: 
    inset 0 0 0 2px #003322,
    0 0 15px ${getThemeColors().secondary}66,
    0 4px 0 #001a11;
  min-width: 150px;
  transition: all 0.5s ease;
}

.stat-label {
  font-size: 10px;
  color: ${getThemeColors().secondary};
  margin-bottom: 8px;
  transition: color 0.5s ease;
}

.stat-value {
  font-size: 18px;
  color: #fff;
  text-shadow: 0 0 10px ${getThemeColors().secondary};
  transition: text-shadow 0.5s ease;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #1a1a2e;
  border: 2px solid #444;
  margin-top: 5px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.5);
}

.hp-fill { background: linear-gradient(90deg, #ff1744, #ff4569); }
.mana-fill { background: linear-gradient(90deg, #2196f3, #64b5f6); }
.xp-fill { background: linear-gradient(90deg, #ffd700, #ffed4e); }

.game-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.game-panel {
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border: 5px solid;
  padding: 20px;
  box-shadow: 
    inset 0 0 0 3px rgba(0,0,0,0.5),
    0 8px 0 rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
}

.game-panel::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.03) 2px,
    rgba(255,255,255,0.03) 4px
  );
  pointer-events: none;
}

.panel-inventory { border-color: ${getThemeColors().tertiary}; transition: border-color 0.5s ease; }
.panel-combat { border-color: ${getThemeColors().accent}; transition: border-color 0.5s ease; }
.panel-classes { border-color: ${getThemeColors().accent}; transition: border-color 0.5s ease; }
.panel-console { border-color: ${getThemeColors().secondary}; transition: border-color 0.5s ease; }
.avatar-panel { border-color: ${getThemeColors().primary}; transition: border-color 0.5s ease; }

.panel-title {
  font-size: 16px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 3px solid;
  position: relative;
  z-index: 1;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  position: relative;
  z-index: 1;
}

.inventory-item {
  background: #0f0f1e;
  border: 3px solid #444;
  padding: 12px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
}

.inventory-item:hover {
  transform: scale(1.05);
  border-color: #ffd700;
  box-shadow: 0 0 15px #ffd70066;
}

.rarity-legendary { border-color: #ff6b35; box-shadow: 0 0 10px #ff6b3566; }
.rarity-epic { border-color: #a29bfe; box-shadow: 0 0 10px #a29bfe66; }
.rarity-rare { border-color: #00d2ff; box-shadow: 0 0 10px #00d2ff66; }
.rarity-common { border-color: #666; }

.enemy-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.enemy-card {
  background: linear-gradient(90deg, #1a0000 0%, #2d0a0a 100%);
  border: 3px solid #ff4757;
  padding: 15px;
  position: relative;
}

.enemy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.enemy-name {
  font-size: 13px;
  color: #fff;
}

.enemy-hp {
  font-size: 11px;
  color: #ff4757;
}

.attack-btn {
  background: linear-gradient(145deg, #ff4757, #ff6348);
  border: 3px solid #fff;
  color: #fff;
  padding: 8px 16px;
  font-family: "Press Start 2P", cursive;
  font-size: 10px;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  box-shadow: 0 4px 0 #b33939;
  transition: all 0.1s;
}

.attack-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #b33939, 0 0 20px #ff475766;
}

.attack-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #b33939;
}

.attack-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.class-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  position: relative;
  z-index: 1;
}

.class-card {
  background: #0f0f1e;
  border: 4px solid #666;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.class-card.selected {
  border-color: #a29bfe;
  box-shadow: 0 0 20px #a29bfe66;
  transform: scale(1.05);
}

.class-card:hover {
  border-color: #a29bfe;
  transform: translateY(-3px);
}

.class-icon {
  font-size: 32px;
  margin-bottom: 8px;
  animation: pixel-blink 2s infinite;
}

.class-name {
  font-size: 11px;
  color: #fff;
}

.console {
  background: #000;
  border: 3px solid #00ff88;
  padding: 15px;
  height: 200px;
  overflow-y: auto;
  font-size: 10px;
  position: relative;
  z-index: 1;
}

.console-line {
  color: #00ff88;
  margin-bottom: 8px;
  text-shadow: 0 0 5px #00ff88;
  animation: glow-pulse 2s ease-in-out infinite;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  position: relative;
  z-index: 1;
}

.action-btn {
  flex: 1;
  background: linear-gradient(145deg, #00ff88, #00cc6a);
  border: 3px solid #fff;
  color: #000;
  padding: 12px;
  font-family: "Press Start 2P", cursive;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 0 4px 0 #008855;
  transition: all 0.1s;
  font-weight: bold;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #008855, 0 0 20px #00ff8866;
}

.action-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #008855;
}

.action-btn.heal {
  background: linear-gradient(145deg, #ff6b9d, #ff4569);
  box-shadow: 0 4px 0 #b33956;
}

.action-btn.heal:hover {
  box-shadow: 0 6px 0 #b33956, 0 0 20px #ff6b9d66;
}

.action-btn.heal:active {
  box-shadow: 0 2px 0 #b33956;
}

.shop-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.shop-container {
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border: 5px solid #ffd700;
  padding: 30px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 
    inset 0 0 0 3px rgba(0,0,0,0.5),
    0 0 30px #ffd70066;
}

.shop-title {
  font-size: 24px;
  color: #ffd700;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 0 20px #ffd700;
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.shop-item {
  background: #0f0f1e;
  border: 3px solid #ffd700;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.shop-item:hover {
  border-color: #00ff88;
  box-shadow: 0 0 15px #00ff8866;
  transform: scale(1.02);
}

.shop-item-name {
  font-size: 12px;
  color: #fff;
  margin-bottom: 8px;
}

.shop-item-cost {
  font-size: 11px;
  color: #ffd700;
}

.equipped-badge {
  background: #00ff88;
  color: #000;
  padding: 3px 8px;
  font-size: 8px;
  margin-top: 5px;
  display: inline-block;
}

.close-shop-btn {
  background: linear-gradient(145deg, #ff4757, #ff6348);
  border: 3px solid #fff;
  color: #fff;
  padding: 12px 24px;
  font-family: "Press Start 2P", cursive;
  font-size: 10px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 0 #b33939;
  margin-top: 20px;
}

.close-shop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #b33939;
}

@media (max-width: 968px) {
  .game-grid {
    grid-template-columns: 1fr;
  }
  
  .pixel-title {
    font-size: 20px;
  }
  
  .class-grid {
    grid-template-columns: 1fr;
  }
  
  .inventory-grid {
    grid-template-columns: 1fr;
  }
}

.pixel-decor-row {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.pixel-badge {
  width: 60px;
  height: 60px;
  background: #1a1a2e;
  border: 4px solid ${getThemeColors().primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 
    inset 0 0 0 2px #4a148c,
    0 0 15px ${getThemeColors().primary}66;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pixel-badge:hover {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 
    inset 0 0 0 2px #4a148c,
    0 0 25px ${getThemeColors().primary};
}

.theme-badge {
  transition: all 0.3s ease;
}

.theme-badge:active {
  transform: scale(0.95) rotate(-5deg);
}

.pixel-divider {
  width: 80%;
  height: 8px;
  margin: 30px auto;
  background: repeating-linear-gradient(
    90deg,
    ${getThemeColors().primary} 0px,
    ${getThemeColors().primary} 10px,
    transparent 10px,
    transparent 20px
  );
  box-shadow: 0 0 15px ${getThemeColors().primary}66;
  transition: all 0.5s ease;
}
      `}</style>

      <div className="medieval-wrapper">
        <div className="game-header">
          <h1 className="pixel-title">⚔️ PIXEL QUEST RPG ⚔️</h1>
          
          <div className="pixel-decor-row">
            <div className="pixel-badge theme-badge" onClick={cycleTheme} title="Changer le thème">
              🎨
            </div>
            <div className="pixel-badge">🗡️</div>
            <div className="pixel-badge">🛡️</div>
            <div className="pixel-badge">✨</div>
          </div>

          <div className="stats-bar">
            <div className="stat-box">
              <div className="stat-label">❤️ POINTS DE VIE</div>
              <div className="stat-value">{hp} / {maxHp}</div>
              <div className="progress-bar">
                <div className="progress-fill hp-fill" style={{width: `${(hp/maxHp)*100}%`}}></div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">🔵 MANA</div>
              <div className="stat-value">{mana} / {maxMana}</div>
              <div className="progress-bar">
                <div className="progress-fill mana-fill" style={{width: `${(mana/maxMana)*100}%`}}></div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">⚡ STAMINA</div>
              <div className="stat-value">{stamina} / {maxStamina}</div>
              <div className="progress-bar">
                <div className="progress-fill xp-fill" style={{width: `${(stamina/maxStamina)*100}%`}}></div>
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-label">💰 GOLD</div>
              <div className="stat-value">{gold}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">⭐ NIVEAU {level}</div>
              <div className="stat-value">XP: {xp}%</div>
              <div className="progress-bar">
                <div className="progress-fill xp-fill" style={{width: `${xp}%`}}></div>
              </div>
            </div>

            {critChance > 0 && (
              <div className="stat-box">
                <div className="stat-label">💥 CRIT CHANCE</div>
                <div className="stat-value">{critChance}%</div>
              </div>
            )}
          </div>

          <div className="pixel-divider" />
        </div>

        <div className="game-grid">
          <div className="game-panel avatar-panel">
            <h2 className="panel-title" style={{color: getThemeColors().primary}}>
              👤 TON HÉROS
            </h2>
            <div className="avatar-display">{getClassAvatar()}</div>
            <div style={{fontSize: '14px', color: '#fff', marginBottom: '15px'}}>
              {selectedClass.toUpperCase()}
            </div>
            
            <div className="equipment-display">
              <div className={`equipment-slot ${equippedWeapon ? 'equipped' : ''}`}>
                <div className="equipment-label">⚔️ ARME</div>
                <div className="equipment-item">
                  {equippedWeapon ? `${equippedWeapon.name} (+${equippedWeapon.damage} DMG)` : 'Aucune'}
                </div>
              </div>
              
              <div className={`equipment-slot ${equippedArmor ? 'equipped' : ''}`}>
                <div className="equipment-label">🛡️ ARMURE</div>
                <div className="equipment-item">
                  {equippedArmor ? `${equippedArmor.name} (+${equippedArmor.defense} DEF)` : 'Aucune'}
                </div>
              </div>
              
              <div className={`equipment-slot ${equippedAccessory ? 'equipped' : ''}`}>
                <div className="equipment-label">💍 ACCESSOIRE</div>
                <div className="equipment-item">
                  {equippedAccessory ? equippedAccessory.name : 'Aucun'}
                </div>
              </div>
            </div>
          </div>

          <div className="game-panel panel-inventory">
            <h2 className="panel-title" style={{color: getThemeColors().tertiary}}>
              🎒 INVENTAIRE MYSTIQUE
            </h2>
            <div className="inventory-grid">
              {inventory.map(item => (
                <div 
                  key={item.id} 
                  className={`inventory-item rarity-${item.rarity}`}
                  onClick={() => item.type && equipItem(item)}
                  style={{cursor: item.type ? 'pointer' : 'default'}}
                >
                  {item.name}
                  {item.damage && <div style={{fontSize: '9px', marginTop: '5px'}}>DMG: +{item.damage}</div>}
                  {item.defense && <div style={{fontSize: '9px', marginTop: '5px'}}>DEF: +{item.defense}</div>}
                  {(equippedWeapon?.id === item.id || equippedArmor?.id === item.id || equippedAccessory?.id === item.id) && (
                    <div className="equipped-badge">ÉQUIPÉ</div>
                  )}
                </div>
              ))}
            </div>
            <div className="action-buttons">
              <button className="action-btn" onClick={heal} disabled={hp >= maxHp || mana < 20}>
                ⚗️ SOIGNER (20 MANA)
              </button>
              <button className="action-btn" onClick={restoreMana} disabled={mana >= maxMana || stamina < 15}>
                🔵 MANA (15 STAM)
              </button>
              <button className="action-btn" onClick={() => setShowShop(true)}>
                💎 MAGASIN
              </button>
            </div>
          </div>

          <div className="game-panel panel-combat">
            <h2 className="panel-title" style={{color: getThemeColors().accent}}>
              ⚔️ COMBAT ÉPIQUE
            </h2>
            <div className="enemy-list">
              {enemies.map(enemy => (
                <div key={enemy.id} className={`enemy-card ${enemy.id === 99 && !enemy.locked ? 'boss-card' : ''} ${enemy.locked ? 'locked-enemy' : ''}`}>
                  <div className="enemy-header">
                    <span className="enemy-name">{enemy.name}</span>
                    <span className="enemy-hp">HP: {enemy.hp}/{enemy.maxHp}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill hp-fill" 
                      style={{width: `${(enemy.hp/enemy.maxHp)*100}%`}}
                    ></div>
                  </div>
                  <button 
                    className="attack-btn" 
                    onClick={() => attack(enemy.id)}
                    disabled={enemy.hp === 0 || mana < 10 || stamina < 10 || enemy.locked}
                  >
                    {enemy.locked ? '🔒 VERROUILLÉ' : enemy.hp === 0 ? '💀 VAINCU' : '⚡ ATTAQUER (-10 MANA/-10 STAM)'}
                  </button>
                </div>
              ))}
            </div>
            <div className="action-buttons">
              <button className="action-btn" onClick={resetCombat}>
                🔄 RESET COMBAT
              </button>
              {level >= 20 && enemies.find(e => e.id === 99)?.locked && (
                <button className="action-btn" onClick={summonBoss} style={{background: 'linear-gradient(145deg, #ff0000, #aa0000)'}}>
                  👹 DÉBLOQUER BOSS
                </button>
              )}
            </div>
          </div>

          <div className="game-panel panel-classes">
            <h2 className="panel-title" style={{color: getThemeColors().accent}}>
              🎭 CLASSES DE HÉROS
            </h2>
            <div className="class-grid">
              <div 
                className={`class-card ${selectedClass === 'knight' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('knight')}
              >
                <div className="class-icon">⚔️</div>
                <div className="class-name">CHEVALIER</div>
              </div>
              <div 
                className={`class-card ${selectedClass === 'mage' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('mage')}
              >
                <div className="class-icon">🧙‍♂️</div>
                <div className="class-name">MAGE</div>
              </div>
              <div 
                className={`class-card ${selectedClass === 'ranger' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('ranger')}
              >
                <div className="class-icon">🏹</div>
                <div className="class-name">RÔDEUR</div>
              </div>
              <div 
                className={`class-card ${selectedClass === 'assassin' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('assassin')}
              >
                <div className="class-icon">🗡️</div>
                <div className="class-name">ASSASSIN</div>
              </div>
              <div 
                className={`class-card ${selectedClass === 'paladin' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('paladin')}
              >
                <div className="class-icon">🛡️</div>
                <div className="class-name">PALADIN</div>
              </div>
              <div 
                className={`class-card ${selectedClass === 'necro' ? 'selected' : ''}`}
                onClick={() => setSelectedClass('necro')}
              >
                <div className="class-icon">💀</div>
                <div className="class-name">NÉCROMANCIEN</div>
              </div>
            </div>
          </div>

          <div className="game-panel panel-console">
            <h2 className="panel-title" style={{color: getThemeColors().secondary}}>
              📟 CONSOLE DE QUÊTES
            </h2>
            <div className="console">
              {messages.map((msg, i) => (
                <div key={i} className="console-line">
                  &gt; {msg}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showShop && (
          <div className="shop-overlay">
            <div className="shop-container">
              <h2 className="shop-title">🏪 MAGASIN MYSTIQUE 🏪</h2>
              <div style={{textAlign: 'center', color: '#00ff88', fontSize: '14px', marginBottom: '20px'}}>
                💰 Ton Gold: {gold}
              </div>
              <div className="shop-grid">
                {shopItems.map(item => (
                  <div 
                    key={item.id} 
                    className="shop-item"
                    onClick={() => buyItem(item)}
                  >
                    <div className="shop-item-name">{item.name}</div>
                    <div className="shop-item-cost">💰 {item.cost} Gold</div>
                  </div>
                ))}
              </div>
              <button className="close-shop-btn" onClick={() => setShowShop(false)}>
                ❌ FERMER MAGASIN
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}