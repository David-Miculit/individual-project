import { Link } from "react-router-dom"

export default function HomePage() {
  return(
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] animate-fade-in">
      <h1 className="text-6xl font-bold mb-2 uppercase tracking-tighter italic">
        Your <span className="text-red-800">Race Weekend</span> Hub
      </h1>
      <p className="text-slate-400 text-lg mb-8">Get F1 session updates, driver times and director notes directly from the track</p>
      <div className="flex gap-4">
        <Link to="/dashboard" className="bg-red-800 text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-red-700 transition">Go to dashboard</Link>
        <Link to="/contact" className="bg-zinc-800 text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-zinc-700 transition">Contact us</Link>
      </div>
    </div>
  )
}