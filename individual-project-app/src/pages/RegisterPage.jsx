import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import ErrorBanner from "../components/ui/ErrorBanner";

function RegisterForm({setLocalError}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    const resultAction = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-1">Email</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
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
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          autoComplete="off"
          placeholder="password..."
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:border-f1red focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 py-3 font-bold uppercase tracking-widest bg-f1red rounded hover:bg-red-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Creating account..." : "Create account"}
      </button>

      <p className="text-sm text-zinc-400 text-center mt-2">
        Already have an account?{" "}
        <NavLink to="/login" className="text-f1red hover:underline">
          Login
        </NavLink>
      </p>
    </form>
  )
}

export default function RegisterPage() {
  const [localError, setLocalError] = useState("");
  const error = useSelector((state) => state.auth.error);

  return (
    <AuthCard title = "Register">
      <ErrorBanner message={localError || error} />
      <RegisterForm setLocalError={setLocalError}/>
    </AuthCard>
  );
}
