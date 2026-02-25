import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const status = useSelector((state) => state.auth.status)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Email</label>
        <input
          type="email"
          placeholder="email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-zinc-900 border rounded focus: border-zinc-700 focus:border-f1red focus:outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Password</label>
        <input
          type="password"
          autoComplete="off"
          placeholder="password..."
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-zinc-900 border rounded focus: border-zinc-700 focus:border-f1red focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 py-3 font-bold uppercase tracking-widest bg-f1red rounded hover:bg-red-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Authenticating..." : "Sign in"}
      </button>

      <p className="text-sm text-zinc-400 text-center mt-2">
        Don’t have an account?{" "}
        <NavLink to="/register" className="text-f1red hover:underline">
          Register
        </NavLink>
      </p>
    </form>
  )
}

export default function LoginPage() {
  const error = useSelector((state) => state.auth.error)

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl bg-zinc-950/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold uppercase text-center mb-6">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded">
            {error}
          </div>
        )}

        <LoginForm/>
      </div>
    </div>
  );
}
