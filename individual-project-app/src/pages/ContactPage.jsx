import { useEffect, useState } from "react"
import { saveState, getState } from "../scripts/storage"
import { useSelector } from "react-redux"

function ContactForm() {
  const [formData, setFormData] = useState({name:"", email:"", message:""})
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if(user.status==="succeeded")
    {
      if(user.user.email !== getState("contactDraft").email) {
        localStorage.removeItem("contactDraft")
      }
      setFormData(getState("contactDraft", {name:"", email:user.user.email, message:""}))
    } else {
      localStorage.removeItem("contactDraft")
    }
    console.log(user)
  }, [])

  const handleChange = (e) => {
    const updated = {...formData, [e.target.name]: e.target.value}
    setFormData(updated)
    saveState("contactDraft", updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const inbox = getState("adminMessages", [])
    saveState("adminMessages", [{...formData, id: Date.now(), date: new Date().toISOString()}, ...inbox])
    localStorage.removeItem("contactDraft")
    setFormData({name:"", email:user.user.email, message:""})
    alert("Message sent to admin")
  }

  if(user.status==="succeeded") {
    return(
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Name</label>
          <input
            name="name"
            type="text"
            placeholder="name..."
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email..."
            required
            value={formData.email}
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Message</label>
          <textarea
            name="message"
            type="text"
            autoComplete="off"
            placeholder="message..."
            rows="3"
            required
            value={formData.message}
            onChange={handleChange}
            className="max-h-24 w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
          />
        </div>
        
        <button
          type="submit"
          className="mt-4 py-3 font-bold uppercase tracking-widest bg-f1red rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    )
  } else {
    return (
      <div className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded">
        Please log in if you want to send feedback. Thank you
      </div>
    )
  }

}

export default function ContactPage() {

  return (
    <section className="flex flex-col items-center justify-center gap-4 min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl bg-zinc-950/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold uppercase text-center mb-6">
          Contact
        </h2>
        <ContactForm/>
      </div>
    </section>
  )
}