export default function ErrorBanner({message}) {
  if(!message) return null
  return (
    <div className="mb-4 p-3 text-sm text-f1red bg-f1red/10 border border-f1red/20 rounded">
      {message}
    </div>   
  )
}