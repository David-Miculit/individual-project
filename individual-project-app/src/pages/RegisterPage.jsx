import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterForm({setLocalError}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const status = useSelector((state) => state.auth);
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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-8 border border-zinc-800 rounded-xl bg-zinc-950/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold italic uppercase tracking-tight text-center mb-6">
          Register
        </h2>

        {(error || localError) && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded">
            {localError || error}
          </div>
        )}

        <RegisterForm setLocalError={setLocalError}/>
      </div>
    </div>
  );
}
