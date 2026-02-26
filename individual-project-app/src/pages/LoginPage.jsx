import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import ErrorBanner from "../components/ui/ErrorBanner";

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
          className="w-full p-3 bg-zinc-900 border rounded border-zinc-700 focus:border-f1red focus:outline-none transition"
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
    <AuthCard title="Login">
      <ErrorBanner message={error} />
      <LoginForm/>
    </AuthCard>
  );
}
