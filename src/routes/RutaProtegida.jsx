import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export function RutaProtegida({ children, rolPermitido }) {
  const { usuario } = useContext(AuthContext)

  // Si no hay usuario logueado, mandar al login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Si la ruta requiere un rol específico y el usuario no lo tiene
  if (rolPermitido && usuario.rol !== rolPermitido) {
    // Redirigir según el rol que SÍ tenga
    if (usuario.rol === "tecnico") {
      return <Navigate to="/dashboard" replace />
    }
    return <Navigate to="/home" replace />
  }

  // Si todo está bien, mostrar el contenido
  return children
}