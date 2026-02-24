import { Link } from "react-router-dom"
import f1Bg from "../assets/f1bg.jpg"

export default function HomePage() {
  return (
    <section className="relative bg-cover bg-center" style={{ backgroundImage: `url(${f1Bg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black" />

      <div className="relative flex flex-col items-center justify-center text-center min-h-[75vh] animate-fade-in">
        <div className="absolute inset-0 bg-black/10 backdrop- -z-10 rounded-xl" />
        <h1 className="text-6xl font-extrabold mb-2 uppercase tracking-tighter italic bg-gradient-to-b from-slate-100 to-slate-300 bg-clip-text drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
          Your <span className="text-f1red">Race Weekend</span> Hub
        </h1>

        <p className="text-slate-100 text-lg mb-8 bg-gradient-to-b from-slate-100 to-slate-300 bg-clip-text">
          Get F1 session updates, driver times and director notes directly from the track
        </p>

        <div className="flex gap-4">
          <Link to="/dashboard" className="border px-8 py-3 rounded-md font-bold uppercase hover:bg-f1red/80 hover:scale-[1.02] transition">Go to dashboard</Link>
          <Link to="/contact" className="border px-8 py-3 rounded-md font-bold uppercase hover:bg-zinc-700/80 hover:scale-[1.02] transition">Contact us</Link>
        </div>
      </div>
    </section>
  )
}