import { useContext } from "react"
import { User, Mail, Phone, LogOut, Briefcase } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Swal from "sweetalert2"

export function Perfil() {
  const navigate = useNavigate()
  const { usuario, logout } = useContext(AuthContext)

  // Si no hay usuario (recargó la página), lo tomamos del localStorage
  const datosUsuario = usuario || JSON.parse(localStorage.getItem("usuario") || "{}")

  const nombreRol = datosUsuario.rol === "tecnico" ? "Técnico" : "Cliente"

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Estás seguro de querer cerrar tu cuenta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        navigate("/login")
      }
    })
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mi Perfil</h1>
        <p className="text-slate-500 text-sm">Información de tu cuenta.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Encabezado del perfil */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-600 mb-4">
            <User size={52} />
          </div>
          <h2 className="text-white text-xl font-bold">{datosUsuario.nombre || "Usuario"}</h2>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">
            {nombreRol}
          </span>
        </div>

        {/* Datos */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
            <Mail size={20} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-400">Correo</p>
              <p className="text-sm font-semibold text-slate-700">{datosUsuario.correo || "No disponible"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
            <User size={20} className="text-blue-600" />
            <div>
              <p className="text-xs text-slate-400">Usuario</p>
              <p className="text-sm font-semibold text-slate-700">{datosUsuario.nomuser || "No disponible"}</p>
            </div>
          </div>
        </div>

        {/* Botón cerrar sesión */}
        <div className="p-6 border-t border-gray-50">
          <button
            onClick={cerrarSesion}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}