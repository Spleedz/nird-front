const PlaceMarker = ({ place, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 hover:z-20 group"
      style={{ top: place.position.top, left: place.position.left }}
    >
      <div className="relative">
        <div className="text-lg font-bold text-white drop-shadow-2xl animate-bounce-slow group-hover:animate-none bg-slate-900 bg-opacity-70 px-4 py-2 rounded-lg border-2 border-purple-500 hover:bg-opacity-90 transition-all">
          {place.name}
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900 bg-opacity-90 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-purple-500">
          <span className="text-sm font-bold text-purple-300">Cliquez pour en savoir plus</span>
        </div>
      </div>
    </button>
  );
};

export default PlaceMarker;