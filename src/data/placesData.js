export const placesData = [
  {
    id: 'ecole',
    name: 'L\'École',
    type: 'education',
    emoji: '🏫',
    position: { top: '40%', left: '32%' },
    descriptionProbleme: 'Dépendance totale à Google Workspace et Microsoft 365 pour les cours et devoirs.',
    pistesNIRD: [
      { pillar: 'responsabilite', text: 'Migrer vers Nextcloud + OnlyOffice pour le cloud collaboratif' },
      { pillar: 'inclusion', text: 'Utiliser des formats ouverts (ODF) accessibles sur tout appareil' },
      { pillar: 'durabilite', text: 'Héberger localement pour réduire l\'empreinte carbone' }
    ],
    rolesCibles: ['enseignant', 'eleve', 'direction'],
    missions: ['mission-cloud-libre', 'mission-formats-ouverts']
  },
  {
    id: 'cantine',
    name: 'La Cantine',
    type: 'social',
    emoji: '🍽️',
    position: { top: '58%', left: '66.5%' },
    descriptionProbleme: 'Système de réservation propriétaire coûteux avec frais de transaction élevés.',
    pistesNIRD: [
      { pillar: 'durabilite', text: 'Solution open-source auto-hébergée sans frais cachés' },
      { pillar: 'inclusion', text: 'Interface accessible aux familles sans smartphone' },
      { pillar: 'responsabilite', text: 'Données des élèves stockées localement' }
    ],
    rolesCibles: ['parent', 'direction', 'eleve'],
    missions: ['mission-cantine-libre']
  },
  {
    id: 'bibliotheque',
    name: 'Bibliothèque NIRD',
    type: 'ressources',
    emoji: '📚',
    position: { top: '70%', left: '76%' },
    descriptionProbleme: 'Centre de ressources sur le numérique libre et responsable.',
    pistesNIRD: [
      { pillar: 'inclusion', text: 'Découvrir des logiciels libres accessibles à tous' },
      { pillar: 'responsabilite', text: 'Comprendre les enjeux de la vie privée en ligne' },
      { pillar: 'durabilite', text: 'Apprendre la sobriété numérique et le réemploi' }
    ],
    rolesCibles: ['eleve', 'enseignant', 'parent', 'direction', 'technicien', 'collectivite'],
    missions: ['mission-bibliotheque'],
    isResourceLibrary: true
  },
  {
    id: 'salle-info',
    name: 'Salle Informatique',
    type: 'technique',
    emoji: '💻',
    position: { top: '60%', left: '20%' },
    descriptionProbleme: 'Ordinateurs obsolètes jetés alors qu\'ils pourraient revivre avec Linux.',
    pistesNIRD: [
      { pillar: 'durabilite', text: 'Installer des distributions légères (Ubuntu, Debian, Emmabuntüs)' },
      { pillar: 'inclusion', text: 'Récupérer du matériel d\'entreprises pour les réemployer' },
      { pillar: 'responsabilite', text: 'Former les élèves à Linux et aux logiciels libres' }
    ],
    rolesCibles: ['technicien', 'enseignant', 'collectivite'],
    missions: ['mission-linux-revival']
  },
  {
    id: 'administration',
    name: 'Administration',
    type: 'gestion',
    emoji: '🏛️',
    position: { top: '75%', left: '35%' },
    descriptionProbleme: 'Logiciels de gestion vie scolaire propriétaires avec vendor lock-in.',
    pistesNIRD: [
      { pillar: 'responsabilite', text: 'Adopter des solutions open-source type Pronote alternatives' },
      { pillar: 'durabilite', text: 'Mutualiser avec d\'autres établissements pour réduire les coûts' },
      { pillar: 'inclusion', text: 'Garantir l\'accessibilité pour toutes les familles' }
    ],
    rolesCibles: ['direction', 'collectivite'],
    missions: ['mission-gestion-libre']
  },
  {
    id: 'data-center',
    name: 'Data Center',
    type: 'infrastructure',
    emoji: '🔌',
    position: { top: '45%', left: '45%' },
    descriptionProbleme: 'Chaque école loue son serveur cloud chez AWS/Azure de façon indépendante.',
    pistesNIRD: [
      { pillar: 'durabilite', text: 'Créer un data center mutualisé local alimenté en énergie verte' },
      { pillar: 'responsabilite', text: 'Garder la maîtrise des données sur le territoire' },
      { pillar: 'inclusion', text: 'Partager les coûts entre plusieurs établissements' }
    ],
    rolesCibles: ['technicien', 'collectivite', 'direction'],
    missions: ['mission-datacenter-mutualise']
  },
  {
    id: 'big-tech',
    name: 'Big Tech',
    type: 'menace',
    emoji: '🏰',
    position: { top: '25%', left: '65%' },
    descriptionProbleme: 'Les géants du numérique (Google, Microsoft, Amazon) contrôlent nos données et imposent leurs services.',
    pistesNIRD: [
      { pillar: 'responsabilite', text: 'Reprendre le contrôle de vos données personnelles' },
      { pillar: 'durabilite', text: 'Réduire la dépendance aux serveurs américains gourmands en énergie' },
      { pillar: 'inclusion', text: 'Utiliser des alternatives libres et accessibles à tous' }
    ],
    rolesCibles: ['eleve', 'enseignant', 'parent', 'direction', 'technicien', 'collectivite'],
    missions: ['mission-resistance-bigtech']
  }
];