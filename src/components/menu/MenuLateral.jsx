import { LayoutDashboard, Home, History, Settings, User, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function MenuLateral({ isOpen, toggleSidebar }) {
  const location = useLocation()
  const rol = localStorage.getItem("rol")

  // Opciones para el cliente
  const linksCliente = [
    { path: "/home", label: "Servicios", icon: <Home size={20} /> },
    { path: "/historial", label: "Historial", icon: <History size={20} /> },
    { path: "/perfil", label: "Perfil", icon: <User size={20} /> },
  ]

  // Opciones para el técnico
  const linksTecnico = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/persona", label: "Gestión", icon: <Settings size={20} /> },
    { path: "/historial", label: "Historial", icon: <History size={20} /> },
    { path: "/perfil", label: "Perfil", icon: <User size={20} /> },
  ]

  // Elegimos qué links mostrar según el rol
  const links = rol === "tecnico" ? linksTecnico : linksCliente

  return (
    <>
      {/* Overlay en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-sm z-30 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">Multi-Servicios</h1>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => { if (isOpen) toggleSidebar() }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                ${location.pathname === link.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}