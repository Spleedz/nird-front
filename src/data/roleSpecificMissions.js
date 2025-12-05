/**
 * Missions NIRD spécifiques au rôle
 * Chaque rôle voit les missions sous sa propre perspective
 * Les impacts sont modulés par multiplicateurs spécifiques au rôle
 */

export const roleSpecificMissions = {
  eleve: [
    {
      id: 'mission-eleve-informatique',
      title: 'Mon PC est trop lent',
      subtitle: 'Pourquoi ça rame ?',
      location: 'Salle Informatique',
      description: 'Ton ordinateur d\'école est lent et frustrant. Pourquoi ? Comment ça pourrait s\'améliorer ?',
      context: 'Un vieux PC sous Windows, qui rame... Est-ce que c\'est normal ? Quelles solutions existent ?',
      icon: '🐢',
      difficulty: 'easy',
      choices: [
        {
          id: 'eleve-informatique-A',
          label: 'Mettre Linux pour que ce soit plus rapide',
          emoji: '🐧',
          advantages: ['Mes programmes chargeront plus vite', 'Moins d\'interruptions publicitaires'],
          disadvantages: ['Les interfaces seront différentes', 'Il faudra apprendre de nouvelles choses'],
          impacts: { sobriete: 8, reemploi: 12, logicielsLibres: 15, budget: 5, ecoImpact: 8 },
          conclusion: 'Donner une seconde vie aux vieux ordinateurs !'
        },
        {
          id: 'eleve-informatique-B',
          label: 'Attendre qu\'on achète des nouveaux PC',
          emoji: '⏳',
          advantages: ['On aura les dernières versions de Windows', 'Tout sera flambant neuf'],
          disadvantages: ['C\'est écologiquement pas terrible', 'Les anciennes machines partent à la poubelle'],
          impacts: { sobriete: -5, reemploi: -10, logicielsLibres: -8, budget: -15, ecoImpact: -12 },
          conclusion: 'Une solution qui pollue beaucoup...'
        },
        {
          id: 'eleve-informatique-C',
          label: 'Ajouter plus de RAM et un SSD',
          emoji: '⚡',
          advantages: ['Les PC vont vraiment plus vite', 'On garde les machines existantes'],
          disadvantages: ['Il faut trouver du personnel pour l\'installer', 'C\'est une maintenance à faire'],
          impacts: { sobriete: 10, reemploi: 15, logicielsLibres: 3, budget: 5, ecoImpact: 10 },
          conclusion: 'Faire du neuf avec du vieux, c\'est cool !'
        }
      ]
    },
    {
      id: 'mission-eleve-donnees',
      title: 'Mes données personnelles',
      subtitle: 'Où vont mes infos ?',
      location: 'Salle Informatique',
      description: 'Tes données scolaires (devoirs, notes, photos) sont stockées quelque part. Où ? Chez qui ?',
      context: 'L\'établissement utilise Google Classroom. Tes données vont aux serveurs de Google. Acceptable ?',
      icon: '🔒',
      difficulty: 'easy',
      choices: [
        {
          id: 'eleve-donnees-A',
          label: 'Utiliser un système local et souverain',
          emoji: '🇫🇷',
          advantages: ['Mes données restent en France', 'L\'école les contrôle', 'Plus de respect de la vie privée'],
          disadvantages: ['Les interfaces seront différentes', 'Moins de fonctionnalités'],
          impacts: { sobriete: 5, reemploi: 0, logicielsLibres: 20, budget: 8, ecoImpact: 5 },
          conclusion: 'La vraie indépendance commence par la souveraineté des données !'
        },
        {
          id: 'eleve-donnees-B',
          label: 'Garder Google, Microsoft, etc.',
          emoji: '🌐',
          advantages: ['Les outils qu\'on connaît déjà', 'Très de fonctionnalités'],
          disadvantages: ['Les GAFAM revendent nos données', 'Dépendance complète', 'On n\'a pas le choix'],
          impacts: { sobriete: -3, reemploi: 0, logicielsLibres: -10, budget: -5, ecoImpact: -2 },
          conclusion: 'Confortable mais au prix de notre liberté...'
        }
      ]
    }
  ],

  enseignant: [
    {
      id: 'mission-prof-pedagogie',
      title: 'Mes outils pédagogiques',
      subtitle: 'Comment j\'enseigne',
      location: 'Salle des Professeurs',
      description: 'Tu utilises des outils pour enseigner : plateforme d\'apprentissage, ressources, collaboration. Quels outils choisir ?',
      context: 'Tu dois créer un environnement pédagogique efficace ET responsable. Comment ?',
      icon: '📚',
      difficulty: 'medium',
      choices: [
        {
          id: 'prof-pedagogie-A',
          label: 'Moodle + outils libres collaboratifs',
          emoji: '🐧',
          advantages: ['Complet et modulable', 'Souverain et libre', 'Partage entre écoles possible'],
          disadvantages: ['Temps d\'adaptation', 'Moins de marketing que les alternatives'],
          impacts: { sobriete: 12, reemploi: 5, logicielsLibres: 30, budget: 12, ecoImpact: 8 },
          conclusion: 'L\'outil de référence pour les pédagogues responsables !'
        },
        {
          id: 'prof-pedagogie-B',
          label: 'Google Classroom (gratuit pour les écoles)',
          emoji: '📖',
          advantages: ['Simple à utiliser', 'Gratuit en apparence', 'Beaucoup de ressources en ligne'],
          disadvantages: ['Données de tes élèves aux USA', 'Dépendance à Google', 'Risques de fermeture'],
          impacts: { sobriete: -5, reemploi: 0, logicielsLibres: -15, budget: 0, ecoImpact: -5 },
          conclusion: 'Gratuit ? Oui. Responsable ? Non...'
        },
        {
          id: 'prof-pedagogie-C',
          label: 'Créer une formation "Numérique responsable"',
          emoji: '🎓',
          advantages: ['Impacte tous les élèves', 'Sensibilise en profondeur', 'Transforme les mentalités'],
          disadvantages: ['Demande du temps et de l\'engagement', 'Doit être intégré au cursus'],
          impacts: { sobriete: 10, reemploi: 5, logicielsLibres: 15, budget: 8, ecoImpact: 10 },
          conclusion: 'La vraie transformation passe par l\'éducation !'
        }
      ]
    },
    {
      id: 'mission-prof-ressources',
      title: 'Partage de ressources pédagogiques',
      subtitle: 'Comment partager mes cours ?',
      location: 'Salle des Professeurs',
      description: 'Tu as créé d\'excellentes ressources. Comment les partager sans dépendre des GAFAM ?',
      context: 'Les plateformes propriétaires prennent tes contenus en échange d\'une apparente gratuité.',
      icon: '📝',
      difficulty: 'medium',
      choices: [
        {
          id: 'prof-ressources-A',
          label: 'Mutualiser sur Educadhoc (plateforme libre)',
          emoji: '🤝',
          advantages: ['Ressources restent libres', 'Partage français et européen', 'Crédits aux auteurs'],
          disadvantages: ['Moins connu', 'Communauté plus petite'],
          impacts: { sobriete: 8, reemploi: 0, logicielsLibres: 25, budget: 5, ecoImpact: 5 },
          conclusion: 'Le partage responsable des savoirs !'
        },
        {
          id: 'prof-ressources-B',
          label: 'Publier sur Pinterest / TeachersPayTeachers',
          emoji: '📌',
          advantages: ['Beaucoup de visibilité', 'Potentiel de monétisation'],
          disadvantages: ['Tes contenus servent à monétiser des données', 'Perte de contrôle'],
          impacts: { sobriete: -5, reemploi: 0, logicielsLibres: -10, budget: 0, ecoImpact: -3 },
          conclusion: 'Populaire mais à quel prix ?'
        }
      ]
    }
  ],

  direction: [
    {
      id: 'mission-direction-budget',
      title: 'Justifier l\'investissement numérique',
      subtitle: 'Où va le budget IT ?',
      location: 'Bureau de Direction',
      description: 'Le conseil d\'administration te pose une question difficile : pourquoi dépenser tant pour l\'informatique ? Comment justifier des outils libres à la collectivité ?',
      context: 'L\'établissement dépense 60k€/an en licences. Peut-on faire mieux ?',
      icon: '💰',
      difficulty: 'hard',
      choices: [
        {
          id: 'direction-budget-A',
          label: 'Passer aux logiciels libres (économies 70%)',
          emoji: '💚',
          advantages: ['Économies massives justifiables', 'Données sécurisées localement', 'Indépendance technologique', 'Message politique positif'],
          disadvantages: ['Transition complexe', 'Formation nécessaire', 'Changement culturel'],
          impacts: { sobriete: 15, reemploi: 8, logicielsLibres: 35, budget: 40, ecoImpact: 12 },
          conclusion: 'Le ROI des logiciels libres : économies + éthique !'
        },
        {
          id: 'direction-budget-B',
          label: 'Renégocier les contrats Microsoft/Google',
          emoji: '📋',
          advantages: ['Réduction court terme', 'Continuité', 'Moins disruptif'],
          disadvantages: ['Les prix remontent toujours', 'Dépendance maintenue'],
          impacts: { sobriete: 5, reemploi: 0, logicielsLibres: -5, budget: 15, ecoImpact: 2 },
          conclusion: 'Un pansement temporaire...'
        },
        {
          id: 'direction-budget-C',
          label: 'Garder les abonnements premium actuels',
          emoji: '🔒',
          advantages: ['Pas de changement', 'SAV réputé'],
          disadvantages: ['Coûts non justifiables', 'Budget serré'],
          impacts: { sobriete: -8, reemploi: -5, logicielsLibres: -20, budget: -25, ecoImpact: -8 },
          conclusion: 'L\'inaction = démission managériale'
        }
      ]
    },
    {
      id: 'mission-direction-gouvernance',
      title: 'Créer une charte numérique',
      subtitle: 'Gouvernance IT responsable',
      location: 'Bureau de Direction',
      description: 'Fixer les principes directeurs : données protégées, outils responsables, formation continue.',
      context: 'Tu dois donner une direction claire à la transformation numérique.',
      icon: '📜',
      difficulty: 'hard',
      choices: [
        {
          id: 'direction-gouvernance-A',
          label: 'Créer une charte NIRD',
          emoji: '✍️',
          advantages: ['Vision partagée', 'Critères d\'évaluation clairs', 'Engagement de tous'],
          disadvantages: ['Complexe à établir', 'Demande une concertation'],
          impacts: { sobriete: 15, reemploi: 10, logicielsLibres: 20, budget: 10, ecoImpact: 15 },
          conclusion: 'Fixer les règles du jeu du numérique responsable !'
        }
      ]
    }
  ],

  technicien: [
    {
      id: 'mission-tech-infrastructure',
      title: 'Moderniser l\'infrastructure IT',
      subtitle: 'Serveurs et réseau',
      location: 'Salle Serveurs',
      description: 'Les serveurs vieillissent. Comment moderniser en restant écologique et indépendant ?',
      context: 'Tu as du matériel vieillissant à renouveler. Quelle stratégie adopter ?',
      icon: '⚙️',
      difficulty: 'hard',
      choices: [
        {
          id: 'tech-infra-A',
          label: 'Virtualiser sur Linux + économie d\'énergie',
          emoji: '🐧',
          advantages: ['Consommation énergétique -60%', 'Meilleure utilisation des ressources', 'Maintenance simplifiée'],
          disadvantages: ['Transition importante', 'Expertise requise'],
          impacts: { sobriete: 25, reemploi: 20, logicielsLibres: 30, budget: 20, ecoImpact: 30 },
          conclusion: 'Data center vert = technologie de demain !'
        },
        {
          id: 'tech-infra-B',
          label: 'Acheter des serveurs Windows/VMware dernière génération',
          emoji: '💻',
          advantages: ['Puissance maximale', 'Support propriétaire'],
          disadvantages: ['Très coûteux', 'Forte dépendance', 'Énergétique'],
          impacts: { sobriete: -15, reemploi: -10, logicielsLibres: -25, budget: -35, ecoImpact: -25 },
          conclusion: 'La solution techniquement puissante mais écologiquement désastreuse'
        }
      ]
    },
    {
      id: 'mission-tech-securite',
      title: 'Sécurité des données',
      subtitle: 'Protéger les données de l\'établissement',
      location: 'Salle Serveurs',
      description: 'Comment protéger les données sans dépendre d\'outils propriétaires dont on ne maîtrise pas le code ?',
      context: 'Les données de l\'établissement (notes, documents, infos personnelles) ont besoin de protection maximale.',
      icon: '🔐',
      difficulty: 'hard',
      choices: [
        {
          id: 'tech-securite-A',
          label: 'Implémenter Nextcloud sécurisé + chiffrement',
          emoji: '🔒',
          advantages: ['Chiffrement maîtrisé', 'Données locales', 'Audit de code possible'],
          disadvantages: ['Maintenance requise', 'Expertise en sécurité nécessaire'],
          impacts: { sobriete: 12, reemploi: 8, logicielsLibres: 40, budget: 15, ecoImpact: 10 },
          conclusion: 'Sécurité par la transparence du code !'
        },
        {
          id: 'tech-securite-B',
          label: 'Utiliser OneDrive / iCloud for Business',
          emoji: '☁️',
          advantages: ['Simple à déployer', 'Support commercial'],
          disadvantages: ['Données chez Microsoft/Apple', 'Risques de fuite', 'Coûts cachés'],
          impacts: { sobriete: -5, reemploi: 0, logicielsLibres: -30, budget: -10, ecoImpact: -5 },
          conclusion: 'Confortable mais vous perdez le contrôle'
        }
      ]
    }
  ],

  parent: [
    {
      id: 'mission-parent-donnees',
      title: 'Données de mon enfant',
      subtitle: 'Qui a accès ?',
      location: 'Entrée de l\'école',
      description: 'Les données scolaires de ton enfant (photos, notes, travaux) sont stockées quelque part. Qui peut y accéder ?',
      context: 'L\'école utilise Google Classroom et des plateformes propriétaires. Est-ce que c\'est fiable et sécurisé ?',
      icon: '👨‍👩‍👧',
      difficulty: 'easy',
      choices: [
        {
          id: 'parent-donnees-A',
          label: 'Exiger un système de données local',
          emoji: '🏠',
          advantages: ['Données en France', 'Confiance accrue', 'Respect du RGPD'],
          disadvantages: ['Changement pour l\'école', 'Effort de communication'],
          impacts: { sobriete: 8, reemploi: 0, logicielsLibres: 18, budget: 10, ecoImpact: 5 },
          conclusion: 'Les parents responsables exigent la souveraineté des données !'
        },
        {
          id: 'parent-donnees-B',
          label: 'Faire confiance à Google/Microsoft',
          emoji: '🌐',
          advantages: ['Facile pour l\'école', 'Habitudes numériques'],
          disadvantages: ['Données aux USA', 'Risques de malveillance'],
          impacts: { sobriete: -3, reemploi: 0, logicielsLibres: -8, budget: 0, ecoImpact: -2 },
          conclusion: 'L\'inconscience est dangereuse pour vos enfants...'
        }
      ]
    }
  ],

  collectivite: [
    {
      id: 'mission-collectivite-territoire',
      title: 'Souveraineté numérique du territoire',
      subtitle: 'Stratégie territoriale',
      location: 'Mairie',
      description: 'En tant que collectivité, tu dois donner une direction numérique à tous les établissements du territoire. Comment ?',
      context: 'La collectivité finance l\'éducation. Elle peut imposer une stratégie numérique responsable.',
      icon: '🏛️',
      difficulty: 'hard',
      choices: [
        {
          id: 'collectivite-territoire-A',
          label: 'Créer une politique numérique responsable',
          emoji: '🌿',
          advantages: ['Impact sur 50+ établissements', 'Leadership régional', 'Économies massives', 'Indépendance technologique'],
          disadvantages: ['Changement culturel majeur', 'Formation à grande échelle'],
          impacts: { sobriete: 30, reemploi: 20, logicielsLibres: 40, budget: 50, ecoImpact: 35 },
          conclusion: 'Transformer un territoire en exemple de souveraineté numérique !'
        },
        {
          id: 'collectivite-territoire-B',
          label: 'Laisser chaque établissement choisir',
          emoji: '🎲',
          advantages: ['Flexibilité locale', 'Moins de coordination'],
          disadvantages: ['Incohérence territoriale', 'Pas d\'économies d\'échelle', 'Chaos numériques'],
          impacts: { sobriete: 0, reemploi: 0, logicielsLibres: 5, budget: -10, ecoImpact: 0 },
          conclusion: 'La liberté sans vision collective = gâchis collectif'
        }
      ]
    },
    {
      id: 'mission-collectivite-financement',
      title: 'Financer des communs numériques',
      subtitle: 'Investir dans l\'open source',
      location: 'Mairie',
      description: 'Financer des projets open source qui bénéficient à tous : Moodle amélioré, Nextcloud, etc.',
      context: 'Investir 5% du budget IT dans l\'open source = pérennité + impact social.',
      icon: '💚',
      difficulty: 'hard',
      choices: [
        {
          id: 'collectivite-financement-A',
          label: 'Créer un fonds territorial d\'open source',
          emoji: '🎯',
          advantages: ['Bénéficie à 100+ écoles', 'Emplois locaux', 'Attractivité territoriale', 'Pérennité'],
          disadvantages: ['Nouveau processus de gestion', 'Audit technique nécessaire'],
          impacts: { sobriete: 15, reemploi: 25, logicielsLibres: 45, budget: 20, ecoImpact: 15 },
          conclusion: 'Investir dans les communs = investir dans l\'avenir du territoire !'
        }
      ]
    }
  ]
};

/**
 * Multiplicateurs d'impact par rôle
 * Modulé le impact de chaque choix selon le rôle du joueur
 */
export const roleImpactMultipliers = {
  eleve: {
    sobriete: 0.8,           // L'élève a moins d'impact direct
    reemploi: 0.7,
    logicielsLibres: 1.2,    // Mais sensibilise à la liberté logicielle
    budget: 0.5,             // Pas en charge du budget
    ecoImpact: 0.9
  },
  enseignant: {
    sobriete: 1.0,
    reemploi: 0.9,
    logicielsLibres: 1.3,    // Expert dans ce domaine
    budget: 0.9,
    ecoImpact: 1.1
  },
  direction: {
    sobriete: 0.9,
    reemploi: 0.8,
    logicielsLibres: 1.1,
    budget: 1.5,             // Budget = sa responsabilité principale
    ecoImpact: 1.0
  },
  technicien: {
    sobriete: 1.3,           // Expert en optimisation énergétique
    reemploi: 1.2,           // Expert en réemploi de matériel
    logicielsLibres: 1.4,    // Expert en logiciels libres
    budget: 1.0,
    ecoImpact: 1.2
  },
  parent: {
    sobriete: 0.7,           // Impact indirect
    reemploi: 0.6,
    logicielsLibres: 1.0,
    budget: 0.5,             // Pas responsable du budget
    ecoImpact: 1.1           // Concerné par l'avenir
  },
  collectivite: {
    sobriete: 1.1,
    reemploi: 1.2,
    logicielsLibres: 1.3,
    budget: 1.5,             // Responsable des finances
    ecoImpact: 1.4           // Leadership écologique
  }
};
