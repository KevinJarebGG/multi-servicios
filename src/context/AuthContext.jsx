import { createContext, useState, useEffect } from "react"

// Creamos el contexto
export const AuthContext = createContext()

// El proveedor que envuelve la app
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Al cargar la app, recuperamos al usuario del localStorage (si existe)
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario")
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
  }, [])

  // Guardar el usuario al iniciar sesión
  const login = (datosUsuario) => {
    setUsuario(datosUsuario)
    localStorage.setItem("usuario", JSON.stringify(datosUsuario))
    localStorage.setItem("rol", datosUsuario.rol)
  }

  // Borrar el usuario al cerrar sesión
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("usuario")
    localStorage.removeItem("rol")
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}