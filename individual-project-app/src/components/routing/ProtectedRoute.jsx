import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, adminOnly = false}) {
  const {isAdmin} = useSelector((state) => state.auth)

  if(adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}