export default function DashboardHeader({filterType,sortOrder,onSortToggle,onFilterChange}) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-800 pb-4">
      <div>
        <h2 className="text-4xl font-bold uppercase text-f1red">Recent Sessions</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button onClick={onSortToggle} className="px-4 py-1 text-xs font-bold uppercase rounded border border-zinc-700 hover:bg-zinc-800 transition">
          Sort Date: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
        </button>

        <div className="flex gap-2 bg-zinc-900 p-1 rounded-md border border-zinc-800">
          {["All", "Race", "Qualifying", "Practice"].map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              className={`px-4 py-1 text-xs font-bold uppercase rounded transition-colors 
                ${filterType === type ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}