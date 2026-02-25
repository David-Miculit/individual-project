import SessionCard from "./SessionCard";

function sessionFilter(session, type) {
  if (type === "All") return true;

  const sessionType = (session.session_type || "").toLowerCase()

  if (type === "Race") {
    return sessionType.includes("race")
  }
  if (type === "Qualifying") {
    return sessionType.includes("qualifying")
  }
  if (type === "Practice") {
    return sessionType.includes("practice")
  }
  return false
}

export default function SessionsList({ groupedByWeekend, filterType }) {
  if (!groupedByWeekend || groupedByWeekend.length === 0) {
    return (
      <div className="text-center py-20 bg-zinc-900 rounded-xl ">
        <p className="text-zinc-500 italic">No recent sessions found.</p>
      </div>
    )
  }

  return (
    <section className="space-y-12">
      {groupedByWeekend.map((weekend) => {
        const filteredSessions = weekend.sessions.filter((s) =>
          sessionFilter(s, filterType)
        )
        if (filteredSessions.length === 0) return null;

        return (
          <div key={weekend.id} className="border-l-2 border-zinc-800 pl-6 animate-fade-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{weekend.circuitName}</h3>
              <p className="text-zinc-500 uppercase text-sm">{weekend.location}</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session.session_key ?? `${session.meeting_key}-${session.date_start}-${session.session_name}`}
                  session={session}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
