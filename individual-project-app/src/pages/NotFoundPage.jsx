import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/", { replace: true })
    }, 2000)

    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-[78vh] flex flex-row items-center justify-center px-4">
      <p className="text-zinc-900 dark:text-white text-center">404 Page not found. You’ll be redirected to the home page in 2 seconds…</p>
    </div>
  );
}