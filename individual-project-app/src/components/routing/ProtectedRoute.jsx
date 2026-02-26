import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner";

export default function ProtectedRoute({children, adminOnly = false}) {
  const {isAdmin, status} = useSelector((state) => state.auth)

  if (status === "idle" || status === "loading") {
    return <Spinner />
  }

  if(adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}