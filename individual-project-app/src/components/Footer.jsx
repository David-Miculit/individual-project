export default function Footer() {
  return (
    <footer className=" border-t border-zinc-900 py-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} F1Hub</p>
      <p className="mt-2 italic">Data provided by OpenF1 API</p>
    </footer>
  )
}