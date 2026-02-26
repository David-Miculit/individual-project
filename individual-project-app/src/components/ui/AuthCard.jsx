export default function AuthCard({title, children}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-lg p-8 border border-zinc-800 rounded-xl bg-zinc-950/50 backdrop-blur-sm">
        {title && (
          <h2 className="text-3xl font-bold uppercase text-center mb-6">{title}</h2>
        )}
        {children}
      </div>
    </div>
  )
}