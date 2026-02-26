import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getState, saveState } from "../scripts/storage";

export default function AdminPage() {
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages(getState('adminMessages', []))
  }, [])

  const clearInbox = () => {
    saveState('adminMessages', [])
    setMessages([])
  }

  return (
    <div className="max-w-5xl py-8 mx-auto space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h2 className="text-3xl font-black italic uppercase text-f1red">Admin Panel</h2>
        <p className="text-zinc-500 text-sm mt-1">Manage user queries from the Contact form</p>
      </div>

      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold uppercase">User Inbox</h3>
          {messages.length > 0 && (
            <button onClick={clearInbox} className="text-xs text-f1red/80 hover:text-f1red font-bold">CLEAR INBOX</button>
          )}
        </div>

        {messages.length === 0 ? (
          <p className="text-zinc-500 italic text-center py-10">Inbox is empty</p>
        ) :(
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="bg-zinc-950 p-5 rounded-lg border border-zinc-800">
                <div className="flex justify-between text-xs mb-3 border-b border-zinc-800 pb-2">
                  <span className="font-bold text-f1red uppercase">{msg.name} ({msg.email})</span>
                  <span className="text-zinc-500">{new Date(msg.date).toLocaleString()}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div> 
        )}
      </div>
    </div>
  )
}