/**
 * Système de missions NIRD - RPG éducatif
 * Structure complète avec indicateurs et impacts
 */

export const missionsData = [
  {
    id: 'mission-informatique',
    title: 'Informatique',
    subtitle: 'Transition numérique des postes',
    location: 'Salle Informatique',
    description: 'Les postes informatiques de l\'établissement sont vieillissants et coûteux à maintenir. Comment moderniser sans dépendre des géants du numérique ?',
    context: 'Vous devez décider comment renouveler le parc informatique de l\'établissement. Chaque choix aura des impacts sur le budget, l\'écologie et la souveraineté numérique.',
    icon: '💻',
    difficulty: 'medium',
    choices: [
      {
        id: 'informatique-A',
        label: 'Migrer vers Linux',
        emoji: '🐧',
        advantages: [
          'Compatible avec machines plus anciennes',
          'Pas de coût de licences',
          'Meilleure durée de vie du matériel'
        ],
        disadvantages: [
          'Besoin d\'accompagnement pour les enseignants',
          'Apprentissage de nouvelles interfaces'
        ],
        impacts: {
          sobriete: 10,
          reemploi: 20,
          logicielsLibres: 25,
          budget: 15,
          ecoImpact: 10
        },
        conclusion: 'Linux offre une seconde vie aux vieux ordinateurs !'
      },
      {
        id: 'informatique-B',
        label: 'Acheter des PC neufs + Windows 11',
        emoji: '🪟',
        advantages: [
          'Simple et rapide à mettre en place'
        ],
        disadvantages: [
          'Coût élevé et récurrent',
          'Dépendance accrue aux Big Tech',
          'Génération massive de déchets électroniques'
        ],
        impacts: {
          sobriete: -10,
          reemploi: -20,
          logicielsLibres: -15,
          budget: -30,
          ecoImpact: -25
        },
        conclusion: 'Un choix coûteux et écologiquement désastreux...'
      },
      {
        id: 'informatique-C',
        label: 'Réparer et optimiser les PC existants',
        emoji: '🔧',
        advantages: [
          'Nettoyage, ajout SSD/RAM → très efficace',
          'Prolonge la durée de vie',
          'Coût modéré'
        ],
        disadvantages: [
          'Maintenance proactive nécessaire',
          'Impact limité en termes de dépendance logicielle'
        ],
        impacts: {
          sobriete: 15,
          reemploi: 25,
          logicielsLibres: 0,
          budget: 10,
          ecoImpact: 20
        },
        conclusion: 'Faire du neuf avec de l\'ancien, c\'est du génie !'
      }
    ]
  },

  {
    id: 'mission-administration',
    title: 'Administration',
    subtitle: 'Bureaucratie numérique',
    location: 'Administration',
    description: 'L\'établissement dépend lourdement de logiciels propriétaires coûteux. Quelles alternatives pour une meilleure souveraineté ?',
    context: 'Les frais de licence pour Microsoft Office et Google Workspace grèvent le budget. Vous avez l\'opportunité de changer cette dynamique.',
    icon: '🏛️',
    difficulty: 'hard',
    choices: [
      {
        id: 'administration-A',
        label: 'Passer aux alternatives libres',
        emoji: '📄',
        advantages: [
          'Économies massives (30k+ €/an)',
          'Données hébergées localement',
          'Écosystème cohérent et souverain'
        ],
        disadvantages: [
          'Nécessite formation du personnel',
          'Migration progressive des données'
        ],
        impacts: {
          budget: 30,
          logicielsLibres: 40,
          ecoImpact: 10,
          sobriete: 10,
          reemploi: 0
        },
        conclusion: 'LibreOffice + Nextcloud = indépendance financière !'
      },
      {
        id: 'administration-B',
        label: 'Renégocier les abonnements actuels',
        emoji: '💰',
        advantages: [
          'Réduction des coûts court terme'
        ],
        disadvantages: [
          'Dépendance forte maintenue',
          'Augmentations futures inévitables'
        ],
        impacts: {
          budget: 10,
          logicielsLibres: -5,
          sobriete: 5,
          ecoImpact: 0,
          reemploi: 0
        },
        conclusion: 'Un pansement sur une plaie qui s\'agrandit...'
      },
      {
        id: 'administration-C',
        label: 'Garder les abonnements actuels',
        emoji: '🔒',
        advantages: [],
        disadvantages: [
          'Très coûteux (60k+ €/an)',
          'Forte dépendance aux Big Tech',
          'Données entre les mains de tiers'
        ],
        impacts: {
          budget: -20,
          logicielsLibres: -15,
          sobriete: -5,
          ecoImpact: -5,
          reemploi: 0
        },
        conclusion: 'L\'inaction est un choix, mais au prix fort...'
      }
    ]
  },

  {
    id: 'mission-pedagogie',
    title: 'Salle des profs',
    subtitle: 'Support pédagogique',
    location: 'Salle des Professeurs',
    description: 'Comment fournir aux enseignants les meilleurs outils numériques pour enseigner de manière responsable ?',
    context: 'Les enseignants ont besoin d\'outils collaboratifs, de plateformes d\'apprentissage et de ressources. Vous pouvez orienter le choix vers plus de responsabilité.',
    icon: '👨‍🏫',
    difficulty: 'medium',
    choices: [
      {
        id: 'pedagogie-A',
        label: 'Introduire Moodle + outils libres',
        emoji: '📚',
        advantages: [
          'Très complet et modulable',
          'Libre et souverain',
          'Mutualisable avec d\'autres établissements'
        ],
        disadvantages: [
          'Besoin d\'accompagnement pédagogique',
          'Transition depuis les outils actuels'
        ],
        impacts: {
          logicielsLibres: 30,
          sobriete: 10,
          budget: 10,
          ecoImpact: 10,
          reemploi: 0
        },
        conclusion: 'Moodle : la plateforme open source de référence !'
      },
      {
        id: 'pedagogie-B',
        label: 'Créer un groupe de formation',
        emoji: '🎓',
        advantages: [
          'Excellent impact pédagogique',
          'Améliore les pratiques globalement',
          'Engagement du corps enseignant'
        ],
        disadvantages: [
          'Ne change pas immédiatement les outils utilisés',
          'Demande du temps et de l\'engagement'
        ],
        impacts: {
          sobriete: 10,
          ecoImpact: 5,
          logicielsLibres: 5,
          budget: 0,
          reemploi: 0
        },
        conclusion: 'La formation, c\'est l\'outil le plus puissant !'
      },
      {
        id: 'pedagogie-C',
        label: 'Continuer avec les outils propriétaires',
        emoji: '⛓️',
        advantages: [
          'Simplicité apparente'
        ],
        disadvantages: [
          'Dépendance Big Tech maintenue',
          'Pas aligné avec les objectifs NIRD',
          'Pas d\'exemplarité pour les élèves'
        ],
        impacts: {
          logicielsLibres: -20,
          budget: -10,
          sobriete: -5,
          ecoImpact: -10,
          reemploi: 0
        },
        conclusion: 'L\'status quo n\'est jamais neutre...'
      }
    ]
  },

  {
    id: 'mission-sensibilisation',
    title: 'Élèves & Familles',
    subtitle: 'Sensibilisation',
    location: 'Cour de récréation',
    description: 'Comment impliquer les élèves et les familles dans la transition numérique responsable ?',
    context: 'Les jeunes sont les premiers concernés par les enjeux du numérique. Les impliquer crée un vrai mouvement de changement.',
    icon: '👥',
    difficulty: 'easy',
    choices: [
      {
        id: 'sensibilisation-A',
        label: 'Ateliers "Numérique Responsable"',
        emoji: '🎨',
        advantages: [
          'Sensibilisation directe et efficace',
          'Engagement fort des élèves',
          'Créativité et partage'
        ],
        disadvantages: [
          'Demande du temps d\'organisation',
          'Nécessite des animateurs formés'
        ],
        impacts: {
          sobriete: 20,
          ecoImpact: 20,
          logicielsLibres: 5,
          reemploi: 5,
          budget: 0
        },
        conclusion: 'Les ateliers, c\'est du militantisme bienveillant !'
      },
      {
        id: 'sensibilisation-B',
        label: 'Programme "Réparer plutôt que jeter"',
        emoji: '🔨',
        advantages: [
          'Ateliers pratiques de réparation',
          'Évite l\'achat de nouveaux appareils',
          'Apprentissage concret'
        ],
        disadvantages: [
          'Nécessite encadrement expérimenté',
          'Infrastructure d\'atelier à prévoir'
        ],
        impacts: {
          reemploi: 25,
          sobriete: 10,
          ecoImpact: 20,
          budget: 5,
          logicielsLibres: 0
        },
        conclusion: 'Réparer, c\'est la meilleure consommation !'
      },
      {
        id: 'sensibilisation-C',
        label: 'Ne rien changer',
        emoji: '😴',
        advantages: [],
        disadvantages: [
          'Pas pédagogique',
          'Pas aligné NIRD',
          'Manque d\'exemplarité'
        ],
        impacts: {
          sobriete: -10,
          ecoImpact: -15,
          logicielsLibres: -5,
          reemploi: -5,
          budget: 0
        },
        conclusion: 'Le silence complice face aux Big Tech...'
      }
    ]
  }
];

/**
 * Configuration des indicateurs NIRD
 */
export const indicatorsConfig = {
  sobriete: {
    label: 'Sobriété Numérique',
    description: 'Réduire la consommation et les usages superflus',
    color: 'green',
    icon: '🍃',
    max: 100
  },
  reemploi: {
    label: 'Réemploi du matériel',
    description: 'Prolonger la durée de vie des équipements',
    color: 'blue',
    icon: '♻️',
    max: 100
  },
  logicielsLibres: {
    label: 'Logiciels Libres',
    description: 'Adopter des alternatives ouvertes et souveraines',
    color: 'purple',
    icon: '🔓',
    max: 100
  },
  budget: {
    label: 'Économies budgétaires',
    description: 'Réduire les dépenses informatiques',
    color: 'yellow',
    icon: '💰',
    max: 100
  },
  ecoImpact: {
    label: 'Impact écologique',
    description: 'Minimiser l\'empreinte carbone numérique',
    color: 'red',
    icon: '🌍',
    max: 100
  }
};

/**
 * Valeurs initiales des indicateurs
 */
export const initialIndicators = {
  sobriete: 0,
  reemploi: 0,
  logicielsLibres: 0,
  budget: 0,
  ecoImpact: 0
};
