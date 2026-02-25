import { Link } from "react-router-dom";

export default function SessionCard({session}) {
  return (
    <Link
      to={`/session/${session.session_key}`}
      state={{session}}
      key={session.session_key}
      className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 hover:border-f1red hover:bg-zinc-800/50 transition-all group"
    >
      <span className="text-xs font-bold text-f1red uppercase tracking-tighter">
        {session.session_type}
      </span>
      <h4 className="text-lg font-bold mt-1 group-hover:text-f1red transition-colors">
        {session.session_name}
      </h4>
      <p className="text-zinc-500 text-sm mt-4">
        {new Date(session.date_start).toLocaleString([], {dateStyle: "short", timeStyle:"short"})}
      </p>
    </Link>
  )
}