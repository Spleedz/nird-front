# 🎭 Système de Missions NIRD - Documentation

## 📋 Vue d'ensemble

Le système de missions est un RPG éducatif permettant aux utilisateurs de prendre des décisions stratégiques pour transformer leur établissement scolaire en "Village Numérique Résistant".

### Architecture

```
data/
  └─ missionsData.js          # Données brutes des 4 missions
contexts/
  └─ MissionsContext.jsx      # Gestion d'état global (indicateurs, historique)
components/
  ├─ MissionsHub.jsx          # Hub principal affichant toutes les missions
  ├─ MissionCard.jsx          # Carte d'une mission (grille)
  ├─ IndicatorsPanel.jsx      # Tableau de bord des 5 indicateurs
  ├─ MissionsButton.jsx       # Bouton d'accès aux missions
  └─ PlaceModal.jsx           # Détails d'une mission avec choix
```

---

## 🎮 Système de Jeu

### 4 Missions Principales

| Mission | Localisation | Difficulté | Indicateurs clés |
|---------|-------------|-----------|-----------------|
| **Informatique** | Salle Informatique | Moyen | Sobriété, Réemploi, FOSS |
| **Administration** | Administration | Difficile | Budget, Logiciels libres |
| **Pédagogie** | Salle des profs | Moyen | Logiciels libres, Sobriété |
| **Sensibilisation** | Cour de récréation | Facile | Réemploi, Impact écologique |

### 5 Indicateurs NIRD

Chaque indicateur va de 0 à 100% et évolue selon les choix :

1. **🍃 Sobriété Numérique** - Consommation responsable
2. **♻️ Réemploi du matériel** - Prolonger la durée de vie
3. **🔓 Logiciels Libres** - Alternatives ouvertes et souveraines
4. **💰 Économies budgétaires** - Réduire les dépenses
5. **🌍 Impact écologique** - Minimiser l'empreinte carbone

### Système de Choix

Chaque mission propose 3 choix (A, B, C) avec :
- Avantages et inconvénients explicites
- Impacts chiffrés sur les 5 indicateurs
- Phrase de conclusion narrative

**Exemple : Mission Informatique, Choix A (Linux)**
```
+10 Sobriété
+20 Réemploi
+25 Logiciels libres
+15 Budget
+10 Impact écologique
```

---

## 🔧 Utilisation du Contexte

### Import et utilisation du hook

```jsx
import { useMissions } from '../contexts/MissionsContext';

function MonComposant() {
  const {
    indicators,           // Objet {sobriete: 30, reemploi: 25, ...}
    completedMissions,    // Array d'IDs de missions complétées
    applyChoice,          // Fonction pour appliquer un choix
    resetMissions,        // Réinitialiser le jeu
    calculateScore,       // Retourne le score global 0-100
    history               // Historique des choix (pour déboguer/rejouer)
  } = useMissions();

  // Appliquer un choix
  const impacts = { sobriete: 10, reemploi: 20, ... };
  applyChoice('mission-informatique', 'informatique-A', impacts);
}
```

### Persistance

Les données sont automatiquement sauvegardées dans `localStorage` sous la clé `'nird-missions-data'` :

```javascript
{
  indicators: { sobriete: 40, reemploi: 45, ... },
  completedMissions: ['mission-informatique', ...],
  history: [
    {
      missionId: 'mission-informatique',
      choiceId: 'informatique-A',
      impacts: { ... },
      timestamp: '2025-12-05T...'
    },
    ...
  ]
}
```

---

## 📊 Structure des données (missionsData.js)

### Mission

```javascript
{
  id: 'mission-informatique',
  title: 'Informatique',
  subtitle: 'Transition numérique des postes',
  location: 'Salle Informatique',
  description: '...',
  context: '...',
  icon: '💻',
  difficulty: 'medium',  // 'easy' | 'medium' | 'hard'
  choices: [...]
}
```

### Choice (Choix)

```javascript
{
  id: 'informatique-A',
  label: 'Migrer vers Linux',
  emoji: '🐧',
  advantages: ['...', '...'],
  disadvantages: ['...'],
  impacts: {
    sobriete: 10,
    reemploi: 20,
    logicielsLibres: 25,
    budget: 15,
    ecoImpact: 10
  },
  conclusion: 'Linux offre une seconde vie...'
}
```

### Indicateur

```javascript
{
  label: 'Sobriété Numérique',
  description: 'Réduire la consommation...',
  color: 'green',
  icon: '🍃',
  max: 100  // Valeur max
}
```

---

## 🎨 Composants disponibles

### MissionsHub

Page principale affichant toutes les missions en grille.

```jsx
import MissionsHub from './components/MissionsHub';

<MissionsHub />
```

**Features:**
- Grille responsive de missions
- Bouton afficher/masquer indicateurs
- Score global en haut
- Modal pour chaque mission

### IndicatorsPanel

Tableau de bord des 5 indicateurs avec barres de progression.

```jsx
import IndicatorsPanel from './components/IndicatorsPanel';

<IndicatorsPanel indicators={indicators} />
```

**Features:**
- Barre de progression colorée
- Commentaires dynamiques basés sur %
- Description de chaque indicateur

### MissionCard

Carte représentant une mission (pour grille).

```jsx
<MissionCard
  mission={mission}
  isCompleted={false}
  onClick={() => selectMission(mission)}
/>
```

---

## 🚀 Intégration dans VillageMap

Pour ajouter l'accès aux missions depuis le village :

```jsx
// Dans VillageMap.jsx

import MissionsButton from './MissionsButton';
import { useMissions } from '../contexts/MissionsContext';

const VillageMap = () => {
  const [showMissions, setShowMissions] = useState(false);
  const { calculateScore } = useMissions();

  return (
    <div>
      {/* ... contenu existant ... */}
      
      <MissionsButton onClick={() => setShowMissions(true)} />

      {showMissions && (
        <MissionsModal onClose={() => setShowMissions(false)} />
      )}
    </div>
  );
};
```

---

## 🎯 Cas d'usage

### 1. Afficher le score global
```jsx
const score = calculateScore(); // 0-100
```

### 2. Enregistrer un choix utilisateur
```jsx
applyChoice('mission-informatique', 'informatique-A', impacts);
// Score augmente, mission marquée comme complétée
```

### 3. Afficher seulement les missions non complétées
```jsx
const remainingMissions = missionsData.filter(
  m => !completedMissions.includes(m.id)
);
```

### 4. Réinitialiser le jeu
```jsx
resetMissions();
```

---

## 📈 Évolutions futures

### À ajouter :

1. **Système de récompenses** : Badges/Trophées selon le score
2. **Mode multijoueur** : Comparer scores entre établissements
3. **Missions avancées** : Débloquer missions bonus selon choix précédents
4. **Statistiques détaillées** : Graphiques, rapports par domaine
5. **Intégration backend** : Persister données en DB
6. **Achievements** : Débloquer selon combinaisons spécifiques

---

## 🐛 Débogage

### Voir l'historique des choix
```javascript
console.log(JSON.parse(localStorage.getItem('nird-missions-data')).history);
```

### Réinitialiser le localStorage
```javascript
localStorage.removeItem('nird-missions-data');
window.location.reload();
```

### Vérifier les indicateurs actuels
```javascript
console.log(JSON.parse(localStorage.getItem('nird-missions-data')).indicators);
```

---

## 📝 Notes

- Les valeurs des indicateurs sont clampées entre 0 et 100
- Les missions complétées ne peuvent être refaites (stocké dans `completedMissions`)
- Le score global est la moyenne de tous les indicateurs
- Les impacts négatifs réduisent les indicateurs
- Chaque choix enregistre un timestamp pour l'historique

