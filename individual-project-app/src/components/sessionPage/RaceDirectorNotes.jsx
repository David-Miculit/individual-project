import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getState, saveState } from "../../scripts/storage";

const formatDate = (note) => {
  const ts = note.createdAt ? new Date(note.createdAt) : (typeof note.id === "number" ? new Date(note.id) : null);
  if (!ts || Number.isNaN(ts.getTime())) return "";
  return ts.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function RaceDirectorNotes({sessionKey}) {
  const isAdmin = useSelector((state) => state.auth.isAdmin)
  const [newNote, setNewNote] = useState({ category: 'Safety Car', description: '' })
  const [notes, setNotes] = useState([]);
  const categories = ['Safety Car', 'Weather', 'Track Info', 'Incident', 'Other']

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!newNote.description) return
    const noteObj = { id: Date.now(), sessionKey: String(sessionKey), title: newNote.category, content: newNote.description, createdAt: new Date().toISOString() }
    const allNotes = getState('adminNotes', [])
    saveState('adminNotes', [noteObj, ...allNotes])
    setNotes([noteObj, ...notes])
    setNewNote({ category: 'Safety Car', description: '' })
  }

  const removeNote = (noteId) => {
    const allNotes = getState('adminNotes', [])
    saveState('adminNotes', allNotes.filter(note => note.id !== noteId))
    setNotes(notes.filter(note => note.id !== noteId))
  }

  useEffect(() => {
    const allNotes = getState("adminNotes", [])
    const filtered = allNotes.filter((note) => String(note.sessionKey) === String(sessionKey))
    setNotes(filtered)
  }, [sessionKey])

  return (
    <>
      {isAdmin && (
        <div className="bg-zinc-900 border border-f1red rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 ml-4 text-f1red uppercase tracking-widest">
            Add Race Director Note
          </h3>

          <form onSubmit={handleAddNote} className="flex flex-col md:flex-row gap-4 ml-4">
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              className="p-3 bg-zinc-950 rounded border border-zinc-800 outline-none focus:border-f1red text-white md:w-48"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Description of the event..."
              value={newNote.description}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              className="p-3 bg-zinc-950 rounded border border-zinc-800 outline-none focus:border-f1red text-white flex-1"
              required
            />

            <button
              type="submit"
              className="px-6 py-3 rounded font-bold bg-f1red text-white hover:bg-red-700 uppercase text-sm tracking-widest transition-colors"
            >
              Publish
            </button>
          </form>
        </div>
      )}

      {notes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase">
            Race Director Updates
          </h3>

          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-f1red/10 border-l-4 border-f1red p-4 rounded-r flex justify-between items-start group"
            >
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-bold text-f1red uppercase text-sm">{note.title}</h4>

                  <span className="text-[11px] text-zinc-400 font-mono whitespace-nowrap">
                    {formatDate(note)}
                  </span>
                </div>

                <p className="text-zinc-200 mt-1">{note.content}</p>
              </div>

              {isAdmin && (
                <button
                  onClick={() => removeNote(note.id)}
                  className="text-f1red/70 hover:text-f1red text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}