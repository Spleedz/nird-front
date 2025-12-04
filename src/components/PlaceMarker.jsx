const PlaceMarker = ({ place, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 hover:z-20 group"
      style={{ top: place.position.top, left: place.position.left }}
    >
      <div className="relative">
        <div className="text-lg font-bold text-slate-900 drop-shadow-2xl animate-bounce-slow group-hover:animate-none bg-yellow-100 bg-opacity-80 px-4 py-2 rounded-lg border-2 border-yellow-600 hover:bg-opacity-100 transition-all">
          {place.name}
        </div>
      </div>
    </button>
  );
};

export default PlaceMarker;