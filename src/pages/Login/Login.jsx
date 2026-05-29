import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import DatosBD from "../../services/ApiDatos"

export function Login() {
  const [nomuser, setNomuser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const usuario = await DatosBD.login({ nomuser, password })
      login(usuario)

      // Según el rol, lo mandamos a su zona
      if (usuario.rol === "tecnico") {
        navigate("/dashboard")
      } else {
        navigate("/home")
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">Multi-Servicios</h1>
        <p className="text-center text-gray-500 mb-6">Inicia sesión en tu cuenta</p>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-1">Usuario o correo</label>
          <input
            type="text"
            placeholder="correo / nombre de usuario"
            value={nomuser}
            onChange={(e) => setNomuser(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
          <p className="text-center text-gray-500 mt-4">
  ¿No tienes cuenta?{" "}
  <Link to="/register" className="text-blue-600 font-semibold hover:underline">
    Regístrate
  </Link>
</p>
        </form>
      </div>
    </div>
  )
}