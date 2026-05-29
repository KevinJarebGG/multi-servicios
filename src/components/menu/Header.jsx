import { useState, useContext } from "react"
import { Menu, Bell, User, LogOut, UserCircle, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Swal from "sweetalert2"

export function Header({ toggleSidebar }) {
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)
const { logout } = useContext(AuthContext)

  // Leemos el rol guardado y lo mostramos bonito
  const rol = localStorage.getItem("rol")
  const nombreRol = rol === "tecnico" ? "Técnico" : "Cliente"

  const cerrarSesion = () => {
    setMenuAbierto(false)
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
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* Botón menú hamburguesa */}
      <button
        onClick={toggleSidebar}
        className="text-slate-400 hover:text-slate-600 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <p className="text-slate-400 text-sm">Bienvenido de vuelta,</p>
        <p className="font-bold text-slate-800">{nombreRol}</p>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-slate-400 hover:text-slate-600">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Menú de usuario */}
        <div className="relative">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 hover:bg-slate-50 rounded-xl px-2 py-1 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-700 hidden lg:block">{nombreRol}</span>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${menuAbierto ? "rotate-180" : ""}`} />
          </button>

          {/* Ventanita desplegable */}
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-slate-700">{nombreRol}</p>
                <p className="text-xs text-slate-400">Mi cuenta</p>
              </div>

              <button
                onClick={() => { setMenuAbierto(false); navigate("/perfil") }}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-left"
              >
                <UserCircle size={18} />
                Ver perfil
              </button>

              <button
                onClick={cerrarSesion}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition text-left border-t border-gray-50"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}