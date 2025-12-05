import { useRole } from '../contexts/RoleContext';

const RoleSelector = () => {
  const { role, setRole } = useRole();

  const roles = [
    { id: 'eleve', name: 'Élève', emoji: '🎓', description: 'Utilisateur quotidien des outils numériques' },
    { id: 'enseignant', name: 'Enseignant', emoji: '👨‍🏫', description: 'Créateur de contenus pédagogiques' },
    { id: 'direction', name: 'Direction', emoji: '👔', description: 'Décideur et gestionnaire' },
    { id: 'technicien', name: 'Technicien', emoji: '🔧', description: 'Mainteneur de l\'infrastructure' },
    { id: 'parent', name: 'Parent', emoji: '👨‍👩‍👧', description: 'Usager des services scolaires' },
    { id: 'collectivite', name: 'Collectivité', emoji: '🏛️', description: 'Financeur et décideur territorial' }
  ];

  // N'affiche que si pas de rôle
  if (role) return null;

  const handleRoleSelect = (roleId) => {
    setRole(roleId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 max-w-4xl w-full border-4 border-yellow-600 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-yellow-800 mb-2">
          🎭 Choisissez votre rôle dans le village
        </h2>
        <p className="text-center text-slate-700 mb-6 text-lg">
          Chaque rôle offre une perspective unique et des missions différentes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id)}
              className="bg-white hover:bg-yellow-50 p-6 rounded-xl transition-all transform hover:scale-105 border-2 border-yellow-400 hover:border-yellow-600"
            >
              <div className="text-5xl mb-3">{r.emoji}</div>
              <div className="text-xl font-bold text-yellow-800 mb-2">{r.name}</div>
              <div className="text-sm text-gray-600">{r.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;