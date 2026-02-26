export default function LeaderboardTable({results =[]}) {
  console.log("rerender")
  return (
    <table className="w-full text-left whitespace-nowrap">
      <thead className="bg-zinc-950 border-b border-zinc-800">
        <tr>
          <th className="p-4 text-zinc-400 text-xs uppercase w-16 text-center">Pos</th>
          <th className="p-4 text-zinc-400 text-xs uppercase">Driver</th>
            <th className="p-4 text-zinc-400 text-xs uppercase text-center">Time</th>
            <th className="p-4 text-zinc-400 text-xs uppercase text-center">Gap to first</th>
            <th className="p-4 text-zinc-400 text-xs uppercase text-center">Interval</th>
            <th className="p-4 text-zinc-400 text-xs uppercase text-center">Laps Run</th>
        </tr>
      </thead>
      <tbody>
        {results.map((res) => (
          <tr key={res.driver_number} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
            <td className="p-4 font-mono text-xl font-black text-zinc-400 text-center">{res.position}</td>
            <td className="p-4 flex items-center gap-4">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: `#${res.driver.team_colour || '555'}` }}></div>
              <div>
                <p className="font-bold text-white uppercase">{res.driver.last_name || `Driver ${res.driver_number}`}</p>
                <p className="text-xs text-zinc-500">{res.driver.team_name}</p>
              </div>
            </td>
            <td className="p-4 font-mono font-bold text-f1red text-center">{res.display_time}</td>
            <td className="p-4 font-mono text-zinc-300 text-center">{res.gap_to_leader}</td>
            <td className="p-4 font-mono text-zinc-500 text-center">{res.interval}</td>
            <td className="p-4 font-mono text-zinc-500 text-center">{res.completed_laps}</td>
          </tr>
        ))}
        {results.length === 0 && <tr><td colSpan="6" className="p-10 text-center text-zinc-500 italic">No leaderboard data available for this session yet.</td></tr>}
      </tbody>
    </table>
  )
}