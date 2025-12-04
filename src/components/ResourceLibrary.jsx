import { resourcesData } from '../data/resourcesData';

const ResourceLibrary = ({ onClose }) => {
  const categories = [...new Set(resourcesData.map(r => r.category))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border-4 border-teal-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-300">📚 Bibliothèque NIRD</h2>
          <button
            onClick={onClose}
            className="text-4xl text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Découvrez les ressources essentielles pour un numérique libre, éthique et durable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourcesData.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-slate-600 p-5 rounded-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-teal-400"
            >
              <h3 className="text-xl font-bold text-teal-300 mb-2">{resource.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-900 text-teal-200 px-3 py-1 rounded-full">
                  {resource.category}
                </span>
                <span className="text-xs text-gray-400">🔗 Lien externe</span>
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all"
        >
          Fermer la bibliothèque
        </button>
      </div>
    </div>
  );
};

export default ResourceLibrary;