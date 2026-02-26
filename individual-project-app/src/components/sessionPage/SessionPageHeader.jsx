import { Link } from "react-router-dom"

export default function SessionPageHeader({session}) {
  return (
    <>
      <Link to="/dashboard" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
        &larr; Back to Dashboard
      </Link>

      <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black italic uppercase mb-2 text-white">{session.circuit_short_name}</h1>
          <p className="text-f1red font-bold uppercase tracking-widest">{session.session_name}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 font-mono">{new Date(session.date_start).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  )
}