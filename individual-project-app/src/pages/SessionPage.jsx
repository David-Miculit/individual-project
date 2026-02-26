import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SessionPageHeader from "../components/sessionPage/sessionPageHeader";
import formatTime from "../scripts/utils";
import RaceDirectorNotes from "../components/sessionPage/RaceDirectorNotes";
import LeaderboardTable from "../components/sessionPage/LeaderboardTable";

const lastValue = (arr) => {
	if (Array.isArray(arr)) {
		for (let i = arr.length - 1; i >= 0; i--) {
			if (arr[i] !== null && arr[i] !== undefined) return arr[i]
		}
		return undefined
	}
	return arr
}

export default function SessionPage() {
  const {state} = useLocation()
  const {id} = useParams()
  const session = state?.session
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!session) return

		let cancelled = false
		setLoading(true)

		Promise.all([
			fetch(`https://api.openf1.org/v1/drivers?session_key=${id}`).then((res) => res.json()),
			fetch(`https://api.openf1.org/v1/session_result?session_key=${id}`).then((res) => res.json()),
		])
			.then(([driversData, sessionResultData]) => {
				if (cancelled) return

				const driversMap = {};
				(Array.isArray(driversData) ? driversData : []).forEach((d) => {
					driversMap[d.driver_number] = d
				})

				const rows = (Array.isArray(sessionResultData) ? sessionResultData : [])
					.filter((r) => r && r.position != null && r.driver_number != null)
					.sort((a, b) => a.position - b.position)

				const processed = rows.map((r, idx) => {
					const driver = driversMap[r.driver_number];
					const gap = Number(lastValue(r.gap_to_leader) ?? 0)
					const prevGap = Number(idx > 0 ? lastValue(rows[idx - 1].gap_to_leader) : 0 ?? 0)
					const duration = Number(lastValue(r.duration))

					return {
						position: r.position,
						driver_number: r.driver_number,
						driver,
						completed_laps: r.number_of_laps ?? 0,
						display_time: Number.isFinite(duration) ? formatTime(duration) : "NO TIME",
						gap_to_leader: r.position === 1 ? "LEADER" : `+${gap.toFixed(3)}s`,
						interval: r.position === 1 ? "+0.000s" : `+${Math.max(0, gap - prevGap).toFixed(3)}s`,
					};
				});

				setResults(processed);
				setLoading(false);
			})
				.catch(() => {
				if (cancelled) return;
				setLoading(false);
			})
		
		// if user moves away, cancel request
		return () => {
			cancelled = true;
		}
	}, [id, session]);

  if (!session) 
		return <div className="text-center py-20 text-zinc-500">Session data not found. Try navigating from the Dashboard.</div>;
  
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in p-4 mt-6">
			<SessionPageHeader session={session} />
			<RaceDirectorNotes sessionKey={id} />

      <div className="bg-zinc-900/80 rounded-lg border border-zinc-800 overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-zinc-500">Processing live timing data...</div>
        ) : (
					<LeaderboardTable results={results} />
        )}
      </div>
    </div>
  );
}